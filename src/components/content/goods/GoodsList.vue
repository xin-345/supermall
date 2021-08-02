<template>
	<div class="goods">
		<goods-list-item v-for="item in goods" :goodsItem="item"/>
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem.vue'
	
	export default {
		name:"GoodsList",
		props:{
			goods:{
				type:Array,
				default(){
					return []
				}
			}
		},
		components:{
			GoodsListItem
		}
	}
</script>
	
<style scoped>
	.goods {
		padding-top: 2px;
		display: flex;
		/* 根据宽度显示多少个 */
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
	
</style>
