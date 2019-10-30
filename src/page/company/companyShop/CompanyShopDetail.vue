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
                <i v-if="parseInt(data.market_price)">￥{{data.market_price}}</i>
            </div>
            <div class="rigit">
                <div class="gw_num" v-if="(!data.is_multi_spec && canShow)">
                    <div class="lose" @click="removeToMiniCart()" v-if="data.num>0">-</div>
                    <div class="lose"  v-else>-</div>
                    <template v-if="!data.isChooseSelf">
                         <div class="num" @click="handleChoose">
                            <span class="amount">{{data.num}}</span>
                            <p>{{data.unit || '件'}}</p>
                        </div>
                    </template>
                   
                    <template v-else>
                        <form class="input_warp" action="">
                            <input v-focus @input="handleInput($event)" @blur="handleBlur($event)" ref="cart" type="number" :value="data.num">
                        </form>
                    </template>
                    <div class="add" @click="addToMiniCart()">+</div>
                </div>
            </div>
        </div>
        <div class="contant">
            <div class="title">{{data.good_name}}</div>
            <div>
                销量：{{data.sale_num}}
            </div>
        </div>
        <!-- <div style="height: 1rem"></div> -->
        <div class="goodInfo">
            <div>
                <span class="letter">品牌</span>
                <span>{{this.name}}</span>
            </div>
            <div>
                <span class="letter">规格</span>
                <span>{{data.spec}}</span>
            </div>
            <div>
                <span class="letter">效期</span>
                <span>{{data.time||'无限期'}}</span>
            </div>
            <div>
                <span>批准文号</span>
                <span>{{data.approval_number}}</span>
            </div>
        </div>

        <div class="textBox">
            <div>药品详情</div>
            <div>|</div>
           
        </div>

        <div class="infoDetail">
                <div class="content" v-html="data.content"></div>
        </div>

        
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
    import { queryShopCarList, delShopCar, addShopCar, onlyDelShopCar } from '@/api/shopCar'

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
                data: {},
                nums: 0,
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                time:'',
                num: 0,
                shopCart: {},
                name: ''
            }
        },
        created() {
            // console.log(this.$router)
            this.id = parseInt(this.$route.params.id);
            this.businessId = parseInt(this.$route.params.shopId);
            this._initData();
        },
        computed: {
            ...mapState({
                //用户是否有权限看价格
                canShow: state => state.CURRENTUSER.data.shop_supplier,

                cartList: state => state.shop.BUSINESS_CART_LIST
            }),
            cartNum() {
                let num = 0;
                Object.values(this.shopCart).forEach((data, index) => {
                    num += parseInt(data.num);
                })
                return num
            },
            totalPrice() {
                let total_price = 0.00;
                Object.values(this.shopCart).forEach((data, index) => {
                    total_price += data.num * data.price;

                })
                return total_price.toFixed(2)
            },
        },
        methods: {
            ...mapMutations([
                'BUSINESS_ADD_CART', 'BUSINESS_REMOVE_CART',
            ]),
             // 选择通过键盘输入选择添加购物车数量
            handleChoose() {
                console.log(123, this.data)
                // this.$set(this.data, 'isChooseSelf', true)
                // debugger
                this.data.isChooseSelf = true
            },
            // input失去焦点
            handleBlur(event) {
                // debugger
                this.data.isChooseSelf = false
                if(Number.isInteger(parseInt(event.target.value))&&(event.target.value < this.data.order_min_num)) {
                    this.$toast('不能小于最小订货量')
                    return false
                }
				// 如果event.target.value是空，则不改变数值
				if(!event.target.value ||　(event.target.value === this.data.num)) {
					return false
                }
                this.data.num = event.target.value
                let params = {
                    supplier_id: this.businessId,
                    good_id: this.id,
                    num: event.target.value
                }
                addShopCar(params)
                
            },
            // 处理input长度
			handleInput(event) {
				let value = event.target.value
				if(value>99) {
					event.target.value = 99
				}
			},
            async _initData() {
                let params = {
                    id: this.id,
                    supplierId: this.businessId
                }
                const {
                    data
                } = await this.$http.get(`hippo-shop/business/${this.businessId}/detail/${this.id}`)
                let goodsData = data.data
                this.data = this._handleData(goodsData)
                this.$set(this.data, 'isChooseSelf', false)
                // debugger
                this.name = this.data.brand.name
                queryShopCarList({}, this.businessId).then(res=>{
                    this.shopCart = res
                    if(this.shopCart[this.id]) {
                        this.data.num = this.shopCart[this.id].num
                    }
                })
                

                //是否收藏
                isBusinessGoodsFollow(this.id).then(res => {
                    if(res.data.data.hasrelation){
                        this.follow_info = "已收藏"
                        this.follow_status = 1
                    }else{
                        this.follow_info = "收藏"
                        this.follow_status = 0
                    }
                }).catch(error => {
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
                    data.time = this.$moment(time*1000).format("YYYY-MM-DD")
                    // data.isChooseSelf = false
                    this.$set(this.data, 'num', 0)
                }
                return data
            },
            addToMiniCart() {
                // debugger
                if(this.data.num<this.data.order_min_num) {
                    this.data.num = this.data.order_min_num
                    if(this.shopCart[this.id]) {
                        this.shopCart[this.id].num = this.data.order_min_num
                }   else {
                        let data = JSON.parse(JSON.stringify(this.data))
                        this.$set(this.shopCart, `${this.id}`, data)
                    }
                } else {
                     this.data.num++
                     if(this.shopCart[this.id]) {
                        this.shopCart[this.id].num++
                }   else {
                        let data = JSON.parse(JSON.stringify(this.data))
                        this.$set(this.shopCart, `${this.id}`, data)
                    }
                }
                let params = {
                    supplier_id: this.businessId,
                    good_id: this.id
                }
                addShopCar(params)
            },
            removeToMiniCart() {
                if(this.data.num<=0) {
                    return false
                }
                // debugger
                if(this.data.num <= this.data.order_min_num) {
                    this.data.num = 0
                     this.shopCart[this.id].num = 0
                } else {
                    this.data.num--
                    this.shopCart[this.id].num--
                }
                
                // console.log(this.data)
                // this.shopCart[this.id].num--
                let params = {
                    supplier_id: this.businessId,
                    good_id: this.id
                }
                onlyDelShopCar(params)
            },
            CollectionFn() {
                const params = {
                    entity_id: this.id,
                    supplier_id: this.businessId
                }
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
            // width: 68%;
            width: 4.8rem;
            background: -webkit-linear-gradient(left, rgb(255, 65, 113), rgb(255, 92, 152)); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, rgb(255, 65, 113), rgb(255, 92, 152)); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, rgb(255, 65, 113), rgb(255, 92, 152)); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, rgb(255, 65, 113), rgb(255, 92, 152)); /* 标准的语法 */
            line-height: 1rem;
            font-size: .48rem;
            color: #fff;
            padding-left: .2rem;
            // flex: 1 0;
            i {
                font-size: .24rem;
                text-decoration: line-through;
                margin-left: 5px;
                padding: 0 5px;
            }
        }
        .rigit {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
            .input_warp {
                display: inline-flex;
                flex:1;
                input {
                    background: #FE4171;
                    width: 100%;
                    text-align: center;
                    height: 100%;
                    line-height: 100%;
                    flex:1 0 auto;
                    color: #fff;
                }
            }
        }
    }

    .contant {
        display: flex;
        padding: 0 .32rem;
        height: 1.16rem;
        justify-content: space-between;
        background: #fff;
        div {
            display: flex;
            align-items: center;
        }
        div:last-child {
            align-items: flex-end;
            color:rgba(153,153,153,1);
            font-size: .2rem;
            margin-bottom: .12rem;
        }
    }
    .goodInfo {
        line-height: .56rem;
        padding: .2rem .32rem;
        background: #fff;
        margin-top: .2rem;
        div {
            display: flex;
            font-size: .24rem;
            span:first-child {
                margin-right: .5rem;
            }
            span:last-child {
                color:rgba(102,102,102,1);
            }
        }
        .letter {
            letter-spacing: .48rem;
            margin-right: .02rem!important;
        }
    }
    .textBox {
        height: 1.90rem;
        display: flex;
        flex-direction: column;
        justify-content: center;;
        align-items: center;
        color: #0090FF;
        // letter-spacing: 10px;
        font-size: .28rem;
        background: #fff;
        margin-top: .2rem;
        div {
            margin-bottom: 10px;
        }
    }
    .infoDetail {
        background: #fff;
        padding: 0 .1rem;
        padding-bottom: 20px;
        margin-bottom: 1.3rem;
        img {
            width: 100%!important;
        }
        .content >>> img {
            width: 100%!important;
        }
    }
    .img {
        width: 100%;
        height: 5.9rem;
        img {
            width: 100%;
            height: 100%;
        }
        // height: 100%;
    }

    .title {
        font-size: .34rem;
        line-height: 150%;
        margin-bottom: 3px;
        font-weight: bold;
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
        // width: 1.7rem;
        height: .58rem;
        flex: 1;
        margin: 0 .32rem;
        background: #FE4171;
        border-radius: .58rem;
        display: flex;
        // align-items: center;
        text-align: center;
        .lose, .add {
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            width: .56rem;
        }
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

<style lang="scss">
    .infoDetail {
        img {
            width: 100%!important;
             height: auto;
        }
        .content >>> img {
            width: 100%!important;
            height: auto;
        }
    }
</style>