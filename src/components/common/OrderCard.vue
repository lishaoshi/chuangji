<template>
    <div class="order-list">
        <div class="list-top">
            <img src="../../images/default_company_logo.png" width="22" height="22" v-if="data.supplier.logo == null">
            <img :src="data.supplier.logo" alt="" width="22" height="22" v-else>
            <span>{{data.supplier.name}}</span>
            <span class="state">{{order_status_display}}</span>
        </div>
        <div v-if="data.items.length == 1">
            <div class="drug_order">
                <div class="drug_top">
                    <div class="drug_img">
                        <router-link :to="`/my-order/detail/${data.id}`">
                            <img :src="data.items[0].entity.cover">
                        </router-link>
                    </div>
                    <div class="drug_message">
                        <div>{{data.supplier.name}}</div>
                        <div>生产规格：{{data.items[0].entity_spec}}</div>
                        <div>生产公司：{{data.items[0].entity_spec}}</div>
                    </div>
                </div>
                <div class="totle_pay">
                     <p>订单编号：{{data.order_sn}}</p>
                    <p>{{data.order_time?data.order_time:'暂无时间'}}</p>
                   
                </div>
            </div>
            <div class="need_pay">
                <div>剩余时间30分钟</div>
                <div class="need_fu">
                    <p><b>数量<i style="padding-left: 4px;display: inline-block; ">{{data.items.length}}</i></b></p>
                    <p>{{data.order_status==0? '应付':'金额：'}}</p>
                    <p>￥{{data.order_status==0?data.order_amount:data.money_paid.toFixed(2)}}</p>
                </div>
            </div>
        </div>
        <div v-if="data.items.length > 1">
            <router-link :to="`/my-order/detail/${data.id}`" class="img-list-container">
                <div id="wrapper">
                    <div class="iscroll">
                        <div class="drug_img" v-for="(entity,skey) in data.items">
                            <img :src="entity.entity.img_cover" :alt="entity.name">
                        </div>
                    </div>
                </div>
                <p class="list-info">
                    <span>订单编号：{{data.order_sn}}</span>
                    <span>{{data.order_time}}</span>
                </p>
            </router-link>
          <div class="need_pay">
                <div>剩余时间30分钟</div>
                <div class="need_fu">
                    <p><b>数量<i style="padding-left: 4px;display: inline-block; ">{{data.items.length}}</i></b></p>
                    <p>{{data.order_status==0? '应付':'金额：'}}</p>
                    <p>￥{{data.order_status==0?data.order_amount:data.money_paid.toFixed(2)}}</p>
                </div>
            </div>
        </div>
        <div class="again">
            <div class="much" @click="goOrderDetail" v-if="data.order_status == 0">
                <p>去付款</p>
            </div>
            <div class="much" v-if="data.pay_status == 1">
                <p v-if="data.shipping_status != 2" @click="sureOrder(data.id)">确认收货</p>
                <p v-else @click="delectOrder(data.id)">删除订单</p>
                <p>
                    <router-link to="/factory/cart">再来一单</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderCard",
        props: {
            sureOrder: {
                type: Function,
                default: () => {
                }
            },
            toSubmitDataFnc: {
                type: Function,
                default: () => {
                }
            },
            data: {
                type: Object,
            },
            status: {
                type: Number,
                default: 0
            }
        },
        computed: {
            order_status_display() {
                let name = ''
                switch(this.data.order_status) {
                    case 0:
                        name = '未支付'
                        break;
                    case 1:
                        name="待提取"
                        break;
                    case 2:
                        name="待发货"
                        break;
                    case 3:
                        name="待收货"
                        break;
                    case 4:
                        name="已收货"
                        break;
                    case 5:
                        name="已拒绝"
                        break;
                    case 6:
                        name="已超时"
                        break;
                    case 7:
                        name="已退款"
                        break;  
                }
                return name
            }
        },
        created() {
            console.log(this.data, 'try daa')
        },
        methods: {
            goOrderDetail() {
                this.$router.push({name:'bussinessOrderDetail', query: {id: this.data.id}})
            }
        }

    }
