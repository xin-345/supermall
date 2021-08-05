<template>
	<div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
		<div class="info-header" >
			<div class="header-title">用户评价</div>
			<div class="header-more">更多<i class="arrow-right"> </i></div>
		</div>
		<div class="info-user">
			<img :src="commentInfo.user.avatar"/>
			<span>{{commentInfo.user.uname}}</span>
		</div>
		<div class="info-detail">
			<p>{{commentInfo.content}}</p>
			<div class="info-other">
				<span class="date">{{commentInfo.created | showDate }}</span>
				<span>{{commentInfo.style}}</span>
			</div>
			<div class="info-imgs">
				<img :src="item" v-for="(item,index) in commentInfo.images"  :key="index"/>
			</div>
		</div>
		
	</div>
</template>

<script>
	import {formatDate} from 'common/utils'
	
	export default {
		name:"DetailCommentInfo",
		props:{
			commentInfo:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		filters:{
			showDate:function(value){
				// 将时间戳转化为Date对象
				let date = new Date(value*1000);
				// 将date格式化
				return formatDate(date,'yyyy-MM-dd')
			}
		}
		
	}
</script>

<style scoped>
	.comment-info {
		padding: 5px 12px;
		color: #333;
		border-bottom:  5px solid #F2F5F8;
	}
	.info-header {
		height: 50px;
		line-height: 50px;
		border-bottom: solid 1px rgba(0,0,0,.1);
	}
	.header-title {
		float: left;
		font-size: 15px;
	}
	.header-more {
		float: right;
		margin-right: 10px;
		font-size: 13px;
	}
	.info-user {
		padding: 10px 0 5px;
	}
	.info-user img {
		width: 42px;
		height: 42px;
		border-radius: 50%;
	}
	.info-user span {
		margin-left: 10px;
		font-size: 15px;
		position: relative;
		top: -15px;
	}
	.info-detail  {
		padding: 0 5px 15px ;
	}
	.info-detail p {
		color: #777;
		font-size: 14px;
		line-height: 1.5;
	}
	.info-other {
		font-size: 12px;
		color: #999999;
		margin-top: 10px;
	}
	.info-other .date {
		margin-top: 8px;
	}
	.info-other span {
		margin-right: 8px;
	}
	.info-imgs {
		margin-top: 10px;
	}
	.info-imgs img {
		width: 70px;
		height: 70px;
		margin-right: 5px;
	}
</style>
