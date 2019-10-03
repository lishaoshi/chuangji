<template>
	<div>
		<div class="search" :class="{activeTop: isFullScreen}">
			<SearchBar></SearchBar>
			<div class="approve">
				<svg>
					<use xlink:href="#icon-collectionOrder-publish" />
				</svg>
				<p>发布</p>
			</div>
		</div>
		<nav class="nav">
			<div class="menu active">订量生产</div>
			<div class="menu">终端采集</div>
		</nav>
		<mt-swipe :auto="4000" class="swiper">
			<mt-swipe-item><img src="../images/spread/banner@2x.png" width="100%"></mt-swipe-item>
			<mt-swipe-item><img src="../images/spread/banner@2x.png" width="100%"></mt-swipe-item>
			<mt-swipe-item><img src="../images/spread/banner@2x.png" width="100%"></mt-swipe-item>
		</mt-swipe>
		<!--终端采集开始-->
		<div class="company client">
			<div class="frame">
				<div class="drug">
					<div class="drug_img">
						<router-link to="/collect-detail">
							<img src="../images/index/img2.png" alt="">
						</router-link>
					</div>
					<div class="drug_message">
						<p class="drug_name">维生素</p>
						<div class="drug_two">
							<div class="drug_standard">
								<i>规</i>
								<p>100mg*10盒</p>
							</div>
							<div class="drug_standard">
								<i>厂</i>
								<p>华夏药业</p>
							</div>
						</div>
						<div class="drug_sell">
							<p>零售价<i>43</i></p>
							<p>订制价<i>88</i></p>
						</div>
					</div>
					<div class="time">
						<p id="record_time">
							<svg>
								<use xlink:href="#icon-shijian" />
							</svg><span>04天:09时:59分:56秒</span></p>
					</div>
				</div>
				<!--进度条-->
				<div class="order">
					<div class="num">
						100件起订
					</div>
					<div class="process">
						<img src="../images/collect/progress.png" class="pro-img" width="70%">
						<div class="pro-text">
							<span>100件</span>
							<span>200件</span>
							<span>300件</span>
						</div>
						<div class="pro-price">
							<span>2.00</span>
							<span>2.00</span>
							<span>2.00</span>
						</div>
					</div>
					<div class="num">
						已定158件
					</div>
					<div class="go-order">
						<router-link to="">
							定制
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<!--终端采集结束-->
		<!--订量生产开始-->
		<div class="company client">
			<div class="frame">
				<div class="drug">
					<div class="drug_img">
						<img src="../images/index/img2.png" alt="">
					</div>
					<div class="drug_message">
						<p class="drug_name">维生素</p>
						<div class="drug_two">
							<div class="drug_standard">
								<i>规</i>
								<p>100mg*10盒</p>
							</div>
							<div class="drug_standard">
								<i>厂</i>
								<p>华夏药业</p>
							</div>
						</div>
						<div class="drug_sell">
							<p>集采价<i>43</i></p>
							<p>往购价<i>88</i></p>
						</div>
						<div class="yet_collective">
							<div class="count">
								<p>已集采</p>
								<p>2盒</p>
							</div>
							<p class="collective">集采</p>
						</div>
					</div>
					<div class="time">
						<p id="record_time">
							<svg>
								<use xlink:href="#icon-shijian" />
							</svg><span>04天:09时:59分:56秒</span></p>
					</div>
				</div>
			</div>
		</div>
		<!--订量生产结束-->
		<clxsd-foot-guide :user-type="USER_TYPE" />
	</div>

</template>

<script>
	import { mapState } from "vuex";
	import SearchBar from '@/components/common/SearchBar';
	import { countDownFun } from '@/plugins/coutdown.js';
	export default {
		name: "Collect",
		components: {
			SearchBar
		},
		data() {
			return {
				temp: null, //倒计时初始
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
			}
		},
		created() {
			console.log(new Date().getTime() + 10000000)
			this.timer();
		},
		computed: {
			...mapState({
				USER_TYPE: state => state.CURRENTUSER,
			})
		},
		methods: {
			timer() { //页面多个定时器 //主要逻辑都在这页面更新
				let _that = this;
				this.temp = setInterval(() => {
					/*
					_that.orderList.forEach((item, index) => {
						item.dayTime = countDownFun(item.countDown);
						_that.$set(_that.orderList, item.dayTime, countDownFun(item.countDown))
						console.log(this.temp, ‘6’)
					})*/
				}, 1000)
			},
		},
		destroyed() { //切记页面销毁需要销毁
			clearInterval(this.temp);
			console.log(this.temp, "销毁")
		}
	}
</script>

