<template>
  <div class="wrapper" ref="wrapp">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'

  export default {
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted(){
      // 创建
      this.scroll = new Bscroll(this.$refs.wrapp, {
        click: true,                                // div/span标签可点击
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 监听滚动
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', position => {
          this.$emit("scroll", position)
        })
      }

      // 监听上拉界面
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    
    },
    methods: {
      scrollTo(x, y, time = 500) {
        this.scroll && this.scroll.scrollTo(x, y, time)     // this.scroll && 以防scroll未加载成功
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>