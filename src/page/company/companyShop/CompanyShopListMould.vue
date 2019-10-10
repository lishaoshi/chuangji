<template>
	<div>
		<div class="shop">
			<!-- <ClxsdLoadMore key="orders-list" ref="loadmore" @onRefresh="onOrdersRefresh" @onLoadMore="onOrdersLoadMore"> -->
			
				<div class="list" v-for="(item,index) in items">
					<router-link :to="`/business/shop/${businessId}/${item.id}?num=${item.num}`">
						<img :src="item.cover" class="list-img" />
						<p class="list-title">{{item.good_name}}</p>
					</router-link>
					<p class="p1">{{title}}</p>
					<p class="p1">规格:{{item.spec}}</p>
					<p class="p1">效期:{{item.time}}</p>
					<div class="selling" v-if="canShow">
						<div class="unit_price">
							<p class="font"><i>￥</i><i>{{item.price}}</i><span>{{item.market_price}}</span></p>
						</div>
						<!-- <div class="gw_num"  v-if="(!item.is_multi_spec && canShow)">
							<small class="lose" @click="removeToMiniCart($event,item)" v-if="item.num > 0">
								<svg>
									<use xlink:href="#icon-factory-productList-reduce-1"></use>
								</svg>
							</small>
							<small class="error-num" 　v-if="item.num <= 0" @click="errorInfo()">
								<svg>
									<use xlink:href="#icon-factory-productList-reduce-0"></use>
								</svg>
							</small>
							<div class="num">
								<span class="amount">{{item.num || 0}}</span>
							</div>
							<small class="add" @click="addToMiniCart($event,item)">
								<svg>
									<use xlink:href="#icon-factory-productList-plus-1"></use>
								</svg>
							</small>
						</div> -->
						<!-- 商品右下角购物车 -->
						<div class="carImg">
							<!-- <img src="@/images/shop-car.png" alt="" v-if="!item.num" @click="add_shop_car(item)"> -->
							<!-- <i class="iconfont" @click="add_shop_car(item)" v-if="!item.num">icon-shop-car</i> -->
							<!-- <svg class="icon shopCart" v-if="!item.num"  @click="add_shop_car(item)" aria-hidden="true">
								<use xlink:href="#icon-shop-car"></use>
							</svg> -->
							<!-- <span>{{test}}</span> -->
							<svg class="icon shopCart" v-if="!item.num"  @click="add_shop_car(item,index)" aria-hidden="true">
								<use xlink:href="#icon-shop-car"></use>
							</svg>
							
							<!-- <svg v-else-if="userType==2" class="icon shopCart" aria-hidden="true"> 
								<use xlink:href="#icon-shop-car-0"></use> 
							</svg> -->
							<div class="controls" v-else>
								<img @click="handleNumber(item,index)" src="@/images/del_shopping.png" alt="">
								
								<div>
									<span>{{item.num}}</span>
									<span>{{item.unit}}</span>
									<!-- <span>件</span> -->
								</div>
								
								<img @click="add_shop_car(item, index)" src="@/images/add_shopping.png" alt="">
							</div>
						</div>
						
					</div>
					<div v-if="!canShow" style="color:red;">身份未认证</div>
				</div>
					<!-- </ClxsdLoadMore> -->
					<div class="clearfloat"></div>
			
		<!--<mini-company-cart ref="MiniCompanyCart"   :shop-id="businessId"></mini-company-cart>-->
			<CircleLoading v-if="loading"></CircleLoading>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import EmptyList from "@/components/EmptyList"
	import MiniCompanyCart from './MiniCompanyCart'
    import { businessEntities } from '@/api/business'
	import { Toast } from 'mint-ui';
	import { queryShopCarList, delShopCar, addShopCar, onlyDelShopCar } from '@/api/shopCar'
	//  arr[index].date = this.$moment.unix(time).format("YYYY-MM-DD")
	export default {
		name: "CompanyShopListMould",
		components: {
			EmptyList,
			MiniCompanyCart
		},
        props:["entities","businessId","title", "shopCart", "items"],
		data(){
			return{
				num:0,
				shopId:'',
                // items:[],
                loading: false,
				page:1,
				time:'',
				factoryId: this.route,  //当前商家id
				// goodsList: [],
				allLoaded: false,
				// shopCart: {}, //当前商店购物信息
			}
		},
		computed: {
			...mapState({
				//用户是否有权限看价格
                canShow:state => state.CURRENTUSER.data.shop_supplier,
				cartList: state => state.shop.BUSINESS_CART_LIST,
				userType: state => state.CURRENTUSER.data.user_type
			}),
		},

		methods: {
			...mapMutations([
				'BUSINESS_ADD_CART', 'BUSINESS_REMOVE_CART',
			]),
			async initData() {
				// this._businessEntities(false)
			},
			
			

			canOption() {
				if(!this.canShow) {
					this.$Message.error('当前用户还未审核通过');
					return false;
				}
				return true
				
			},
			// _handleData(data) {
			// 	// console.log(data, 'hello')
			// 	data.forEach((item, index,arr) => {
			// 		if(item.valid_time>0) {
			// 			let time = item.valid_time
			// 			arr[index].time = this.$moment.unix(time).format("YYYY.MM.DD")
			// 		}
			// 	})
			// 	// console.log(data)
			// 	// console.log(data, 'data')
			// 	// return data
			// },

			 // 添加至购物车
            add_shop_car(item, index) {
				this.$emit('add_shop_car', index)
                let data = {
                    supplier_id: this.businessId,
                    good_id: item.id
                }
                if(this.shopCart[item.id]) {
                    this.shopCart[item.id].num++
                     
                } else {
                    this.$set(this.shopCart, `${item.id}`, {...item})
                }
                this.cartNum = this.calculateCartNum()
                this.totalPrice = this.calculateTotalPrice()
                addShopCar(data)
			},
			
			handleNumber(item, index) {
                // console.log(item)
                // debugger
				// if(item.num <= item.order_min_num) return
				this.$emit('del_shop_cart', index)
                let data = {
                    supplier_id: this.businessId,
                    good_id: item.id
                }
                
                onlyDelShopCar(data)
                // this.shopCart[item.id].num--
                this.shopCart[item.id].num--
                // item.num--
                this.cartNum = this.calculateCartNum()
                this.totalPrice = this.calculateTotalPrice()
                
            },
			addToMiniCart(event, item) {
				console.log(item)
				if(this.canOption()) {
					this.BUSINESS_ADD_CART(item)
					item.num++
				}
			},

			// 计算总件数函数
            calculateCartNum() {
                 let num = 0;
                Object.values(this.shopCart).forEach((item, index) => {
                    // console.log(item, 'cartNum')
                    if(item&&item.num>0) {
                        num +=  +item.num;
                    }
                })
                // console.log(num, 'num')
               return num
			},
			// 计算总价格
			calculateTotalPrice() {
                 
                let total_price = 0
                Object.values(this.shopCart).forEach((item, index) => {
                    if(item&&item.num>0) {
                        total_price += item.num * item.price;
                    }
                })
                return total_price.toFixed(2)
            },
			removeToMiniCart(event, item) {
				if(this.canOption()) {
					this.BUSINESS_REMOVE_CART(item)
					item.num--
				}
			},
			showShop() {
				this.regionVisible = true;
			},
			errorInfo() {
				Toast('不能再少了，快受不了啦');
			},


			// async getOrderData(options, loadMore = false) {
			// 	let params = {
			// 		page: this.page,
			// 		limit: 20,
			// 		supplier_id:this.businessId
			// 	}
			// 	businessEntities(params, loadMore)
			// 			.then(({
			// 					   data = []
			// 				   }) => {
			// 				if(loadMore) {
			// 					this.items = [...this.items, ...data.data.recommendList]
			// 				} else {
			// 					this.items = data.data.recommendList
			// 				}
			// 				this.items = this._handleData(this.items)
			// 				this.page = this.page + 1
			// 				this.$refs.loadmore.afterLoadMore(data.data.recommendList.length < options.limit)
			// 				if(options.callback) {
			// 					options.callback()
			// 				}
			// 			})
			// },
			// onOrdersRefresh(callback) {
			// 	console.log("loading")
			// 	this.page = 1
			// 	let options = {
			// 		limit: 20,
			// 		callback: callback
			// 	}
			// 	this.getOrderData(options)
			// },
			// onOrdersLoadMore() {
			// 	console.log("more")
			// 	let options = {
			// 		limit: 20,
			// 	}
			// 	this.getOrderData(options, true)
			// },


		}
	}
