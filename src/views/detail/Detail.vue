<template>
	<div id="detail" ref="detail" >
		<detail-nav-bar @titleClick="titleClick" ref="nav"/>
		<!-- 属性：topImages  传入值:top-images -->
		<scroll class="content"  @scroll="contentScroll" ref="scroll" :probe-type="3"  >
			<detail-swiper :top-images = "topImages" ></detail-swiper>
			<detail-base-info :goods="goods" @servicesShow="servicesShow"></detail-base-info>
			<detail-shop-info :shop="shop"></detail-shop-info>
			<detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
			<detail-params-info ref="params" :params-info="paramsInfo"></detail-params-info>
			<detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
			<goods-list  ref="recommend"  :goods="recommends"></goods-list>
		</scroll>
		<back-top @click.native="backClick" class="back-top" v-show="isShowBackTop" ></back-top>
		<detail-bottom-bar class="detail-bottom-bar"></detail-bottom-bar>
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
	import DetailBottomBar from './childComps/DetailBottomBar.vue'
	
	import Scroll from 'components/common/scroll/Scroll.vue'
	import BackTop from 'components/content/backTop/BackTop.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	
	import {getDetail,getRecommend,Goods,Shop} from 'network/detail.js'
	import {debounce} from 'common/utils.js'
	
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
			DetailBottomBar,
			
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
				themeTopYs:[],
				getThemeTopY:null,
				currentIndex:0,
				height:10,
				servicesIsShow:false,
				isShowBackTop:false,
			}
		},
		created() {
			//1. 保存传入的iid
			this.iid = this.$route.params.iid
			
			//2. 根据iid 请求详细数据
			getDetail(this.iid).then(res => {
				// console.log(res)
				const data = res.result
				
				// 获取顶部图片轮播数据
				this.topImages = data.itemInfo.topImages
				
				// 获取商品信息
				this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
				
				// 创建店铺信息的对象
				this.shop = new Shop(data.shopInfo)
				// console.log(this.shop)
				
				// 保存商品的详情数据
				this.detailInfo = data.detailInfo
				
				// 取出参数信息
				this.paramsInfo = data.itemParams
				
				// 取出评论信息
				if(data.rate.cRate !== 0){
					this.commentInfo = data.rate.list[0]
				}
				// console.log(this.commentInfo)
				
				// 第一次在这里获取offsetTop 值不对原因   this.$refs.params.$el  压根没有渲染
				
				// created 是不会进行dom渲染的，如果想拿到数据或者实时更新这个数据的话可以使用 $nextTick
				//  $nextTick 是一个回调函数，会等上面渲染完毕后回调内部的函数
				// this.$nextTick(() =>{
					// 值不对原因   图片没有计算在内
					// 根据最新的数据，对应的DOM是已经渲染出来
					// 但是图片依然是没有加载完成（目前获取到的offsetTop不包含其中的图片）
					// offsetTop值不对的时候，都是因为图片的问题
				// 	this.themeTopYs.push(0);
				// 	this.themeTopYs.push(this.$refs.params.$el.offsetTop);
				// 	this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
				// 	this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
				// 	console.log(this.themeTopYs)
				// })
				
			})
			
			//3. 请求详情数据
			getRecommend().then(res => {
				this.recommends = res.data.list
				// console.log(this.recommends)
			})
			
			// 4.给getThemeTopY 赋值
			this.getThemeTopY = debounce(() =>{
				// debounce  防抖 不会打印多次
				this.themeTopYs = [];
				this.themeTopYs.push(0);
				this.themeTopYs.push(this.$refs.params.$el.offsetTop);
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
				// 给数组多push 一个最大值  方便之后做判断
				this.themeTopYs.push(Number.MAX_VALUE);
				console.log(this.themeTopYs)
			},50)
		},
		mounted() {
			// 获取页面的高度  不太对
			// this.height = this.$refs.bottom.offsetTop;
			let refresh = debounce(this.$refs.scroll.refresh,100)
			// 总线 爷爷组件监听  （$bus事件总线要在 main.js 中创建$bus 原型 ）
			// 3.监听item中图片加载完成
			 this.$bus.$on('detailItemImageLoad',()=>{
				refresh()
			 })
		},
		updated() {
			// 再updated 中可以实时刷新 获取数据  但是性能不好，重复获取
			// this.themeTopYs = [];
			// this.themeTopYs.push(0);
			// this.themeTopYs.push(this.$refs.params.$el.offsetTop);
			// this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
			// this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
			// console.log(this.themeTopYs)
		},
		methods:{
			
			detailImageLoad(){
				// refresh();
				this.getThemeTopY()
			},
			titleClick(index){
				console.log(index)
				this.$refs.scroll.scrollTo(0,44-this.themeTopYs[index],500)
			},
			
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
				
				// 1.获取y值
				const positionY = - position.y
				
				// 2. positionY  与  主题值对比  themeTopYs
				
				// positionY 在  themeTopYs[0] 和 themeTopYs[1]  之间时，index = 0
				// positionY 在  themeTopYs[1] 和 themeTopYs[2]  之间时，index = 1
				// positionY 在  themeTopYs[2] 和 themeTopYs[3]  之间时，index = 2
				// positionY 超过  themeTopYs[3]时，index = 3
				
				let length = this.themeTopYs.length
				// for in 遍历对象属性  for 里的 i 为字符串  for(let i in this.themeTopYs) 
				// hack 做法 将 i < length ; 改为了  i < length - 1 ;
				  for(let i = 0; i < length - 1;i++){
					// 普通做法：
					// if(this.currentIndex !== i &&
					// 	(i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) |
					// 	// 这里又了一个条件是针对第四种判断情况 只有大于多少 没有少于多少  使用 i+1 的话会是数组溢出
					// 	(i === length - 1 && positionY >= this.themeTopYs[i])){
					// 		// console.log(i)
					// 		this.currentIndex = i
					// 		this.$refs.nav.currentIndex = this.currentIndex
					// }
					
					// hack 做法： （将上面复杂的条件进行优化）
					// 原理是给数组多加一个数值，最大值  Number.MAX_VALUE   这样就四种情况就相同了
					// js中最大值  Number.MAX_VALUE 
					if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
						this.currentIndex = i
						this.$refs.nav.currentIndex = this.currentIndex
					}
				}
			},
			
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
		height: calc(100% - 44px - 52px );
		overflow: hidden;
	}
</style>
