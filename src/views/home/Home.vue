<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type='3' @scroll="contentScroll" :pull-up-load="true" @pullingUp='loadMore'>
      <home-swiper :banner="banner" @swiperImageLoad='swiperImageLoad'></home-swiper>
      <home-recommend-view :recommend="recommend"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods-list="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import GoodsListItem from 'components/content/goods/GoodsListItem'
  import scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommendView from './childComps/HomeRecommendView'
  import HomeFeatureView from './childComps/HomeFeatureView'
  

  import {getHomeMutidata, getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'
  import {itemListenerMixin} from 'common/mixin'


  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      GoodsListItem,
      scroll,
      BackTop,

      HomeSwiper,
      HomeRecommendView,
      HomeFeatureView
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    created() {
      // 1、请求多个数据
      this.getHomeMutidata()
      // 2、请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 取消全局事件监听
      this.$bus.$off('itemImageLoad', this.itemImgListe)  //(监听的事件， 对应执行的函数)
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /* 
       * 网络请求相关方法
      */
      getHomeMutidata() {
        getHomeMutidata().then(res => {
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page;

        getHomeGoods(type, (page + 1)).then(res => {
          this.goods[type].list.push(...res.data.list);   // 解构
          this.goods[type].page += 1;
          // 完成一次上拉加载
          this.$refs.scroll.finishPullUp()
        })        
      },
      /* 
       * 事件监听相关方法
      */
      tabClick(index) {
        switch (index) {
          case 0: 
            this.currentType = 'pop';
            break;
          case 1: 
            this.currentType = 'new';
            break;
          case 2: 
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 300); // (位置x,y，毫秒)
      },
      contentScroll(position) {
        // 判断返回图是否显示
        this.isShowBackTop = -position.y > 1000;
        // 判断tabcontrol是否吸顶
        this.isTabFixed = -position.y > this.tabOffsetTop
      },
      loadMore() {
        // console.log('加载');
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // 获取tabControl的offset
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }

  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
