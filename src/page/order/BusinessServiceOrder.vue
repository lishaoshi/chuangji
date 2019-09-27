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
            <mt-tab-item id="1">
                <div class="nav-li">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-extracting-${selected==1 ? '1':'0'}`"/>
                    </svg>
                    <p>待提取</p>
                </div>
            </mt-tab-item>
            <mt-tab-item id="2">
                <div class="nav-li">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-deliverGoods-${selected==2 ? '1':'0'}`"/>
                    </svg>
                    <p>待发货</p>
                </div>
            </mt-tab-item>
            <mt-tab-item id="3">
                <div class="nav-li">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-receipting-${selected==3 ? '1':'0'}`"/>
                    </svg>
                    <p>待收款</p>
                </div>
            </mt-tab-item>
            <mt-tab-item id="4">
                <div class="nav-li">
                    <svg class="icon">
                        <use :xlink:href="`#icon-ordering-receipted-${selected==4 ? '1':'0'}`"/>
                    </svg>
                    <p>已收款</p>
                </div>
            </mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected" style="min-height: 5rem;">
            <mt-tab-container-item id="1">
                <ClxsdLoadMore key="orders-list-UnDrawOrder" ref="loadmoreUnDraw" @onRefresh="unDrawRefresh" @onLoadMore="unDrawLoadMore">
                    <UnDrawCard :key="`order_drug_undraw_${index}`" :data="order" v-for="(order,index) in unRecMoney"
                                :refuseOrder="refuseOrder"
                                :extractOrder="extractOrder"
                    />
                </ClxsdLoadMore>
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
           <mt-tab-container-item id="2">
               <ClxsdLoadMore key="orders-list-unSend" ref="loadmoreUnSend" @onRefresh="unSendRefresh" @onLoadMore="unSendLoadMore">
                   <DrugOrderCard :key="`order_drug_unSend_${index}`" :data="order" :status="1" v-for="(order,index) in unSendOrders" :sureOrder="sureOrder"></DrugOrderCard>
               </ClxsdLoadMore>
           </mt-tab-container-item>
           <mt-tab-container-item id="3">
               <ClxsdLoadMore key="orders-list-unRecMoney" ref="loadmoreUnRecMoney" @onRefresh="unRecMoneyRefresh" @onLoadMore="unRecMoneyLoadMore">
                   <DrugOrderCard :key="`order_drug_unmoney_${index}`" :data="order" :status="2"  v-for="(order,index) in unRecMoney" :sureOrder="sureOrder"></DrugOrderCard>
               </ClxsdLoadMore>
           </mt-tab-container-item>

           <mt-tab-container-item id="4">
               <ClxsdLoadMore key="orders-list-rec" ref="loadmoreRec" @onRefresh="recRefresh" @onLoadMore="recLoadMore">
                   <DrugOrderCard :key="`order_factory_unSend_${index}`" :data="order" :status="3"  v-for="(order,index) in recOrders"  :delectOrder="delectOrder"></DrugOrderCard>
               </ClxsdLoadMore>
           </mt-tab-container-item>
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
                selected: '1',
                is_over: false,
                isEmpty: true,
                order_id: 0,
                orders: [], //全部订单
                unPayOrders: [], //待付款
                unSendOrders: [], //待发货
                unRecMoney: [], //待收款
                recOrders: [], //已收款
                drawOrders:[],//待提取订单
                state: 1,
                showLoading: true, //显示加载动画
                page: 1, //全部订单默认页
                unPay_page: 1, //未付款订单默认页
                unSend_page: 1, //未发货订单默认页
                unRecMoney_page: 1, //代收款默认页
                rec_page: 1, //已收款默认页
                draw_page:1,//待提取订单默认页
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
            _handleData(data,status) {
                console.log("当前："+this.selected)
                data.forEach(order => {
                    switch (status) {
                        case 0:  order.order_status_display = '待提取'
                        case 1:  order.order_status_display = '待发货'
                        case 2:  order.order_status_display = '代收款'
                        case 3:  order.order_status_display = '已付款'
                    }
                    order.pay_status = order.pay_status
                    order.id = order.id
                    let id = order.id
                    //order.companyName = order.supplier.name
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
            //代提取
            async getUnPayOrderData(options, loadMore = false) {
                let params = {
                    page: this.draw_page,
                    limit: options.limit,
                    status: 0
                }
                serviceBusinessOrderList(params, loadMore)
                    .then(({
                               data = []
                           }) => {
                        if (loadMore) {
                            this.drawOrders = [...this.drawOrders, ...data.data.orderList]
                        } else {
                            this.drawOrders = data.data.orderList
                        }
                        this.draw_page = this.draw_page + 1
                        this.$refs.loadmoreUnDraw.afterLoadMore(data.data.orderList.length < options.limit)
                        if (options.callback) {
                            options.callback()
                        }
                    })
            },
            unDrawRefresh(callback) {
                this.draw_page = 1
                let options = {
                    limit: 10,
                    callback: callback
                }
                this.getUnPayOrderData(options)
            },
            unDrawLoadMore() {
                console.log('loard')

                let options = {
                    limit: 10,
                }

                this.getUnPayOrderData(options, true)
            },
            //待发货
            getUnSendOrderData(options, loadMore = false) {
                let params = {
                    page: this.unSend_page,
                    limit: options.limit,
                    status: 1
                }
                serviceBusinessOrderList(params, loadMore)
                .then(({data = []}) => {
                    if (loadMore) {
                        console.log(data.data.orderList)
                        this.unSendOrders = [...this.unSendOrders, ...data.data.orderList]
                    } else {
                        this.unSendOrders = data.data.orderList
                    }
                    this.unSendOrders = this._handleData(this.unSendOrders,params.status)
                    this.unSend_page = this.unSend_page + 1
                    console.log(data.data.orderList.length < options.limit )
                    this.$refs.loadmoreUnSend.afterLoadMore(data.data.orderList.length < options.limit)
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
                    limit: options.limit,
                    status: 2
                }
                serviceBusinessOrderList(params, loadMore)
                .then(({data = []}) => {
                    if (loadMore) {
                        this.unRecMoney = [...this.unRecMoney, ...data.data.orderList]
                    } else {
                        this.unRecMoney = data.data.orderList
                    }
                    this.unRecMoney = this._handleData(this.unRecMoney,params.status)
                    this.unRecMoney_page = this.unRecMoney_page + 1
                    this.$refs.loadmoreUnRecMoney.afterLoadMore(data.data.orderList.length < options.limit)
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
                    limit: options.limit,
                    status: 3
                }
                serviceBusinessOrderList(params, loadMore)
                .then(({data = []}) => {
                    if (loadMore) {
                        this.recOrders = [...this.recOrders, ...data.data.orderList]
                    } else {
                        this.recOrders = data.data.orderList
                    }
                    this.recOrders = this._handleData(this.recOrders,params.status)
                    this.rec_page = this.rec_page + 1
                    this.$refs.loadmoreRec.afterLoadMore(data.data.orderList.length < options.limit)
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
