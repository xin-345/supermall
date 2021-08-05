<template>
	<!-- JavaScript里json格式的对象是没有length属性的，如果需要得到一个对象的具体有多少个属性，Object.keys方法就能派上用场了，
	  Object.keys方法返回的是一个数组，所以它有length值 -->
	<div class="params-info" v-if="Object.keys(paramsInfo) != undefined && Object.keys(paramsInfo).length !== 0">
		
		<div class="paparam-size" >
			<div class="param-key">{{paramsInfo.rule.key}}</div>
			<table class="info-size" v-for="table in paramsInfo.rule.tables" >
				<tr v-for="(tr,indey) in table " :key="indey">
					<td v-for="(td,indez) in tr" :key="indez">
						<div class="" v-for="item in td.split(' ')">
							{{item}}
						</div>
					</td>
				</tr>
			</table>
			<div class="disclaimer">{{paramsInfo.rule.disclaimer}}</div>
		</div>
			
		
		
		<div class="param-key">{{paramsInfo.info.key}}</div>
		<table class="info-param">
			<tr v-for="(info,index) in paramsInfo.info.set">
				<td class="info-key">{{info.key}}</td>
				<td class="param-value">{{info.value}}</td>
			</tr>
		</table>
		<div class="info-img" v-if="paramsInfo.info.image != undefined && paramsInfo.info.image.length !==0">
			<img :src="item" v-for="(item,index) in paramsInfo.info.image" :key="index" />
		</div>
	</div>
</template>

<script>
	export default {
		name:"DetailParamsInfo",
		props:{
			paramsInfo:{
				type:Object,
				default(){
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.params-info {
		padding: 0 15px;
		padding-bottom: 20px;
		font-size: 14px;
		border-bottom: 5px solid #F2F5F8;
	}
	
	.params-info table {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 20px;
	}
	.params-info table tr {
		height: 42px;
	}
	.params-info table tr td {
		border-bottom: 1px solid rgba(100,100,100,.1);
	}
	.params-info td {
		min-width: 50px;
	}
	.disclaimer {
		font-size:10px;
		padding-bottom: 8px;
	}
	
	
	.param-key {
		font-size: 16px;
		line-height: 40px;
		text-align: center;
		font-weight: 600;
	}
	
	
	.info-key {
		/* 当value 特别大的时候，会挤到key 所以给一个固定的宽度 */
		width: 95px;
	}
	.info-param {
		border-top: 1px solid rgba(0,0,0,.1);
	}
	.info-param .param-value {
		color: #eb4868;
	}
	.info-img img {
		width: 100%;
	}
</style>
