<template>
	<div>
		<clxsd-head-top :title='`新品特价`'></clxsd-head-top>
		<img src="../../../images/company/1.png" width="100%">
		<div class="title">
			<p>新品特价</p>
			<div class="des">
				<p class="time">04.12 12:00~.4.13 12:00</p>
				<p class="state ing"><b>· </b>正在进行</p>
			</div>
		</div>
		<div class="content">
			<p class="p1">活动介绍</p>
			<div>这里填写介绍</div>
		</div>
		<!--列表开始-->
		<list></list>
		<!--列表结束-->
		<div class="foot-fade"></div>
		<div class="bottom">
			<div class="total_price">
				<p><i>￥</i><i id="totalPrice">0.00</i></p>
				<p>已选<i id="totalProductCount">0</i>件</p>
			</div>
			<div class="join_shop">
				<p>去结算</p>
			</div>
			<div class="shop_iocn" @click="showShop">
				<img src="../../../images/coupon/shop_show.png" alt="">
			</div>
		</div>
		<mt-popup v-model="regionVisible" position="bottom" class="bottom-region" style="width:100%;padding-bottom: 50px;">
			<div class="shop_title">
				<p>已选商品</p>
				<p>清空</p>
			</div>
			<div class="shop-list">
				<div class="title">
					维生素片维生素片维生素片维生素片维生素片维生素片维生素片
				</div>
				<div class="price">
					2000
				</div>
				<div class="gw_num">
					<em class="lose">-</em>
					<div class="num">
						<span class="amount">0</span>
						<p>件</p>
					</div>
					<em class="add">+</em>
				</div>
			</div>
			<div class="shop-list">
				<div class="title">
					维生素片维生素片维生素片维生素片维生素片维生素片维生素片
				</div>
				<div class="price">
					2000
				</div>
				<div class="gw_num">
					<em class="lose">-</em>
					<div class="num">
						<span class="amount">0</span>
						<p>件</p>
					</div>
					<em class="add">+</em>
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import list from "@/page/company/companyShop/CompanyShopListMould.vue";
	export default {
		name: "CompanyList",
		components: {
			list
		},
		data() {
			return {
				regionVisible: false
			}
		},
		methods: {
			showShop() {
				console.log("aa");
				this.regionVisible = true;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.foot-fade {
		height: 60px;
		width: 100%;
	}
	.title {
		background: #fff;
		padding: .2rem;
		font-size: .3rem;
		.des {
			display: flex;
			display:-webkit-flex;
			justify-content: space-between;
			height: .5rem;
			line-height: .5rem;
			font-size: .22rem;
			.time {
			font-size: .22rem;
			color: #7C7C7C;
		}
		.state {
		}
		.over {
			color: #666666;
		}
		.ing {
			color: #F30000;
		}
		}
	}
	.content {
		border-top: 1px solid #f1f1f1;
		background: #fff;
		padding: .1rem .3rem;
		.p1 {
			font-size: .3rem;
			color: #666666;
			line-height: 190%;
		}
		>div {
			font-size: .24rem;
			color: #7A7979;
			letter-spacing: 1px;
			line-height: 140%;
			
		}
	}
	/*底部*/
	
	.bottom {
		width: 100%;
		height: 50px;
		background: #fff;
		position: fixed;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 2010;
		bottom: 0px;
		border-top: 2010;
		border-top: 1px solid #f1f1f1;
	}
	
	.bottom .total_price {
		margin-left: 60px
	}
	
	.bottom .total_price p:nth-child(1) {
		font-size: 16px;
		color: rgb(51, 51, 51);
	}
	
	.bottom .total_price p:nth-child(2) {
		font-size: 12px;
		color: rgb(102, 102, 102);
		-webkit-transform: scale(0.8);
	}
	
	.bottom .join_shop {
		width: 80px;
		height: 100%;
		background: rgb(45, 162, 255);
		text-align: center;
		font-size: 14px;
		color: #fff;
		line-height: 50px;
	}
	
	.bottom .shop_iocn {
		position: absolute;
		width: 50px;
		height: 50px;
		left: 10px;
		top: -10px;
	}
	
	.bottom .shop_iocn img {
		width: 50px;
		height: 50px;
	}
	
	.shop_title {
		width: 100%;
		height: 0.88rem;
		background: rgb(245, 245, 245);
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 16;
		padding: 0 10px;
		background: #f1f1f1;
		p {
			&:nth-child(1) {
				font-size: 16px;
				font-weight: bold;
			}
			&:nth-child(2) {
				font-size: 14px;
				color: #26A2FF;
			}
		}
	}
	.shop-list {
		display: flex;
		height: 40px;
		padding: 0 10px;
		font-size: 14px;
		border-bottom: 1px solid #f1f1f1;
		justify-content: space-between;
		line-height: 40px;
		.title {
			width: 60%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			height: 40px;
		}
		.price {
			color: #F30000;
			width: 20%;
			text-align: center;
		}
		.gw_num {
			margin-top: 10px;
		}
	}
	/*加减*/
	.gw_num {
		width: 60px;
		height: 20px;
		background: rgb(245, 245, 245);
		border-radius: 10px;
		display: flex;
		align-items: center;
		text-align: center;
	}
	
	.gw_num em {
		color: #7A7979;
		cursor: pointer;
		font-size: 17px;
		flex: 1;
		line-height: 20px;
	}
	
	.shop_num em {
		color: rgb(45, 162, 255);
	}
	
	.gw_num .num {
		font-style: normal;
		font-size: 14px;
		flex: 1;
		display: flex;
		color: #333;
	}
	
	.gw_num .num p {
		font-size: 12px;
		color: rgb(153, 153, 153);
		-webkit-transform: scale(0.7);
	}
	
	.gw_num .num input {
		width: 50%;
		text-align: center;
	}
	
	.clearfloat {
		clear: both;
	}
</style>