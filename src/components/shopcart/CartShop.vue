<template>
	<div>
		<div class="shop-group-item" v-if="data.items.length">
			<div class="shop-name" >
				<svg class="check goods-check shopCheck" @click="shopChecked(sid)">
					<use :xlink:href="`#icon-IsCheckedShop-${data.checked ? 'open' : 'close' }`" />
				</svg>
				<div>
                    <router-link :to="`/factory/shop/${data.shopId}`">
                        <img :src="data.logo" width="30" height="30">
                    </router-link>
                    <router-link :to="`/factory/shop/${data.shopId}`" class="company-name">
                        {{data.shopName}}
                    </router-link>
				</div>
			</div>
			<ul>
				<clxsd-carts-entry :minGoods="minGoods" :addGoods="addGoods" :productCheckchange="productCheckchange" :pid="index" :sid="sid" :key="index" v-for="(value,index) in data.items" :data="value"></clxsd-carts-entry>
			</ul>
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
		padding: .2rem;
		border-radius: 7px;
		.check {
			height: .35rem;
			width:.35rem
		}
		.shop-name {
			display: flex;
			font-size: .24rem;
			align-items: center;
			height:.6rem;
			line-height:.6rem;
			div {
				display: flex;
				padding-left: 8px;
                height: .6rem;
				img {
					border: 1px solid #f1f1f1;
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
	}

</style>