<template>
	<div>
		<!-- <div class="fade"></div> -->
		<div class="mini-shop-cart">
			<div class="total_price">
				<p><i>￥</i><i id="totalPrice">{{totalPrice}}</i><i class="textContent" v-if="isHasDistribution&&totalPrice>=0">(含配送费:{{shipping_fee}})</i><i class="textContent" v-else-if="!isHasDistribution&&totalPrice>=0">(免配送费)</i></p>
				<p>已选<i id="totalProductCount">{{count}}</i>个产品</p>
			</div>

			<!-- 修改当前组件去购买时， 跳转到总购物车页面 -->
			<!-- <router-link :to="`/business/cart${shopId ? '/'+shopId:''}`">
				<div class="join_shop">
					<p>去结算</p>
				</div>
			</router-link> -->
			<router-link :to="`/factory/cart`">
				<div class="join_shop">
					<p>去结算</p>
				</div>
			</router-link>

			<!-- <div class="join_shop">
				<p>去购买</p>
			</div> -->
			<div class="shop_iocn">
				<img src="../../../images/coupon/shop_show.png" alt="">
			</div>

			<cart-ball ref="cartBall" />
		</div>
	</div>
</template>

<script>
	import cartBall from "@/components/common/cartBall3"
	export default {
		name: "MiniShopCart",
		components: {
			cartBall
		},
		props: {
			count: {
				type: Number,
				default: 0
			},
			totalPrice: {
				type: String,
				default: '0.00'
			},
			isHasDistribution: {
				type: Boolean,
				default: false
			},
			shipping_fee: {
				type:String,
				default: '0.00'
			}
		},
		methods: {
			drop(target) {
				this.$refs.cartBall.drop(target)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fade {
		height: 2rem;
	}
	.textContent {
		font-size: .24rem;
	}
	
	.mini-shop-cart {
		width: 100%;
		height: 1rem;
		background: #fff;
		position: absolute;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 2010;
		bottom: 0;
		border-top: 2010;
		border-top: 1px solid #f1f1f1;
		.total_price {
			margin-left: 1.4rem;
			p:nth-child(1) {
				font-size: .3rem;
				color: rgb(51, 51, 51);
			}
			p:nth-child(2) {
				font-size: 12px;
				color: rgb(102, 102, 102);
				-webkit-transform: scale(0.8);
			}
		}
		.shop_iocn {
			position: absolute;
			width: 1rem;
			height: 1rem;
			left: .2rem;
			top: -.2rem;
			img {
				width: 1rem;
				height: 1rem;
			}
		}
		.join_shop {
			width: 2rem;
			height: 100%;
			background: rgb(45, 162, 255);
			text-align: center;
			font-size: 14px;
			color: #fff;
			line-height: 1rem;
			position: absolute;
			right: 0px;
			margin-top: -.47rem;
		}
	}
</style>