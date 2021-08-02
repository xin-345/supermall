<template>
	<div class="goods-item" @click="itemClick">
		<!-- @load="imageLoad" -->
		<img :src="goodsItem.show.img" class="goods-img" >
		<div class="goods-info">
			<p>{{goodsItem.title}}</p>
			<span class="price">{{goodsItem.price}}</span>
			<span class="collect">{{goodsItem.cfav}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name:"GoodsListItem",
		props:{
			goodsItem:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			// imageLoad(){
			// 	this.$bus.$emit('itemImageLoad')
			// }
			
			itemClick(){
				// 使用push方便返回
				 this.$router.push('/detail/'+this.goodsItem.iid).catch((err)=>{err})
			}
		}
	}
</script>
	
<style scoped>
	.goods-item {
		padding-bottom: 40px;
		position: relative;
		width: 46%;
	}
	.goods-img {
		width: 100%;
		border-radius: 5px;
		min-height: 258.75px;
	}
	.goods-info{
		margin: 0 auto;
		width: 80%;
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
	}
	.goods-info p{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 3px;
		padding-bottom: 3px;
	}
	
	.goods-info  .price {
		color: var(--color-high-text);
		margin-right: 20px;
	}
	
	.goods-info .collect {
		position: relative;
	}
	
	.goods-info .collect::before{
		content: '';
		position: absolute;
		left: -15px;
		top: -1px;
		width: 14px;
		height: 14px;
		background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
	}
</style>
