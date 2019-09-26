<template>
    <div class="order-list">
        <div class="list-top">
            <span> 下单时间：{{data.order_time}}</span>
            <span class="state">{{data.order_status_display}}</span>
        </div>
        <div v-if="data.entities.length === 1">
            <div class="drug_order">
                <div class="drug_img">
                    <router-link :to="`/my-order/detail/${data.id}`">
                        <img :src="data.entities[0].cover">
                    </router-link>
                </div>
                <div class="drug_message">
                    <router-link :to="`/my-order/detail/${data.id}`">
                        <p class="drug_name">{{data.entities[0].name}}</p>
                        <div class="totle_pay">
                            <p>订单编号：{{data.order_sn}}</p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="need_pay">
                <div class="need_fu">
                    <p><b>共<i>{{data.total_num}}</i>件</b></p>
                    <p>需付:</p>
                    <p>￥{{data.total_price}}</p>
                </div>
            </div>
        </div>
        <div v-if="data.entities.length > 1">
            <router-link :to="`/my-order/detail/${data.id}`" class="img-list-container">
                <div id="wrapper">
                    <div class="iscroll">
                        <div class="drug_img" v-for="(entity,skey) in data.entities">
                            <img :src="entity.cover" :alt="entity.name">
                        </div>
                    </div>
                </div>
                <p class="list-info" style="text-align: right">
                    <span>订单编号：{{data.order_sn}}</span>
                </p>
            </router-link>
            <div class="need_pay">
                <div class="need_fu">
                    <p><b>共<i>{{data.total_num}}</i>件</b></p>
                    <p>需付:</p>
                    <p>￥{{data.total_price}}</p>
                </div>
            </div>
        </div>
        <div class="again">
            <div class="much" v-if="data.pay_status == 0">
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
        name: "BusinessOrderCard",
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
            }
        },

    }
</script>

<style scoped lang="scss">
    .list-info {
        font-size: .22rem;
        color: #666;
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
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-bottom: 1px solid rgb(230, 230, 230);
        box-sizing: border-box;
        background: #fff;

        .need_fu {
            display: flex;
            align-items: center;
            font-size: 0.26rem;
            margin-right: 0.22rem;

            p {
                display: inline-block;

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
        padding: .15rem .2rem;
        align-items: center;

        .much {
            display: flex;
            align-items: center;
            float: right;

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
        align-items: center;
        padding: .2rem 0;

        .drug_img {
            width: 1.4rem;
            background: #fff;
            margin-left: .2rem;
            text-align: center;

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
    }

    .drug_message .drug_name {
        font-size: .3rem;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .drug_message .totle_pay {
        margin-top: 0.35rem;
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