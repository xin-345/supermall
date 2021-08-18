<template>
  <div class="cart">
  	<nav-bar class="nav-bar"><div slot="center">购物车({{length}})</div></nav-bar>
	<cart-list class="cart-list"></cart-list>
	<cart-bottom-bar></cart-bottom-bar>
  </div>
  </template>

<script>
  import  CartList from './childComps/CartList.vue'
  import CartBottomBar from './childComps/CartBottomBar.vue'
	
  import NavBar from 'components/common/navbar/NavBar.vue'
  
 
  import { mapGetters } from 'vuex'
  
  export default {
    name:'Cart',
	components:{
		CartList,
		CartBottomBar,
		NavBar
	},
	computed:{
		// 两种语法
		// ...mapGetters([
		// 	// 使用对象展开运算符将 getter 混入 computed 对象中
		//     'cartLength',
		//     'cartList'
		// ]),
		...mapGetters({
			// 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
			length:'cartLength'
		})
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
		font-weight: 600;
	}
</style>
