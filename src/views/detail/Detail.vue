<template>
	<div class="">
		<detail-nav-bar/>
		<detail-swiper :top-images = "topImages" ></detail-swiper>
		<detail-base-info :goods="goods"></detail-base-info>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	
	import {getDetail,Goods} from 'network/detail.js'
	
	export default {
		name:"Detail",
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo
		},
		data() {
			return{
				iid:null,
				topImages:[],
				// 对象
				goods:{}
				
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
				console.log(this.goods)
			})
			
			
		}
	}
</script>

<style>
</style>
