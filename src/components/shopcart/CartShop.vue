<template>
	<div>
		<div class="shop-group-item" v-if="data.items.length">
			<div class="shop-name" >
				<svg class="check goods-check shopCheck" @click="shopChecked(sid)">
					<use :xlink:href="`#icon-IsCheckedShop-${data.checked ? 'open' : 'close' }`" />
				</svg>
				<div @click="handleQueryDetail(data)">
                    <!-- <router-link :to="`/factory/shop/${data.shopId}`"> -->
                        <img :src="data.img_cover" width="30" height="30" style="margin-right: .2rem;">
                    <!-- </router-link> -->
                    <!-- <router-link :to="`/factory/shop/${data.shopId}`" class="company-name"> -->
                        <span>{{data.shopName}}</span> 
                    <!-- </router-link> -->
				</div>
			</div>
			<ul>
				<clxsd-carts-entry :minGoods="minGoods" :addGoods="addGoods" :productCheckchange="productCheckchange" :pid="index" :sid="sid" :key="index" v-for="(value,index) in data.items" :data="value"></clxsd-carts-entry>
			</ul>
			<div class="distributionBox">
				<span>起送价:{{data.suppliersPrices.starting_price}}</span>
				<span>配送费:{{data.suppliersPrices.shipping_fee}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import ClxsdCartsEntry from "./CartEntry"
	export default {
		name: "CartShop",
		props: ["data", "sid", "productCheckchange", "addGoods", "minGoods"],
		components: {
			ClxsdCartsEntry
		},
		methods: {
			shopChecked(i) {
				this.$emit('shopChecked', i)
			},
			handleQueryDetail(data) {
				if(data.type == 1) {
					this.$router.push({path: `/factory/shop/${data.shopId}`})
				} else if(data.type == 2) {
					// debugger
					this.$router.push({path: '/business-shop', query: {id: data.shopId}})
				}
			}
		},
		filters: {
			//进行店铺价钱总计的计算的操作
			__shopCount(data) {
				let shopCount = 0;
				data.items.forEach((product, inp) => {
					if(product.checked) {
						shopCount += product.sale_price * product.qua;
					}
				})
				return shopCount;
			}
		}
	}
</script>

<style scoped lang="scss">
.fade {
	height: 1.5rem;
}
	.shop-group-item {
		margin: .2rem;
		margin-top: .2rem;
		background: #fff;
		// padding: .2rem;
		padding-bottom: .1rem;
		border-radius: 7px;
		.check {
			height: .35rem;
			width:.35rem
		}
		.shop-name {
			display: flex;
			font-size: .24rem;
			align-items: center;
			// height:.6rem;
			line-height:.6rem;
			padding: .2rem;
			padding-bottom: 0;
			// display: flex;
			div {
				display: flex;
				padding-left: 8px;
				align-items: center;
                height: .6rem;
				img {
                    width: .52rem;
                    height: .52rem;
				}
				.company-name {
					color: #333;
					background: url(../../images/my/right_cowry.png) no-repeat right;
					padding-left: .1rem;
					background-size: 6px 9px;
					padding-right: .2rem;
				}
			}
		}
		ul {
			padding: 0 .2rem;
		}
		.distributionBox {
			height: .72rem;
			background: #ECF5FF;
			font-size: .24rem;
			text-align: right;
			line-height: .72rem;
			margin: 0 .1rem;
			padding: 0 .2rem;
			border-radius:0px 0px .18rem .18rem;
			span:first-child {
				margin-right: .34rem;
			}
		}
	}

</style>