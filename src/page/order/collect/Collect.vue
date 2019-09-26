<template>
	<div id="Collect">
		<mt-header title="">
			<router-link to="/my" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="nav-bar">
			<a href="" class="active">定量生产</a>
			<a href="">终端采集</a>
			<a href="">我的发布</a>
		</div>
		<mt-navbar v-model="selected">
			<mt-tab-item id="1">全部</mt-tab-item>
			<mt-tab-item id="2">待付款</mt-tab-item>
			<mt-tab-item id="3">待接单</mt-tab-item>
			<mt-tab-item id="4">待收货</mt-tab-item>
			<mt-tab-item id="5">已收货</mt-tab-item>
			<mt-tab-item id="6">已完成</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<div class="order-list">
					<div class="list-top">
						<span class="time">下单时间：2018.03.12</span>
						<span class="state">待付款</span>
					</div>
					<div class="drug_order">
						<div class="time">12天12时24分48秒</div>
						<div class="drug_img">
							<img src="../../../images/index/img.png" alt="">
						</div>
						<div class="drug_message">
							<p class="drug_name">板蓝根</p>
							<div class="totle_pay">
								<p>共<i>2</i>件产品</p>
								<p>实付:<i>￥55</i></p>
							</div>
						</div>
					</div>
					<!--进度条-->
					<div class="order">
						<div class="process">
							<img src="../../../images/collect/progress.png" class="pro-img" width="70%">
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
					</div>
					<div class="again">
						<div class="go-share">转发</div>
						<div class="much">
							<span class="go-pay">去付款</span>
						</div>
					</div>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				222
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				333
			</mt-tab-container-item>
			<mt-tab-container-item id="4">
				4
			</mt-tab-container-item>
			<mt-tab-container-item id="5">
				55
			</mt-tab-container-item>
			<mt-tab-container-item id="6">
				6
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		name: 'Collect',
		data() {
			return {
				selected: '1'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar {
		width: 80%;
		height: 40px;
		line-height: 40px;
		font-size: 12px;
		color: #fff;
		position: absolute;
		top: 0px;
		text-align: center;
		left: 10%;
		.active {
			font-size: 16px;
			opacity: 1;
		}
		a {
			display: inline-block;
			width: 30%;
			color: #fff;
			opacity: .8;
		}
	}
	
	.order-list {
		margin-top: 12px;
		.list-top {
			height: 32px;
			line-height: 32px;
			padding: 0 10px;
			background: #fff;
			.time {
				font-size: 12px;
				color: #666;
				float: left;
			}
			.state {
				font-size: 16px;
				color: #f30000;
				float: right;
			}
		}
		.list-body {
			padding: 10px;
		}
	}
	
	.need_pay {
		width: 100%;
		height: 38px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		border-bottom: 1px solid rgb(230, 230, 230);
		box-sizing: border-box;
		background: #fff;
	}
	
	.need_pay .need_fu {
		display: flex;
		align-items: center;
		font-size: 0.26rem;
		margin-right: 0.22rem;
	}
	
	.need_pay .need_fu p:nth-child(2) {
		font-weight: bold;
		margin-left: 0.1rem;
		margin-right: 0.1rem;
	}
	
	.need_pay .need_fu p:nth-child(3) {
		font-weight: bold;
		font-size: 0.34rem;
	}
	
	.again {
		width: 100%;
		height: 45px;
		display: flex;
		background: #fff;
		align-items: center;
		justify-content: space-between;
		.much {
			display: flex;
			align-items: center;
			.go-pay {
				color: #26a2ff;
				;
				font-size: 12px;
				border: 1px solid #26a2ff;
				;
				border-radius: 14px;
				padding: 4px 9px;
				margin-right: 12px;
				display: inline-block;
			}
		}
		.go-share {
			font-size: .5vh;
			display: inline-block;
			margin-left: 3%;
			background: url(../../../images/collect/transmit.png) no-repeat top;
			background-size: 15px 15px;
			padding-top: 15px;
		}
	}
	
	.drug_order {
		width: 100%;
		height: 2rem;
		background: rgb(245, 245, 245);
		display: flex;
		align-items: center;
		.time {
			position: absolute;
			margin-top: -25px;
			right: 2%;
			background: url(../../../images/collect/clock.png) no-repeat left;
			background-size: 13px 13px;
			padding-left: 15px;
			font-size: 1vh;
			color: rgb(187, 95, 1);
		}
		.drug_img {
			width: 20%;
			height: 1.5rem;
			background: #fff;
			margin-left: 3%;
			text-align: center;
			img {
				max-width: 100%;
				max-height: 1.5rem;
				display: inline-block;
				vertical-align: middle;
			}
		}
	}
	
	.drug_message {
		width: 72%;
		margin-left: 3%;
		position: relative;
	}
	
	.drug_message .drug_name {
		font-size: 14px;
	}
	
	.drug_message .totle_pay {
		margin-top: 0.35rem;
		font-size: 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.drug_message .totle_pay p:nth-child(1) i {
		margin: 0 5px;
	}
	
	.drug_message .totle_pay p:nth-child(2) {
		font-weight: bold;
		font-size: 15px;
	}
	
	.drug_message .totle_pay p:nth-child(2) i {
		padding: 0 0.22rem 0 0.12rem;
		font-size: 16px;
	}
	.order {
		height: 30px;
		display: flex;
		justify-content: center;
		margin-top: 15px;
	}
	.process {
		width: 60%;
		height: 2.5vh;
		background: #dda0a0;
		border-radius: 2vh;
		position: relative;
		.pro-img {
			position: absolute;
			z-index: 2;
			height: 100%;
			border-radius: 2.5vh;
		}
		.pro-text {
			position: absolute;
			display: flex;
			justify-content: flex-start;
			z-index: 4;
			width: 100%;
			span {
				font-size: .3vh;
				line-height: 2.5vh;
				color: #fff;
				display: inline-block;
				width: 30%;
				border-right: 1px solid #f1f1f1;
				text-align: center;
			}
		}
		.pro-price {
			position: absolute;
			top: -3vh;
			width: 100%;
			height: 2vh;
			z-index: 9;
			font-size: .6vh;
			span {
				background: #F56723;
				color: #fff;
				padding: 0 3px;
				border-radius: 3px;
				position:absolute;
				&:after {
					content: "";
					width: 0;
					height: 0;
					border-style: solid;
					border-width: 3px;
					border-color: #F56723 transparent transparent transparent;
					position: fixed;
					margin-top: 2vh;
					margin-left: -2.3vh;
				}
				&:nth-child(1) {
					margin-left: 23%;
				}
				&:nth-child(2) {
					margin-left: 53%;
				}
				&:nth-child(3) {
					margin-left: 83%;
				}
			}
		}
	}
	.num {
		font-size: .6vh;
		color: #bb5f01;
		padding-left: .3vh;
	}
</style>