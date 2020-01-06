<template>
    <div id="MyOrder">
        <clxsd-head-top>
            <template slot="title">
                <div  class="search-form">
                    <form class="input-wrap" onsubmit="return false" action="">
                        <svg @click="keyUp">
                            <use xlink:href="#icon-sousuo" />
                        </svg>
                        <input type="search" ref="input" v-model="searchValue" placeholder="请输入搜索内容" @keyup.enter="keyUp">
                        <svg @click="clearText" v-if="searchValue">
                            <use xlink:href="#icon-qingkong" />
                        </svg>
                    </form>
                </div>
               
            </template>
        </clxsd-head-top>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">
                <div class="nav-li"  @click="handleClick(-1)">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-receipting-${selected==1 ? '1':'0'}`"/>
                    </svg>
                    <p>全部</p>
                </div>
            </mt-tab-item>
            <mt-tab-item id="2">
                <div class="nav-li"  @click="handleClick(1)">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-paying-${selected==2 ? '1':'0'}`"/>
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
                <div class="nav-li"  @click="handleClick(4)">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-receipted-${selected==4 ? '1':'0'}`"/>
                    </svg>
                    <p>已收货</p>
                </div>
            </mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <!-- <mt-tab-container v-model="selected" style="min-height: 5rem;">
            <mt-tab-container-item id="1">
                <ClxsdLoadMore key="orders-list" ref="loadmore" @onRefresh="onOrdersRefresh" @onLoadMore="onOrdersLoadMore">
                    <OrderCard :key="`order_factory_all_${index}`" :data="order" v-for="(order,index) in orders" :sureOrder="sureOrder" :delectOrder="delectOrder">
                    </OrderCard>
                </ClxsdLoadMore>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <ClxsdLoadMore key="orders-list-unPay" ref="loadmoreUnPay" @onRefresh="unPayRefresh" @onLoadMore="unPayLoadMore">
                    <OrderCard :key="`order_factory_unPay_${index}`" :data="order" v-for="(order,index) in unPayOrders"></OrderCard>
                </ClxsdLoadMore>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <ClxsdLoadMore key="orders-list-unSend" ref="loadmoreUnSend" @onRefresh="unSendRefresh" @onLoadMore="unSendLoadMore">
                    <OrderCard :key="`order_factory_unSend_${index}`" :data="order" v-for="(order,index) in unSendOrders" :sureOrder="sureOrder"></OrderCard>
                </ClxsdLoadMore>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <ClxsdLoadMore key="orders-list-rec" ref="loadmoreRec" @onRefresh="recRefresh" @onLoadMore="recLoadMore">
                    <OrderCard :key="`order_factory_unSend_${index}`" :data="order" v-for="(order,index) in recOrders"  :delectOrder="delectOrder"></OrderCard>
                </ClxsdLoadMore>
            </mt-tab-container-item>
        </mt-tab-container> -->
        <div v-if="orderList.length>0" class="scrollBox" style="overflow: auto">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <div>
                    <OrderCard :flag.sync="flag" :key="`businsess_order_rec_${index}`" :sureOrder="sureOrder" @delSccess="delSccess" :data="order" v-for="(order,index) in orderList" :orderKey="index"></OrderCard>
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
    import { getFactoryOrderList, sureFactoryOrder } from "@/api/factoryOrder.js"

    export default {
        name: "FactoryOrder",
        components: {
            OrderCard,
            EmptyOrder
        },
        data() {
            return {
                selected: '1',
                orderList: [], //全部订单
                recOrders: [], //已收货
                state: -1,
                showLoading: true, //显示加载动画
                page: 1, //全部订单默认页
                allLoaded: false,
                loading: false,
                searchValue: "",
                limit: 20
            }
        },
        computed: {
            ...mapState(['POSITION']),
            lat() {
                return this.POSITION.lat
            },
            lng() {
                return this.POSITION.lng
            }
        },
        created() {
            this.getOrderList()
        },
        methods: {
             // 获取商业订单数据
            getOrderList(top, bottom) {
                let params = {
                    page : this.page,
                    limit: this.limit,
                    status: this.state,
                    search: this.searchValue,
                    limit: this.limit
                }
                this.loading  = true;
                getFactoryOrderList(params).then(res=>{
                    this.loading = false
                    let orderList = res.data.data || [];
                    this.flag = this.state
                    if(this.page>1) {
                        this.orderList = [...this.orderList, ...orderList]
                        this.$refs.loadmore.onBottomLoaded()
                    } else {
                        this.orderList = orderList
                    }
                    if(orderList.length==0) {
                        this.allLoaded = true
                    }
                    this.page++
                }).catch(err=>{
                    this.loading  = false;
                })
            },
            keyUp() {
                 this.page = 1
                 this.getOrderList()
                // this.$refs.list._handleSearch()
                // this.$refs.input.blur()
            },
            handleClick(id) {
                if(this.loading) return false
                this.orderList = []
                this.state = id
                this.page = 1
                this.allLoaded = false
                this.getOrderList()
            },
            /**
             * 上拉刷新
             */
            loadBottom() {
                this.getOrderList(false, true)
            },
             clearText(){
                this.searchValue = ''
            },
            async sureOrder(id) {
				this.$messagebox.confirm("确定收到货物了吗?").then(action => {
					if(action === 'confirm'){
                        sureFactoryOrder(id).then(()=>{
                            this.page = 1
                            this.getOrderList()
                            this.$toast("确认收货成功")
                        })
					}
				}).catch(err => err);
			},
			delSccess(index) {
                this.orderList.splice(index, 1)
            },
            handleOrderItems(orders){
                const state = this.state;
                //-1全部，0：待付款,1：待提取，3：待收货，4已收货
                orders.forEach((item,index, arr) =>{
                    if(item.order_status==0){
                        if(state == 0 && item.order_status == 0 && item.diff_seconds<=0){
                            item.splice(index,1) 
                        } else if(item.diff_seconds<=0 ) {
                            item.order_status = 6;
                        }
                    } else if(item.order_status==1){
                        if(state == 1 && item.order_status == 1 && item.left_time <= 0){
                            orders.splice(index,1)
                        }else if(item.left_time <= 0 ) {
                            item.order_status = 6;
                        }else if(item.order_status==1){
                            if(state == 1 && item.order_status == 1 && item.left_time <= 0){
                                orders.splice(index,1)
                            }else if(item.left_time <= 0 ) {
                                item.order_status = 6;
                            }
                        }
                    }
                });
            },
        } 
    }
</script>

<style lang="scss" scoped>
    .order-list {
        margin-top: 12px;
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
    #MyOrder {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
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
                color: #26a2ff;
            ;
                font-size: 12px;
                border: 1px solid #26a2ff;
            ;
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
    .search-form{
        width: 80%;
        background: #0081e5;
        height: .6rem;
        line-height: .6rem;
        border-radius: .6rem;
        display: flex;
        padding: 0 .3rem;
        margin: 0 auto;
        // align-items: center;
        // display: flex;
        .input-wrap {
            display: flex;
            align-items: center;
            flex: 1;
            // justify-content: space-around;
            input {
                margin-left: .3rem;
                flex-grow: 2;
                height: 100%;
                background: #0081e5;
                color: #fff;
                font-size: .22rem;
                &::placeholder {
                    color: #fff;
                    opacity: .6;
                    // font-size: auto;
                }
            }
            svg {
                width: .3rem;
                height: .3rem;
            }
        }
        
    }
    .scrollBox {
        flex: 1;
    }
</style>
