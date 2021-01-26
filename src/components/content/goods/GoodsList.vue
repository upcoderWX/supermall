<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goodsList" :goods-item='item' :key="index"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  components: {
    GoodsListItem
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>