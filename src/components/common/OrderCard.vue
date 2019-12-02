<template>
    <div class="order-list">
        <div class="list-top">
            <div>
                <img src="../../images/default_company_logo.png" width="22" height="22" v-if="data.supplier.logo == null">
                <img :src="data.supplier.img_cover" alt="" width="22" height="22" v-else>
                <span>{{data.supplier.name}}</span>
            </div>
            <span class="state">{{order_status_display}}</span>
        </div>
        <div v-if="data.items.length == 1">
            <router-link :to="`/my-order/detail/${data.id}`">

            <div class="drug_order">
                <div class="drug_top">
                    <div class="drug_img">
                        <img :src="data.items[0].entity.cover&&data.items[0].entity.cover | filteImg">
                    </div>
                    <div class="drug_message">
                        <div>{{data.items[0].entity_name}}</div>
                        <div>规格：{{data.items[0].entity_spec}}</div>
                        <div>品牌：{{data.items[0].entity.brand.name}}</div>
                    </div>
                </div>
                <div class="totle_pay">
                     <p>订单编号：{{data.order_sn}}</p>
                    <p>{{data.created_at?data.created_at:'暂无时间'}}</p>
                   
                </div>
            </div>

            </router-link>

            <div :class="{OrderStatus:data.order_status!=1}" class="need_pay">
                <div v-if="data.order_status==1 || data.order_status==0" class="intever">
                    <div>
                        <span v-if="data.order_status==0">剩余支付时间：
                            <timing-date :time.sync="data.left_time"></timing-date>
                        </span>
                        <span v-if="data.order_status==1">剩余提取时间：
                            <timing-date :time.sync="data.left_time" @timeout="timeout"></timing-date>
                        </span>
                    </div>
                </div>
                
                <div class="need_fu">
                    <!-- <span><span>数量<i style="padding-left: 4px;display: inline-block; ">{{data.total_num}}</i></span></p> -->
                    <p><span>共 {{data.total_num}} 件商品</span></p>
                    <p>{{data.order_status==0? '应付':'金额：'}}</p>
                    <div>¥{{data.money_paid==0?+data.order_amount+(+data.freight):+data.money_paid+(+data.freight) |  filterFixed}}<span v-if="data.freight>0">(含配送费：¥{{data.freight}})</span></div>
                </div>
            </div>
        </div>
        <div v-if="data.items.length > 1">
            <router-link :to="`/my-order/detail/${data.id}`" class="img-list-container">
                <div id="wrapper">
                    <div class="iscroll">
                        <div class="drug_img" v-for="(entity,skey) in goodList">
                            <img :src="entity.entity.cover | filteImg" :alt="entity.name">
                            
                        </div>
                        <div class="omit" v-if="data.items.length > 4">
                            <p>•••</p>
                        </div>
                    </div>
                </div>
                <p class="list-info">
                    <span>订单编号：{{data.order_sn}}</span>
                    <span>{{data.created_at}}</span>
                </p>
            </router-link>
          <div :class="{OrderStatus:data.order_status!=1}" class="need_pay" >
              <div v-if="data.order_status==1 || data.order_status==0">
                   <div>
                        <span v-if="data.order_status==1">剩余提取时间: 
                            <timing-date :time.sync="data.left_time" @timeout="timeout"></timing-date>
                        </span>
                        <span v-if="data.order_status==0">剩余支付时间: {{data.minutes}}分{{data.seconds}}秒</span>
                    </div>
              </div>
               
                <div class="need_fu">
                    <p><span>共 {{data.total_num}} 件商品</span></p>
                    <p>{{data.order_status==0? '应付':'金额：'}} </p>
                    <div>¥{{data.money_paid==0?+data.order_amount+(+data.freight):+data.money_paid+(+data.freight) |  filterFixed}}<span v-if="data.freight>0">(含配送费：¥{{data.freight}})</span></div>
                </div>
            </div>
        </div>
        <div class="again" v-if="data.order_status!=1">
            <div class="much"  v-if="data.order_status == 0">
                <p @click="goOrderDetail(data)">货到付款</p>
            </div>
            <div class="much" v-if="data.order_status !=0 && data.order_status != 1">
                <p v-if="data.order_status == 3" @click="sureOrder(data.id)">确认收货</p>
                <p v-if="data.order_status != 2 && data.order_status != 3" @click="delectOrder(data.id)">删除订单</p>
                <p v-if=" data.order_status!=0" @click="handleContinuTo(data)">
                    <!-- <router-link to="/factory/cart">再来一单</router-link>  需要添加点击操作， 进行添加进购物车处理 -->
                    再来一单
                </p>
            </div>
        </div>
    </div>
