<template>
	<div class="">
		<detail-nav-bar/>
		<detail-swiper :top-images = "topImages" ></detail-swiper>
		<detail-base-info :goods="goods"></detail-base-info>
		<detail-shop-info :shop="shop"></detail-shop-info>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	
	import {getDetail,Goods,Shop} from 'network/detail.js'
	
	export default {
		name:"Detail",
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo
		},
		data() {
			return{
				iid:null,
				topImages:[],
				// 对象
				goods:{},
				shop:{}
				
			}
		},
		created() {
			// 保存传入的iid
			this.iid = this.$route.params.iid
			
			// 根据iid 请求详细数据
			getDetail(this.iid).then(res => {
				console.log(res)
				const data = res.result
				
				// 获取顶部图片轮播数据
				this.topImages = data.itemInfo.topImages
				
				// 获取商品信息
				this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
				
				// 创建店铺信息的对象
				this.shop = new Shop(data.shopInfo)
				console.log(this.shop)
			})
			
			
		}
	}
</script>

<style>
</style>
