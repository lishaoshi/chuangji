<template>
    <div id="MyOrder">
        <!--<clxsd-head-top title='订单'></clxsd-head-top>-->
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">
                <div class="nav-li">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-receipting-${selected==1 ? '1':'0'}`"/>
                    </svg>
                    <p>全部</p>
                </div>
            </mt-tab-item>
            <mt-tab-item id="2">
                <div class="nav-li">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-paying-${selected==2 ? '1':'0'}`"/>
                    </svg>
                    <p>待付款</p>
                </div>
            </mt-tab-item>
            <mt-tab-item id="3">
                <div class="nav-li">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-deliverGoods-${selected==3 ? '1':'0'}`"/>
                    </svg>
                    <p>待发货</p>
                </div>
            </mt-tab-item>
            <mt-tab-item id="4">
                <div class="nav-li">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-receipting-${selected==4 ? '1':'0'}`"/>
                    </svg>
                    <p>待收款</p>
                </div>
            </mt-tab-item>
            <mt-tab-item id="5">
                <div class="nav-li">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-receipted-${selected==5 ? '1':'0'}`"/>
                    </svg>
                    <p>已收款</p>
                </div>
            </mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected" style="min-height: 5rem;">
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
                <ClxsdLoadMore key="orders-list-unRecMoney" ref="loadmoreUnRecMoney" @onRefresh="unRecMoneyRefresh" @onLoadMore="unRecMoneyLoadMore">
                    <OrderCard :key="`order_factory_unmoney_${index}`" :data="order" v-for="(order,index) in unRecMoney" :sureOrder="sureOrder"></OrderCard>
                </ClxsdLoadMore>
            </mt-tab-container-item>
            <mt-tab-container-item id="5">
                <ClxsdLoadMore key="orders-list-rec" ref="loadmoreRec" @onRefresh="recRefresh" @onLoadMore="recLoadMore">
                    <OrderCard :key="`order_factory_rec_${index}`" :data="order" v-for="(order,index) in recOrders"  :delectOrder="delectOrder"></OrderCard>
                </ClxsdLoadMore>
            </mt-tab-container-item>
        </mt-tab-container>

    </div>
</template>

<script>

    import OrderCard from "@/components/common/OtherOrderCard"
    import EmptyOrder from '@/components/EmptyList'
    import { mapState } from "vuex";
    import { factoryServiceOrderList,deleteFactoryOrder,sureFactoryOrder } from "@/api/factoryOrder.js"

    export default {
        name: "FactoryAllServiceOrder",
        components: {
            OrderCard,
            EmptyOrder
        },
        data() {
            return {
                selected: '1',
                isEmpty: true,
                order_id: 0,
                orders: [], //全部订单
                unPayOrders: [], //待付款
                unSendOrders: [], //待发货
                unRecMoney: [], //待收款
                recOrders: [], //已收款
                state: 1,
                showLoading: true, //显示加载动画
                page: 1, //全部订单默认页
                unPay_page: 1, //未付款订单默认页
                unSend_page: 1, //未发货订单默认页
                unRecMoney_page: 1, //代收款默认页
                rec_page: 1, //已收款默认页
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
        methods: {
            _handleData(data) {
                data.forEach(order => {
                    let order_status_display = '待付款'
                    if(order.pay_status) order_status_display = '待收货'
                    if(order.shipping_status === 2) order_status_display = '已收货'
                    order.order_status_display = order_status_display
                    order.pay_status = order.pay_status
                    //state11 = order.pay_status
                    order.shipping_status = order.shipping_status
                    order.id = order.id
                    order.companyName = order.supplier.name
                    order.real_name = order.consignee
                    let id = order.id
                    this.state = order.pay_status
                    order.entities = []
                    order.items.forEach(item => {
                        order.entities.push({
                            cover: item.entity.cover,
                            name: item.entity.good_name,
                        })
                        order.total_num = item.num
                        if(order.items.length == 1) {
                            order.total_num = order.total_num
                        } else {
                            order.total_num = order.total_num + order.total_num
                        }
                    })
                    order.total_price = order.money_paid
                    order.total_num = order.total_num
                    order.order_time = order.created_at
                    order.logo = order.supplier.logo
                    order.supplier_name = order.supplier.display_name || order.supplier.name
                })
                return data

            },

            sureOrder(id) {
                this.$messagebox.confirm("确定要收款了吗?").then(action => {
                    if(action === 'confirm'){
                        sureFactoryOrder(id)
                        this.unSendOrders.splice(this.unSendOrders.findIndex(item => item.id === id), 1)
                        this.orders.splice(this.orders.findIndex(item => item.id === id), 1)
                        this.recOrders.unshift(this.recOrders.findIndex(item => item.id === id), 1)
                    }
                }).catch(err => err);
            },
            delectOrder(id) {
                this.$messagebox.confirm("确定删除此订单吗?").then(action => {
                    if(action === 'confirm'){
                        deleteFactoryOrder(id)
                        this.recOrders.splice(this.recOrders.findIndex(item => item.id === id), 1)
                        this.orders.splice(this.orders.findIndex(item => item.id === id), 1)
                    }
                }).catch(err => err);
            },

            //加载全部订单
            getOrderData(options, loadMore = false) {
                let params = {
                    page: this.page,
                    type: 'orders-list',
                    limit: options.limit
                }
                factoryServiceOrderList(params, loadMore)
                .then(({data = []}) => {
                    console.log(data)
                    if(loadMore) {
                        this.orders = [...this.orders, ...data]
                    } else {
                        this.orders = data

                        console.log("当前数组长度：" + this.orders.length)
                    }
                    this.orders = this._handleData(this.orders)
                    this.page = this.page + 1
                    this.$refs.loadmore.afterLoadMore(data.length < options.limit)
                    if(options.callback) {
                        options.callback()
                    }
                }).catch(error => {
                    if(error.response){
                        this.$toast(error.response.data.message);
                    }
                    if(options.callback) {
                        options.callback()
                    }
                    this.$refs.loadmore.afterLoadMore(true);
                })
            },
            onOrdersRefresh(callback) {
                console.log("加载")
                this.page = 1
                let options = {
                    limit: 10,
                    callback: callback
                }
                this.getOrderData(options)
            },
            onOrdersLoadMore() {
                let options = {
                    limit: 10,
                }
                this.getOrderData(options, true)
            },

            //加载待付款订单
            async getUnPayOrderData(options, loadMore = false) {
                let params = {
                    page: this.unPay_page,
                    type: 'orders-list-unPay',
                    limit: options.limit,
                    payStatus: 0
                }
                factoryServiceOrderList(params, loadMore)
                .then(({
                           data = []
                       }) => {
                    if(loadMore) {
                        this.unPayOrders = [...this.unPayOrders, ...data]
                    } else {
                        this.unPayOrders = data
                    }
                    this.unPayOrders = this._handleData(this.unPayOrders)
                    this.unPay_page = this.unPay_page + 1
                    this.$refs.loadmoreUnPay.afterLoadMore(data.length < options.limit)
                    if(options.callback) {
                        options.callback()
                    }
                }).catch(error => {
                    if(error.response){
                        this.$toast(error.response.data.message);
                    }
                    if(options.callback) {
                        options.callback()
                    }
                    this.$refs.loadmore.afterLoadMore(true);
                })
            },
            unPayRefresh(callback) {
                this.unPay_page = 1
                let options = {
                    limit: 10,
                    callback: callback
                }
                this.getUnPayOrderData(options)
            },
            unPayLoadMore() {
                console.log('loard')
                let options = {
                    limit: 10,
                }
                this.getUnPayOrderData(options, true)
            },

            //待发货
            async getUnSendOrderData(options, loadMore = false) {
                let params = {
                    page: this.unPay_page,
                    type: 'orders-list-unSend',
                    limit: options.limit,
                    shipStatus: 0,
                    payStatus: 1
                }
                factoryServiceOrderList(params, loadMore)
                .then(({data = []}) => {
                    if(loadMore) {
                        this.unSendOrders = [...this.unSendOrders, ...data]
                    } else {
                        this.unSendOrders = data
                    }
                    this.unSendOrders = this._handleData(this.unSendOrders)
                    this.unPay_page = this.unPay_page + 1
                    this.$refs.loadmoreUnSend.afterLoadMore(data.length < options.limit)
                    if(options.callback) {
                        options.callback()
                    }
                }).catch(error => {
                    if(error.response){
                        this.$toast(error.response.data.message);
                    }
                    if(options.callback) {
                        options.callback()
                    }
                    this.$refs.loadmore.afterLoadMore(true);
                })
            },
            unSendRefresh(callback) {
                this.unPay_page = 1
                let options = {
                    limit: 10,
                    callback: callback
                }
                this.getUnSendOrderData(options)
            },
            unSendLoadMore() {
                let options = {
                    limit: 10,
                }
                this.getUnSendOrderData(options, true)
            },
            //待收款
            async getUnRecMoneyData(options, loadMore = false) {
                let params = {
                    page: this.unRecMoney_page,
                    type: 'orders-list-unRecMoney',
                    limit: options.limit,
                    shipStatus: 2,
                    payStatus: 1
                }
                factoryServiceOrderList(params, loadMore)
                .then(({data = []}) => {
                    if(loadMore) {
                        this.unRecMoney = [...this.unRecMoney, ...data]
                    } else {
                        this.unRecMoney = data
                    }
                    this.unRecMoney = this._handleData(this.unRecMoney)
                    this.unRecMoney_page = this.unRecMoney_page + 1
                    this.$refs.loadmoreUnRecMoney.afterLoadMore(data.length < options.limit)
                    if(options.callback) {
                        options.callback()
                    }
                }).catch(error => {
                    if(error.response){
                        this.$toast(error.response.data.message);
                    }
                    if(options.callback) {
                        options.callback()
                    }
                    this.$refs.loadmore.afterLoadMore(true);
                })
            },
            unRecMoneyRefresh(callback) {
                this.unPay_page = 1
                let options = {
                    limit: 10,
                    callback: callback
                }
                this.getUnRecMoneyData(options)
            },
            unRecMoneyLoadMore() {
                let options = {
                    limit: 10,
                }
                this.getUnRecMoneyData(options, true)
            },

            //已收款
            async getRecOrderData(options, loadMore = false) {
                let params = {
                    page: this.rec_page,
                    type: 'orders-list-rec',
                    limit: options.limit,
                    shipStatus: 2
                }
                factoryServiceOrderList(params, loadMore)
                .then(({data = []}) => {
                    if(loadMore) {
                        this.recOrders = [...this.recOrders, ...data]
                    } else {
                        this.recOrders = data
                    }
                    this.recOrders = this._handleData(this.recOrders)
                    this.rec_page = this.rec_page + 1
                    this.$refs.loadmoreRec.afterLoadMore(data.length < options.limit)
                    if(options.callback) {
                        options.callback()
                    }
                }).catch(error => {
                    if(error.response){
                        this.$toast(error.response.data.message);
                    }
                    if(options.callback) {
                        options.callback()
                    }
                    this.$refs.loadmore.afterLoadMore(true);
                })
            },
            recRefresh(callback) {
                this.rec_page = 1
                let options = {
                    limit: 10,
                    callback: callback
                }
                this.getRecOrderData(options)
            },
            recLoadMore() {
                let options = {
                    limit: 10,
                }
                this.getRecOrderData(options, true)
            },

        },

    }
</script>

<style lang="scss" scoped>
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
</style>
