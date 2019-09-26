<template>
	<div id="RationManager">
		<clxsd-head-top :title='`定量管理`'></clxsd-head-top>
		<mt-navbar v-model="selected">
			<mt-tab-item id="1">全部</mt-tab-item>
			<mt-tab-item id="2">审核</mt-tab-item>
			<mt-tab-item id="3">定制</mt-tab-item>
			<mt-tab-item id="4">未完成</mt-tab-item>
		</mt-navbar>
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<div class="item">
					<div>
						<router-link to="/product-detail">
							<img src="../../images/index/img.png" class="item-img">
						</router-link>
					</div>
					<div class="item-box">
						<router-link to="/product-detail">
							<p class="title">维生素片</p>
							<p class="info">华南药业</p>
							<p class="info">100mg*100片*1盒&nbsp;&nbsp; 100片/盒</p>
							<p class="price"><span>活动时长：2天</span></p>
						</router-link>
					</div>
					<p class="state">审核中</p>
				</div>
				<div class="item">
					<div>
						<router-link to="">
							<img src="../../images/index/img2.png" class="item-img">
						</router-link>
					</div>
					<div class="item-box">
						<p class="title">维生素片</p>
						<p class="info">华南药业</p>
						<p class="info">100mg*100片*1盒&nbsp;&nbsp; 100片/盒</p>
						<p class="price"><span>活动时长：2天</span></p>
					</div>
					<p class="state">未通过</p>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				222
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<div class="company client">
					<div class="frame">
						<div class="drug">
							<div class="drug_img">
								<img src="../../images/index/img2.png" alt="">
							</div>
							<div class="drug_message">
								<p class="drug_name">维生素</p>
								<p class="drug_factory">哈尔滨药业</p>
								<p class="drug_num"><span>已定</span><b>22件</b></p>
								<!--进度条-->
								<div class="order">
									<div class="process">
										<img src="../../images/collect/progress.png" class="pro-img" width="70%">
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

									<div class="go-order">
										<a href="javascript:void(0)">
											完成
										</a>
									</div>
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
			</mt-tab-container-item>
			<mt-tab-container-item id="4">
				<div class="item">
					<div>
						<router-link to="">
							<img src="../../images/index/img2.png" class="item-img">
						</router-link>
					</div>
					<div class="item-box">
						<p class="title">维生素片</p>
						<p class="info">华南药业</p>
						<p class="info">100mg*100片*1盒&nbsp;&nbsp; 100片/盒</p>
						<p class="price"><span>活动时长：2天</span></p>
					</div>
					<p class="state">未完成</p>
				</div>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	export default {
		name: "RationManager",
		data() {
			return {
				selected: '1'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mint-navbar .mint-tab-item {
		color: #999;
	}
	
	.mint-navbar .mint-tab-item.is-selected {
		color: #26a2ff;
		border-bottom: 3px solid #26A2FF;
	}
	
	.item {
		display: flex;
		background: #fff;
		margin: .2rem 0 0;
		position: relative;
		padding: 0 .2rem;
		height: 2rem;
		overflow: hidden;
		.item-img {
			width: 2rem;
			height: 2rem;
		}
		.item-box {
			width: 70%;
			padding-left: 3%;
			p {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.title {
				color: #333;
				font-size: .32rem;
				line-height: 200%;
				padding-top: .1rem;
			}
			.info,
			.price {
				color: #666;
				font-size: .24rem;
				line-height: 120%;
			}
			.price {
				margin-top: .2rem;
				span {
					display: inline-block;
					width: 50%;
					smap {
						color: #F2385A;
					}
				}
			}
		}
	}
	
	.state {
		position: absolute;
		top: .2rem;
		right: .2rem;
		color: #F2385A;
		font-size: .32rem;
		width: 1.3rem;
		height: .6rem;
		line-height: .6rem;
		text-align: right;
	}
	
	.lower {
		background: #26A2FF;
		color: #fff;
		border-radius: .5rem;
		text-align: center;
	}
	
	.frame {
		margin-top: .15rem;
		background: #fff;
		.drug {
			width: 7.02rem;
			margin: auto;
			display: flex;
			align-items: center;
			position: relative;
			margin-bottom: 0.2rem;
			padding: 0.3rem 0;
			.drug_img {
				width: 2.2rem;
				height: 2.4rem;
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
			.drug_message {
				margin: 0.5rem 0.1rem 0 0.26rem;
				flex: 1;
				.drug_name {
					font-size: 0.34rem;
					line-height: 1.5;
					font-weight: bold;
				}
				.drug_factory {
					font-size: .24rem;
					line-height: 150%;
				}
				.drug_num {
					font-size: .24rem;
					margin-top: .15rem;
					margin-bottom: .3rem;
					span{
						transform: rotate(.85);
						font-size: 12px;
						background: #F2385A;
						color: #fff;
						padding: .02rem .1rem;
						border-radius: .05rem;
					}
					b{
						font-size: .3rem;
						padding-left: .1rem;
					}
				}
			}
		}
	}
	
	/*优惠时间*/
	
	.company .frame .drug .time {
		position: absolute;
		top: 0.16rem;
		right: 0;
		display: flex;
		align-items: center;
	}
	
	.company .frame .drug .time svg {
		width: 0.24rem;
		height: 0.24rem;
		margin-right: 0.03rem
	}
	
	.company .frame .drug .time p {
		font-size: 0.22rem;
		color: rgb(187, 95, 1);
	}
	
	.order {
		height: .5rem;
		display: flex;
		justify-content: space-between;
		padding: 0 .15rem;
		margin-top: .5rem;
		position: relative;
	}
	
	.process {
		width: 75%;
		height: .3rem;
		background: #dda0a0;
		border-radius: 2vh;
		position: relative;
		margin-left: .05rem;
		margin-right: .05rem;
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
				font-size: 10px;
				line-height: .3rem;
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
	
	.go-order {
		a {
			color: #fff;
			display: block;
			background: #26A2FF;
			font-size: .24rem;
			border-radius: .1rem;
			padding: .05rem .2rem;
		}
	}
</style>