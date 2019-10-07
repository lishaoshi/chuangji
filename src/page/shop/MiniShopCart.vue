<template>
    <div>
        <div class="fade"></div>
        <div class="mini-shop-cart">
            <div class="total_price">
                <p><i>￥</i><i id="totalPrice">{{totalPrice}}</i></p>
                <p>已选<i id="totalProductCount">{{count}}</i>件</p>
            </div>
            <div v-if="USER_TYPE === 2" @click="goPay">
                <div class="join_shop" :class="{'toPay':count}">
                    <p>去购买</p>
                </div>
            </div>
            <div @click="authToRouter(url)" v-else>
                <div class="join_shop" :class="{'toPay':count}">
                    <p>去购买</p>
                </div>
            </div>
            <div class="shop_iocn">
                <img src="../../images/coupon/shop_show.png" alt="">
            </div>
            <cart-ball ref="cartBall"/>
        </div>
    </div>
</template>

<script>
    import cartBall from "@/components/common/cartBall"

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
                default: ''
            },
            shopId: {
                type: Number,
                required: true
            },
            USER_TYPE: {
                type: Number,
                required: true,
            }
        },
        created(){
            console.log(this.USER_TYPE)
        },
        computed: {
            url() {
                //if (this.shopId) {
               //     return "/factory/cart/" + this.shopId;
                //} else {
                    return "/factory/cart";
               // }
            }
        },
        methods: {
            drop(target) {
                this.$refs.cartBall.drop(target)
            },
            goPay() {
                this.$router.push({name: 'ShopCart'})
            }
        }
    }
</script>

<style lang="scss" scoped>
    .fade {
        height: 2rem;
    }

    .mini-shop-cart {
        width: 100%;
        height: 1rem;
        background: #fff;
        position: fixed;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 999;
        bottom: 0px;
        border-top: 1px solid #f1f1f1;


        .total_price {
            margin-left: 1.4rem;

            p:nth-child(1) {
                font-size: .36rem;
                color: rgb(51, 51, 51);
            }

            p:nth-child(2) {
                font-size: .22rem;
                color: rgb(102, 102, 102);
            }
        }

        .shop_iocn {
            position: absolute;
            width: 1rem;
            height: 1rem;
            left: .2rem;
            top: -.2rem;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .join_shop {
            width: 2.5rem;
            height: 100%;
            background: #ccc;
            text-align: center;
            font-size: 14px;
            color: #fff;
            line-height: 1rem;
            position: absolute;
            right: 0px;
            margin-top: -.47rem;
        }
        .toPay {
            background: #0090FF;
        }

    }
</style>
