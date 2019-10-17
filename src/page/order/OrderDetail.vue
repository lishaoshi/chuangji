<template>
	<div id="OrderDetail">
		<clxsd-head-top :title='`订单详情`'></clxsd-head-top>
		<div class="state">
			<!-- <div>剩余时间30分钟</div> -->
			<div>{{order_status_display}}</div>
		</div>
        <div class="company-detail">
            <router-link :to="`/factory/shop/${data.supplier_id}`">
                <img :src="supplier_logo">
                <span>{{ supplier_name }}</span>
                <svg>
                    <use xlink:href="#icon-my-enter"></use>
                </svg>
            </router-link>
        </div>
		<div class="content">
			<div class="item" v-for="(item,index) in items">
				<div>
					<img :src="item.entity.cover" class="item-img">
				<!-- <div class="item-box"> -->
					<div>
						<div>{{item.entity_name}}</div>
						<div>
							￥{{item.entity.price}}/{{item.entity.unit}}
						</div>
					</div>
				</div>
				
					
					<div>
						<span>
							x{{item.num}}
						</span>
					</div>
			</div>
		</div>

		<div class="priceBox">
			<div>
				<span>数量</span>
				<span>{{this.nums}}</span>
			</div>
			<div>
				<span>应付</span>
				<span>￥{{this.data.order_amount}}</span>
			</div>
		</div>
        <div class="height1"></div>
        <div class="content">
            <ul class="order-ul">
                <li><b>下单企业：</b><span>{{supplier_name}}</span></li>
                <li><b>收 &nbsp;货 &nbsp;人：</b><span>{{data.consignee}} &nbsp;<small>{{data.tel}}</small></span></li>
                <li><b>收货地址：</b><span>{{order_address}}</span></li>
                <li><b>订单编号：</b><span>{{data.order_sn}}</span></li>
                <li><b>下单时间：</b><span>{{data.created_at}}</span></li>
                <li v-if="data.pay_status === 1"><b>付款时间：</b><span>{{data.pay_at}}</span></li>
                <li v-if="data.pay_status === 1&&data.shipping_status === 2"><b>收货时间：</b><span>{{data.confirm_at}}</span></li>
            </ul>
        </div>
		<div class="foot-fade"></div>

		<!-- 终端底部按钮内容 -->
		<div class="footer-box" v-if="userType==3">

			<div>
				<div class="btn" v-if="data.order_status=== 3 || data.order_status=== 2 " @click="confirmGoods">确认收货</div>
			</div>

			<div>
				<div class="btn" v-if="data.order_status=== 0" @click="goComfirm">去支付</div>
			</div>
		</div>

		<!-- 商业底部按钮内容 -->
		<div class="footer-box" v-if="userType==2">
			<div>
				<div class="btn" v-if="data.order_status=== 2" @click="sureOrder">确认发货</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Spread from "../Spread";
	import {sureSendBusinessOrder} from "@/api/businessOrder.js"
	import { orderPay } from "@/api/businessOrder"
	import { mapState } from 'vuex'
    export default {
		name: "OrderDetail",
        components: {Spread},
        data() {
			return {
			    data:[],
				orderId: null,
				order_status_display: '待付款',
				order_num: 0,
				original_price: null,
				order_sn: null,
				order_time: null,
				order_address: null,
				info: null,
				tel: null,
				name:null,
				pay_price: null,
				is_coupon: null,
				items: [],
				supplier_name: null,
                supplier_logo: '',
				nums: 0,
				pay_status:0,
                shopId:0
				
			}
		},
		computed: {
			...mapState({
				userType: state=>state.CURRENTUSER.data.user_type
			})
		},
		created() {
			this.orderId = this.$route.params.id;
			this._initData();
		},
		methods: {
			async _initData() {
				const {
					data
				} = await this.$http.get(`hippo-shop/business/orders/${this.orderId}`)
				this.data = this._handleData(data.data.order)
			},
			goComfirm() {
				 this.$messagebox.confirm('',{
                    title: '提示',
                    message: '确认支付吗？',
                }).then(res=>{
                    if(res=='confirm') {
                        orderPay(item.id).then(()=>{
                            this.$toast('支付成功')
                        })
                    }
                })
			},
			_handleData(data) {
				console.log(data)
                    if(data.order_status === 0)this.order_status_display = '未支付'
                    if(data.order_status === 1)this.order_status_display = '待提取'
                    if(data.order_status === 2)this.order_status_display = '待发货'
					if(data.order_status === 3)this.order_status_display = '待收货'
					if(data.order_status === 4)this.order_status_display = '已收货'
					if(data.order_status === 5)this.order_status_display = '已拒绝'
					if(data.order_status === 6)this.order_status_display = '已退款'
				this.order_address = data.province + data.city + data.district + data.address
				this.items = data.items
				this.items.forEach(item => {
					if(this.items.length == 1) {
						this.nums = 1
						// return
					} else {
						this.nums = item.num + this.nums
					}
				})
				this.supplier_name = data.supplier.name
                this.supplier_logo = data.supplier.logo
                return data
			},
			sureOrder: function() {
				this.$messagebox.confirm("确定要发货了吗?").then(action => {
					  sureSendBusinessOrder(this.orderId)
						this.$router.go(-1)
				});
			},
			// delectOrder: function() {
			// 	this.$messagebox.confirm("确定删除此订单吗?").then(action => {
			// 			console.log(action);
			// 	});
			// },
			async confirmGoods() {
				this.$messagebox.confirm("确认收货吗?").then(action => {
						// console.log(action);
						sureBusinessOrder(this.orderId).then(res=>{
							// if(res.data.data)
							this.$toast('收货成功')
						})
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	#OrderDetail {
		width: 100%;
		overflow-x: hidden;
	}
	
	.state {
		display: flex;
		font-size: .24rem;
		text-align: right;
		height: .6rem;
		align-items: center;
		justify-content: space-between;
		padding: 0 .24rem;
		flex-direction: row-reverse;
		div:last-child {
			color: #F2385A;
		}
		// color: #F2385A;
		// padding: .1rem .2rem;
	}
	
	.content {
		background: #fff;
        padding: 0 .3rem;
	}
	
	.item {
		display: flex;
		background: #fff;
	
		padding: .34rem;
		border-radius: .1rem;
        border-bottom: 1px solid #f1f1f1;
		justify-content: space-between;
		& >  div:nth-child(1) {
			display: flex;
			// flex-direction: column;
			// justify-content: space-around;
			
			// align-items: center;
			div {
				margin-left: .3rem;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}
		}
		& > div:last-child {
			display: flex;
			align-items: flex-end;
			margin-bottom: .08rem;

		}
	}
	
	.item-img {
		width: 1.3rem;
		height: 1.3rem;
	}
	
	.selling {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: .2rem;
	}
	
	.selling .unit_price {
		font-size: 10px;
		color: rgb(102, 102, 102);
	}
	
	.selling .unit_price .font {
        color: #333333;
		font-size: .28rem;
		small {
			font-size: .24rem;
			padding-left: 2px;
		}
	}
	
	.item-box {
		width: 82%;
		padding-left: 3%;
		padding-top: .1rem;
		// display: flex;
		.title {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			font-size: .3rem;
			color: #333;
		}
	}
	
	.gw_num {
		width: 50px;
		height: 20px;
		background: #fff;
		text-align: center;
		color: #5C5C5C;
		font-size: 12px;
		line-height: 20px;
	}
	
	.clearfloat {
		clear: both;
	}
	
	.mint-cell {
		border-bottom: 1px solid #f1f1f1;
		margin-left: .2rem;
		margin-right: .2rem;
	}
	
	.height1 {
		height: .2rem;
		background: #F1F1F1;
	}
	
	.no-coupon {
		text-align: right;
		padding-right: 15px;
		color: #F2385A;
		margin-top: .1rem;
	}
	.order-ul {
		background: #fff;
		padding: .1rem .1rem;
		li {
			font-size: .28rem;
			height: .76rem;
            line-height: .76rem;
			b {
				
			}
			small {
				font-size: .24rem;
				color: #666;
			}
		}
	}
	.foot-fade {
		height: 1.4rem;
	}
	.footer-box {
		position: fixed;
		background: #fff;
		border-top: 1px solid #f1f1f1;
		padding: .2rem;
		width: 100%;
		bottom: 0px;
		text-align: right;
		.btn {
			display: inline-block;
			width: 1.8rem;
			height: .7rem;
			line-height: .7rem;
			color: #fff;
			background: #26A2FF;
			border-radius: .7rem;
			text-align: center;
			font-size: .26rem;
			margin-left: .2rem;
		}
	}
    .company-detail {
        background: #fff;
        padding: .2rem;
        border-bottom: 1px solid #f1f1f1;
        a {
            display: flex;
            height: .5rem;
            align-items: center;
            font-size: .24rem;
            color: #333;
            img {
                width: .5rem;
                height: .5rem;
                border: 1px solid #f1f1f1;
                margin-right: .15rem;
            }
            svg {
                width: .2rem;
                height: .2rem;
                margin-left: .1rem;
            }
        }
    }
	.priceBox {
		padding: 0 .24rem;
		background: #fff;
		div {
			height: .76rem;
			display: flex;
			align-items: center;
			
		}
		div:first-child{
			// display: flex;
			font-size: .28rem;
			justify-content: space-between;
		}
		div:last-child {
			justify-content: flex-end;
			span:last-child {
				margin-left: .24rem;
				color: #FF3B30;
				font-size: .36rem;
			}
		}

	}
    .sp-right {
        li {
            span {
                float: right;
            }
        }
    }
</style>