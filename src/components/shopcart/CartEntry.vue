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
				<h4>{{ data.generic_name}}</h4>
				<div class="shop-price">
					<div class="shop-pices">
						￥<span class="price">{{data.sale_price | display_price}}<i>/{{data.show_unit || '件'}}</i></span>
					</div>
					<div class="shop-arithmetic" :class="{bgColor : data.isSelfChoose}">
						<div class="minus" @click.prevent.stop="minGoods(sid,pid, data)">
							<img src="../../images/del_shopping.png" alt="">
						</div>
						<span @click="chooseSelf" v-if="!data.isSelfChoose" class="num">{{data.num}}<i>{{data.unit || '件'}}</i></span>
						<template v-else>
							<form action="">
								<input v-focus type="number" @blur="handleBlur($event, data)" ref="cart" :value="data.num">
							</form>
						</template>
						<div class="plus" @click.prevent.stop="addGoods(sid,pid, data)">
							<img src="@/images/add_shopping.png" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
	</li>
</template>

<script>
import bus from '@/bus'
	export default {
		name: "CartEntry",
		props: [
			"data", "pid", "productCheckchange", "sid", "addGoods", "minGoods"
		],
		methods: {
			// 点击选择输入
			chooseSelf() {
				bus.$emit('chooseSelf', {pid:this.pid, sid: this.sid})
			},

			// input失去焦点出发
			handleBlur(event, item) {
				let num = event.target.value
				let data = {pid:this.pid, sid: this.sid, num, item}
				bus.$emit('handleBlur', data)
			},

		}
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
		margin-top: .2rem;
		justify-content: space-between;
		.shop-pices {
			color: #FA5452;
			
			font-size: .26rem;
		}
	}
	
	.shop-arithmetic {
		&.bgColor {
			background: #f5f5f5;
		}
		.minus, .plus {
			display: flex;
			align-items: center;
			justify-content: center;
			img {
				width: .2rem;
				height: .2rem;
			}
		}
		height: .4rem;
		border-radius: 20px;
		display: inline-flex;
		align-items: center;
		text-align: center;
		justify-content: center;
		div {
			color: #26A2FF;
			font-size: .38rem;
			// flex: 1;
			// line-height: 20px;
			height: 100%;
			border-radius: 50%;
			width: .4rem;
			font-style: normal;
			font-weight: bold;
			color: rgb(45, 162, 255);
			background: rgb(245, 245, 245);
		}
		.num {
			font-style: normal;
			font-size: 14px;
			color: #333;
			padding: 0 .1rem;
			i {
				font-size: 10px;
				color: #666;
			}
		}
		input {
			width: .6rem;
			text-align: center;
			background: #f5f5f5;
		}
	}
</style>