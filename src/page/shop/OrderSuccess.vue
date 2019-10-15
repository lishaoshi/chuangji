<template>
    <div id="OrderSuccess">
        <clxsd-head-top :title='`下单成功`'>
            <template slot="prepend">
                <i></i>
            </template>
        </clxsd-head-top>
        <!-- 旧版本页面 -->
        <!-- <img src="../../images/shopping/order_success.png" class="img">
        <p class="success-info">购买成功</p>
        <p class="order-num">订单编号：<span>f-20190726153718364995</span></p>
        <p class="gray-info">下单成功，我们将及时配送</p>
        <div>
            <router-link to="/home" class="go-shopping">再去逛逛</router-link>
            <router-link to="/factory-order" class="looking-order" v-if="orderType == 'factory'">查看订单</router-link>
            <router-link to="/business-order" class="looking-order" v-if="orderType == 'business'">查看订单</router-link>
        </div> -->

        <!-- 新版本页面 -->
        <div class="headBox">
            <img src="@/images/successOrder.png" alt="">
            <div>
                <span>等待买家支付</span>
                <span>剩{{time}}分钟自动关闭</span>
            </div>
        </div>

        <div class="middle">
            <span>订单信息</span>
        </div>

        <div class="comfirmOrderInfo">
            <div v-for="(item, index) of data" :key="index">
                <div>{{item.name}}</div>
                <div>
                    <span>{{item.order_sn}}</span>
                    <span>￥{{item.order_amount.toFixed(2)}}</span>
                </div>
            </div>
        </div>

        <div class="buttonBtn">
           <router-link to="/purchasing-port-order" v-if="orderType == 'factory'"> 
                <div  class="query">查看订单</div> 
            </router-link> 
           <router-link to="/business-order" v-if="orderType == 'business'"> 
                <div class="query">查看订单</div>
            </router-link> 
           <router-link to="/home"><div>返回首页</div></router-link>
            <!-- <div>返回首页</div> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderSuccess",
        data() {
            return {
                data: {},
                orderType: '',
                time: ''
            }
        },
        // props:["orderType"],
        created() {
                //   console.log(this.$route)
            if(this.$route.params.orderType || this.$route.params.data) {
                // console.log(this.$route)
                this.data = this.$route.params.data
                this.orderType = this.$route.params.orderType
                this.time = this.$route.params.time
            } else {
                this.goBack(-3)
            }
    },
  
    }
</script>

<style scoped lang="scss">
#OrderSuccess {
    min-height: 100%;
    background: #fff;
    overflow: scroll;
    // padding-top: 2rem;
    
    .headBox {
        display: flex;
        height: 3.16rem;
        justify-content: center;
        align-items: center;
        &>div {
            display: flex;
            flex-direction: column;
            span {
                font-size: .24rem
            }
            span:first-child {
                font-size: .32rem;
                margin-bottom: 8px;
                // font-weight: 500;
            }
        }
        img {
            width: 1.6rem;
            height: 1.2rem;
            margin-right: 20px;
        }
    }
    .middle {
        background:rgba(248,248,248,1);
        height: .96rem;
        line-height: .96rem;
        text-align: center;
         color: #999999;
        &::before {
            content: '———';
            margin-right: 18px;
            color: #ccc;
        }
        &::after {
            content: '———';
            margin-left: 18px;
             color: #ccc;
        }
    }
    .comfirmOrderInfo {
        display: flex;
        flex-direction: column;
        padding: 0 .5rem;
        & > div {
            height: 1.34rem;
            display: flex;
            flex-direction: column;
            // line-height: .67rem;
            // justify-content: space-around;
            div {
                margin-top: .2rem;
                font-size: .28rem;
                
            }
            div:last-child {
                display: flex;
                justify-content: space-between;
                color:#999999;
                font-size: .26rem;
            }
        }
    }
    .buttonBtn {
        display: flex;
        justify-content: center;
        margin-top: 1.6rem;
        font-size: .3rem;
        margin-bottom: .3rem;
        div {
            border:2px solid #0090ff;
             padding: .22rem .84rem;
             border-radius:.08rem;
        }
        .query {
            margin-right: .32rem;
            background:rgba(0,144,255,1);
            border-radius:.08rem;
            // padding: .22rem .84rem;
            width: 2.6rem;
            color: #fff;
        }
    }
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