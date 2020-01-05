<template>
    <div class="shop" style="padding: 0px;padding-top: .1rem">
        <div class="good-list" v-if="goodList.length>0">
            <mt-loadmore ref="loadmore" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false">
                <div class="list-box">
                    <div class="list" v-for="(item,index) in goodList" :key="index">
                        <!-- <mt-loadmore ref="loadmore" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false"> -->
                        <router-link :to="`/factory/shop/${factoryId}/${item.id}`">
                            <div class="list-img">
                                    <img :src="`${item.cover}?x-oss-process=image/resize,w_300,m_fixed,h_300,limit_0`" />
                                </div>
                                <div class="list-title">{{item.generic_name}}</div>
                        </router-link>
                        <!-- <p class="p1">{{item.brandName || "无"}}</p> -->
                        <p class="p1">规格:{{item.spec || '无'}}</p>
                        <p class="p1">
                            包装:{{item.tran}}{{item.unit}}/{{item.big_unit}}
                        </p>
                        <div class="selling">
                            <div class="unit_price">
                                <p class="font">
                                    <i>￥</i>
                                    <i>{{item.price}}</i>
                                    <span v-if="parseInt(item.market_price)!=0">{{item.market_price}}</span>
                                </p>
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
                                                {{item.big_unit}}
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

                            <div v-if="!canShow" style="color:red;">身份未认证</div>
                        </div>
                    </div>
                    <div class="clearfloat"></div>
                </div>
            </mt-loadmore>
        </div>
        <EmptyList  v-if="goodList.length==0 && loading == false"></EmptyList>
        <mini-shop-cart ref="miniShopCart"
                        :count="cartNum"
                        :total-price="totalPrice"
                        :shop-id="factoryId"
                        :USER_TYPE = "USER_TYPE"
                        ></mini-shop-cart>
        <CircleLoading v-if="loading"></CircleLoading>
        <mt-popup v-model="regionVisible" position="bottom" class="bottom-region" style="width:100%;padding-bottom: 50px;">
            <div class="shop_title">
                <p>已选商品</p>
                <p>清空</p>
            </div>
            <div class="shop-list">
                <div class="title">
                    维生素片维生素片维生素片维生素片维生素片维生素片维生素片
                </div>
                <div class="price">
                    2000
                </div>
                <div class="gw_num">
                    <em class="lose">-</em>
                    <div class="num">
                        <span class="amount">0</span>
                        <p>件</p>
                    </div>
                    <em class="add">+</em>
                </div>
            </div>
            <div class="shop-list">
                <div class="title">
                    维生素片维生素片维生素片维生素片维生素片维生素片维生素片
                </div>
                <div class="price">
                    2000
                </div>
                <div class="gw_num">
                    <em class="lose">-</em>
                    <div class="num">
                        <span class="amount">0</span>
                        <p>件</p>
                    </div>
                    <em class="add">+</em>
                </div>
            </div>
        </mt-popup>
    </div>
</template>

