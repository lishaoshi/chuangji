<template>
    <div class="shopping-cart">
    <clxsd-carts-shop
        :key="index"
        :data="value"
        :sid="index"
        :addGoods="addGoods"
        :minGoods="minGoods"
        @shopChecked="shopCheck"
        :productCheckchange="productCheckchange"
        :is_delete="is_delete"
        v-for="(value,index) in data.shops" >

    </clxsd-carts-shop>
    

    </div>
</template>

<script>
    import ClxsdCartsShop from './CartShop'

    export default {
        name: "CartsShoplist",

        components:{
            ClxsdCartsShop,
        },
        props:["data","productCheckchange","addGoods","minGoods","is_delete"],
        methods:{
            shopCheck(i){
                this.$emit("shopChecked",i)
            }
        },

    }
</script>

<style scoped>
	.shopping-cart {
		padding-bottom: 1.3rem;
	}
</style>