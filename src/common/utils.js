// 防抖函数
export function	debounce(func,delay){
	let timer = null
		
		return function (){
			if (timer) clearTimeout(timer)
			
			timer = setTimeout(()=>{
				func.apply(this)
			},delay)
		}
}

export function formatDate(date,fmt){
	// 正则表达式 字符串匹配  利器
	
	// +  表示一个或多个   *  表示 0个或多个   ？表示 0个或一个
	// 获取年份
	if(/(y+)/.test(fmt)){
		fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	
	// 获取
	//  M+ -> 正则表达式中的一个规则
	let o = {
		'M+':date.getMonth() + 1,
		'd+':date.getDate(),
		'h+':date.getHours(),
		'm+':date.getMinutes(),
		's+':date.getSeconds()
	};
	for (let k in o) {
		if(new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

function padLeftZero (str) {
	return ('00' + str).substr(str.length);
}