<template>
	<div id="OrderDetail">
		<clxsd-head-top :title='`订单详情`'></clxsd-head-top>
        <div v-if="userType==3" class="company-detail" @click="handleToShop">
            <!-- <router-link :to="`/factory/shop/${data.supplier_id}`"> -->
			<div>
				<img :src="supplier_logo">
                <span>{{ supplier_name }}</span>
                <svg>
                    <use xlink:href="#icon-my-enter"></use>
                </svg>
			</div>
                
            <!-- </router-link> -->
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
				<span class="state">{{order_status_display}}</span>
				<div>
					<span>{{data.order_status==0?'应付': '金额'}}</span>
				<span>￥{{this.data.order_amount}}</span>
				</div>
			</div>
		</div>
        <div class="height1"></div>
        <div class="content">
			<div class="title">订单信息</div>
            <ul class="order-ul">
                <li>
					<span>下单企业：</span>
					<span>{{client_supplier}}</span>
				</li>
                <li>
					<span>
						<i class="text3">收</i>
						<i class="text3">货</i>人：</span>
					<span>{{data.consignee}} &nbsp;<small>{{data.tel}}</small></span>
				</li>
                <li>
					<span>收货地址：</span>
					<span>{{order_address}}</span>
				</li>
                <li>
					<span>订单编号：</span>
					<span>{{data.order_sn}}</span>
				</li>
                <li>
					<span>下单时间：</span>
					<span>{{data.created_at}}</span>
				</li>
                <li v-if="data.pay_status === 1">
					<span>付款时间：</span>
					<span>{{data.pay_at}}</span>
				</li>
                <li v-if="data.pay_status === 1&&data.shipping_status === 2">
					<span>收货时间：</span>
					<span>{{data.confirm_at}}</span>
				</li>
            </ul>
        </div>
		<div class="height1"></div>
		 <div class="content">
			<div class="title">发票信息</div>
			<div class="noInfo" v-if="!data.invoice_type">
				<svg>
                    <use xlink:href="#icon-lampBulb"></use>
                </svg>
				<span>你没有选择开具发票</span>
			</div>
            <ul class="order-ul" v-else>
                <li>
					<span>抬头类型：</span>
					<span>{{data.invoice_type=="dedicated"?"增值税专用发票":"增值税普通发票"}}</span>
				</li>
                <li>
					<span>发票抬头：</span>
					<span>{{title}}</span>
				</li>
                <li>
					<span>发票内容：</span>
					<span>{{contents}}</span>
				</li>
                <li>
					<span>纳税人号：</span>
					<span>{{taxpayer_no}}</span>
				</li>
				<template v-if="data.invoice_type=='dedicated'">
					<li>
						<span >
							<i class="text2">地</i>址：</span>
						<span>{{address}}</span>
					</li>
					<li>
						<span>
							<i class="text2">电</i>话：</span>
						<span>{{telephone}}</span>
					</li>
					<li>
						<span>开户银行：</span>
						<span>{{bank_name}}</span>
					</li>
					<li>
						<span>银行账号：</span>
						<span>{{bank_no}}</span>
					</li>
				</template>
				
            </ul>
        </div>
		<div class="foot-fade"></div>

		<!-- 终端底部按钮内容 -->
		<div class="footer-box" v-if="userType==3">

			<div>
				<div class="btn" v-if="data.order_status=== 3 " @click="confirmGoods">确认收货</div>
			</div>

			<div>
				<div class="btn" v-if="order_status" @click="delectOrder(data.id)">删除订单</div>
			</div>

			<div>
				<div class="btn" v-if="data.order_status!=1 " @click="handleContinuTo(data)">再来一单</div>
			</div>



			<div>
				<div class="btn" v-if="data.order_status=== 0" @click="goComfirm">货到付款</div>
			</div>
		</div>

		<!-- 商业底部按钮内容 -->
		<!-- <div class="footer-box" v-if="userType==2">
			<div>
				<div class="btn" v-if="data.order_status=== 2" @click="sureOrder">确认发货</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	import Spread from "../Spread";
	import {sureSendBusinessOrder, sureBusinessOrder, againOrder, deleteBusinessOrder} from "@/api/businessOrder.js"
	import { orderPay } from "@/api/businessOrder"
	import { mapState } from 'vuex'
    export default {
		name: "OrderDetail",
        components: {Spread},
        data() {
			return {
			    data:[],
				orderId: null,
				order_status_display: '待提取',
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
				shopId:0,
				client_supplier: ''
				
			}
		},
		computed: {
			...mapState({
				userType: state=>state.CURRENTUSER.data.user_type
			}),
			order_status() {
				if(this.data.order_status&&(this.data.order_status!=2 && this.data.order_status!=3 && this.data.order_status!=1)) return true
				return false
			},
			// 发票抬头
			title() {
				return this.isObject(this.data.invoice)&&this.data.invoice.title
			},
			// 发票明细
			contents() {
				return this.isObject(this.data.invoice)&&this.data.invoice.contents
			},
			// 纳税人号
			taxpayer_no() {
				return this.isObject(this.data.invoice)&&this.data.invoice.taxpayer_no
			},
			address() {
				return this.isObject(this.data.invoice)&&this.data.invoice.address
			},
			bank_name() {
				return this.isObject(this.data.invoice)&&this.data.invoice.bank_name
			},
			bank_no() {
				return this.isObject(this.data.invoice)&&this.data.invoice.bank_no
			},
			telephone() {
				return this.isObject(this.data.invoice)&&this.data.invoice.telephone
			}
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
                    message: '确认货到付款？',
                }).then(res=>{
                    if(res=='confirm') {
                        orderPay(this.orderId).then(()=>{
							this.$toast('支付成功')
							this.$router.go(-1)
                        })
                    }
                })
			},

			// 判断对象是否存在，并且不等于{}、null
			isObject(obj) {
				return obj&&obj.toString()!="{}"
			},
			_handleData(data) {
                    if(data.order_status === 0)this.order_status_display = '待付款'
                    if(data.order_status === 1&&data.diff_seconds>0){
						this.order_status_display = '待提取' 
					} else if(data.order_status === 1&&data.diff_seconds<=0) {
						data.order_status = 6
					}
                    if(data.order_status === 2 &&  this.userType == 2)this.order_status_display = '待发货'
					if((data.order_status === 3 || data.order_status === 2) &&  this.userType == 3)this.order_status_display = '待收货'
					if(data.order_status === 4)this.order_status_display = '已收货'
					if(data.order_status === 5)this.order_status_display = '已拒绝'
					if(data.order_status === 6)this.order_status_display = '已超时'
				this.order_address = data.province + data.city + data.district + data.address
				this.items = data.items
				this.items.forEach(item => {
						this.nums = item.num + this.nums
				})
				this.supplier_name = data.supplier.name
				this.client_supplier = data.client_supplier.name
                this.supplier_logo = data.supplier.img_cover
                return data
			},
			sureOrder: function() {
				this.$messagebox.confirm("确定要发货了吗?").then(action => {
					  sureSendBusinessOrder(this.orderId)
						this.$router.go(-1)
				});
			},
			  // 再来一单
            async handleContinuTo(data) {
                await againOrder(data.id).catch(err=>{
                    this.$toast('商品已经下架')
                })
                this.$router.push('/factory/cart')
			},
			// 删除订单
			delectOrder(id) {
                this.$messagebox.confirm('确认删除此订单吗？').then(res=>{
                    if(res=='confirm') {
                        deleteBusinessOrder(id).then(res=>{
                            this.$emit('delSccess', this.orderKey)
							this.$toast('删除成功')
							this.goBack()
                        })
                    }
                })
            },
			// delectOrder: function() {
			// 	this.$messagebox.confirm("确定删除此订单吗?").then(action => {
			// 			console.log(action);
			// 	});
			// },
			async confirmGoods() {
				this.$messagebox.confirm("确认收货吗?").then(action => {
						sureBusinessOrder(this.orderId).then(res=>{
							// if(res.data.data)
							this.data.order_status = 4
							this.$toast('收货成功')
						})
				});
			},
			handleToShop() {
				// debugger
				if(this.data.supplier.type==2) {
					this.$router.push({path: '/business-shop', query: {id: this.data.supplier_id}})
				}
				 else if(this.data.supplier.type == 1) {
					this.$router.push({path: `/factory/shop${this.data.supplier_id}`})
				}
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
		font-size: .36rem;
		// color: #F2385A;
		color: #FD4912;
	}
	
	.content {
		background: #fff;
        padding: 0 .3rem;
		border-radius: 8px;
		.title {
			line-height: .6rem;
			font-size: .28rem;
			color: #333;
			display: flex;
			align-items: center;
			&::before {
				content: '';
				background-color: #0090FF;
				display: inline-block;
				height: .3rem;
				// line-height: .6rem;
				width: 2px;
				margin-right: .1rem;
			}
		}
		.noInfo {
			color: #644f1b;
			font-size: .28rem;
			width: 100%;
			margin: .4rem 0;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			height: .8rem;
			background: linear-gradient(to right, #feeec4, #f2dca0);
			svg {
				width: .4rem;
				height: .4rem;
				margin-right: .14rem;
			}
		}
		.text2 {
			letter-spacing: 2em;
			// margin-right: -2em;
		}
		.text3 {
			letter-spacing: 0.5em;
			// margin-right: -0.5em;
		}
	}
	
	.item {
		display: flex;
		background: #fff;
	
		padding: .34rem 0;
		border-radius: .1rem;
        border-bottom: 1px solid #f5f5f5;
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
			// height: .76rem;
            // line-height: .76rem;
			padding: .2rem 0;
			display: flex;
			span {
				display: block;
			}
			span:first-child {
				min-width: 25%;
				// flex:0 1 25%;
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
		// padding: .2rem;
		width: 100%;
		bottom: 0px;
		text-align: right;
		display: flex;
		justify-content: flex-end;
		.btn {
			display: inline-block;
			margin: .2rem;
			margin-left: 0;
			width: 1.8rem;
			height: .7rem;
			line-height: .7rem;
			color: #fff;
			background: #26A2FF;
			border-radius: .7rem;
			text-align: center;
			font-size: .26rem;
		}
	}
    .company-detail {
        background: #fff;
        padding: .2rem;
        border-bottom: 1px solid #f1f1f1;
        div {
            display: flex;
            height: .5rem;
            align-items: center;
            font-size: .24rem;
            color: #333;
            img {
                width: .5rem;
                height: .5rem;
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
			justify-content: space-between;
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