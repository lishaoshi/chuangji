<template>
	<div>
		<div class="shop">
			<!-- <ClxsdLoadMore key="orders-list" ref="loadmore" @onRefresh="onOrdersRefresh" @onLoadMore="onOrdersLoadMore"> -->
				<div class="list" v-for="(item,index) in items">
					<router-link :to="`/business/shop/${businessId}/${item.id}?num=${item.num}`">
						<img :src="item.cover" class="list-img" />
						<div class="list-title">{{item.good_name}}</div>
					</router-link>
					<p class="p1">{{item.brandName}}</p>
					<p class="p1">规格:{{item.spec}}</p>
					<p class="p1">效期:{{item.time}}</p>
					
					<div class="selling" v-if="canShow">
						<div class="unit_price">
							<p class="font">
								<i>￥</i>
								<i>{{item.price}}</i>
								<span v-if="parseInt(item.market_price)!=0">{{item.market_price}}</span></p>
						</div>
						<!-- 商品右下角购物车 -->
						<div class="carImg">
							<svg class="icon shopCart" v-if="!item.num"  @click="add_shop_car(item,index)" aria-hidden="true">
								<use xlink:href="#icon-factory-addPrice"></use>
							</svg>
							<div class="controls" :class="{baColor:item.isSelfChoose }" v-else>
								<div class="imgBox" @click="handleNumber(item,index)">
									<img src="@/images/del_shopping.png" alt="">
								</div>
								
								<div class="num" @click="handleChoose(item, index)">
									<template v-if="!item.isSelfChoose">
										<span>
											{{item.num}}
										</span>
										<span style="color: #999;">
											{{item.unit}}
										</span>
									</template>
									<template v-else>
										
										<form action="" class="input_warp">
											<!-- <span>
											{{item.num}}
										</span> -->
											<input v-focus pattern="[0-9]*" @input="handleInput($event)" @keyup.enter="handleBlur($event, item, index)" @blur="handleBlur($event, item, index)" ref="cart" type="number" :value="item.num">
										</form>
									</template>
									
								</div>
								<div class="imgBox" @click="add_shop_car(item, index)">
									<img src="@/images/add_shopping.png" alt="">
								</div>
								
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
				isSelfChoose: false, //默认不是通过输入加入购物车
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
			// 点击选择软键盘加入购物车
			handleChoose(item, index) {
				this.$emit('updateSlefChoss', true, index)
			},

			// 处理输入框失去焦点触发
			handleBlur(event, item, index) {
				if(Number.isInteger(parseInt(event.target.value))&&(event.target.value < item.order_min_num)) {
					this.$toast(`最小订货量为${item.order_min_num}`)
					this.$emit('handleBlur',false, index, item)
					return false
				}
				// 如果event.target.value是空，则不改变数值
				if(!event.target.value ||　(event.target.value === item.num)) {
					this.$emit('handleBlur',false, index)
					return false
				}
				let data = {
					supplier_id: this.businessId,
					good_id: item.id,
					num: event.target.value
				}
				addShopCar(data)
				// debugger
				this.$emit('handleBlur', true, index, event.target.value, item)
			},

			// 限制input只可以输入五位数
			handleInput(event) {
				if(event.target.value.length > 5) {
					event.target.value = event.target.value.substring(0, 5)
					return true
				}
			},

            add_shop_car(item, index) {
				// console.log(item)
				if(item.num>=99999) {
					this.$toast('最大购买量为99999')
					return false
				}
				this.$emit('add_shop_car', index, item)
                let data = {
                    supplier_id: this.businessId,
                    good_id: item.id
                }
                addShopCar(data)
			},
			handleNumber(item, index) {
				// debugger
				this.$emit('del_shop_cart', index, item)
                let data = {
                    supplier_id: this.businessId,
                    good_id: item.id
                }
                
                onlyDelShopCar(data)
            },
			addToMiniCart(event, item) {
				if(this.canOption()) {
					this.BUSINESS_ADD_CART(item)
					item.num++
				}
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
        font-size:.24rem;
        font-weight:500;
        color:rgba(153,153,153,1);
        line-height:.42rem;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
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
		display: flex;
		flex-wrap: wrap;
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
        margin-top: .2rem;
        border-radius: 5px;
		&:nth-child(even) {
			border-right: 0px;
		}
		&:nth-child(-n+2){
			margin-top: 0;
		}
		.list-img {
			width: 100%;
			height: 2.6rem;
		}
		.list-title {
			font-size: 14px;
			line-height: 180%;
			color: #333;
			overflow:hidden; //超出的文本隐藏
			text-overflow:ellipsis; //用省略号显示
			white-space:nowrap; //不换行
		}
	}
	
	.selling {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: .2rem;
		 .carImg {
            .shopCart {
                width: 30px;
                height: 30px;
            }
			.imgBox {
				border-radius: 50%;
				height: .4rem;
				width: .4rem;
				background: #F5F5F5;
				// text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
			}
            .controls {
                // padding: 0 .12rem;
                display: flex;
                align-items: center;
                height: 100%;
				&.baColor{
					background: #f5f5f5;
					border-radius: .24rem;
				}
				.num {
					padding: .04rem;
					// display: flex;
					flex:1;
					display: flex;
					.input_warp {
						// flex:1;
						display: flex;
					}
					input {
						width: .76rem;
						// width: 100%;
						background: #f5f5f5;
						text-align: center;
					}
				}
                .shopCart,img {
                    width: .2rem;
                    height: .2rem
                }
				.goodsUnit {
					font-size: .08rem!important;
					color: #999;
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