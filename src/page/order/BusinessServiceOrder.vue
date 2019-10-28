<template>
    <div id="MyBussinessOrder">
        <div class="top-box" :class="{ active: isFullScreen }">
            <div>
                <p>{{drawValue}}</p>
                <p>未提取(个)</p>
            </div>
            <div>
                <router-link to="/lianshu">
                    <p>{{lianShuValue| display_price}}</p>
                    <p>联数(包)</p>
                </router-link>
            </div>
            <div>
                <p>{{daikuanValue| display_price}}</p>
                <p>货款(元)</p>
            </div>
        </div>

        <div class="orderType">
            <div class="nav-li" v-for="(item, index) of data" :key="index" @click="chooseOrderType(index, item)">
                <svg class="icon">
                    <use :xlink:href="`${item.icon}${currentIndex==index ? '1':'0'}`"/>
                </svg>
                <p :style="{color: `${currentIndex==index?'#0090FF':''}`}">{{item.title}}</p>
            </div>
        </div>

        <div v-if="orders.length>0" class="scroll">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <div class="content" ref="content">
                    <template v-if="currentIndex==0">
                        <UnDrawCard  :key="`order_drug_undraw_${index}`" :data="order" v-for="(order,index) in orders"
                            :refuseOrder="refuseOrder"
                            :extractOrder="extractOrder"
                            class="content"
                            :flag="flag"
                        />
                    </template>
                    <DrugOrderCard v-else class="content" :sureSendOrder="sureSendOrder" :key="`order_drug_unmoney_${index}`" :data="order"  v-for="(order,index) in orders" :sureOrder="sureOrder"></DrugOrderCard>
                    <div style="text-align: center;color: #999;margin-top: 10px;" v-if="allLoaded">—— 没有更多啦 ——</div>
                </div>
            </mt-loadmore>
        </div>
        <EmptyOrder v-else/>
   
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
    import {serviceBusinessOrderList, sureBusinessOrder, deleteBusinessOrder,serviceBusinessRefuseOrder,sureSendBusinessOrder,sureDrawBusinessOrder} from "@/api/businessOrder.js"

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
                pulldown: true,
                pullup: true,
                is_over: false,
                isEmpty: true,
                order_id: 0,
                orders: [], //全部订单
                state: 1,
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                daikuanValue: 0.00,
                lianShuValue: 0.00,
                drawValue:0,
                data: [
                    {
                        title: '待提取',
                        type: 1,
                        icon: '#icon-ordering-extracting-',
                        isActive: true
                    },{
                        title: '待发货',
                        type: 2,
                        icon: '#icon-ordering-deliverGoods-',
                        isActive: false
                    },{
                        title: '待收货',
                        type: 3,
                        icon: '#icon-ordering-receipting-',
                        isActive: false
                    },{
                        title: '已收货',
                        type: 4,
                        icon: '#icon-ordering-receipted-',
                        isActive: false
                    },
                ],
                currentIndex: 0,
                limit: 20,
                page: 1,
                allLoaded: false,   //区分是否已经加载完成
                flag: true
            }
        },
        computed: {
            ...mapState({
                USER_TYPE: state => state.CURRENTUSER.data.user_type,
            })
        },
        mounted() {
            this.$nextTick().then(()=>{
            })
            
        },
        watch: {
            selected(newValue, oldValue) {
                this.page = 1
                this.unPay_page= 1
                this.unSend_page = 1
                this.draw_page = 1
                this.rec_page = 1
                let options = {
                    limit: 20
                } 
                switch (newValue) {
                    case "1":
                        // debugger
                        // console.log(123)
                        this.getDrawOrderData(options)
                        break;
                    case "2":
                        this.getUnSendOrderData(options)
                        break;
                    case "3":
                        this.getUnRecMoneyData(options)
                        break;
                    case "4":
                        this.getRecOrderData(options)
                        break;
                    default:
                        break;
                }
            }
        },
        created(){
            this.initData()
             let options = {
                    limit: 20
                }
                this.getOrderList()
            // console.log(this.$refs, 'hello')
        },

        methods: {
            initData(callback){
                this.$http.get('hippo-shop/business/dataStatistics')
                .then(response => {
                    const { data } = response.data;
                    this.drawValue = data.unExtractInfo.count;
                    this.daikuanValue = data.unExtractInfo.sum
                    this.lianShuValue = data.unExtractInfo.supplier_lianbei
                    if(callback){
                        callback();
                    }
                }).catch(err => {

                })
               
            },

            // 上拉刷新
            loadBottom() {
                // console.log(123)
                this.getOrderList()
            },
            // 下拉刷新
            loadTop() {},
            async chooseOrderType(index, item) {
                this.page = 1
                
                // debugger
                await this.getOrderList(item.type)
                this.currentIndex = index
                this.flag = !this.flag
            },
            onPullStart() {
            },
            dowm(vale) {
            },
            _handleData(data,status) {
                data.forEach(order => {
                    switch (status) {
                        case 0:  order.order_status_display = '待提取'
                        case 1:  order.order_status_display = '待发货'
                        case 2:  order.order_status_display = '待收款'
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
            sureSendOrder(id) {
                this.$messagebox.confirm("确定发送货物了吗?").then(action => {
                    sureSendBusinessOrder(id).then(res=>{
                        this.orders.splice(this.orders.findIndex(item => item.id === id), 1)
                        this.$toast("发送成功")
                    }) 
                }).catch(err => err);
                ;
            },
            delectOrder(id) {
                this.$messagebox.confirm("确定删除此订单吗?").then(action => {
                }).catch(err => err);
            },
            async refuseOrder(id) {
                this.$messagebox.confirm("确定拒绝此订单吗?").then(action => {
                     serviceBusinessRefuseOrder(id).then((res)=>{
                         if(res.data.code==200) {
                             this.initData()
                            this.orders.splice(this.orders.findIndex(item => item.id === id), 1)
                            this.$toast("已拒绝")
                         } else {
                             this.$toast(res.data.message)
                         }
                         
                     }).catch()
                    
                }).catch(err => err);
            },
            async extractOrder(id,nums) {
                   await this.$messagebox.confirm("确定提取此订单吗?").then(action => {
                        sureDrawBusinessOrder(id).then(res => {
                            if(res.data.code === 200) {
                                 this.initData()
                                this.orders.splice(this.orders.findIndex(item => item.id === id), 1)
                                this.$toast("提取成功")
                            }else if(res.data.code === 203){
                                this.$toast(res.data.message)
                            }
                        }).catch(error => {
                        })
                    }).catch(err => err);
                    // this.orders.splice()
            },
            drawAllOrders(){
                this.$messagebox.confirm("确定提取全部订单吗?").then(action => {

                }).catch(err => err);
            },
            sureOrder(){

            },

            // 获取订单数据
            async getOrderList(type=1) {
                let params = {
                     page: this.page,
                    limit: this.limit,
                    status: type
                }
                this.allLoaded = false
                await serviceBusinessOrderList(params)
                    .then(({
                               data = []
                           }) => {
                            if(this.page==1) {
                                this.orders = data.data.orderList
                            } else {
                                this.orders = [...this.orders, ...data.data.orderList]
                                this.$refs.loadmore.onBottomLoaded()
                            }
                        
                        this.orders.forEach((item, index, arr)=>{
                            // let data = this.$mount.format()
                            arr[index].time = this.handleTime(item.created_at_int)
                            arr[index].client_supplierName = arr[index]?arr[index].client_supplier?arr[index].client_supplier.name:'':''
                        })
                        if(data.data.orderList.length<=0) {
                            this.allLoaded = true   
                        }
                    })
                    this.page++
            },
            
            // 处理下单时间函数
            handleTime(time) {
                time = time*1000
                let dade = new Date(time)
                let y = dade.getFullYear()
                let m = dade.getMonth()+1
                let d = dade.getDate()
                let h = dade.getHours()>=10?dade.getHours():'0'+dade.getHours()
                let ms = dade.getMinutes()<10?'0'+dade.getMinutes():dade.getMinutes()
                let ss = dade.getSeconds()
                return `${y}-${m}-${d} ${h}:${ms}`
            }
        },
    }
</script>

<style lang="scss" scoped>
.scroll {
    position: absolute;
    left: 0;
    right: 0;
    top: 2.88rem;
    bottom: 1.1rem;
    overflow: auto;
}
    .top-box {
        // min-height: .88rem;
        height: 1.28rem;
        background: rgba(0, 144, 255, 1);
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        z-index: 10;
        padding: .2rem 0;
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
        padding-top: .4rem;
    }

    .nav-li {
        svg {
            width: .45rem;
            height: .45rem;
            margin-bottom: .25rem;
        }
        display: flex;
        align-items: center;
        flex-direction: column;
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

<style lang="scss" scoped>
    .orderType {
        display: flex;
        justify-content: space-around;
        background: #fff;
        height: 1.6rem;
        align-items: center;
        position: relative;
        z-index: 10;
    }
</style>