</script>

<style scoped lang="scss">
    .list-info {
        display: flex;
        font-size: .22rem;
        color: #666;
        justify-content: space-between;
        padding-right: .16rem;
        padding-top: .16rem;
        padding-bottom: .16rem;
    }
    .order-list {
        margin-top: .2rem;

        .list-top {
            height: 32px;
            line-height: 32px;
            padding: 0 .2rem;
            background: #fff;
            position: relative;

            img {
                border-radius: 22px;
                position: relative;
                top: 5px;
                margin-right: 4px;
            }

            .state {
                font-size: .26rem;
                color: #f30000;
                float: right;
                font-weight: bold;
            }
        }

        .list-body {
            padding: 10px;
        }
    }

    #wrapper {
        width: 100%;
        height: 1.5rem;
        background: rgb(245, 245, 245);
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;
    }

    .iscroll {
        position: absolute;
        display: flex;
        align-items: center;

        .drug_img {
            width: 1.4rem;
            height: 1.4rem;
            background: #fff;
            margin-right: .2rem;
            text-align: center;
            line-height: 1.2rem;

            img {
                width: 1.4rem;
                height: 1.4rem;
            }
        }
    }

    .need_pay {
        width: 100%;
        height: .8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .24rem;
        border-bottom: 1px solid rgb(230, 230, 230);
        box-sizing: border-box;
        background: #fff;

        .need_fu {
            display: flex;
            align-items: center;
            font-size: 0.26rem;
            // margin-right: 0.24rem;

            p {
                display: inline-block;
                 &:nth-child(1) {
                    // margin-left: 0.1rem;
                    margin-right: 0.1rem;
                    // font-weight: bold;
                }

                &:nth-child(2) {
                    margin-left: 0.1rem;
                    margin-right: 0.1rem;
                    font-weight: bold;
                }

                &:nth-child(3) {
                    font-size: 0.34rem;
                    font-weight: bold;
                }
            }
        }
    }

    .order-info {
        background: #fff;
        padding: .14rem .2rem;
        border-bottom: 1px solid #f1f1f1;
        line-height: 1.8;
        font-size: .24rem;
        color: #666;
    }

    .again {
        width: 100%;
        height: .9rem;
        background: #fff;
        // text-align: right;
        .much {
            display: flex;
            align-items: center;
            // float: right;
            background: #fff;
            height: .9rem;
            justify-content: flex-end;
            padding: .24rem;
            p {
                color: #26a2ff;;
                font-size: .28rem;
                border: 1px solid #26a2ff;
                border-radius: .6rem;
                margin-left: .2rem;
                width: 1.6rem;
                text-align: center;
                height: .6rem;
                line-height: .6rem;

                a {
                    color: #26A2FF;
                }
            }
        }
    }

    .drug_order {
        width: 100%;
        background: rgb(245, 245, 245);
        display: flex;
        // align-items: center;
        flex-direction: column;
        // padding: .2rem 0;
        .drug_top {
            display: flex;
        }
        .drug_img {
            width: 1.4rem;
            background: #fff;
            margin-left: .2rem;
            text-align: center;
            margin-top: .2rem;
            margin-right: .3rem;

            img {
                width: 100%;
                height: 1.4rem;
                display: inline-block;
                vertical-align: middle;
            }
        }
    }

    .drug_message {
        width: 75%;
        margin-left: 2%;
        div:first-child {
            font-size:.34rem;
            color:rgba(51,51,51,1);
            margin-top: .3rem;
            margin-bottom: .28rem;
        }
        div {
            font-size:.22rem;
            color:rgba(153,153,153,1);
        }
    }

    .drug_message .drug_name {
        font-size: .3rem;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

     .totle_pay {
        display: flex;
        justify-content: space-between;
        padding: 0 .24rem;
        margin: 0.48rem 0 .38rem 0;
        font-size: .22rem;
        color: #666;
        line-height: 1.6;
    }

    .img-list-container {
        padding: .1rem 0;
        padding-left: .2rem;
        display: block;
    }
</style>