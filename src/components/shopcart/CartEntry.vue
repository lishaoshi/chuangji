<template>
	<li>
		<div class="cart-item">
			<svg class="check goods-check shopCheck" @click="productCheckchange(sid,pid)">
					<use :xlink:href="`#icon-IsCheckedShop-${data.checked ? 'open' : 'close' }`" />
				</svg>
			<div class="cart-item-img">
					<img :src="data.cover" />
			</div>
			<div class="cart-info-text">
				<h4>{{ data.good_name}}</h4>
				<div class="shop-price">
					<div class="shop-pices">
						￥<span class="price">{{data.sale_price | display_price}}<i>/{{data.show_unit || '件'}}</i></span>
					</div>
					<div class="shop-arithmetic">
						<a class="minus" @click.prevent.stop="minGoods(sid,pid, data)">-</a>
						<span class="num">{{data.num}}<i>{{data.unit || '件'}}</i></span>
						<a class="plus" @click.prevent.stop="addGoods(sid,pid, data)">+</a>
					</div>
				</div>
			</div>
		</div>
	</li>
</template>

<script>
	export default {
		name: "CartEntry",
		props: [
			"data", "pid", "productCheckchange", "sid", "addGoods", "minGoods"
		],
	}
</script>

<style scoped lang="scss">
	.cart-item {
		display: flex;
		position: relative;
		justify-content: space-between;
		align-items:center;
		height: 1.8rem;
		.check {
			width:.35rem;
			height: .35rem;
		}
		&-img {
            width: 1.3rem;
            height: 1.3rem;
			img {
				width: 1.3rem;
				height: 1.3rem;
                border-radius: 2px;
			}
		}
		.cart-info-text {
			width: 67%;
			h4 {
				font-size: .32rem;
				color: #000;
				line-height: 1.5;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.shop-brief {
				color: #FA5452;
				margin-top: .2rem;
				font-size: .26rem;
			}
		}
	}
	
	.shop-price {
		display: flex;
		.shop-pices {
			color: #FA5452;
			margin-top: .2rem;
			font-size: .26rem;
		}
	}
	
	.shop-arithmetic {
		width: 1.6rem;
		height: .6rem;
		background: rgb(245, 245, 245);
		border-radius: 20px;
		display: flex;
		align-items: center;
		text-align: center;
		position: absolute;
		right: .1rem;
		top: .88rem;
		a {
			color: #26A2FF;
			font-size: 19px;
			flex: 1;
			line-height: 20px;
			font-style: normal;
			font-weight: bold;
			color: rgb(45, 162, 255);
		}
		.num {
			font-style: normal;
			font-size: 14px;
			color: #333;
			i {
				font-size: 10px;
				color: #666;
			}
		}
	}
</style>