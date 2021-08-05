<template>
	<div class="shop-info" v-if="Object.keys(shop).length !== 0 ">
		<div class="shop-content">
			<div class="shop-top">
				<img :src="shop.logo" >
				<span class="title">{{shop.name}}</span>
			</div>
			<div class="shop-inner">
				<div class="inner-left">
					<div class="fans">
						<span class="fans1">{{shop.fans | sellCountFilter(shop.fans )}}</span>
						<span class="fans2">总销量</span>
					</div>
					<div class="goods-count">
						<span class="fans1">{{shop.goodsCount | sellCountFilter(shop.goodsCount)}}</span>
						<span class="fans2">全部宝贝</span>
					</div>
				</div>
				<div class="inner-right">
					<div class="sells" v-for="index in shop.sells.length" :key="index">
						<span>{{shop.sells[index-1].name}}</span>
						
						<span  :class="[{ green : shop.sells[index-1].score < 4.8},
								{ red : shop.sells[index-1].score >= 4.8}]">
							{{shop.sells[index-1].score.toFixed(2)}}</span>
							
						<span v-if="!shop.sells[index-1].isBetter" style="background-color: green" >低</span>
						<span v-else="shop.sells[index-1].isBetter" style="background-color: var(--color-high-text);">高</span>
					</div>
				</div>
			</div>
		</div>
		<div class="shop-bottom">
			<div class="enter-shop">进店逛逛</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:"DetailShopInfo",
		props:{
			shop:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		filters:{
			sellCountFilter:function(value){
				if(value < 10000) return value;
				return (value / 10000).toFixed(1) + '万'
			}
		}
	}
</script>

<style scoped>
	.shop-info {
		position: relative;
		background-color: #fff;
		padding: 20px 5px;
		border-bottom: 4px solid #F2F5F8;
	}
	
	.shop-top {
		padding-left: 10px;
		display: flex;
		height: 60px;
	}
	.shop-top img {
		width:60px;
		height: 60px;
	}
	.shop-top .title {
		padding-left: 10px;
		font-size: 16px;
		line-height: 60px;
	}
	
	.shop-inner {
		display: flex;
		justify-content: space-evenly;
	}
	.shop-inner .inner-left {
		margin: auto 0;
		width: 50%;
		display: flex;
		justify-content: space-evenly;
		border-right: #e7eaec 2px solid;
	}
	.inner-left .fans,.goods-count{
		text-align: center;
		color: #333333;
	}
	.shop-inner .inner-left span {
		display: block;
	}
	.inner-left .fans1 {
		font-size: 16px;
	}
	
	
	.shop-inner .inner-right {
		width: 50%;
		text-align: center;
	}
	.inner-right .sells {
		padding:2px ;
	}
	.inner-right span {
		padding:0 5px ;
		margin: 0 5px;
	}
	.inner-right span:last-child {
		color: #FFFFFF;
	}
	.green {
		color:green;
	}
	.red {
		color: red;
	}
	
	.shop-bottom {
		font-size: 14px;
		color: #333333;
		text-align: center;
		margin: 10px auto;
		margin-top: 20px;
		width: 140px;
		height: 32px;
		line-height: 32px;
		border-radius: 8px;
		background-color: #F2F5F8;
	}
</style>
