<template>
    <div id="MyOrder">
        <div class="tab">
            <mt-navbar v-model="selected">
			<mt-tab-item id="1" >
                <div class="nav-li" @click="handleClick('')">
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
        

            <scroll
                class="wrapper"
                :pullup="pullup"
                :probeType="probeType"
                :pulldown="pulldown"
                v-if="oriderListt.length>0"
                @scrollToEnd="scrollToEnd"
                @dowm="dowm"
            >
                <div>
                    <OrderCard :key="`businsess_order_rec_${index}`" @update="updateList" :data="order" v-for="(order,index) in oriderListt"  :delectOrder="delectOrder"></OrderCard>
                </div>

            </scroll>
        
                    <!-- </div> -->
               
            <!-- </mt-loadmore> -->
        <!-- </div> -->
       
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
                oriderListt: [],//已收货
                state: '',
                allLoaded: false,    //是否已经加载全部
                limit: 15,
                page: 1,
                probeType: 1,
                pulldown: true,
                pullup: true
            }
        },
        created() {
            this.getOrderList()
        },
        methods: {
            handleClick(id) {
                this.state = id
                this.page = 1
                this.getOrderList()
                
            },
            updateList() {
                this.getOrderList()
            },
            scrollToEnd() {
                this.pullup&&this.getOrderList(false, true)
            },
            dowm(value) {
                console.log(value)
            },
            sureOrder(id) {
				this.$messagebox.confirm("确定收到货物了吗?").then(action => {
					if(action === 'confirm'){
						sureBusinessOrder(id)
						this.unSendOrders.splice(this.unSendOrders.findIndex(item => item.id === id), 1)
						this.orders.splice(this.orders.findIndex(item => item.id === id), 1)
						this.recOrders.unshift(this.recOrders.findIndex(item => item.id === id), 1)
					}
				}).catch(err => err);
			},
			delectOrder(id) {
				this.$messagebox.confirm("确定删除此订单吗?").then(action => {
					if(action === 'confirm'){
						deleteBusinessOrder(id)
						this.recOrders.splice(this.recOrders.findIndex(item => item.id === id), 1)
						this.orders.splice(this.orders.findIndex(item => item.id === id), 1)
					}
				}).catch(err => err);
            },

            // 获取订单数据
            getOrderList(top, bottom) {
                let params = {
                    page : this.page,
                    limit: this.limit,
                    status: this.state
                }
                getBusinessOrderList(params).then(res=>{
                    // console.log(res.data)
                    this.pullup = true
                    if(this.page>1) {
                         this.oriderListt = [...this.oriderListt, ...res.data.data.orderList]
                    } else {
                        this.oriderListt = res.data.data.orderList
                    }
                    if(res.data.data.orderList.length==0) {
                        console.log(res.data.data.orderList)
                        this.pullup = false
                    }
                    
                    //  top&&this.$refs.load.onTopLoaded()
                    //  bottom&&this.$refs.load.onBottomLoaded()
                     this.page++
                    // console.log( this.oriderListt)
                })
            },
            
            // 
                 
            // //加载全部订单
			// async getOrderData(options, loadMore = false) {
			// 	let params = {
			// 		page: this.page,
			// 		type: 'orders-list',
			// 		limit: options.limit
			// 	}
			// 	getBusinessOrderList(params, loadMore)
			// 		.then(({
			// 			data = []
			// 		}) => {
			// 			if(loadMore) {
			// 				this.orders = [...this.orders, ...data]
			// 			} else {
			// 				this.orders = data
			// 			}
			// 			this.orders = this._handleData(this.orders)
			// 			this.page = this.page + 1
            //             console.log(data.length < options.limit)
			// 			this.$refs.loadmore.afterLoadMore(data.length < options.limit)
			// 			if(options.callback) {
			// 				options.callback()
			// 			}
			// 		})
			// },
			// onOrdersRefresh(callback) {
			// 	this.page = 1
			// 	let options = {
			// 		limit: 10,
			// 		callback: callback
			// 	}
			// 	this.getOrderData(options)
			// },
			// onOrdersLoadMore() {
			// 	let options = {
			// 		limit: 10,
			// 	}
			// 	this.getOrderData(options, true)
			// },
			
			// //加载未付款订单
			// async getUnPayOrderData(options, loadMore = false) {
			// 	let params = {
			// 		page: this.unPay_page,
			// 		type: 'orders-list-unPay',
			// 		limit: options.limit,
			// 		payStatus: 0
			// 	}
			// 	getBusinessOrderList(params, loadMore)
			// 		.then(({
			// 			data = []
			// 		}) => {
			// 			if(loadMore) {
			// 				this.unPayOrders = [...this.unPayOrders, ...data]
			// 			} else {
			// 				this.unPayOrders = data
			// 			}
			// 			this.unPayOrders = this._handleData(this.unPayOrders)
			// 			this.unPay_page = this.unPay_page + 1
			// 			this.$refs.loadmoreUnPay.afterLoadMore(data.length < options.limit)
			// 			if(options.callback) {
			// 				options.callback()
			// 			}
			// 		})
			// },
			// unPayRefresh(callback) {
			// 	this.unPay_page = 1
			// 	let options = {
			// 		limit: 10,
			// 		callback: callback
			// 	}
			// 	this.getUnPayOrderData(options)
			// },
			// unPayLoadMore() {
			// 	console.log('loard')
			// 	let options = {
			// 		limit: 10,
			// 	}
			// 	this.getUnPayOrderData(options, true)
			// },
			
			// //待收货
			// async getUnSendOrderData(options, loadMore = false) {
			// 	let params = {
			// 		page: this.unPay_page,
			// 		type: 'orders-list-unSend',
			// 		limit: options.limit,
			// 		shipStatus: 1
			// 	}
			// 	getBusinessOrderList(params, loadMore)
			// 		.then(({
			// 			data = []
			// 		}) => {
			// 			if(loadMore) {
			// 				this.unSendOrders = [...this.unSendOrders, ...data]
			// 			} else {
			// 				this.unSendOrders = data
			// 			}
			// 			this.unSendOrders = this._handleData(this.unSendOrders)
			// 			this.unPay_page = this.unPay_page + 1
			// 			this.$refs.loadmoreUnSend.afterLoadMore(data.length < options.limit)
			// 			if(options.callback) {
			// 				options.callback()
			// 			}
			// 		})
			// },
			// unSendRefresh(callback) {
			// 	this.unPay_page = 1
			// 	let options = {
			// 		limit: 10,
			// 		callback: callback
			// 	}
			// 	this.getUnSendOrderData(options)
			// },
			// unSendLoadMore() {
			// 	let options = {
			// 		limit: 10,
			// 	}
			// 	this.getUnSendOrderData(options, true)
			// },
			
			// //已收货
			// async getRecOrderData(options, loadMore = false) {
			// 	let params = {
			// 		page: this.unPay_page,
			// 		type: 'orders-list-unSend',
			// 		limit: options.limit,
			// 		shipStatus: 2
			// 	}
			// 	getBusinessOrderList(params, loadMore)
			// 		.then(({
			// 			data = []
			// 		}) => {
			// 			if(loadMore) {
			// 				this.recOrders = [...this.recOrders, ...data]
			// 			} else {
			// 				this.recOrders = data
			// 			}
			// 			this.recOrders = this._handleData(this.recOrders)
			// 			this.rec_page = this.rec_page + 1
			// 			this.$refs.loadmoreRec.afterLoadMore(data.length < options.limit)
			// 			if(options.callback) {
			// 				options.callback()
			// 			}
			// 		})
			// },
			// recRefresh(callback) {
			// 	this.rec_page = 1
			// 	let options = {
			// 		limit: 10,
			// 		callback: callback
			// 	}
			// 	this.getRecOrderData(options)
			// },
			// recLoadMore() {
			// 	let options = {
			// 		limit: 10,
			// 	}
			// 	this.getRecOrderData(options, true)
			// },
        },
    }
</script>

<style lang="scss" scoped>
.wrapper {
    height: 9rem;
}
.tab {
    position: relative;
    z-index: 5;
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