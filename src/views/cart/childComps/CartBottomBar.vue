<template>
  <div class='bottom-bar'>
    <div class="button">
      <check-button class="check-button" :isChecked='isTotalSelect' @click.native='totalCheck'></check-button>
      <span>全选</span>
    </div>

    <div class="total">
      合计 :
      <span>￥{{totalPrice}}</span>
    </div>

    <div class="gocalc" @click='calcClick'>结算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import {mapGetters} from 'vuex'
export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + '1' * item.count
      }, 0)
	  // return this.cartList.filter(item => {
      //   return item.checked
      // }).length
    },
    isTotalSelect() {
      // return ! this.cartList.filter(item => {
      //   return !item.checked 
      // }).length
      if(this.cartList.length === 0) return false
      return ! this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    totalCheck() {
      if (this.isTotalSelect) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.filter(item => {
          if (!item.checked)
          item.checked = true
        })
      }
    },
    calcClick() {
      if(!this.cartList.find(item => item.checked)){
        this.$toast.show('请选择要结算的商品',1500)
      } else {
        this.$toast.show('Sorry! 该功能还未开发~',1500)
      }
      
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  color: #333333;
  height: 44px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, .05);
/*  position: relative;
  bottom: 0;
  z-index: 9; */
}
.button .total .gocalc {
	flex: 1;
}
.button {
  display: flex;
  margin-left: 20px;
  align-items: center;
}
.check-button {
	margin-top: 5px;
}
.button span {
  margin-left: 10px;
}
.total span {
  color: var(--color-high-text);
}
.gocalc {
  background-color: var(--color-high-text);
  line-height: 44px;
  padding: 0 30px;
  color: #fff;
}
</style>