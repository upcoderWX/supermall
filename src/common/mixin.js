import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'
import {POP, NEW, SELL} from "./const";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListe: null,
      refreshNew: null
    }
  },
  mounted() {
    this.refreshNew = debounce(this.$refs.scroll.refresh, 300)
    this.itemImgListe = () => {   
      this.refreshNew()
    }
    this.$bus.$on('itemImageLoad', () => {        // 应在mounted中监听
      this.refreshNew()
    })
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}