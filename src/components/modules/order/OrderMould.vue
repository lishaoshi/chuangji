<template>
	<div>
		<mt-navbar v-model="selected">
			<mt-tab-item id="1">全部</mt-tab-item>
			<mt-tab-item id="2">待付款</mt-tab-item>
			<mt-tab-item id="3">待收货</mt-tab-item>
			<mt-tab-item id="4">已收货</mt-tab-item>
		</mt-navbar>
		
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<div class="order-list">
					<div class="list-top">
						<span class="time">下单时间：2018.03.12</span>
						<span class="state">待付款</span>
					</div>
					<div class="drug_order">
						<div class="drug_img">
							<img src="../../../images/index/img2.png" alt="">
						</div>
						<div class="drug_message">
							<p class="drug_name">板蓝根</p>
							<div class="totle_pay">
								<p>共<i>2</i>件产品</p>
								<p>实付:<i>￥55</i></p>
							</div>
						</div>
					</div>
					<div class="again">
						<div class="much">
							<p>去付款</p>
						</div>
					</div>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				222
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<mt-cell v-for="n in 6" :title="'content ' + n" />
			</mt-tab-container-item>
			<mt-tab-container-item id="4">
				<div class="order-list">
					<div class="list-top">
						<span class="time">下单时间：2018.03.12</span>
						<span class="state">已收货</span>
					</div>
					<div class="list-body">
						<div id="wrapper">
							<div class="iscroll">
								<div class="drug_img">
									<img src="../../../images/index/img2.png" alt="">
								</div>
								<div class="drug_img">
									<img src="../../../images/index/img2.png" alt="">
								</div>
								<div class="drug_img">
									<img src="../../../images/index/img2.png" alt="">
								</div>
							</div>
						</div>
					</div>
					<div class="need_pay">
						<div class="need_fu">
							<p>共<i>6</i>件产品</p>
							<p>需实付:</p>
							<p>￥8888.88</p>
						</div>
					</div>
					<div class="again">
						<div class="much">
							<p style="display: none">确认收货</p>
							<p>再来一单</p>
							<p>删除订单</p>
						</div>
					</div>
				</div>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	 export default {
        name: "clxsd-order-mouble",
        data() {
			return {
				selected: '1'
			}
		}
       }
</script>

<style lang="scss" scoped>
.order-list {
		margin-top: 12px;
		.list-top {
			height: 32px;
			line-height: 32px;
			padding: 0 10px;
			background: #fff;
			.time {
				font-size: .24rem;
				color: #7C7C7C;
				float: left;
			}
			.state {
				font-size: .32rem;
				color: #fa5452;
				float: right;
				font-weight: bold;
			}
		}
		.list-body {
			padding: 10px;
		}
	}
	
	#wrapper {
		width: 100%;
		height: 60px;
		background: rgb(245, 245, 245);
		overflow: hidden;
		position: relative;
		display: flex;
		align-items: center;
	}
	
	.iscroll {
		position: absolute;
		display: flex;
		align-items: center;
	}
	
	.iscroll .drug_img {
		width: 55px;
		height: 55px;
		background: #fff;
		margin-right: 10px;
		text-align: center;
		line-height: 1.2rem;
	}
	
	.iscroll .drug_img img {
		width: 55px;
		height: 55px;
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
		justify-content: flex-end;
		.much {
			display: flex;
			align-items: center;
			p {
				color: #26a2ff;;
				font-size: 12px;
				border: 1px solid #26a2ff;;
				border-radius: 7px;
				padding: 4px 9px;
				margin-right: 12px;
			}
		}
	}
	
	.drug_order {
		width: 100%;
		background: rgb(245, 245, 245);
		display: flex;
		align-items: center;
		.drug_img {
			width: 20%;
			background: #fff;
			margin-left: 2%;
			text-align: center;
			img {
				width: 100%;
				height: 1.4rem;
				display: inline-block;
				vertical-align: middle;
			}
		}
	}
	
	.drug_message {
		width: 75%;
		margin-left: 2%;
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
</style>