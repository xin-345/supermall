import {request} from './request.js'

export function getDetail(iid){
	return request({
		url:'/detail',
		params:{
			iid
		}
	})
}

export class Goods {
	// 构造函数
	constructor(itemInfo,columns,services){
		this.title = itemInfo.title
		this.desc = itemInfo.desc
		this.newPrice = itemInfo.price
		this.oldPrice = itemInfo.oldPrice
		this.discount = itemInfo.discountDesc
		this.columns = columns
		this.services = services
		this.realPrice = itemInfo.lowNowPrice
		this.discountBgColor = itemInfo.discountBgColor
	}
}

export class Shop {
	constructor(shopInfo){
		this.logo = shopInfo.shopLogo;
		this.name = shopInfo.name;
		this.fans = shopInfo.cFans;
		this.sells = shopInfo.score;
		this.goodsCount = shopInfo.cGoods;
	}
}