<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'

  export default {
    components: {
      scroll,
      CartListItem,
    },
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }

</script>

<style scoped>
  .cart-list {
    height: calc(100% - 133px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }

</style>