<template>
	<div class="tab-control">
		<div class="tab-control-item" 
			v-for="(item,index) in titles" 
			:class="{active:index === currentIndex}"
			@click="ItemClick(index)"
			>
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name:"TabControl",
		props:{
			titles:Array,
			// 当默认值 数据类型为数组，对象
			default(){
				return []
			}
		},
		data() {
			return {
				currentIndex:0
			}
		},
		methods:{
			ItemClick(index){
				this.currentIndex = index;
				this.$emit('tabClick',index);
			}
		}
	}
</script>

<style scoped>
	.tab-control{
		border-top: 2px solid #eee;
		display: flex;
		text-align: center;
		font-size: 16px;
		height: 42px;
		line-height: 42px;
		background-color: #FFFFFF;
	}
	.tab-control-item{
		flex: 1;
	}
	
	.active {
		color: var(--color-high-text);
	}
	.active span{
		padding: 5px;
		border-bottom: 2px solid var(--color-high-text);
	}
</style>
