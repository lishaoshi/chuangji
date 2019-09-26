<template>
	<div>
		<router-link :to="`/business/cart${shopId ? '/'+shopId:''}`" class="go-shop">
			<img src="../../../images/coupon/shop_show.png">
			<cart-ball ref="cartBall" />
		</router-link>
	</div>
</template>

<script>
	import cartBall from "@/components/common/cartBall2"
	export default {
		name: "MiniCompanyCart",
		components: {
			cartBall
		},
		 props:{
            shopId:{
                type:Number,
                required: true
            }
        },
		methods: {
			drop(target) {
				this.$refs.cartBall.drop(target)
			}
		}
	}
</script>

<style scoped lang="scss"> 
	.go-shop {
		position: fixed;
		right:.2rem;
		bottom: 2rem;
		width: 1.3rem;
		height: auto;
		display: block;
		img {
			width: 100%;
		}
	}
</style>