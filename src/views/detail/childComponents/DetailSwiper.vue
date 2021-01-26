<template>
  <div>
    <swiper class="detail-swiper" v-if="topImages.length">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="" @load="imgLoad">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
        isRefesh: false
      }
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imgLoad() {
        if (!this.isRefesh) {
          this.$emit('imageLoad');
          this.isRefesh = true;
        }
      }
    }
  }
</script>

<style scoped>
 .detail-swiper {
   height: 300px;
   overflow: hidden;
 }
</style>