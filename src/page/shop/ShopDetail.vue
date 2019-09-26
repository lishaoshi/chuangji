<template>
    <div id="ShopDetail">
        <clxsd-head-top :title="'商品详情'">
        </clxsd-head-top>
        <span class="collect" @click="CollectionFn()" :class="{activebtn: isFullScreen}">{{follow_info}}</span></span>
        <mt-swipe :auto="4000" style="height: 6.3rem;margin-bottom: .2rem;">
            <mt-swipe-item><img :src="data.cover" width="100%" height="100%"></mt-swipe-item>
            <!--<mt-swipe-item v-for="(swipe,key) in data"><img :src="swipe.image" width="100%"></mt-swipe-item>-->
        </mt-swipe>
        <div class="detail-box1" v-if="canShow">
            <div class="left">
                <span style="font-size: .3rem">￥</span> {{data.tran*data.price}}<span style="font-size: .24rem">/{{data.big_unit}}</span>
            </div>
            <div class="rigit">
                <div class="gw_num" v-if="(!data.is_multi_spec && canShow &&USER_TYPE === 3)">
                    <em class="lose" @click="removeToMiniCart()" v-if="nums>0">
                        <svg>
                            <use xlink:href="#icon-detail-jian"></use>
                        </svg>
                    </em>
                    <em class="lose" v-else>
                        <svg>
                            <use xlink:href="#icon-detail-jian"></use>
                        </svg>
                    </em>
                    <div class="num">
                        <span class="amount">{{nums||0}}</span>
                        <p>{{data.big_unit}}</p>
                    </div>
                    <em class="add" @click="addToMiniCart()">
                        <svg>
                            <use xlink:href="#icon-detail-add"></use>
                        </svg>
                    </em>
                </div>
            </div>
        </div>
        <div class="contant">
            <div class="title">
                {{data.good_name}}
            </div>
            <div class="small-title">
                <span>毛利率：<i>2%</i></span>
                <span>销量：<i>296</i></span>
            </div>
        </div>
        <div class="contant" style="margin-top: .2rem">
            <div class="price-flex">
                <div class="info1">
                    <i>{{data.price}}
                        <small>/{{data.unit}}</small>
                    </i>
                    <p>采购价</p>
                </div>
                <div class="line"></div>
                <div class="info1">
                    <i>{{data.market_price}}
                        <small>/{{data.unit}}</small>
                    </i>
                    <p>建议零售价</p>
                </div>
            </div>
        </div>
        <div class="contant" style="margin-top: .2rem;padding-bottom: 0px">
            <div class="contant-title">产品规格</div>
            <div class="info">
                <span>产品规格：</span>
                <samp>{{data.spec}}</samp>
            </div>
            <div class="info">
                <span>生产厂家：</span>
                <samp>华北制药集团有限责任公司</samp>
            </div>
            <div class="info">
                <span>有效期至</span>
                <samp>2023.4.18</samp>
            </div>
        </div>
        <mini-shop-cart ref="miniShopCart" :count="cartNum" :total-price="totalPrice" :shop-id="factoryId" :USER_TYPE = "USER_TYPE"></mini-shop-cart>
    </div>
</template>

