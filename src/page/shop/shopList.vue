<template>
    <div class="shop" style="padding: 0px;padding-top: .1rem">
        <div class="good-list" v-if="goodList.length>0">
            <div class="list" v-for="(item,index) in goodList">
                <router-link :to="`/factory/shop/${factoryId}/${item.id}`">
                    <img :src="item.cover" class="list-img"/>
                    <p class="list-title">{{item.good_name}}</p>
                    <div class="list-small">
                        <span>毛利润：{{item.mao || 0.2}}%</span>
                        <span style="text-align: right">销量：{{item.sale_num}}件</span>
                    </div>
                    <p class="list-des">{{item.spec}} &nbsp;&nbsp;<!--大小单位--->{{item.tran}}{{item.unit}}/{{item.big_unit}}</p>
                </router-link>
                <div class="selling">
                    <div class="unit_price" v-if="canShow">
                        <p class="font"><i>￥</i><i>{{item.price}}</i><i>/{{item.unit}}</i></p>
                        <p><i>零售价：</i><i>{{item.market_price}}</i></p>
                        
                    </div>

                    <!-- 商品右下角购物车 -->
                    <div class="carImg" v-if="canShow">
                        <!-- <img src="@/images/shop-car.png" alt="" v-if="!item.num" @click="add_shop_car(item)"> -->
                        <!-- <i class="iconfont" @click="add_shop_car(item)" v-if="!item.num">icon-shop-car</i> -->
                        <svg class="icon shopCart" v-if="!item.num"  @click="add_shop_car(item)" aria-hidden="true">
                            <use xlink:href="#icon-shop-car"></use>
                        </svg>
                        <div class="controls" v-else>
                            <img @click="handleNumber(item)" src="@/images/del_shopping.png" alt="">
                            
                            <div>
                                <span>{{item.num}}</span>
                                <span>{{item.unit}}</span>
                                <!-- <span>件</span> -->
                            </div>
                               
                            <img @click="add_shop_car(item)" src="@/images/add_shopping.png" alt="">
                        </div>
                    </div>

                    <div v-if="!canShow" style="color:red;">请先完成认证或等待审核通过</div>

                    <!-- <div class="gw_num" v-if="(!item.is_multi_spec && canShow && USER_TYPE==3)">
                        <em class="lose" @click="removeToMiniCart($event,item)" 　v-if="item.num > 0">
                            <svg>
                                <use xlink:href="#icon-factory-productList-reduce-1"></use>
                            </svg>
                        </em>
                        <em class="error-num" 　v-if="item.num <= 0">
                            <svg>
                                <use xlink:href="#icon-factory-productList-reduce-0"></use>
                            </svg>
                        </em>
                        <div class="num">
                            <span class="amount">{{item.num || 0}}</span>
                            <p>件</p>
                        </div>
                        <em class="add" @click="addToMiniCart($event,item)">
                            <svg>
                                <use xlink:href="#icon-factory-productList-plus-1"></use>
                            </svg>
                        </em>
                    </div> -->
                </div>
            </div>
            <div class="clearfloat"></div>
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
                totalPrice: ''   //总金额
            }
        },
        mounted() {
            this.initData()
        },
        computed: {
            ...mapState({
                //用户是否有权限看价格
                canShow: state => state.CURRENTUSER.data.shop_supplier,

                cartList: state => state.shop.CART_LIST
            }),
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
                 let num = 0;
                Object.values(this.shopCart).forEach((item, index) => {
                    // console.log(item, 'cartNum')
                    if(item&&item.num>0) {
                        num +=  +item.num;
                    }
                })
                console.log(num, 'num')
               return num
            },
            calculateTotalPrice() {
                 
                let total_price = 0
                Object.values(this.shopCart).forEach((item, index) => {
                    if(item&&item.num>0) {
                        total_price += item.num * item.price;
                    }
                })
                return total_price.toFixed(2)
            },
            async initData() {
                let  data = {}
                await Promise.all([queryShopCarList({}, this.factoryId), supplierEntities(this.factoryId)]).then(res=>{
                    // console.log(res, 'all')
                    
                    this.goodsList = res[0]
                    this.shopCart = res[0]
                    console.log(this.shopCart)
                    this.cartNum = this.calculateCartNum()
                    this.totalPrice = this.calculateTotalPrice()
                    data = res[1].data
                })
                this.goodList = this._handleData(data)
            },
            _queryShopCarList() {
                queryShopCarList({}, this.factoryId).then(res=>{
                    // console.log(res, 'text res')
                    this.goodsList = res
                })
            },
            // 添加至购物车
            add_shop_car(item) {
                // console.log(item)
                // deggu
                item.num++
                let data = {
                    supplier_id: this.factoryId,
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
                // console.log(item)
                // item.is_add_car = true
                // item.number = 1
                // this.ADD_SHOP_CAR(item)
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
                // this.shopCart[item.id].num--
                this.shopCart[item.id].num--
                item.num--
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
                // console.log(data,'data')
                data.forEach((item, index) => {
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

    .shop {
        margin-top: 5px;
    }

    .list {
        position: relative;
        background: #fff;
        float: left;
        width: 47%;
        margin-left: 2%;
        margin-bottom: .2rem;
        padding: .2rem;
        font-size: 12px;
        border-radius: 5px;
        &:nth-child(even) {
            border-right: 0px;
        }

        .list-img {
            width: 100%;
            height: 23vh;
        }

        .list-small {
            width: 100%;
            padding: .01rem 0;

            span {
                display: inline-block;
                font-size: .18rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(0, 144, 255, 1);
                border: 1px solid #2da2ff;
                border-radius: 3px;
                line-height: .22rem;
                height: .22rem;
                margin-right: .1rem;
                padding: 0 .05rem;
                margin-bottom: .1rem;
            }
        }

        .list-title {
            white-space: normal;
            overflow: hidden;
            font-size: .24rem;
            line-height: 200%;
            color: #333;
        }

        .list-des {
            font-size:.2rem;
            font-weight:500;
            color:rgba(153,153,153,1);
            line-height:2;
        }
    }

    .selling {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 5px;
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
        color: #999;
        width: 100%;
    }

    .selling .unit_price .font {
        color: rgb(255, 59, 48);
        font-size: 12px;

        i {
            &:nth-child(3) {
                color: #999;
            }
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
