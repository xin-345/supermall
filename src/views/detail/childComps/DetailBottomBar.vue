<template>
	<div class="">
		<div class="bottom-bar">
			<div class="bar-item bar-left">
				<div>
					<i class="icon shop"></i>
					<span class="text">店铺</span>
				</div>
				<div>
					<i class="icon service"></i>
					<span class="text">客服</span>
				</div>
				<div>
					<i class="icon select"></i>
					<span class="text">收藏</span>
				</div>
			</div>
			<div class="bar-item bar-right">
				<div class="cart" @click="addToCart">加入购物车</div>
				<div class="buy ">立即购买</div>
			</div>
		</div>
		<!-- <sport-ball ref="ball" class="sport-ball"></sport-ball> -->
	</div>
	
</template>

<script>
		
	export default {
		name:"DetailBottomBar",
		methods:{
			addToCart(){
				
			}
		}
	}
</script>

<style scoped>
	.bottom-bar {
		width: 100%;
		height: 52px;
		/* relative 有bug 会滑动 没有定住 */
		position: fixed;
		left: 0;
		bottom: 0;
		
		background-color: #FFFFFF;
		display: flex;
		border-top: 1px solid #eceff1;
		
		text-align: center;
		font-weight: 500;
	}
	.bar-item {
		flex: 1;
		display: flex;
	}
	.bar-item>div {
		flex: 1;
	}
	.bar-left .icon{
		display: block;
		width: 22px;
		height: 22px;
		margin: 6px auto 2px;
		background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
	}
	.bar-left .shop {
		background-position: 0 -98px;
	}
	.bar-left .service{
		background-position: 0 -53px;
	}
	.bar-left div{
		font-size: 13px;
		border-right: 1px solid #eceff1;
	}
	
	.bar-right div {
		font-size: 15px;
		line-height: 52px;
	}
	.bar-right .cart {
		background-color: #ffecef;
		color: var(--color-high-text);
		font-weight: 600;
	}
	.bar-right .buy {
		background-color: var(--color-high-text);
		color: #FFFFFF;
	}
	
	.sport-ball {
		position: absolute;
		left: 225px;
		bottom: 20px;
	}
</style>
