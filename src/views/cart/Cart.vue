<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 列表展示 -->
    <cart-list class="cart-list"></cart-list>
    <!-- 底部汇总 -->
    <tab-menu></tab-menu>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import TabMenu from './childComps/TabMenu'

  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      TabMenu,

    },
    computed: {
      ...mapGetters(['cartLength'])   // 直接从getters引用，也可以是对象{新名：旧名}
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

</style>
