<template>
	<div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
		<div class="info-desc clear-fix">
			<div class="start">
				
			</div>
			<div class="desc">{{detailInfo.desc}}</div>
			<div class="end"></div>
		</div>
		<div class="info-key">{{detailInfo.detailImage[0].key}}</div>
		<div class="info-list">
			<img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" 
				:src="item"   @load="imageLoad"
			/>
		</div>
	</div>
</template>

<script>
	export default {
		name:"DetailGoodsInfo",
		props:{
			detailInfo:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			imageLoad(){
				this.$emit('detailImageLoad')
			}
		}
	}
</script>

<style scoped>
	.goods-info {
		padding-top: 20px;
	}
	.info-desc, .info-key {
		padding: 0 8px;
	}
	.desc {
		padding: 6px 0;
	}
	.info-desc .start, .end {
		border-top: 1px solid #F2F5F8;
		padding: 4px 0;
	}
	.info-key {
		text-align: center;
		font-size: 16px;
		line-height: 40px;
		font-weight: 600;
	}
	.info-list img {
		width: 100%;
	}
	
</style>
