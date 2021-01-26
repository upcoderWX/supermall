<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad: false
    }
  },
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad');
        this.isLoad = true
      }
    }
  }
}
</script>

<style>

</style>