<template>
	<div class="base-info" v-if="Object.keys(goods).length !== 0">
		<div class="info-content">
			<div class="info-title">{{goods.title}}</div>
			<div class="info-price">
				<span class="n-price">{{goods.newPrice}}</span>
				<span class="o-price">{{goods.oldPrice}}</span>
				<span v-if="goods.discount" class="discount" style="background-color:var(--color-high-text)">{{goods.discount}}</span>
			</div>
			<div class="info-other">
				<span >{{goods.columns[0]}}</span>
				<span style="text-align: center;">{{goods.columns[1]}}</span>
				<span >{{goods.services[goods.services.length-1].name}}</span>
			</div>
			<div class="info-services" @click="servicesClick">
				<span class="info-services-item" v-for="index in goods.services.length-1"
					:key="index">
					<img :src="goods.services[index-1].icon" >
					<span>{{goods.services[index-1].name}}</span>
				</span>
			</div>
		</div>
		
		
		
	</div>
</template>

<script>
	
	
	export default {
		name:"DetailBaseInfo",
		props:{
			goods:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		methods:{
			servicesClick(){
				this.$emit('servicesShow')
				// this.servicesIsShow = true
				// setTimeout(()=>{
				// 	this.$refs.detailServices.open()
				// },10)
			}
		}
		
	}
</script>

<style scoped>
	.info-content {
		margin-top: 15px;
		padding: 0 8px;
		color: #999;
		border-bottom: 3px solid #f2f5f8;
	}
	.info-title {
		font-size: 18px;
		color: #333;
		font-weight: bold;
	}
	
	.info-price{
		margin-top: 10px;
	}
	.info-price .n-price {
		font-size: 24px;
		color: var(--color-high-text);
	}
	.info-price .o-price {
		font-size: 13px;
		margin-left:10px;
		text-decoration: line-through;
	}
	.info-price .discount {
		position: relative;
		top:-5px;
		font-size: 14px;
		margin-left: 10px;
		border-radius:10px;
		padding: 2px 8px;
		color: #FFFFFF;
	}
	
	.info-other {
		margin-top:15px;
		display: flex;
		justify-content: space-between;
		padding:5px 0;
		border-bottom: 1px solid #F2F5F8;
	}
	.info-other span {
		font-size: 12px;
	}
	
	.info-services {
		display: flex;
		justify-content: space-between;
	}
	.info-services-item {
		line-height: 60px;
		font-size: 14px;
		color: #333;
	}
	.info-services-item img{
		width: 14px;
		height: 14px;
		margin-right: 4px;
	}
</style>
