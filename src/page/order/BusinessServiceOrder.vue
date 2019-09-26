<template>
    <div id="MyBussinessOrder">
        <div class="top-box" :class="{ active: isFullScreen }">
            <div>
                <p>{{UnDrawOrder.length}}</p>
                <p>未提取(个)</p>
            </div>
            <div>
                <router-link to="/lianshu">
                    <p>{{lianBeiValue| display_price}}</p>
                    <p>联数(包)</p>
                </router-link>
            </div>
            <div>
                <p>1000.00</p>
                <p>货款(元)</p>
            </div>
        </div>
        <mt-navbar v-model="selected">
            <!--
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
            -->
            <mt-tab-item id="6">
                <div class="nav-li">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-extracting-${selected==6 ? '1':'0'}`"/>
                    </svg>
                    <p>待提取</p>
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

        <mt-tab-container v-model="selected" style="min-height: 5rem;">
            <!--
            <mt-tab-container-item id="1">
                <ClxsdLoadMore key="orders-list" ref="loadmore" @onRefresh="onOrdersRefresh" @onLoadMore="onOrdersLoadMore">
                    <DrugOrderCard :key="`order_drug_all_${index}`" :data="order" v-for="(order,index) in orders"
                    :sureOrder="sureOrder" :delectOrder="delectOrder">
                    </DrugOrderCard>
                </ClxsdLoadMore>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <ClxsdLoadMore key="orders-list-unPay" ref="loadmoreUnPay" @onRefresh="unPayRefresh" @onLoadMore="unPayLoadMore">
                    <DrugOrderCard :key="`order_drug_unPay_${index}`" :data="order" v-for="(order,index) in unPayOrders"></DrugOrderCard>
                </ClxsdLoadMore>
            </mt-tab-container-item>
            -->

            <mt-tab-container-item id="6">
                <UnDrawCard v-for="(order,index) in UnDrawOrder" :data="order" :key="`unDraw_${index}`"
                            :refuseOrder="refuseOrder"
                            :extractOrder="extractOrder"
                />
                <span class="fixed-over">
                    <span v-if="is_over == false" @click="is_over = !is_over">
                        <svg class="icon">
                            <use xlink:href="#icon-left-alert"></use>
                        </svg>
                    </span>
                    <span v-if="is_over == true" class="fixed-over-box2">
                        <span  @click="drawAllOrders">全部提取 </span>
                        <svg class="icon"  @click="is_over = !is_over">
                            <use xlink:href="#icon-right-alert"></use>
                        </svg>
                    </span>
                </span>
            </mt-tab-container-item>

           <mt-tab-container-item id="3">
               <ClxsdLoadMore key="orders-list-unSend" ref="loadmoreUnSend" @onRefresh="unSendRefresh" @onLoadMore="unSendLoadMore">
                   <DrugOrderCard :key="`order_drug_unSend_${index}`" :data="order" v-for="(order,index) in unSendOrders" :sureOrder="sureOrder"></DrugOrderCard>
               </ClxsdLoadMore>
           </mt-tab-container-item>
            <!--
           <mt-tab-container-item id="4">
               <ClxsdLoadMore key="orders-list-unRecMoney" ref="loadmoreUnRecMoney" @onRefresh="unRecMoneyRefresh" @onLoadMore="unRecMoneyLoadMore">
                   <DrugOrderCard :key="`order_drug_unmoney_${index}`" :data="order" v-for="(order,index) in unRecMoney" :sureOrder="sureOrder"></DrugOrderCard>
               </ClxsdLoadMore>
           </mt-tab-container-item>

           <mt-tab-container-item id="5">
               <ClxsdLoadMore key="orders-list-rec" ref="loadmoreRec" @onRefresh="recRefresh" @onLoadMore="recLoadMore">
                   <DrugOrderCard :key="`order_factory_unSend_${index}`" :data="order" v-for="(order,index) in recOrders"  :delectOrder="delectOrder"></DrugOrderCard>
               </ClxsdLoadMore>
           </mt-tab-container-item>
           -->
        </mt-tab-container>
        <clxsd-foot-guide :user-type="USER_TYPE"/>
    </div>
</template>

<script>
    import SearchBar from '@/components/common/SearchBar'
    import DrugOrderCard from "@/components/common/OtherOrderCard"
    import UnDrawCard from "@/components/common/UnDraw"
    import EmptyOrder from '@/components/EmptyList'
    import Imperfect from '@/components/Imperfect'
    import {mapState} from "vuex";
    import {serviceBusinessOrderList, sureBusinessOrder, deleteBusinessOrder} from "@/api/businessOrder.js"

    export default {
        name: "BusinessServiceOrder",
        components: {
            SearchBar,
            DrugOrderCard,
            EmptyOrder,
            Imperfect,
            UnDrawCard
        },
        data() {
            return {
                selected: '6',
                is_over: false,
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
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                currentValue: 0.00,
                lianBeiValue: 0.00,
                UnDrawOrder: [
                    {
                        time: "20小时",
                        order_sn: "258012854785478",
                        price: "34.00",
                        id: 1
                    }
                ]
            }
        },
        computed: {
            ...mapState(['POSITION']),
            lat() {
                return this.POSITION.lat
            },
            lng() {
                return this.POSITION.lng
            },
            ...mapState({
                USER_TYPE: state => state.CURRENTUSER.user_type,
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER
                    const configInfo = state.CONFIG
                    return {
                        lianBei: {
                            isOpen: !!currentInfo.lianbei,
                            value: !!currentInfo.lianbei ? (currentInfo.lianbei.balance / 100).toFixed(2) : '0.00'
                        },
                        lianBeiValue: (configInfo['lianbei'] && configInfo['lianbei']['real_value']) ? configInfo['lianbei']['real_value'] : '0.30',
                        lianPiaoVaule: currentInfo.lianpiao ? (parseFloat(currentInfo.lianpiao.add_balance) + parseFloat(currentInfo.lianpiao.balance)).toFixed(2) : '0.00',
                    }
                }
            })
        },
        created(){
            this.initData()
        },

        methods: {
            initData(callback){
                this.$http.get('lianbei/list')
                .then(response => {
                    const { data } = response;
                    if(data){
                        this.lianBeiValue = data.income-data.expenditure;
                    }
                    if(callback){
                        callback();
                    }
                }).catch(err => {

                })
            },
            _handleData(data) {
                data.forEach(order => {
                    let order_status_display = '待付款'
                    if (order.pay_status) order_status_display = '待收款'
                    order.order_status_display = order_status_display
                    order.pay_status = order.pay_status
                    order.id = order.id
                    let id = order.id
                    order.companyName = order.supplier.name
                    order.real_name = order.consignee
                    order.total_price = order.money_paid
                    order.order_time = order.created_at
                    order.is_coupon = order.inv_content
                })
                return data
            },
            sureOrder(id) {
                this.$messagebox.confirm("确定收到货物了吗?").then(action => {
                    console.log("收到的商品id：" + id)
                }).catch(err => err);
                ;
            },
            delectOrder(id) {
                this.$messagebox.confirm("确定删除此订单吗?").then(action => {
                    console.log("删除的商品id：" + id)
                }).catch(err => err);
                ;
            },
            refuseOrder(id) {
                this.$messagebox.confirm("确定拒绝此订单吗?").then(action => {
                    console.log("商品id：" + id)
                    this.UnDrawOrder.splice(this.UnDrawOrder.findIndex(item => item.id === id), 1)
                }).catch(err => err);
            },
            extractOrder(id) {
                if (this.lianBeiValue > 100) {
                    this.$messagebox.confirm("确定提取此订单吗?").then(action => {
                        console.log("商品id：" + id)
                        this.UnDrawOrder.splice(this.UnDrawOrder.findIndex(item => item.id === id), 1)
                        this.unSendOrders.unshift(this.unSendOrders.findIndex(item => item.id === id), 1)
                    }).catch(err => err);
                } else {
                    this.$messagebox("联数不足,无法提取")
                }
            },
            drawAllOrders(){
                this.$messagebox.confirm("确定提取全部订单吗?").then(action => {

                }).catch(err => err);
            },
            /*
            //加载全部订单
            async getOrderData(options, loadMore = false) {
                let params = {
                    page: this.page,
                    type: 'orders-list',
                    limit: options.limit
                }
                serviceBusinessOrderList(params, loadMore)
                .then(({
                           data = []
                       }) => {
                    if(loadMore) {
                        this.orders = [...this.orders, ...data]
                    } else {
                        this.orders = data
                    }
                    this.orders = this._handleData(this.orders)
                    this.page = this.page + 1
                    this.$refs.loadmore.afterLoadMore(data.length < options.limit)
                    if(options.callback) {
                        options.callback()
                    }
                })
            },
            onOrdersRefresh(callback) {
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

            //加载未付款订单
            async getUnPayOrderData(options, loadMore = false) {
                let params = {
                    page: this.unPay_page,
                    type: 'orders-list-unPay',
                    limit: options.limit,
                    payStatus: 0
                }
                serviceBusinessOrderList(params, loadMore)
                .then(({
                           data = []
                       }) => {
                    if (loadMore) {
                        this.unPayOrders = [...this.unPayOrders, ...data]
                    } else {
                        this.unPayOrders = data
                    }
                    this.unPayOrders = this._handleData(this.unPayOrders)
                    this.unPay_page = this.unPay_page + 1
                    this.$refs.loadmoreUnPay.afterLoadMore(data.length < options.limit)
                    if (options.callback) {
                        options.callback()
                    }
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
*/
            //待发货
            getUnSendOrderData(options, loadMore = false) {
                let params = {
                    page: this.unSend_page,
                    type: 'orders-unSend-list',
                    limit: options.limit,
                    shipStatus: 1
                }
                serviceBusinessOrderList(params, loadMore)
                .then(({data = []}) => {
                    if (loadMore) {
                        console.log("代发货")
                        this.unSendOrders = [...this.unSendOrders, ...data]
                    } else {
                        this.unSendOrders = data
                    }
                    this.unSendOrders = this._handleData(this.unSendOrders)
                    this.unSend_page = this.unSend_page + 1
                    console.log(data.length < options.limit )
                    this.$refs.loadmoreUnSend.afterLoadMore(data.length < options.limit)
                    if (options.callback) {
                        options.callback()
                    }
                })
            },
            unSendRefresh(callback) {
                this.unSend_page = 1
                let options = {
                    limit: 30,
                    callback: callback
                }
                this.getUnSendOrderData(options)
            },
            unSendLoadMore() {
                console.log("more")
                let options = {
                    limit: 30,
                }
                this.getUnSendOrderData(options, true)
            },

            //待收款
            async getUnRecMoneyData(options, loadMore = false) {
                let params = {
                    page: this.unRecMoney_page,
                    type: 'orders-list-unRecMoney',
                    limit: options.limit,
                    shipStatus: 1
                }
                serviceBusinessOrderList(params, loadMore)
                .then(({data = []}) => {
                    if (loadMore) {
                        this.unRecMoney = [...this.unRecMoney, ...data]
                    } else {
                        this.unRecMoney = data
                    }
                    this.unRecMoney = this._handleData(this.unRecMoney)
                    this.unRecMoney_page = this.unRecMoney_page + 1
                    this.$refs.loadmoreUnRecMoney.afterLoadMore(data.length < options.limit)
                    if (options.callback) {
                        options.callback()
                    }
                })
            },
            unRecMoneyRefresh(callback) {
                this.unRecMoney_page = 1
                let options = {
                    limit: 20,
                    callback: callback
                }
                this.getUnRecMoneyData(options)
            },
            unRecMoneyLoadMore() {
                let options = {
                    limit: 20,
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
                serviceBusinessOrderList(params, loadMore)
                .then(({data = []}) => {
                    if (loadMore) {
                        this.recOrders = [...this.recOrders, ...data]
                    } else {
                        this.recOrders = data
                    }
                    this.recOrders = this._handleData(this.recOrders)
                    this.rec_page = this.rec_page + 1
                    this.$refs.loadmoreRec.afterLoadMore(data.length < options.limit)
                    if (options.callback) {
                        options.callback()
                    }
                })
            },
            recRefresh(callback) {
                this.rec_page = 1
                let options = {
                    limit: 20,
                    callback: callback
                }
                this.getRecOrderData(options)
            },
            recLoadMore() {
                let options = {
                    limit: 20,
                }
                this.getRecOrderData(options, true)
            },

        },

    }
</script>

<style lang="scss" scoped>
    .top-box {
        min-height: .88rem;
        background: rgba(0, 144, 255, 1);
        display: flex;
        justify-content: space-around;
        align-items: center;

        > div {
            width: 30%;
            text-align: center;
        }

        p {
            text-align: center;

            &:nth-child(2) {
                font-size: .2rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                opacity: 0.4;
            }

            &:nth-child(1) {
                font-size: .28rem;
                font-family: PingFang SC;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                margin-top: .03rem;
            }
        }
    }

    .active {
        padding-top: 39px;
    }

    .nav-li {
        svg {
            width: .45rem;
            height: .45rem;
            margin-bottom: .25rem;
        }
    }

    .fixed-over {
        position: fixed;
        right: 0px;
        bottom: 2.4rem;
        min-width: .3rem;
        height: .6rem;
        background: rgba(45, 162, 255, 1);
        border-radius: .3rem 0px 0px .3rem;
        padding-left: .05rem;
        font-size: .28rem;
        color: #fff;
        line-height: .6rem;

        svg {
            width: .25rem;
            height: .6rem;
        }

        &-box2 {
            display: flex;
            padding: 0 .1rem;
        }
    }

    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 0px;
        color: #26a2ff;
        margin-bottom: -3px;
    }

    .search {
        margin-left: .65rem;
        position: absolute;
        top: 0px;
        z-index: 999;
        padding-top: .15rem;
        width: 6.5rem;
    }

    .item {
        display: flex;
        background: #fff;
        padding: .35rem .2rem;
        margin-top: .2rem;

        p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &:nth-child(3) {
                margin-bottom: .2rem;
            }
        }

        .item-box {
            width: 64%;
            font-size: .28rem;
            color: #333;
            line-height: 160%;

            a {
                color: #333;
            }

            .state {
                color: #FA5452;
                margin-bottom: .2rem;
                line-height: 180%;
            }

            .color-gray {
                color: #999999;
                font-size: .24rem;
                line-height: 190%;
            }
        }

        .item-box2 {
            border-left: 1px solid #f1f1f1;
            text-align: center;
            width: 36%;

            p {
                &:nth-child(1) {
                    margin-top: .2rem;
                    font-size: .24rem;
                }

                &:nth-child(2) {
                    font-size: .32rem;
                    color: #F2385A;
                    font-weight: bold;
                    line-height: 180%;
                }

                &:nth-child(3) {
                    margin-top: .2rem;
                    font-size: .24rem;
                    color: #5C5C5C;
                    margin-bottom: 0px;
                }

                &:nth-child(4) {
                    font-size: .22rem;
                    color: #F2385A;
                    transform: rotate(.8);
                    margin-bottom: .25rem;
                }

                &:nth-child(5) {
                    font-size: .28rem;
                    color: #fff;
                    background: #26A2FF;
                    width: 80%;
                    margin: 0 auto;
                    height: .6rem;
                    border-radius: .6rem;
                    line-height: .6rem;
                }
            }
        }
    }

    .mint-tab-item {
        color: #666;
    }
</style>