<script>
    import MiniShopCart from './MiniShopCart'
    import {mapState, mapMutations} from 'vuex'
    import {Swipe, SwipeItem} from 'mint-ui';
    import {getCollectionList, deleteCollection, SaveCollection,isDetailFollow} from "@/api/follow.js"

    export default {
        name: "ShopDetail",
        components: {
            'mt-swipe': Swipe,
            'mt-swipe-item': SwipeItem,
            MiniShopCart
        },
        data() {
            return {
                id: this.$route.query.id,
                good_name: '',
                data: [],
                nums: null,
                follow_status: 0,
                follow_info: '收藏',
                collect_list: [],
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
            }
        },
        created() {
            this.factoryId = parseInt(this.$route.params.shopId);
            this.id = parseInt(this.$route.params.id);
            this._initData();
        },
        computed: {
            ...mapState({
                //用户是否有权限看价格
                canShow: state => state.CURRENTUSER.shop_supplier,

                cartList: state => state.shop.CART_LIST,
                USER_TYPE: state => state.CURRENTUSER.user_type,
            }),
            shopCart() {
                return {...this.cartList[this.factoryId]}
            },
            cartNum() {
                let num = 0;
                Object.values(this.shopCart).forEach((data, index) => {
                    num += data.num;
                })
                return num
            },
            totalPrice() {
                let total_price = 0.00
                Object.values(this.shopCart).forEach((data, index) => {
                    total_price += data.num * data.sale_price;
                })
                return total_price.toFixed(2)
            }
        },
        methods: {
            ...mapMutations([
                'ADD_CART', 'REMOVE_CART',
            ]),
            //hippo-shop/supplier/factory/15/entities
            //hippo-shop/supplier/factory/15/entities/10
            async _initData() {
                let params = {
                    id: this.id
                }
                const {
                    data
                } = await this.$http.get(`hippo-shop/factory/entities/detail`, {params})
                this.data = this._handleData(data)
            //是否收藏
                isDetailFollow(this.id).then(res => {
                    console.log(res.data.data.hasrelation)
                    if(res.data.data.hasrelation){
                        this.follow_info = "已收藏"
                        this.follow_status = 1
                    }else{
                        this.follow_info = "收藏"
                        this.follow_status = 0
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            canOption() {
                if (!this.canShow) {
                    this.$Message.error('当前用户还未审核通过');
                    return false;
                }
                return true
            },
            _handleData(data) {
                Object.values(this.shopCart).forEach((cartItem, cartindex) => {
                    if (this.id === cartItem.id) {
                        this.nums = cartItem.num
                    }
                })
                return data
            },
            addToMiniCart() {
                const item = {
                    shopId: this.factoryId,
                    itemId: this.id,
                    sale_price: this.data.tran * this.data.price
                }
                if (this.canOption()) {
                    this.ADD_CART(item)
                    this.nums++
                }

            },
            removeToMiniCart() {
                const item = {
                    shopId: this.factoryId,
                    itemId: this.id,
                    sale_price: this.data.tran * this.data.price
                }
                if (this.canOption()) {
                    this.REMOVE_CART(item)
                    this.nums--

                }
            },
            CollectionFn() {
                const params = {
                    entity_id: this.id
                }
                console.log(params)
                if (this.follow_status) {//followed
                    this.$messagebox.confirm("确定要取消收藏吗?").then(action => {
                        if (action === 'confirm') {
                            deleteCollection(this.id)
                            this.follow_info = '收藏'
                        }
                    });
                } else {
                    SaveCollection(params)
                    this.follow_info = '已收藏'
                }
                this.follow_status = !this.follow_status
            }
        },

    }
</script>

<style lang="scss" scoped>
    .detail-box1 {
        height: 1rem;
        display: flex;
        background: rgb(255, 234, 233);

        .left {
            width: 68%;
            background: -webkit-linear-gradient(left, rgb(255, 65, 113), rgb(255, 92, 152)); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, rgb(255, 65, 113), rgb(255, 92, 152)); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, rgb(255, 65, 113), rgb(255, 92, 152)); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, rgb(255, 65, 113), rgb(255, 92, 152)); /* 标准的语法 */
            line-height: 1rem;
            font-size: .48rem;
            color: #fff;
            padding-left: .2rem;
        }
    }

    .collect {
        width: 1.2rem;
        height: .54rem;
        border: 1px solid rgba(255, 255, 255, 0.6);
        border-radius: 0.3rem;
        text-align: center;
        line-height: .5rem;
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
        position: fixed;
        right: .2rem;
        top: .18rem;
        z-index: 999;
    }

    .contant {
        background: #fff;
        padding: 10px;
        &-title{
            border-bottom: 1px solid #e6e6e6;
            height: 1rem;
            line-height: 1rem;
            font-size: .28rem;
            text-align: center;
        }
    }

    .activebtn {
        top: .7rem
    }

    .small-title {
        font-size: 12px;
        color: #2da2ff;
        line-height: 200%;

        span {
            border: 1px solid #2da2ff;
            border-radius: 3px;
            margin-right: .2rem;
            padding: 0 5px;
        }
    }

    .title {
        font-size: .34rem;
        line-height: 150%;
        margin: .1rem 0;
    }

    .info {
        line-height: 180%;
        color: #7C7C7C;
        font-size: .26rem;
        margin-top: .2rem;
        padding-bottom: .2rem;
        border-bottom: 1px solid #f4f5f5;
        span {
            color: #333;
            display: block;
            font-size: .28rem;
        }
    }

    .info-flex {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f1;
        padding: .1rem 0px;
    }

    .price-flex {
        display: flex;
        justify-content: space-around;
        padding: .2rem 0px;
        background: rgb(245,245,245);
        align-items: center;
        .line {
            width: 1px;
            height: .59rem;
            background: #e5e5e5;
        }
        .info1 {
            font-size: .28rem;
            text-align: center;
            padding: .2rem 0;
            p {
                margin-top: .1rem;
            }
            i{
                color: #ff3b30;
            }
            small {
                font-size: .24rem;
                color: #ccc;
                padding-left: 3px;
            }
        }
    }

    .shop-list {
        display: flex;
        height: 40px;
        font-size: 14px;
        justify-content: space-between;
        line-height: 40px;

        .price {
            color: #F30000;
            font-size: 16px;

            span {
                color: #ccc;
                font-size: 12px;
                padding-left: 2px;
            }
        }

        .gw_num {
            margin-top: 10px;
        }
    }

    /*加减*/
    .gw_num {
        width: 1.7rem;
        height: .58rem;
        background: rgb(255, 59, 48);
        border-radius: .58rem;
        display: flex;
        align-items: center;
        text-align: center;
        margin-top: .2rem;
        margin-left: .3rem;
        svg {
            width: .22rem;
            height: .22rem;
        }
    }

    .gw_num em {
        color: #fff;
        cursor: pointer;
        font-size: .28rem;
        flex: 1;
        line-height: 24px;
        font-weight: 100;
        font-style: normal;
        font-weight: bold;
    }

    .shop_num em {
        color: #fff;
    }

    .gw_num .num {
        font-style: normal;
        font-size: .28rem;
        flex: 1;
        display: flex;
        color: #fff;
    }

    .gw_num .num p {
        font-size: .18rem;
        color: #fff;
        -webkit-transform: scale(0.7);
        margin-left: .05rem;
    }

    .gw_num .num input {
        width: 50%;
        text-align: center;
    }

</style>