<script>
    import MiniShopCart from './MiniShopCart'
    import EmptyList from "@/components/EmptyList"
    import {supplierEntities} from '@/api/supplier'
    import {mapState, mapMutations, mapActions} from 'vuex'
    import { queryShopCarList, delShopCar, addShopCar, onlyDelShopCar } from '@/api/shopCar'
    import { MessageBox } from 'mint-ui';
    // import {  } from 'vuex'

    export default {
        name: "ShopList",
        components: {
            EmptyList,
            MiniShopCart
        },
        props: {
            factoryId: {
                type: Number,
                required: true,
            },
            USER_TYPE: {
                type: Number,
                required: true,
            },
            searchValue: {
                type: String,
                default: ""
            }
        },

        data() {
            return {
                goodList: [],
                goodsList: {},
                regionVisible: false,
                loading:true,
                shopCart: [],
                cartNum: 0,  //总件数
                totalPrice: '',   //总金额
                allLoaded: false,
                page: 1,
                limit: 20
            }
        },
        mounted() {
            this.initData()
        },
        computed: {
            ...mapState({
                //用户是否有权限看价格
                canShow: state => state.CURRENTUSER.data.shop_supplier,

                cartList: state => state.shop.CART_LIST,
                userType: state => state.CURRENTUSER.data.user_type})
            //当前商店购物信息
            // shopCart() {
            //     return {...this.goodsList}
            // },
            // cartNum() {
            //     let num = 0;
            //     Object.values(this.shopCart).forEach((item, index) => {
            //         console.log(item, 'cartNum')
            //         if(item&&item.num>0) {
            //             num +=  +item.num;
            //         }
            //     })
            //     return num
            // },
            // totalPrice() {
            //     let total_price = 0.00
            //     Object.values(this.shopCart).forEach((item, index) => {
            //         if(item&&item.num>0) {
            //             total_price += item.num * item.price;
            //         }
            //     })
            //     return total_price.toFixed(2)
            // }
        },
        // created() {
        //     console.log(this.shopCart, '333')
        // },

        methods: {
            ...mapMutations([
                'ADD_CART', 'REMOVE_CART',
            ]),
            ...mapActions([
                'ADD_SHOP_CAR',
                'REMOVE_SHOP_CAR'
            ]),

            // 计算总件数函数
            calculateCartNum() {
                return Object.values(this.shopCart).filter(item=>item.num>0).length
            },
            // 点击选择软键盘加入购物车
			handleChoose(item, index) {
                item.isSelfChoose = true
            },
            // 处理输入框失去焦点触发
			async handleBlur(event, item, index) {
                item.isSelfChoose = false
				if(Number.isInteger(parseInt(event.target.value))&&(event.target.value < item.order_min_num)) {
					this.$toast(`最小订货量为${item.order_min_num}`)
					return false
				}
				// 如果event.target.value是空，则不改变数值
				if(!event.target.value ||　(event.target.value == item.num)) {
					return false
                }
				let data = {
					supplier_id: this.factoryId,
					good_id: item.id,
					num: event.target.value
				}
                const info = await addShopCar(data)
                const code = info.data.code
                if(code==200) {
                    this.goodList[index].num = event.target.value
                    if(this.shopCart[item.id]) {
                        this.shopCart[item.id].num = event.target.value
                    }   else {
                            this.$set(this.shopCart, `${item.id}`, {...this.entities[index]})
                    }
                }
                
			},
            calculateTotalPrice() {
                let total_price = 0
                Object.values(this.shopCart).forEach((item, index) => {
                    if(item&&item.num>0) {
                        total_price += item.num * item.price * item.tran;
                    }
                })
                return total_price.toFixed(2)
            },
            async initData() {
                let  params = {
                    search: this.searchValue,
                    page: this.page, 
                    limit: this.limit
                }
                let data = []
                await Promise.all([queryShopCarList({}, this.factoryId), supplierEntities(this.factoryId, params)]).then(res=>{
                    this.goodsList = res[0]
                    this.shopCart = res[0]
                    // console.log(this.shopCart)
                    this.cartNum = this.calculateCartNum()
                    this.totalPrice = this.calculateTotalPrice()
                    data = res[1].data

                })
                // debugger
                this.goodList = this._handleData(data)
                if(this.goodList.length < this.limit) {
                    this.allLoaded = true
                }
            },

            // 搜索列表
            _supplierEntities(value) {
                let params = {
                    search: value
                }
                let data = []
                supplierEntities(this.factoryId, params).then(res=>{
                    this.goodList = this._handleData(res)
                })
            },
            _queryShopCarList() {
                queryShopCarList({}, this.factoryId).then(res=>{
                    let data = res.data
                    this.goodList = this.goodList.concat(this._handleData(data))
                    if(data < this.limit) {
                        this.allLoaded = true
                    }
                    this.$refs.loadmore.onBottomLoaded()
                })
            },
            // 添加至购物车
            add_shop_car(item) {
				// console.log(item)
				if(item.num>=99999) {
					this.$toast('最大购买量为99999')
					return false
                }
				if(item.num < item.order_min_num) {
					item.num += item.order_min_num
				} else {
					item.num++
				}
				if(this.shopCart[item.id]) {
					if(this.shopCart[item.id].num>0) {
						this.shopCart[item.id].num++
					} else {
						this.shopCart[item.id].num = item.order_min_num
					}
                } else {
					this.$set(this.shopCart, `${item.id}`, {...item})
                }
                this.cartNum = this.calculateCartNum()
                this.totalPrice = this.calculateTotalPrice()
                let data = {
                    supplier_id: this.factoryId,
                    good_id: item.id
                }
                addShopCar(data)
                // this.cartNum = this.calculateCartNum()
                // this.totalPrice = this.calculateTotalPrice()
                // addShopCar(data)
                // console.log(item)
                // item.is_add_car = true
                // item.number = 1
                // this.ADD_SHOP_CAR(item)
            },
            // 限制input只可以输入五位数
			handleInput(event) {
				if(event.target.value.length > 5) {
					event.target.value = event.target.value.substring(0, 5)
					return true
				}
			},

            // 控制移除商品出购物车
            async handleNumber(item) {
                // console.log(item)
                // debugger
                // if(item.num <= item.order_min_num) return
                let data = {
                    supplier_id: this.factoryId,
                    good_id: item.id
                }
                
                onlyDelShopCar(data)
                if(item.num <= item.order_min_num) {
					item.num = 0
					this.shopCart[item.id].num = 0
				} else {
					item.num--
					this.shopCart[item.id].num--
				}
                // this.shopCart[item.id].num--
                // this.shopCart[item.id].num--
                // item.num--
                this.cartNum = this.calculateCartNum()
                this.totalPrice = this.calculateTotalPrice()
                
            },
            canOption() {
                if (!this.canShow) {
                    this.$Message.error('当前用户还未审核通过');
                    return false;
                }
                return true
            },
            _handleData(data) {
                if(!data.length) {
                    this.loading = false
                    return []
                }
                // console.log(data,'data')
                data.forEach((item, index) => {
                    item.isSelfChoose = false
                    item.shopId = this.factoryId
                    item.num = 0
                    item.itemId = item.id
                    item.sale_price = item.price
                    if (this.shopCart[item.id]) {
                        item.num = this.shopCart[item.id].num
                    }
                })
                this.loading = false
                return data
            },
            addToMiniCart(event, item) {
                if (this.canOption()) {
                    this.ADD_CART(item)
                    item.num++
                    this.$nextTick(() => {
                        this.$refs.miniShopCart.drop(event.target)
                    })

                }

            },
            removeToMiniCart(event, item) {
                if (this.canOption()) {
                    this.REMOVE_CART(item)
                    item.num--
                }
            },
            showShop() {
                this.regionVisible = true;
            },
            /**
             * 上拉加载
             */
            loadBottom() {
                this.page++
                this._queryShopCarList()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .shop-list {
        display: flex;
        height: 40px;
        padding: 0 .2rem;
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
    .list-box {
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
			img {
				// width: 100%;
				height: 100%;
			}
			height: 3rem;
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			
			
			// height: 2.6rem;
			// height: 100%;
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
        margin-top: 5px;
         .carImg {
			 min-height: .6rem;
			 display: flex;
			 align-items: center;
            .shopCart {
                width: .6rem;
                height: .6rem;
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

    .selling .unit_price p:nth-child(2) {
        font-size: 12px;
        -webkit-transform: scale(0.8);
        margin-left: -.08rem;
        color: #999;
    }

    /*加减*/

    .gw_num {
        width: 1.4rem;
        height: .54rem;
        background: rgb(245, 245, 245);
        border-radius: .54rem;
        display: flex;
        align-items: center;
        text-align: center;
        line-height: .54rem;
        .error-num {
            color: #666;
        }
        svg {
            width: .22rem;
            height: .22rem;
        }
    }

    .gw_num em {
        color: #26A2FF;
        font-size: .42rem;
        flex: 1;
        font-style: normal;
        font-weight: bold;
    }

    .shop_num em {
        color: rgb(45, 162, 255);
    }

    .gw_num .num {
        font-style: normal;
        font-size: .28rem;
        flex: 1;
        display: flex;
        color: #333;
    }

    .gw_num .num p {
        font-size: .2rem;
        color: rgb(153, 153, 153);
    }

    .gw_num .num input {
        width: 50%;
        text-align: center;
    }

    .clearfloat {
        clear: both;
    }

    .shop_title {
        width: 100%;
        height: 0.88rem;
        background: rgb(245, 245, 245);
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 16;
        padding: 0 10px;
        background: #f1f1f1;

        p {
            &:nth-child(1) {
                font-size: 16px;
                font-weight: bold;
            }

            &:nth-child(2) {
                font-size: 14px;
                color: #26A2FF;
            }
        }
    }

</style>
