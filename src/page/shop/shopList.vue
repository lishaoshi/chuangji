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
                    <div class="gw_num" v-if="(!item.is_multi_spec && canShow && USER_TYPE==3)">
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
                    </div>
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
    import {mapState, mapMutations} from 'vuex'

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
                regionVisible: false,
                loading:true
            }
        },
        mounted() {
            this.initData()
        },
        computed: {
            ...mapState({
                //用户是否有权限看价格
                canShow: state => state.CURRENTUSER.shop_supplier,

                cartList: state => state.shop.CART_LIST
            }),
            //当前商店购物信息
            shopCart() {
                return {...this.cartList[this.factoryId]}
            },
            cartNum() {
                let num = 0;
                Object.values(this.shopCart).forEach((item, index) => {
                    if(item.num>0) {
                        num += item.num;
                    }
                })
                return num
            },
            totalPrice() {
                let total_price = 0.00
                Object.values(this.shopCart).forEach((item, index) => {
                    if(item.num>0) {
                        console.log(item)
                        total_price += item.num * item.sale_price;
                    }
                })
                return total_price.toFixed(2)
            }
        },

        methods: {
            ...mapMutations([
                'ADD_CART', 'REMOVE_CART',
            ]),
            async initData() {
                const {data} = await supplierEntities(this.factoryId)
                this.goodList = this._handleData(data)
            },
            canOption() {
                if (!this.canShow) {
                    this.$Message.error('当前用户还未审核通过');
                    return false;
                }
                return true
            },
            _handleData(data) {

                data.forEach((item, index) => {
                    item.shopId = this.factoryId
                    item.num = 0
                    item.itemId = item.id
                    item.sale_price = item.price * item.tran
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
                line-height: .42rem;
                height: .42rem;
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
    }

    .selling .unit_price {
        font-size: 10px;
        color: #999;
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
