<template>
	<div class="cart-none">
		<img src="~assets/img/cart/cartnone.svg" >
		<span class="title">购物车竟然是空的</span>
		<span class="text">再忙，也要记得买点什么犒赏自己</span>
	</div>
</template>

<script>
	export default {
		name:"CartNone"
	}
</script>

<style scoped>
	.cart-none {
		text-align: center;
	}
	.cart-none img {
		width: 140px;
		height: 140px;
	}
	.cart-none .title {
		display: block;
		font-size: 14px;
		font-weight: 600;
		margin-top: -8px;
	}
	.cart-none .text {
		display: block;
		margin-top:8px;
		font-size: 12px;
		color: #666666;
	}
</style>
