<template>
	<div class="services-wrapper">
		<div class="services-inner" ref="close">
			<div class="services-head">
				<div class="head-title">服务说明</div>
				<div class="head-close" @click="closeClick">×</div>
			</div>
			
			<div class="services-content">
				<div class="content-item">
					<span class="item-title">72小时发货</span>
					<span class="item-content"></span>
				</div>
				<div class="content-item">
					<span class="item-title">7天无理由退货</span>
					<span class="item-content">物流签收后7天内买家可无理由退货，需满足退货条件</span>
				</div>
				<div class="content-item">
					<span class="item-title">延误必赔</span>
					<span class="item-content">极速发货、送货保障，若发货时间晚于商家承诺时间或快递派送时间晚于平台标准，可获得延误补贴。</span>
				</div>
				<div class="content-item">
					<span class="item-title">退货补运费</span>
					<span class="item-content">订单退货完成且绑定用于提现的银行卡，根据实际发货与收货地址，预计可获6~18元运费补贴，以实际到账为准。</span>
				</div>
				<div class="content-item">
					<span class="item-title">全国包邮</span>
					<span class="item-content"></span>
				</div>
			</div>
		</div>
		<div class="services-bg" ref="bg"> </div>
	</div>
	
</template>

<script>
	export default {
		name:"DetailServices",
		props:{
			isShow:{
				type:Boolean,
				default(){
					return false
				}
			}
		},
		
		methods:{
			closeClick(){
				var close = this.$refs.close;
				close.style.bottom = '-100%';
				
				var bg = this.$refs.bg;
				bg.style.display = 'none';
				bg.style.backgroundColor = 'transparent';
			},
			open(){
				var close = this.$refs.close;
				close.style.bottom = '0';
				
				var bg = this.$refs.bg;
				bg.style.backgroundColor = 'rgba(51,51,51,.6)';
				bg.style.display = 'block';
			}
		}
	}
</script>

<style scoped>
	
	.services-inner {
		position: fixed;
		bottom: -100%;
		z-index: 999;
		background-color: #FFFFFF;
		transition: bottom .3s ;
	}
	
	.services-head {
		position: relative;
		color: #999;
		
	}
	.head-title {
		line-height: 44px;
		text-align: center;
		font-size: 16px;
	}
	.head-close {
		position: absolute;
		line-height: 44px;
		text-align: center;
		height: 44px;
		width: 44px;
		top: 0;
		right: 0;
	}
	.services-bg {
		height: 100%;
		width: 100%;
		z-index: 9;
		position: fixed;
		top: 0px;
		left: 0px;
		background-color: transparent; 
		transition: background-color .8s;
	}
	
	.services-content {
		padding: 0 15px 32px 15px ;
	}
	
	.content-item {
		padding: 12px 0;
		border-bottom: 1px solid #ededed;
	}
	.content-item span {
		display: block;
	}
	.item-title {
		font-size: 14px;
		color: #333;
	}
	.item-content {
		font-size: 12px;
		color: #999999;
	}
</style>
