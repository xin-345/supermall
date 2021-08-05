<template>
	<div id="detail" ref="detail" >
		<detail-nav-bar/>
		<scroll class="content"  @scroll="contentScroll" ref='scroll' :probe-type="3"  >
			<detail-swiper :top-images = "topImages" ></detail-swiper>
			<detail-base-info :goods="goods" @servicesShow="servicesShow"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo"></detail-goods-info>
			<detail-params-info :params-info="paramsInfo"></detail-params-info>
			<detail-comment-info></detail-comment-info>
			<detail-comment-info :comment-info="commentInfo"></detail-comment-info>
			<goods-list :goods="recommends"></goods-list>
		</scroll>
		<back-top @click.native="backClick" class="back-top" v-show="isShowBackTop" ></back-top>
		<detail-services class="detail-services" v-if="servicesIsShow" ref="detailServices" :height="height"></detail-services>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
	import DetailServices from './childComps/DetailServices.vue'
	import DetailParamsInfo from './childComps/DetailParamsInfo.vue'
	import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
	
	
	import Scroll from 'components/common/scroll/Scroll.vue'
	import BackTop from 'components/content/backTop/BackTop.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	
	import {getDetail,getRecommend,Goods,Shop} from 'network/detail.js'
	
	export default {
		name:"Detail",
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailServices,
			DetailParamsInfo,
			DetailCommentInfo,
			
			Scroll,
			BackTop,
			GoodsList
		},
		data() {
			return{
				iid:null,
				topImages:[],
				// 对象
				goods:{},
				shop:{},
				detailInfo:{},
				paramsInfo:{},
				commentInfo:{},
				recommends:[],
				height:10,
				servicesIsShow:false,
				isShowBackTop:false,
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
				
				// 保存商品的详情数据
				this.detailInfo = data.detailInfo
				
				// 取出参数信息
				this.paramsInfo = data.itemParams
				
				// 取出评论信息
				if(data.rate.cRate !== 0){
					this.commentInfo = data.rate.list[0]
				}
				console.log(this.commentInfo)
			})
			
			// 请求详情数据
			getRecommend().then(res => {
				this.recommends = res.data.list
				console.log(this.recommends)
			})
		},
		mounted() {
			// 获取页面的高度
			// this.height = this.$refs.bottom.offsetTop;
		},
		methods:{
			
			servicesShow(){
				this.servicesIsShow = true
				setTimeout(()=>{
					this.$refs.detailServices.open()
				},10)
			},
			backClick(){
				this.$refs.scroll.scrollTo(0,0)
			},
			contentScroll(position){
				this.isShowBackTop = (-position.y) > 600
			}
		}
	}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index:9;
		background-color: #FFFFFF;
		height: 100vh;
	}
	
	.content {
		/* 减号前后要留空格 */
		height: calc(100% - 44px);
		overflow: hidden;
	}
</style>
