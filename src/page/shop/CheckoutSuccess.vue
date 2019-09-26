<template>
    <div class="CheckoutSuccess">
        <clxsd-head-top title='下单成功'></clxsd-head-top>
        <div class="detail-box">
            <img src="../../images/shopping/img1.png">
            <div class="right">
                <p>等待卖家付款</p>
                <p>省30分钟自动关闭</p>
            </div>
        </div>
        <div class="detail-box2">
            <span>去支付</span>
            <router-link to="/home">返回首页</router-link>
        </div>
        <div class="detail-title">
            <svg>
                <use xlink:href="#icon-ordered-leftLine"/>
            </svg>
            <span>订单信息</span>
            <svg>
                <use xlink:href="#icon-order-rightLine"/>
            </svg>
        </div>
        <ul class="detail-list">
            <li v-for="(item,index) in orderList" :key="index">
                <p>{{item.company_name}}</p>
                <div>
                    <span>{{item.order_sn}}</span>
                    <span class="right">￥{{item.price}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "CheckoutSuccess",
        data(){
            return {
                orderList:[
                    {
                        company_name:"上海制药",
                        order_sn:"5258785488",
                        price:"2587"
                    },
                    {
                        company_name:"上海制药",
                        order_sn:"5258785488",
                        price:"2587"
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .CheckoutSuccess {
        min-height: 100%;
        background: #fff;
    }
    .detail-box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2.5rem;
        img {
            width: 1.45rem;
            height: 1.1rem;
        }
        .right {
            p {
                padding-left: .5rem;
                font-size:.32rem;
                &:nth-child(2){
                    font-size:.24rem;
                }
            }
        }
    }
    .detail-box2 {
        font-size: .24rem;
        text-align: center;
        line-height: .64rem;
        span {
            width:2.60rem;
            height:.64rem;
            background:rgba(0,144,255,1);
            border-radius:8px;
            display: inline-block;
            color: #fff;
            margin-right: .3rem;
        }
        a {
            width:2.60rem;
            height:.64rem;
            background:#fff;
            border-radius:8px;
            display: inline-block;
            color: #2da2ff;
            border:1px solid #2da2ff;
        }
    }
    .detail-title {
        height:.96rem;
        background:rgba(248,248,248,1);
        justify-content: center;
        display: flex;
        align-items: center;
        margin-top: 1.5rem;
        svg {
            width: 1rem;
            height: .05rem;
        }
        span {
            padding: 0 .1rem;
        }
    }
    .detail-list {
        padding: 0 .2rem;
        li {
            height: 1.33rem;
            border-bottom: 1px solid #e6e6e6;
            p {
                font-size: .28rem;
                padding-top: .25rem;
                padding-bottom: .1rem;
            }
            div{
                font-size:.26rem;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(153,153,153,1);
                .right {
                    float: right;
                }
            }
        }
    }
</style>