/**
 * New node file
 */
export function countDownFun(time) {
	time; 
	let nowTime = new Date().getTime(); //现在时间
	if(nowTime <= time) {
		//获取时间差
		let timediff = Math.round((time - nowTime) / 1000);
		//获取还剩多少天
		let day = parseInt(timediff / 3600 / 24);
		//获取还剩多少小时
		let hour = parseInt(timediff / 3600 % 24);
		//获取还剩多少分钟
		let minute = parseInt(timediff / 60 % 60);
		//获取还剩多少秒
		let second = timediff % 60;
		return day + ':' + hour + ':' + minute + ":" + second
	} else {
		return "00天00小时00分00秒";
	}
}