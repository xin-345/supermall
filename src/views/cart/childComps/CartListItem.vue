<template>
	<div id="shop-item">
		<div class="item-selector">
			<check-button  :isChecked="product.checked" @click.native="checkClick" ></check-button>
		</div>
		<div class="item-img">
			<img :src="product.image" alt="商品图片">
		</div>
		
		<div class="item-info">
			<div class="item-title">{{product.title}}</div>
			<div class="item-desc">{{product.desc}}</div>
			<div class="info-bottom">
				<div class="item-price left">￥{{product.price}}</div>
				
				<div class="item-count right" @click="countClick">
					<div v-if="!countShow" class="showCount">
						×{{product.count}}
					</div>
					
					<div class="item-count2" v-if="countShow">
						<div class="button" @click='subClick(product)' ref="sub">-</div>
						<div class="count">{{product.count}}</div>
						<div class="button" @click='addClick(product)'>+</div>
					</div>
				</div>
				
			</div>
		</div>
		
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton.vue'
	
	export default {
		name:"CartListItem",
		components:{
			CheckButton
		},
		props:{
			product:{
				type:Object,
				default(){
					return {}
				}
			},
			countShow:{
				type:Boolean,
				default(){
					return false
				}
			}
		},  
		created() {
		},
		methods:{
			checkClick(){
				this.product.checked = !this.product.checked
			},
			addClick(product) {
			    product.count += 1; 
				this.$refs.sub.classList.remove('nosub');
			},
			subClick(product) {
			    if(product.count > 1) {
			        product.count -= 1;
			    } else {
			        this.$toast.show('商品数量不能再减少啦',1500)
					this.$refs.sub.className += " nosub"
				}
			},
			countClick(product){
				this.$emit('countToClick')
				// console.log(this.product.iid)
			}
		}
	}
</script>

<style scoped>
	#shop-item {
		width: 100%;
		display: flex;
		font-size: 10;
		padding: 5px;
		border-bottom: 1px solid #ccc;
	}
	.item-selector {
		padding: 0 5px;
		width:60px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.item-img {
		padding: 5px;
	}
	.item-img img{
		width: 88px;
		height: 88px;
		display: block;
		border-radius: 5px;
		object-fit:cover; /*对图片进行剪切，保留原始比例*/
		object-position: top;/* 可能有时候图片不是从头部开始截图的 所以需要定位一下 */
	}
	
	.item-info {
		padding: 5px 10px;
		font-size: 17px;
		color: #333333;
		position: relative;
		overflow: hidden;
	}
	.item-title, .item-desc {
		overflow: hidden;
		/* white-space: nowrap; */
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /* 限制在一个块元素显示的文本的行数 */
		-webkit-box-orient: vertical; /* 垂直排列 */
		word-break: break-all;  /* 内容自动换行 */
	}
	.item-info .item-desc {
		font-size: 14px;
		color: #666;
		margin-top: 10px;
	}
	
	.info-bottom {
		margin-top: 10px;
		line-height: 20px;
		color: var(--color-high-text);
		font-size:20px;
	}
	.info-bottom .item-count {
		font-size: 12px;
		color: #333;
	}
	.showCount {
		width: 22px;
		height: 22px;
		border: 1px solid rgba(0,0,0,.2);
		border-radius: 4px;
		text-align: center;
	}
	.item-count2 {
		font-size: 12px;
		color: #333;
		display: flex;
		border: 1px solid rgba(0,0,0,.2);
		border-radius: 4px;
	}
	.item-count2 div {
		flex: 1;
		text-align: center;
	}
	.item-count2 .button {
		/* background-color: var(--color-high-text); */
		width:24px;
	}
	.item-count2 .nosub {
		background-color: rgba(0,0,0,.05);
	}
	.item-count2 .count {
		display: inline-block;
		border: 1px solid rgba(0,0,0,.2);
		border-top: none;
		border-bottom: none;
		padding: 0 8px;
	}
</style>