<style lang="scss" scoped>

	.search {
		background: #26A2FF;
		display: flex;
		width: 100%;
		top: 0px;
		padding: 10px 10px 6px;
		z-index: 999;
		justify-content: space-between;
		.retreat {
			width: 30px;
			height: 30px;
		}
		.approve {
			text-align: center;
			margin-left: .1rem;
			width: .7rem;
			svg {
				width: .4rem;
				height: .4rem;
				color: #fff;
			}
			p {
				font-size: .2rem;
				margin-top: -.1rem;
				color: #fff;
				transform: scale(.8);
			}
		}
	}
    .activeTop {
        padding-top: 38px;
    }
	.swiper {
		height: 3.8rem;
		padding: .15rem;
	}
	
	nav {
		position: relative;
		box-sizing: border-box;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-flex-flow: row;
		flex-flow: row;
		width: 100%;
		background-color: #fff;
		.active {
			border-bottom: 2px solid #26A2FF;
			color: #26A2FF;
		}
	}
	
	nav .menu {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		height: 0.8rem;
		font-size: 0.28rem;
		font-weight: bold;
	}
	
	.company .frame {
		width: 100%;
		background: #fff;
	}
	/*终端采集*/
	
	.frame {
		margin-bottom: .15rem;
	}
	
	.company .frame .drug {
		width: 7.02rem;
		margin: auto;
		display: flex;
		align-items: center;
		position: relative;
		margin-bottom: 0.2rem;
		padding: 0.3rem 0;
	}
	
	.company .frame .drug .drug_img {
		width: 2.2rem;
		height: 2.8rem;
		background: rgb(245, 245, 245);
		margin-top: 0.3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		img {
			max-width: 2rem;
			max-height: 2.6rem;
		}
	}
	
	.company .frame .drug .drug_message {
		margin: 0.5rem 0.1rem 0 0.26rem;
		flex: 1;
		.drug_name {
			font-size: 0.3rem;
			font-weight: bold;
		}
		.drug_two {
			margin-top: 0.22rem;
			.drug_standard {
				display: flex;
				align-items: center;
				margin-bottom: 0.1rem;
				i {
					font-size: 0.16rem;
					color: #fff;
					background: rgb(45, 162, 255);
					width: .26rem;
					height: .26rem;
					text-align: center;
					line-height: .26rem;
					margin-right: 0.1rem;
					display: block;
					border-radius: 3px;
				}
				p {
					font-size: 0.24rem;
					font-weight: bold;
				}
			}
		}
	}
	
	.company .frame .drug .drug_sell {
		display: flex;
		align-items: center;
		p {
			font-size: 0.24rem;
			color: rgb(102, 102, 102);
			margin-right: 0.4rem;
			i {
				font-size: 0.28rem;
				color: rgb(51, 51, 51);
				margin-left: 0.08rem;
				font-weight: 600;
				transform: scale(.85);
			}
		}
	}
	
	.company .frame .drug .yet_collective {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.2rem;
	}
	
	.company .frame .drug .yet_collective .count p:nth-child(1) {
		color: #fff;
		font-size: 0.24rem;
		background: linear-gradient(to right, rgb(244, 88, 51), rgb(249, 57, 128));
		width: 1rem;
		height: .32rem;
		line-height: .32rem;
		text-align: center;
		border-radius: 8px;
		margin-right: 0.1rem;
		float: left;
		margin-top: .05rem;
	}
	
	.company .frame .drug .yet_collective .count p:nth-child(2) {
		font-size: 0.32rem;
		color: #000;
		float: right;
	}
	
	.company .frame .drug .yet_collective .collective {
		color: #fff;
		background: rgb(255, 59, 48);
		font-size: 0.24rem;
		padding: 0.1rem 0.2rem;
		border-radius: 8px;
	}
	/*优惠时间*/
	
	.company .frame .drug .time {
		position: absolute;
		top: 0.16rem;
		right: 0;
		display: flex;
		align-items: center;
		svg {
			width: 0.24rem;
			height: 0.24rem;
			margin-right: 0.05rem;
		}
		p {
			font-size: 0.22rem;
			color: rgb(187, 95, 1);
		}
	}
	
	.order {
		height: .5rem;
		display: flex;
		justify-content: space-between;
		padding: 0 .2rem;
		margin-top: .4rem;
		position: relative;
	}
	
	.process {
		width: 43%;
		height: .24rem;
		background: #dda0a0;
		border-radius: .24rem;
		position: relative;
		margin-left: .12rem;
		margin-right: .12rem;
		.pro-img {
			position: absolute;
			z-index: 2;
			height: 100%;
			border-radius: .24rem;
		}
		.pro-text {
			position: absolute;
			display: flex;
			justify-content: flex-start;
			z-index: 4;
			width: 100%;
			span {
				font-size: .24rem;
				line-height: .24rem;
				color: #fff;
				display: inline-block;
				width: 30%;
				border-right: 1px solid #f1f1f1;
				text-align: center;
				transform: scale(.85);
			}
		}
		.pro-price {
			position: absolute;
			width: 100%;
			height: .2rem;
			z-index: 9;
			font-size: .2rem;
			transform: scale(0.85);
			margin-top: -.35rem;
			span {
				background: #F56723;
				color: #fff;
				padding: 0 3px;
				border-radius: 3px;
				position: absolute;
				&:after {
					content: "";
					position: absolute;
					top: .3rem;
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 3px;
					border-color: #F56723 transparent transparent transparent;
					margin-left: -.3rem;
				}
				&:nth-child(1) {
					margin-left: 12%;
				}
				&:nth-child(2) {
					margin-left: 47%;
				}
				&:nth-child(3) {
					margin-left: 82%;
				}
			}
		}
	}
	
	.num {
		font-size: 12px;
		color: #bb5f01;
	}
	
	.go-order {
		margin-left: .5rem;
		margin-top: -.1rem;
		a {
			color: #fff;
			display: block;
			background: #26A2FF;
			font-size: .24rem;
			border-radius: .08rem;
			width: .88rem;
			height: .52rem;
			line-height: .52rem;
			text-align: center;
		}
	}
</style>