</template>

<script>
let tim = null
import { orderPay, deleteBusinessOrder, againOrder } from "@/api/businessOrder"
import { setInterval } from 'timers'
import timingDate from '../timing/timing'
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
            },
            orderKey: {
                type: Number,
                required: true
            },
            flag: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                tim: null,
                timTest: null
            }
        },
        filters: {
            fillterTime(value) {
                return Math.ceil(value/60)
            },
			filterFixed(value) {
				value = Number(value)
				return value.toFixed(2)
            },
            filteImg(val) {
                return `${val}?x-oss-process=image/resize,w_80,m_fixed,h_80,limit_0`
            }
        },
        computed: {
            order_status_display() {
                let name = ''
                switch(this.data.order_status) {
                    case 0:
                        name = '待付款'
                        break;
                    case 1:
                        name="待提取"
                        break;
                    case 2:
                        name="待收货"
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
            },
            goodList() {
                if(this.data.items.length>4) {
                    return [...this.data.items.slice(0, 4)]
                }
                // debugger
                return this.data.items
                
            }
        },
        methods: {
            goOrderDetail(item) {
                this.$messagebox.confirm('',{
                    title: '提示',
                    message: '确认货到付款？',
                }).then(res=>{
                    if(res=='confirm') {
                        orderPay(item.id).then(()=>{
                            this.$toast('支付成功')
                            this.$emit('update')
                        })
                    }
                })
                return false
                this.$router.push({name:'bussinessOrderDetail', query: {id: this.data.id}})
            },

            // 订单超时处理
            timeout() {
                this.data.order_status = 6
            },

            // 再来一单
            async handleContinuTo(data) {
                // this.$messagebox.confirm('')
                await againOrder(data.id).catch(err=>{
                    this.$toast('商品已经下架')
                })
                this.$router.push('/factory/cart')
            },
            delectOrder(id) {
                this.$messagebox.confirm('确认删除此订单吗？').then(res=>{
                    if(res=='confirm') {
                        deleteBusinessOrder(id).then(res=>{
                            this.$emit('delSccess', this.orderKey)
                            this.$toast('删除成功')
                        })
                    }
                })
            }
        },
        beforeDestroy() {
            clearInterval(this.tim)
        },
        components: {
            timingDate
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
        padding-top: .32rem;
        padding-bottom: .32rem;
    }
    .order-list {
        margin-top: .2rem;

        .list-top {
            height: .88rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
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
        overflow: auto;
        position: relative;
        display: flex;
        align-items: center;
    }

    .iscroll {
        position: absolute;
        display: flex;
        align-items: center;
        // background: #fff;
        .drug_img {
            width: 1.4rem;
            height: 1.4rem;
            background: #fff;
            margin-right: .2rem;
            text-align: center;
            line-height: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
               width: 1.2rem;
                border-radius: 4px;
                height: 1.2rem;
                display: inline-block;
                vertical-align: middle;
                // margin-right: .16rem;
            }
        }
         .omit {
            width: .5rem;
            height: .5rem;
            background: #fff;
            line-height: .5rem;
            text-align: center;
            border-radius: 50%;
            color: #666;
            align-self: flex-end;
        }
    }

    .need_pay {
        width: 100%;
        // height: .88rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        padding: 0 .24rem;
        box-sizing: border-box;
        background: #fff;
        div:first-child {
            height: .8rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        &>div:last-child {
            height: .9rem;
           
            width: 100%;
        }
        &.OrderStatus {
            border-bottom: 1px solid rgb(230, 230, 230);
        }

        .need_fu {
            display: flex;
            align-items: center;
            font-size: 0.24rem;
            float: right;
            justify-content: flex-end;
            border-top: .01rem solid rgb(224, 223, 223);
            // margin-right: 0.24rem;

            p {
                display: inline-block;
                 &:nth-child(1) {
                    // margin-left: 0.1rem;
                    margin-right: 0.3rem;
                    // font-weight: bold;
                }
            }
            div {
                font-size: 0.34rem;
                span {
                    font-size: .24rem;
                    display: inline-block;
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
        max-height: .9rem;
        background: #fff;
        min-height: .4rem;
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
            width: 1.40rem;
            background: #fff;
            margin-left: .2rem;
            text-align: center;
            margin-top: .2rem;
            margin-right: .3rem;
            border-radius: 4px;
            height: 1.4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 1.2rem;
                border-radius: 4px;
                height: 1.2rem;
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
        margin: 0.38rem 0 .38rem 0;
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