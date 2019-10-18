<template>
    <div id="MyOrder">
        <div class="tab">
            <mt-navbar v-model="selected">
			<mt-tab-item id="1" >
                <div class="nav-li" @click="handleClick(-1)">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-receipting-${selected==1 ? '1':'0'}`"/>
                    </svg>
                    <p>全部</p>
                </div>
            </mt-tab-item>
			<mt-tab-item id="2">
                <div class="nav-li" @click="handleClick(0)">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-paying-${selected==2 ? '1':'0'}`"/>
                    </svg>
                    <p>待付款</p>
                </div>
            </mt-tab-item>
            <mt-tab-item id="6">
                <div class="nav-li"  @click="handleClick(1)">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-extracting-${selected==6 ? '1':'0'}`"/>
                    </svg>
                    <p>待提取</p>
                </div>
            </mt-tab-item>
			<mt-tab-item id="3">
                <div class="nav-li"  @click="handleClick(3)">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-deliverGoods-${selected==3 ? '1':'0'}`"/>
                    </svg>
                    <p>待收货</p>
                </div>
            </mt-tab-item>
			<mt-tab-item id="4">
                <div class="nav-li" @click="handleClick(4)">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-receipted-${selected==4 ? '1':'0'}`"/>
                    </svg>
                    <p>已收货</p>
                </div>
            </mt-tab-item>
		</mt-navbar>
        </div>
        <div v-if="orderList.length>0" class="scrollBox" style="overflow: auto">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <div>
                    <OrderCard :flag.sync="flag" :key="`businsess_order_rec_${index}`" :sureOrder="sureOrder" @update="updateList" @delSccess="delSccess" :data="order" v-for="(order,index) in orderList" :orderKey="index"></OrderCard>
                </div>
            </mt-loadmore>
        </div>
            
       
       <EmptyOrder v-else/>
    </div>
</template>

<script>
    import OrderCard from "@/components/common/OrderCard"
	import EmptyOrder from '@/components/EmptyList'
	import { mapState } from "vuex";
    import { getBusinessOrderList,deleteBusinessOrder,sureBusinessOrder } from "@/api/businessOrder.js"
    import BScroll from 'better-scroll'

    export default {
        name: "MyOrder",
        components: {
            OrderCard,
            EmptyOrder
        },
        data() {
            return {
                selected: '1',
                isEmpty: true,
                order_id: 0,
                orders: [],//全部订单
                unPayOrders: [],//未付款
                unSendOrders: [],//未发货
                orderList: [],//已收货
                state: -1,
                allLoaded: false,    //是否已经加载全部
                limit: 15,
                page: 1,
                probeType: 1,
                pulldown: true,
                pullup: true,
                flag: true
            }
        },
        created() {
            this.getOrderList()
            // this.testInt()
        },
        methods: {
            handleClick(id) {
                this.orderList = []
                this.state = id
                this.page = 1
                this.getOrderList()
            },
            updateList() {
                this.page = 1
                this.getOrderList()
            },
            loadBottom() {
                this.getOrderList(false, true)
            },
            dowm(value) {
                console.log(value)
            },
            sureOrder(id) {
				this.$messagebox.confirm("确定收到货物了吗?").then(action => {
					if(action === 'confirm'){
						sureBusinessOrder(id)
						this.orderList.splice(this.orderList.findIndex(item => item.id === id), 1)
					}
				}).catch(err => err);
			},
			delSccess(index) {
                this.orderList.splice(index, 1)
            },

            testInt() {
                var i = 60
                var timTest = setInterval(()=>{
                    i--
                    if(i<50) {
                        clearInterval(timTest);
                    }
                    console.log(i);
                },1000)
            },

            // 获取订单数据
            getOrderList(top, bottom) {
                let params = {
                    page : this.page,
                    limit: this.limit,
                    status: this.state
                }
                getBusinessOrderList(params).then(res=>{
                    let data = res.data.data.orderList
                    data.forEach((item, index, arr)=>{
                    if(item.order_status==0) {
                        let minutes = Math.floor(item.diff_seconds/60)
                        let seconds = Math.ceil(item.diff_seconds%60)
                        arr[index].minutes = minutes
                        arr[index].seconds = seconds
                        arr[index].diffSecondsInt = setInterval(()=>{
                            seconds-- 
                             if(seconds<10 && seconds>0) {
                                seconds = '0' + seconds
                            }
                            if(seconds<=0&&minutes>0) {
                                minutes--
                                seconds=59
                                arr[index].minutes = minutes
                                
                            } else if(seconds<=0&&minutes<=0) {
                                this.data.minutes = '00'
                                this.data.seconds = '00'
                                clearInterval(arr[index].diffSecondsInt)
                            }
                            arr[index].seconds = seconds
                        },1000)
                    }

                    if(item.order_status==1) {
                        let minutes = Math.floor(item.left_time/60)
                        let seconds = Math.ceil(item.left_time%60)
                        arr[index].minutes = minutes
                        arr[index].seconds = seconds
                        arr[index].leftTimeInt = setInterval(()=>{
                            seconds-- 
                            if(seconds<=0&&minutes>0) {
                                minutes--
                                seconds=59
                                arr[index].minutes = minutes
                                
                            } else if(seconds<=0&&minutes<=0) {
                                this.data.minutes = '00'
                                this.data.seconds = '00'
                                clearInterval(arr[index].leftTimeInt)
                            }
                            if(seconds<10) {
                                seconds = '0' + seconds
                            }
                            arr[index].seconds = seconds
                        },1000)
                    }
                })
                    // data.forEach()
                    this.flag = this.state
                    if(this.page>1) {
                         this.orderList = [...this.orderList, ...data]
                         this.$refs.loadmore.onBottomLoaded()
                    } else {
                        // debugger
                        this.orderList = data
                    }
                    console.log(this.oriderList)
                    if(res.data.data.orderList.length==0) {
                        this.allLoaded = true
                    }
                    this.page++
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
.wrapper {
    height: 9rem;
}
.scrollBox {
    position: absolute;
    top: 2.52rem;
    left: 0;
    right: 0;
    bottom: 1.1rem;
}
.tab {
    position: relative;
    z-index: 5;
}
    .order-list {
        margin-top: .2rem;

        .list-top {
            height: 32px;
            line-height: 32px;
            padding: 0 10px;
            background: #fff;

            .time {
                font-size: .24rem;
                color: #7C7C7C;
                float: left;
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
        height: 60px;
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
    }

    .iscroll .drug_img {
        width: 55px;
        height: 55px;
        background: #fff;
        margin-right: 10px;
        text-align: center;
        line-height: 1.2rem;
    }

    .iscroll .drug_img img {
        width: 55px;
        height: 55px;
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
    }

    .need_pay .need_fu {
        display: flex;
        align-items: center;
        font-size: 0.26rem;
        margin-right: 0.22rem;
    }

    .need_pay .need_fu p:nth-child(2) {
        font-weight: bold;
        margin-left: 0.1rem;
        margin-right: 0.1rem;
    }

    .need_pay .need_fu p:nth-child(3) {
        font-weight: bold;
        font-size: 0.34rem;
    }

    .again {
        width: 100%;
        height: 45px;
        display: flex;
        background: #fff;
        align-items: center;
        justify-content: flex-end;

        .much {
            display: flex;
            align-items: center;

            p {
                color: #26a2ff;;
                font-size: 12px;
                border: 1px solid #26a2ff;;
                border-radius: 7px;
                padding: 4px 9px;
                margin-right: 12px;
            }
        }
    }

    .drug_order {
        width: 100%;
        background: rgb(245, 245, 245);
        display: flex;
        align-items: center;

        .drug_img {
            width: 20%;
            background: #fff;
            margin-left: 2%;
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
        font-size: 14px;
    }

    .drug_message .totle_pay {
        margin-top: 0.35rem;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .drug_message .totle_pay p:nth-child(1) i {
        margin: 0 5px;
    }

    .drug_message .totle_pay p:nth-child(2) {
        font-weight: bold;
        font-size: 15px;
    }

    .drug_message .totle_pay p:nth-child(2) i {
        padding: 0 0.22rem 0 0.12rem;
        font-size: 16px;
    }
    .nav-li {
        svg {
            width: .45rem;
            height: .45rem;
            margin-bottom: .05rem;
        }
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 0px;
        color: #26a2ff;
        margin-bottom: -3px;
    }
</style>