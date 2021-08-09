import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutations-type.js'

export default {
	//  mutations 唯一的目的就是修改state中的状态
	// mutations 中的每个方法尽可能完成的事件比较单一一点
	ADD_COUNTER(state,payload){
		payload.count++
	},
	ADD_TO_CART(state,payload){
		state.cartList.push(payload)
	}
}