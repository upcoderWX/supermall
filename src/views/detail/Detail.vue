<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType='3'>
        <detail-swiper :top-images='topImages' @imageLoad="igLoad"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="igLoad" class="bug"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
        <detail-comment-info :advice-info="commentInfo" ref="comments"></detail-comment-info>
        <goods-list :goods-list="recommend" ref="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from './childComponents/DetailNavBar'
  import DetailSwiper from './childComponents/DetailSwiper'
  import DetailBaseInfo from './childComponents/DetailBaseInfo'
  import DetailShopInfo from './childComponents/DetailShopInfo'
  import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
  import DetailParamInfo from './childComponents/DetailParamInfo'
  import DetailCommentInfo from './childComponents/DetailCommentInfo'
  import DetailBottomBar from './childComponents/DetailBottomBar'

  import scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import Toast from 'components/common/toast/Toast'

  import {debounce} from 'common/utils'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'

  import {mapActions} from 'vuex'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Toast
      
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopY: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    created() {
      // 传入id
      this.iid = this.$route.params.iid;

      // 根据iid请求数据
      getDetail(this.iid).then(res => {
        // 轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages;

        // 商品数据
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 商家信息
        this.shop = new Shop(data.shopInfo)

        // 商品详情数据
        this.detailInfo = data.detailInfo
        
        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        this.$nextTick(() => {
          // 根据最新的数据，对应的dom已经被渲染，但图片依旧没有加载完

        })
      })
      // 请求推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list
      })
      // 给getThemeTopY赋值,进行防抖
      this.getThemeTopY = debounce(() => {
        this.themeTopY = []
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.params.$el.offsetTop);   // 取组件offsetTop前面需要加$el
        this.themeTopY.push(this.$refs.comments.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommends.$el.offsetTop);
        this.themeTopY.push(Number.MAX_VALUE);
      }, 300)
    },
    mounted() {
      // 加载完，但图片数据不一定加载完

    },
    updated() {

    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListe) // 取消
    },
    methods: {
      ...mapActions(['addCart']),
      igLoad() {
        this.refreshNew()
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 300)
      },
      contentScroll(position) {
        // 获取POSITION值
        const positionY = -position.y
        let length = this.themeTopY.length

        // 与主题值对比
        for (let i = 0; i < length - 1; i++) {         // i是字符串类型
          if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i + 1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;          
          }
        }
        this.isShowBackTop = -position.y > 1000
      },
      // 监听购物车
      addToCart() {
        // 获取购物车信息
        let product = {};
        product.img = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        // 将商品添加到购物车
        this.addCart(product).then(res => {
          this.$toast.show(res, 1500)
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 95px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .bug {
    position: relative;
  }
</style>