<template>
	<div class="cart-list">
		<scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
			<cart-list-item
			  v-for="(item,index) in cartList"
			  :product="item"
			  :key="index"
			  :countShow="countShow"
			  @countToClick="countClick"
			  >
			</cart-list-item>
			<!-- @on-change-countShow="countClick" -->
			<cart-none v-if="!cartLength"></cart-none>
			<div class="recommend-title">—— ❤ 你可能还喜欢 ——</div>
			<goods-list  ref="recommend"  :goods="recommends"></goods-list>
		</scroll>
	</div>
</template>

<script>
	import Scroll from 'components/common/scroll/Scroll.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	
	import CartListItem from './CartListItem.vue'
	import CartNone from './CartNone.vue'
	
	import { mapGetters } from 'vuex'
	import {getRecommend} from 'network/detail.js'
	
	export default {
		name:"CartList",
		components:{
			Scroll,
			GoodsList,
			CartListItem,
			CartNone
		},
		data() {
			return{
				countShow:false,
				goods:{},
				recommends:[],
				positionY:0,
			} 
		},
		created() {
			//3. 请求详情数据
			getRecommend().then(res => {
				this.recommends = res.data.list
			})
			
		},
		computed:{
			...mapGetters(['cartList','cartLength'])
			
		},
		activated() {
			// 刷新 刷新滚动内容高度
			this.$refs.scroll.refresh()
			
		},
		methods:{
			contentScroll(position,countShow){
				this.countShow = false
			},
			countClick(){
				console.log()
				this.countShow = true
			}
		}
	}
</script>

<style scoped>
	.cart-list {
		height: calc(100% - 44px - 49px - 44px);
	}
	
	.content {
		height: 100%;
		overflow: hidden;
	}
	.recommend-title{
		color: var(--color-high-text);
		font-size: 12px;
		font-weight: 600;
		text-align: center;
		margin-top: 10px;
		padding:10px;
	}
</style>
