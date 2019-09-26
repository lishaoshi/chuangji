<template>
	<div>
		<div class="shop" v-if="items.length>0">
			<div class="list" v-for="(item,index) in items">
				<router-link :to="`/business/shop/${businessId}/${item.id}`">
					<img :src="item.cover" class="list-img" />
					<p class="list-title">{{item.good_name}}</p>
				</router-link>
                <p class="p1">{{title}}</p>
                <p class="p1">{{item.spec}}</p>
				<div class="selling" v-if="canShow">
					<div class="unit_price">
						<p class="font"><i>￥</i><i>{{item.price}}</i><span>{{item.market_price}}</span></p>
					</div>
					<div class="gw_num"  v-if="(!item.is_multi_spec && canShow)">
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
					</div>
				</div>
			</div>
			<div class="clearfloat"></div>
		</div>
		<EmptyList  v-if="items.length==0 && loading == false"></EmptyList>
		<!--<mini-company-cart ref="MiniCompanyCart"   :shop-id="businessId"></mini-company-cart>-->
        <CircleLoading v-if="loading"></CircleLoading>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import EmptyList from "@/components/EmptyList"
	import MiniCompanyCart from './MiniCompanyCart'
    import { businessEntities } from '@/api/business'
	import { Toast } from 'mint-ui';
	
	export default {
		name: "CompanyShopListMould",
		components: {
			EmptyList,
			MiniCompanyCart
		},
        props:["entities","businessId","title"],
		data(){
			return{
				num:0,
				shopId:'',
                items:[],
                loading: true,
			}
		},
		mounted() {
			this.initData()
		},
		computed: {
			...mapState({
				//用户是否有权限看价格
                canShow:state => state.CURRENTUSER.shop_supplier,
				cartList: state => state.shop.BUSINESS_CART_LIST
			}),
			//当前商店购物信息
			shopCart() {
				return { ...this.cartList[this.businessId]
				}
			},
			
		},

		methods: {
			...mapMutations([
				'BUSINESS_ADD_CART', 'BUSINESS_REMOVE_CART',
			]),
			async initData() {
				//this.entities = this._handleData(this.entities);
				const { data } = await businessEntities(this.businessId)
                this.items = this._handleData(data)
                this.loading = false
                console.log(this.items)
			},
			canOption() {
				if(!this.canShow) {
					this.$Message.error('当前用户还未审核通过');
					return false;
				}
				return true
				
			},
			_handleData(data) {
				//console.log(data)
				data.forEach((item, index) => {
					item.shopId = this.businessId
					item.num = 0
					item.itemId = item.id;
                    item.price = item.price
					if(this.shopCart[item.id]) {
						item.num = this.shopCart[item.id].num
					}
				})
				return data
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
			}
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