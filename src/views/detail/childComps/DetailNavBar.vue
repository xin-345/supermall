<template>
	<div class="">
		<nav-bar>
			<div slot="left" class="back" @click="backClick"> <img src="~assets/img/common/back.svg" ></div>
			
			<div slot="center" class="title">
				<div  v-for="(item,index) in titles" class="title-item" 
					:class="{active:index === currentIndex}"
					@click="titleClick(index)"
				>
					{{item}}
				</div>
			</div>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	
	export default {
		name:'DetailNavBar',
		components:{
			NavBar
		},
		data() {
			return {
				titles:['商品','参数','评论','推荐'],
				currentIndex:0
			}
		},
		created() {
			
		},
		methods:{
			titleClick(index){
				this.currentIndex = index 
			},
			backClick(){
				this.$router.back()
			}
		}
	}
</script>

<style scoped>
	
	.back img {
		margin-top: 13px;
		width: 18px;
		height: 18px;
	}
	.title {
		display: flex;
		font-size: 16px;
	}
	.title-item {
		flex:1
	}
	.active {
		color: var(--color-high-text);
	}
</style>
