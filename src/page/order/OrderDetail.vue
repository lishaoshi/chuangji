<template>
	<div id="OrderDetail">
		<clxsd-head-top :title='`订单详情`'></clxsd-head-top>
		<p class="state">{{order_status_display}}</p>
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
				<img :src="item.entity.cover" class="item-img">
				<div class="item-box">
					<p class="title">{{item.entity.good_name}}</p>
					<div class="selling">
						<div class="unit_price">
							<p class="font"><i>￥</i><i>{{item.price}}</i><small>/{{item.entity.big_unit}}</small></p>
						</div>
						<div class="gw_num">&Chi;{{item.num}}/{{item.entity.big_unit}}</div>
					</div>
				</div>
			</div>
            <ul class="order-ul sp-right">
                <li v-if="this.items.length>1"><b>件数：</b><span>{{nums}}</span></li>
                <li><b>原 价：</b><span>{{data.order_amount}}</span></li>
                <li><b>使用优惠券：</b><span>没有使用优惠券</span></li>
                <li><b>实际支付：</b><span style="color: #ff3b30;font-size: .34rem;font-weight: bold">￥{{data.money_paid}}</span></li>
            </ul>
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
		<div class="footer-box">
			<div v-if = "data.pay_status == 0">
				<div class="btn">去付款</div>
			</div>
			<div v-else>
				<div class="btn" v-if="data.shipping_status=== 1" @click="sureOrder">确认收货</div>
				<div class="btn" v-if="data.shipping_status === 2"  @click="delectOrder">删除订单</div>
				<div class="btn">再来一单</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Spread from "../Spread";
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
		created() {
			this.orderId = this.$route.params.id;
			this._initData();
		},
		methods: {
			async _initData() {
				const {
					data
				} = await this.$http.get(`hippo-shop/factory/orders/${this.orderId}`)
				this.data = this._handleData(data)
			},
			_handleData(data) {
				console.log(data)
				if(data.pay_status) {
				    this.order_status_display = '待收货'
                    if(data.shipping_status === 0)this.order_status_display = '未发货'
                    if(data.shipping_status === 1)this.order_status_display = '待收货'
                    if(data.shipping_status === 2)this.order_status_display = '已收货'
				}else{
                    this.order_status_display = '待付款'
                }
				this.order_address = data.province + data.city + data.district + data.address
				this.items = data.items
				this.items.forEach(item => {
					if(this.items.length == 1) {
						return
					} else {
						this.nums = item.num + this.nums
					}
				})
				this.supplier_name = data.supplier.name
                this.supplier_logo = data.supplier.logo
                return data
			},
			sureOrder: function() {
				this.$messagebox.confirm("确定已收货了吗?").then(action => {
						console.log(action);
				});
			},
			delectOrder: function() {
				this.$messagebox.confirm("确定删除此订单吗?").then(action => {
						console.log(action);
				     
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	#OrderDetail {
		width: 100%;
		overflow-x: hidden;
	}
	
	.state {
		font-size: .24rem;
		text-align: right;
		color: #F2385A;
		padding: .1rem .2rem;
	}
	
	.content {
		background: #fff;
        padding: 0 .3rem;
	}
	
	.item {
		display: flex;
		background: #fff;
		padding: .16rem .13rem;
		border-radius: .1rem;
        border-bottom: 1px solid #f1f1f1;
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
    .sp-right {
        li {
            span {
                float: right;
            }
        }
    }
</style>