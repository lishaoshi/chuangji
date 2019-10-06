<template>
    <div id="CompanyShopDetail" style="min-height: 100%">
        <clxsd-head-top :title='`详情`'></clxsd-head-top>
        <span class="collect" @click="CollectionFn()" :class="{activebtn: isFullScreen}">{{follow_info}}</span>
        <mt-swipe :auto="4000" style="height: 5.6rem;background: #fff;" v-if="data.imgs!=''">
            <mt-swipe-item v-for="(item,index) in data.imgs"><img :src="item.new" width="100%" height="100%"></mt-swipe-item>
        </mt-swipe>
        <mt-swipe :auto="4000" style="height: 5.6rem;background: #fff;" v-else>
            <mt-swipe-item><img :src="data.img_cover" width="100%" height="100%"></mt-swipe-item>
        </mt-swipe>
        <div class="detail-box1" v-if="canShow">
            <div class="left">
                <span style="font-size: .3rem">￥</span> {{data.price}}<span style="font-size: .24rem">/{{data.unit || '件'}}</span>
                <i>{{data.market_price}}</i>
            </div>
            <div class="rigit">
                <div class="gw_num" v-if="(!data.is_multi_spec && canShow)">
                    <em class="lose" @click="removeToMiniCart()" v-if="nums>0">-</em>
                    <em class="lose"  v-else>-</em>
                    <div class="num">
                        <span class="amount">{{nums||0}}</span>
                        <p>{{data.unit || '件'}}</p>
                    </div>
                    <em class="add" @click="addToMiniCart()">+</em>
                </div>
            </div>
        </div>
        <div class="contant">
            <div class="title">{{data.good_name}}</div>
        </div>
        <div class="contant" style="margin-bottom: 30px;padding-bottom: 0px">
            <div class="contant-title">产品参数</div>
            <div class="info">
                <span>产品规格</span>
                <samp>{{data.spec}}</samp>
            </div>
            <div class="info">
                <span>生产厂家</span>
                <samp>{{data.brand}}</samp>
            </div>
            <div class="info">
                <span>有效期至</span>
                <samp>{{time}}</samp>
            </div>
        </div>
        <div style="height: 1rem"></div>
        <div style="position: fixed;width: 100%;bottom: 0px">
            <mini-company-cart ref="MiniCompanyCart" :shop-id="businessId" :count="cartNum" :total-price="totalPrice" style="bottom: 0px"></mini-company-cart>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import MiniCompanyCart from '@/page/company/CompanyClassify/MiniShopCart.vue'
    import {Swipe, SwipeItem} from 'mint-ui';
    import {isBusinessGoodsFollow, deleteBusinessGoodsFollow, SaveBusinessGoodsFollow} from "@/api/follow.js"

    export default {
        name: "CompanyShopDetail",
        components: {
            'mt-swipe': Swipe,
            'mt-swipe-item': SwipeItem,
            MiniCompanyCart
        },
        data() {
            return {
                goods_specs: '',
                goods_company: '华夏制药',
                goods_time: '三年',
                goods_price: 0.00,
                goods_BigPrice: 0.00,
                goods_num: 0,
                id: null,
                follow_status: 0,
                follow_info: '收藏',
                businessId: 0,
                data: [],
                nums: 0,
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                time:''
            }
        },
        created() {
            this.id = parseInt(this.$route.params.id);
            this.businessId = parseInt(this.$route.params.shopId);
            console.log(this.businessId + ":" + this.id)
            this._initData();
        },
        computed: {
            ...mapState({
                //用户是否有权限看价格
                canShow: state => state.CURRENTUSER.data.shop_supplier,

                cartList: state => state.shop.BUSINESS_CART_LIST
            }),
            shopCart() {
                return {...this.cartList[this.businessId]}
            },
            cartNum() {
                let num = 0;
                Object.values(this.shopCart).forEach((data, index) => {
                    num += data.num;
                })
                return num
            },
            totalPrice() {
                let total_price = 0.00;
                Object.values(this.shopCart).forEach((data, index) => {
                    total_price += data.num * data.price;

                })
                return total_price.toFixed(2)
            }
        },
        methods: {
            ...mapMutations([
                'BUSINESS_ADD_CART', 'BUSINESS_REMOVE_CART',
            ]),
            async _initData() {
                let params = {
                    id: this.id,
                    supplierId: this.businessId
                }
                const {
                    data
                } = await this.$http.get(`hippo-shop/business/${this.businessId}/detail/${this.id}`)
                this.data = data.data
                this.data = this._handleData(this.data)

                //是否收藏
                isBusinessGoodsFollow(this.id).then(res => {
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
                if(data.valid_time!=0){
                    let time = data.valid_time
                    this.time = this.$moment(time).format("YYYY-MM-DD")
                }
                Object.values(this.shopCart).forEach((cartItem, cartindex) => {
                    if (this.id === cartItem.id) {
                        this.nums = cartItem.num
                    }
                })
                return data
            },
            addToMiniCart() {
                const item = {
                    shopId: this.businessId,
                    itemId: this.id,
                    price: this.data.price
                }
                if (this.canOption()) {
                    this.BUSINESS_ADD_CART(item)
                    this.nums++
                }

            },
            removeToMiniCart() {
                const item = {
                    shopId: this.businessId,
                    itemId: this.id,
                    price: this.data.price
                }
                if (this.canOption()) {
                    this.BUSINESS_REMOVE_CART(item)
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
                            deleteBusinessGoodsFollow(this.id)
                            this.follow_info = '收藏'
                        }
                    });
                } else {
                    SaveBusinessGoodsFollow(params)
                    this.follow_info = '已收藏'
                }
                this.follow_status = !this.follow_status
            }
        }
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
            i {
                font-size: .24rem;
                text-decoration: line-through;
                margin-left: 5px;
                padding: 0 5px;
            }
        }
    }

    .contant {
        background: #fff;
        padding: 10px;
        margin-top: .15rem;

        &-title {
            border-bottom: 1px solid #e6e6e6;
            height: 1rem;
            line-height: 1rem;
            font-size: .28rem;
            text-align: center;
        }
    }

    .title {
        font-size: .32rem;
        line-height: 150%;
        margin-bottom: 3px;
    }


    .info-flex {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f1f1f1;
        padding: .1rem 0px;
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
        height: 100%;
        justify-content: center;
        align-items: center;
        flex: 1;
        display: flex;
        color: #fff;
    }

    .gw_num .num p {
        font-size: .18rem;
        color: #fff;
        margin-left: .05rem;
    }

    .gw_num .num input {
        width: 50%;
        text-align: center;
    }

    .bottom {
        width: 100%;
        height: 50px;
        background: #fff;
        position: fixed;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 2010;
        bottom: 0px;
        border-top: 2010;
        border-top: 1px solid #f1f1f1;
    }

    .bottom .total_price {
        margin-left: 60px
    }

    .bottom .total_price p:nth-child(1) {
        font-size: 16px;
        color: rgb(51, 51, 51);
    }

    .bottom .total_price p:nth-child(2) {
        font-size: 12px;
        color: rgb(102, 102, 102);
        -webkit-transform: scale(0.8);
    }

    .bottom .join_shop {
        width: 100px;
        height: 100%;
        background: rgb(45, 162, 255);
        text-align: center;
        font-size: 14px;
        color: #fff;
        line-height: 50px;
    }

    .bottom .shop_iocn {
        position: absolute;
        width: 50px;
        height: 50px;
        left: 10px;
        top: -10px;
    }

    .bottom .shop_iocn img {
        width: 50px;
        height: 50px;
    }

    .collect {
        position: fixed;
        right: .2rem;
        line-height: .55rem;
        color: #fff;
        top: .15rem;
        background: #2891e5;
        display: inline-block;
        padding: 0 .25rem;
        border-radius: .55rem;
        border: 1px solid #42abff;
        opacity: .9;
        z-index: 9;
    }

    .mini-shop-cart {
        bottom: 0px;
    }

    .activebtn {
        top: .7rem
    }
</style>