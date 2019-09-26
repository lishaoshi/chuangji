<template>
    <div id="OrderSuccess">
        <img src="../../images/shopping/order_success.png" class="img">
        <p class="success-info">购买成功</p>
        <p class="order-num">订单编号：<span>f-20190726153718364995</span></p>
        <p class="gray-info">下单成功，我们将及时配送</p>
        <div>
            <router-link to="/home" class="go-shopping">再去逛逛</router-link>
            <router-link to="/factory-order" class="looking-order" v-if="orderType == 'factory'">查看订单</router-link>
            <router-link to="/business-order" class="looking-order" v-if="orderType == 'business'">查看订单</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderSuccess",
        props:["orderType"]
    }
</script>

<style scoped lang="scss">
#OrderSuccess {
    min-height: 100%;
    background: #fff;
    padding-top: 2rem;
    text-align: center;
    .img {
        width: 2.4rem;
        height: auto;
    }
    .success-info {
        font-size: .32rem;
        font-weight: bold;
        color: rgb(252,137,22);
        margin-top: .4rem;
        margin-bottom: .15rem;
    }
    .order-num {
        font-size: .3rem;
        line-height: 2;
    }
    .gray-info {
        color: #666;
        font-size: .24rem;
        margin-bottom: .6rem;
    }
    >div {
        .go-shopping,.looking-order {
            display: inline-block;
            width: 2rem;
            height: .68rem;
            line-height: .68rem;
            font-size: .24rem;
            border-radius: .2rem;
        }
        .go-shopping {
            background: rgb(45,162,255);
            color: #fff;
            margin-right: .4rem;
        }
        .looking-order {
            background: #fff;
            color: rgb(45,162,255);
            border:1px solid rgb(42,162,255);
        }
    }


}
</style>