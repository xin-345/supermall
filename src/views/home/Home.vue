<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
	
	<tab-control class="tab-control" ref="tabControl1"
		:titles ="['流行','新款','精选']" 
		@tabClick = "tabClick"
		v-show="isTabFixed"
	></tab-control>
		
	<scroll class='content' ref='scroll' 
		:probe-type="3" 
		@scroll="contentScroll"
		:pull-up-load="true"
		@pullingUp="loadMore"
	>
		<home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
			<recommend-view :recommends="recommends"></recommend-view>
			<feature-view></feature-view>
			<tab-control ref="tabControl2" 
				:titles ="['流行','新款','精选']" 
				@tabClick = "tabClick"
			></tab-control>
			<goods-list :goods = "showGoods"></goods-list>
	</scroll>	
	
	<!-- 监听组件的原生事件时必须给对应事件加上native 监听 -->
	<back-top @click.native="backClick" class="back-top" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  //私有组件 
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'
  
  // 公共组件
  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'
  
  // 组件导入加大括号是因为没有使用  default 导出
  import {getHomeMultidata,getHomeGoods} from 'network/home.js'
  import {debounce} from 'common/utils.js'
  

 

  export default {
    name:"Home",
    components:{
	  HomeSwiper,
	  RecommendView,
	  FeatureView,
	  
      NavBar,
	  TabControl,
	  GoodsList,
	  Scroll,
	  BackTop
    },
    data(){
      return {
        banners:[],
		recommends:[],
		goods:{
			'pop':{page:0,list:[]},
			'new':{page:0,list:[]},
			'sell':{page:0,list:[]}
		},
		currentType:'pop',
		isShowBackTop:false,
		tabOffsetTop:0,
		isTabFixed:false,
		saveY:0 
      }
    },
	computed:{
		showGoods(){
			return this.goods[this.currentType].list;
		}
	},
	destroyed() {
		console.log('1111')
	},
	// 保留Home 的位置
	activated() {
		this.$refs.scroll.refresh()
		
		
		this.$refs.scroll.scrollTo(0,this.saveY,0)
	},
	deactivated() {
		// 保存 Y 值
		this.saveY = this.$refs.scroll.getScrollY()
		
		// 取消全局事件的监听
		// this.$bus.$off('itemImageLoad')
		
	},
    created(){
      // 1.请求多个数据
      this.getHomeMultidata(),
	  
	  // 2. 请求商品数据
	  this.getHomeGoods('pop'),
	  this.getHomeGoods('new'),
	  this.getHomeGoods('sell')
	  
	  
    },
	mounted() {
		const refresh = debounce(this.$refs.scroll.refresh,200)
		// 总线 爷爷组件监听  （$bus事件总线要在 main.js 中创建$bus 原型 ）
		// 3.监听item中图片加载完成
		 this.$bus.$on('homeItemImageLoad',()=>{
			refresh()
		 })
		 
		// 获取tabControl的offsetTop
		// 所有组件都有一个属性 $el,用于获取组件中的元素
		// 加时器 
		// setTimeout(()=>{
		// 	this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
		// 	console.log(this.tabOffsetTop)
		// },600)
		
	},
    methods:{
		/**
		 * 事件监听方法
		 */
		
		tabClick(index){
			switch (index){
				case 0:
					this.currentType = 'pop';
					break
				case 1:
					this.currentType = 'new';
					break
				case 2:
					this.currentType = 'sell';
					break
			}
			this.$refs.tabControl1.currentIndex = index
			this.$refs.tabControl2.currentIndex = index
		},
		backClick(){
			this.$refs.scroll.scrollTo(0,0)
		},
		contentScroll(position){
			this.isShowBackTop = (-position.y) > 600
			
			this.isTabFixed = (-position.y) > this.tabOffsetTop
		},
		loadMore(){
			this.getHomeGoods(this.currentType)
			this.$refs.scroll.scroll.refresh()
		},
		swiperImageLoad(){
			this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
		},
		/**
		 * 网络请求相关方法
		 */
		
      getHomeMultidata(){getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
		this.recommends = res.data.recommend.list;
      })},
	  
	  getHomeGoods(type){
		   const page = this.goods[type].page + 1 ;
		   getHomeGoods(type,page).then(res => {
			   // console.log(res);
			   this.goods[type].list.push(...res.data.list);
			   this.goods[type].page += 1;
			   
			   // 完成上拉加载更多
			   this.$refs.scroll.finishPullUp()
		   })
	  }

    }
  }
</script>

<style scoped>
  #home {
	  
		/* padding-top: 44px; */
		width: 100%;
		/* 视口  100个视口 100%视口 */
		height: 100vh;
		position: relative;
	}
  .home-nav {
    background-color: var(--color-tint);
    color: #FFFFFF;
	font-weight: 600;
	
	/* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
	/* position: fixed;
	left:0;
	right: 0;
	top: 0;
	z-index: 9; */
  }
  
  /* 使用scroll 就失效了 */
  /* .tab-control{
	  position: sticky;
	  top: 44px;
	  z-index: 8;
  } */
  .content {
  	  overflow: hidden;
  	  position: absolute;
	  top: 44px;
	  bottom: 49px;
	  left: 0;
	  right: 0;
	  
	  background-color: #FFFFFF
    }
/*  .content {
	  height: calc(100% - 93px);
	  overflow: hidden;
	  margin-top: 44px;
  } */
  
  .tab-control {
	  position: relative;
	  z-index: 9;
  }
</style>
