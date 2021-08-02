<template>
	<div class="wrapper" ref="wrapper" >
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	// 插件
	import BScroll from 'better-scroll'
	
	// npm install @better-scroll/pull-up--save
	import Pullup from '@better-scroll/pull-up'
	
	// 无论图片的加载成功与否，都会自动调用 BetterScroll 的 refresh 方法来重新计算可滚动的宽度或者高度，
	// 已经用 CSS 确定图片宽高的场景，不应该使用该插件，因为每次调用 refresh 对性能会有影响。
	// 只有在图片的宽度或者高度不确定的情况下，你才需要它。  这里可以不用
	// npm install @better-scroll/observe-image --save
	 // import ObserveImage from '@better-scroll/observe-image'
	
	BScroll.use(Pullup)
	// BScroll.use(ObserveImage)
	
	export default {
		name:"Scroll",
		props:{
			probeType:{
				type:Number,
				default:0
			},
			pullUpLoad:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				Scroll:null
			}
		},
		mounted() {
			this.scroll = new BScroll(this.$refs.wrapper,{
				observeDOM:true,
				click:true,
				probeType:this.probeType,
				pullUpLoad:this.pullUpLoad,
				// observeImage: true // 开启 observe-image 插件
				
			})
			
			// 监听滚动的对象
			if(this.probeType === 2 || this.probeType === 3 ){
				this.scroll.on('scroll',(position)=>{
					this.$emit('scroll',position)
				})
			}
			
			// 监听scroll 滚动到底部
			if(this.pullUpLoad){
				this.scroll.on('pullingUp',()=>{
					// 发送网络请求，请求更多页的数据
					this.$emit('pullingUp')
				})  
			}
		},
		methods:{
			scrollTo(x, y, time=300) {
			  this.scroll.scrollTo(x, y, time)
			},
			// 
			finishPullUp(){
				// 等待数据请求完成，并且将新的数据展示出来后
				this.scroll && this.scroll.finishPullUp()
			}
		}
	}
</script>
	
<style>
</style>
