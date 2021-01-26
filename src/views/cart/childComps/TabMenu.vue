<template>
  <div class="tab-menu">
    <div class="choose">
      <check-button class="check-button" :is-check="isSelectAll" @click.native="checkAllClick"></check-button>
      <div>全选</div>
    </div>
    <div class="totalPrice">
      合计： {{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

	export default {
    name: "TabMenu",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.getters.cartList.filter(item => {
          return item.checked
        }).reduce((prevalue, item) => {
          return prevalue +  item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.getters.cartList.filter(item => {
          return item.checked
        }).length
      },
      isSelectAll() {
        if (this.$store.getters.cartList.length == 0) {
          return false
        } else {
          return !(this.$store.getters.cartList.filter(item => !item.checked ).length)
        }
      }
    },
    methods: {
      checkAllClick() {
        if (this.isSelectAll) {
          this.$store.getters.cartList.forEach(item => {
            item.checked = false
          })
        } else {
          this.$store.getters.cartList.forEach(item => {
            item.checked = true
          })          
        }
      },
      calcClick() {
        if (!this.isSelectAll) {
          this.$toast.show('请选择购买的商品', 2000)
        }
      }
    }
	}
</script>

<style scoped>
  .tab-menu {
    height: 40px;
    background-color:#eee;
    position: relative;
    line-height: 40px;
    display: flex;
  }
  .choose {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 115px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .totalPrice {
    margin-left: 30px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>
