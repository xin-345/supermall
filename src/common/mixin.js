import {debouce} from "./utils.js"

import BackTop from 'components/content/backTop/BackTop.vue'

export const itemListenterMixin = {
	data(){
		return {
			
		}
	},
	mounted(){
		
	}
}

export const backTopMixin = {
	components:{
		BackTop,
	},
	data(){
		return {
			isShowBackTop:false,
		}
	},
	methods: {
		backClick(){
			this.$refs.scroll.scrollTo(0,0)
		},
	}
}