</script>

<style lang="scss" scoped>
	.info {
		text-align: center;
		font-size: .24rem;
		color: #666666;
		line-height: 300%;
	}
	.p1 {
        font-size:.2rem;
        font-weight:500;
        color:rgba(153,153,153,1);
        line-height:.42rem;
    }
	.shop-list {
		display: flex;
		height: 40px;
		padding: 0 10px;
		font-size: 14px;
		border-bottom: 1px solid #f1f1f1;
		justify-content: space-between;
		line-height: 40px;
		.title {
			width: 60%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			height: 40px;
		}
		.price {
			color: #F30000;
			width: 20%;
			text-align: center;
		}
		.gw_num {
			margin-top: 10px;
		}
	}
	
	.shop {
		padding: .05rem;
	}
	
	.list {
		position: relative;
		float: left;
		width: 3.5rem;
		padding: .2rem;
		border-right: 1px solid #f5f5f5;
		border-bottom: 1px solid #f5f5f5;
        background: #fff;
		font-size: 12px;
        margin-right: .1rem;
        margin-left: .1rem;
        margin-bottom: .2rem;
        border-radius: 5px;
		&:nth-child(even) {
			border-right: 0px;
		}
		.list-img {
			width: 100%;
			height: 2.6rem;
		}
		.list-title {
			white-space: normal;
			overflow: hidden;
			font-size: 14px;
			line-height: 180%;
			color: #333;
		}
	}
	
	.selling {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: .2rem;
		 .carImg {
            float: right;
            height: .54rem;
            .shopCart {
                width: 30px;
                height: 30px;
            }
            .controls {
                padding: 0 .12rem;
                display: inline-flex;
                align-items: center;
                background: #F5F5F5;
                border-radius: .16rem;
                height: 100%;
                & > div {
                    margin: 0 .2rem;
                    display: flex;
                }
                .shopCart,img {
                    width: .2rem;
                    height: .2rem
                }
                
        }
        }
	}
	
	.selling .unit_price {
		font-size: 10px;
		color: rgb(102, 102, 102);
	}
	
	.selling .unit_price .font {
		color: rgb(255, 59, 48);
		font-size: 14px;
		span {
			color: #ccc;
			font-size: 10px;
			text-decoration: line-through;
			margin-left: 5px;
            display: block;
            line-height: 1;
		}
	}
	/*加减*/
	
	.gw_num {
        width:1.4rem;
        height:.54rem;
        background:rgba(245,245,245,1);
        border-radius:.27rem;
		display: flex;
		align-items: center;
		text-align: center;
        line-height: .54rem;
		.lose {
			color: #26A2FF;
		}
		.error-num {
			color: #666;
            font-weight: bold;
		}
        svg {
            width: .22rem;
            height: .22rem;
        }
	}
	
	.gw_num small {
		color: #7A7979;
		cursor: pointer;
		font-size: 17px;
		flex: 1;
		font-style: normal;
	}
	
	.gw_num .add {
		color: #26A2FF;
        font-weight: bold;
	}
	
	.shop_num small {
		color: rgb(45, 162, 255);
	}
	
	.gw_num .num {
		font-style: normal;
		font-size: 14px;
		color: #333;
	}
	
	.gw_num .num input {
		text-align: center;
	}
	
	.clearfloat {
		clear: both;
	}
	.empty {
		padding-top: 1.5rem;
	}
</style>