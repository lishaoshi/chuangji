<template>
    <div id="ShopDetail">
        <span class="collect_box" @click="CollectionFn()">{{follow_info}}</span>
        <div class="headTop">
             <img class="retreat" src="../../images/back.png" @click="goBack()">
             <div>
                 <span :class="{active:tabIndex==0}" @click="tabIndex=0">详情</span>
                 <span :class="{active:tabIndex==1}" @click="tabIndex=1">规格</span>
             </div>
        </div>
        <template v-if="tabIndex==0"> 
            <!-- <span class="collect" @click="CollectionFn()" :class="{activebtn: isFullScreen}">{{follow_info}}</span> -->
            <mt-swipe :auto="4000" style="height: 6.3rem;margin-bottom: .2rem;">
                <mt-swipe-item><img :src="data.cover" width="100%" height="100%"></mt-swipe-item>
                <!--<mt-swipe-item v-for="(swipe,key) in data"><img :src="swipe.image" width="100%"></mt-swipe-item>-->
            </mt-swipe>
            <div class="detail-box1" v-if="canShow">
                <div class="left">
                    <span style="font-size: .3rem">￥</span>
                    <i v-if="data.price">{{data.tran*data.price}}</i>
                     
                     <span style="font-size: .24rem">/{{data.big_unit}}</span>
                </div>
                <div class="rigit">
                    <div class="gw_num" v-if="(!data.is_multi_spec && canShow)">
                        <div class="lose" @click="removeToMiniCart()" v-if="data.num>0">-</div>
                        <div class="lose"  v-else>-</div>
                        <template v-if="!data.isChooseSelf">
                            <div class="num" @click="handleChoose">
                                <span class="amount">{{data.num > data.order_min_num ? data.num:data.num>0?data.order_min_num:0}}</span>
                                <p>{{data.big_unit || '件'}}</p>
                            </div>
                        </template>
                    
                        <template v-else>
                            <form class="input_warp" action="">
                                <input v-focus @input="handleInput($event)" @blur="handleBlur($event)" @keyup.enter="handleBlur($event)" ref="cart" type="number" :value="data.num">
                            </form>
                        </template>
                        <div class="add" @click="addToMiniCart()">+</div>
                    </div>
                </div>
            </div>
            <div class="contant">
                <div class="title">
                    {{data.generic_name}}
                </div>
                <!-- <div class="small-title">
                    <span>浏览量<i>{{data.click_count}}</i></span>
                    <span>毛利率：<i>2%</i></span>
                    <span>销量：<i>{{data.sale_num}}</i></span>
                </div> -->
            </div>
            <div class="show" v-if="data.promotes&&data.promotes.length>0">
                <section>
                    <img src="@/images/prom.png" alt="">
                    <span>
                        多个促销活动
                    </span>
                </section>
                
                <svg @click="showPop">
                    <use xlink:href="#icon-more"/>
                </svg>
            </div>
            <div class="contant" style="margin-top: .2rem">
                <div class="price-flex">
                    <div class="info1">
                        <i>{{data.market_price}}
                            <small>/{{data.unit}}</small>
                        </i>
                        <p>市场价(元)</p>
                    </div>
                    <div class="line"></div>
                    <div class="info1">
                        <i>{{data.price}}
                            <small>/{{data.unit}}</small>
                        </i>
                        <p>订货价(元)</p>
                    </div>
                </div>
            </div>
            <!-- <div class="contant" style="margin-top: .2rem;padding-bottom: 0px">
                <div class="contant-title">产品规格</div>
                <div class="info">
                    <span>产品规格：</span>
                    <samp>{{data.spec}}</samp>
                </div>
                <div class="info">
                    <span>生产厂家：</span>
                    <samp></samp>
                </div>
                <div class="info">
                    <span>有效期至</span>
                    <samp></samp>
                </div>
            </div> -->
            <div class="goodInfo">
                <div>
                    <span class="letter">规格</span>
                    <span>{{data.spec}}</span>
                </div>
                <div>
                    <span class="letter">包装</span>
                    <span>{{data.tran}}{{data.unit}}/{{data.big_unit}}</span>
                </div>
                <div v-if="data.valid_time">
                    <span>有效期至</span>
                    <span>{{data.time}}</span>
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
                <div class="content" v-if="data.content" v-html="data.content"></div>
                <div class="noInfo" v-else>
                    <svg>
                        <use xlink:href="#icon-lampBulb"></use>
                    </svg>
                    <span>暂无维护</span>
                </div>
            </div>
      
        

            <mini-shop-cart ref="miniShopCart" :count="cartNum" :total-price="totalPrice" :shop-id="factoryId" :USER_TYPE = "USER_TYPE"></mini-shop-cart>
        </template>
        <div v-if="tabIndex==1">
            <specifications :data="data"/>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" style="width: 100%;height: 5.6rem;transition:1s">
                <p class="pop-title">更多活动<svg @click="popupVisible=false"><use xlink:href="#icon-promote-my-close"></use> </svg></p>
                <div class="discounts" style="height: 5rem;overflow:auto;background: #F5F5F5;padding: .3rem .5rem .8rem;margin-top: 0px;width: 100%">
                  
                    <ul style="position: relative;overflow: visible;height: auto">
                            <!-- <transition-group name="fade" tag="li"  
                            enter-active-class="animated bounceInDown"
                            leave-active-class="animated bounceOut"> -->
                            <li v-for="(item, index) in (data.promotes)" :key="index" style="padding: .2rem 0;">
                                <span>{{item.promotion_type=="give"?'赠':'返'}}</span>
                                <p style="color: #333333">每满{{item.enough_num}}件，获赠品{{item.give_name}}{{item.give_num}}个</p>
                            </li>
                        <!-- </transition-group> -->
                    </ul>
                     
                </div>
            </mt-popup>
    </div>
</template>

<script>
    import MiniShopCart from './MiniShopCart';
    import {mapState, mapMutations} from 'vuex';
    import {Swipe, SwipeItem} from 'mint-ui';
    import {getCollectionList, deleteCollection, SaveCollection,isDetailFollow} from "@/api/follow.js";
    import specifications from '@/components/common/specifications';
    import { queryShopCarList, delShopCar, addShopCar, onlyDelShopCar } from '@/api/shopCar';
    export default {
        name: "ShopDetail",
        components: {
            'mt-swipe': Swipe,
            'mt-swipe-item': SwipeItem,
            MiniShopCart,
            specifications
        },
        data() {
            return {
                id: this.$route.query.id,
                good_name: '',
                data: {},
                nums: null,
                follow_status: 0,
                follow_info: '收藏',
                collect_list: [],
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                tabIndex:0,
                shopCart: {},
                promotes: [],
                popupVisible: false
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
                canShow: state => state.CURRENTUSER.data.shop_supplier,

                cartList: state => state.shop.CART_LIST,
                USER_TYPE: state => state.CURRENTUSER.data.user_type,
            }),
            // shopCart() {
            //     return {...this.cartList[this.factoryId]}
            // },
             cartNum() {
                return Object.values(this.shopCart).filter(item=>item.num>0).length
            },
            totalPrice() {
                let total_price = 0
                Object.values(this.shopCart).forEach((data, index) => {
                    if(data.num > 0) {
                        let num = +data.num > data.order_min_num ? +data.num:+data.order_min_num;
                        total_price +=  num * +data.price * data.tran;
                    }
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
                // let params = {
                //     id: this.id
                // }factory/3/detail/15
                const {
                    data
                } = await this.$http.get(`hippo-shop/factory/${this.factoryId}/detail/${this.id}`)
                this.data = this._handleData(data.data)
                queryShopCarList({}, this.factoryId).then(res=> {
                    this.shopCart = res
                    console.log(res)
                })
            //是否收藏
                isDetailFollow(this.id).then(res => {
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
                data.isChooseSelf = false
                let time = data.valid_time
                data.time = this.$moment(time*1000).format("YYYY-MM-DD")
                  if( data.production_time>0) {
                        data.production_time = this.$moment(data.production_time*1000).format("YYYY-MM-DD")
                    }
                Object.values(this.shopCart).forEach((cartItem, cartindex) => {
                    if (this.id === cartItem.id) {
                        this.nums = cartItem.num
                    }
                })
                return data
            },
            addToMiniCart() {
                 if(this.data.num >=99999) {
                    this.$toast('最大购物量为99999')
                    return false
                }
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
                    supplier_id: this.factoryId,
                    good_id: this.id
                }
                addShopCar(params)
                // this.ADD_CART(item)
                // this.nums++
                // if (this.canOption()) {
                //     this.ADD_CART(item)
                //     this.nums++
                // }

            },
               // 选择通过键盘输入选择添加购物车数量
            handleChoose() {
                console.log(123, this.data)
                // this.$set(this.data, 'isChooseSelf', true)
                // debugger
                this.data.isChooseSelf = true
            },
            handleInput(event) {
				if(event.target.value.length > 5) {
                   this.$toast('最大输入五位数')
					event.target.value = event.target.value.substring(0, 5)
					return true
				}
            },
            // input失去焦点
            handleBlur(event) {
                // debugger
                this.data.isChooseSelf = false
                let num =event.target.value
                if(Number.isInteger(parseInt(num))&&(num < this.data.order_min_num)) {
                    this.$toast('不能小于最小订货量')
                    return false
                }
				// 如果event.target.value是空，则不改变数值
				if(!num ||　(num === this.data.num)) {
					return false
                }
                this.data.num = num
                if(this.shopCart[this.id]) {
                    this.shopCart[this.id].num = num
                } else {
                    this.$set(this.shopCart, `${this.id}`, this.data)
                }
                // debugger
                // console.log(this.shopCart)
                
                
                let params = {
                    supplier_id: this.factoryId,
                    good_id: this.id,
                    num: num
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
                    supplier_id: this.factoryId,
                    good_id: this.id
                }
                onlyDelShopCar(params)
            },
            CollectionFn() {
                const params = {
                    entity_id: this.id
                }
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
            },
            showPop() {
                this.popupVisible = true;
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
            width: 4.8rem;
            background: -webkit-linear-gradient(left, rgb(255, 65, 113), rgb(255, 92, 152)); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(right, rgb(255, 65, 113), rgb(255, 92, 152)); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(right, rgb(255, 65, 113), rgb(255, 92, 152)); /* Firefox 3.6 - 15 */
            background: linear-gradient(to right, rgb(255, 65, 113), rgb(255, 92, 152)); /* 标准的语法 */
            line-height: 1rem;
            font-size: .48rem;
            color: #fff;
            padding-left: .2rem;
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
    }
    .show {
        display: flex;
        height: 1rem;
        align-items: center;
        background: #fff;
        margin-top: .2rem;
        justify-content: space-between;
        padding: 0 .2rem 0 0;
        section {
            height: 100%;
             display: flex;
        /* height: 1rem; */
            align-items: center;
        
            span:nth-of-type(1) {
                
                /* font-family:; */
                font-weight:bold;
                margin-left: .3rem;
                
                color:rgba(30,30,30,1);
            }
            span {
                font-size:.32rem;
                /* font-weight: ; */
                color: #333;
                margin-left: .2rem;
            }
        }
        svg {
            width: .46rem;
            height: .46rem;
            margin-left: .32rem;
        };
        img {
            width: 1.2rem;
            height: 0.6rem;
            margin-left: .2rem;
            margin-top: -.08rem;
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
            letter-spacing: 2em;
            margin-right: .02rem!important;
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

    /*加减*/
    // .gw_num {
    //     width: 1.7rem;
    //     height: .58rem;
    //     background: rgb(255, 59, 48);
    //     border-radius: .58rem;
    //     display: flex;
    //     align-items: center;
    //     text-align: center;
    //     margin-top: .2rem;
    //     margin-left: .3rem;
    //     svg {
    //         width: .22rem;
    //         height: .22rem;
    //     }
    // }

    // .gw_num em {
    //     color: #fff;
    //     cursor: pointer;
    //     font-size: .28rem;
    //     flex: 1;
    //     line-height: 24px;
    //     font-weight: 100;
    //     font-style: normal;
    //     font-weight: bold;
    // }

    .shop_num em {
        color: #fff;
    }

    // .gw_num .num {
    //     font-style: normal;
    //     font-size: .28rem;
    //     flex: 1;
    //     display: flex;
    //     color: #fff;
    // }

    // .gw_num .num p {
    //     font-size: .18rem;
    //     color: #fff;
    //     -webkit-transform: scale(0.7);
    //     margin-left: .05rem;
    // }

    // .gw_num .num input {
    //     width: 50%;
    //     text-align: center;
    // }
    .collect_box {
        position: absolute;
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
    .headTop {
        display: inline-flex;
        width: 100%;
        height: .88rem;
        align-items: center;
        background: #2DA2FF;
        padding: .2rem;
        color: #fff;
        font-size: .3rem;
        // font-weight: bold;
        img {
            width: 10px;
            height: 20px;
        }
        div {
            flex:1;
            text-align: center;
            span {
                display: inline-block;
                margin-right: .32rem;
                padding-bottom: .06rem;
                &.active {
                    border-bottom: 2px solid #fff;
                    font-weight: bold;
                }
            }
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
        display: flex;
        justify-content: center;
        img {
            width: 100%!important;
        }
        .content >>> img {
            width: 100%!important;
        }
    }
     .noInfo {
        color: #644f1b;
        font-size: .28rem;
        width: 90%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: .8rem;
        background: linear-gradient(to right, #feeec4, #f2dca0);
        svg {
            width: .4rem;
            height: .4rem;
            margin-right: .14rem;
        }
    }
    .pop-title {
        text-align: center;
        font-size: .36rem;
        line-height: 3;
        border-bottom: 1px solid #f1f1f1;
        svg {
            position: absolute;
            width: .3rem;
            height: .3rem;
            float: right;
            display: block;
            right: .32rem;
            top:.35rem
        }
    }
      .discounts {
        margin-top: .35rem;
        position: relative;
        height: .35rem;
         width: 5rem;

        .fade-box {
            height: .35rem;
            display: flex;
            align-items: center;
            float: right;
            span {
                color: #ccc;
                font-size: .2rem;
            }
            .icon {
                position: relative;
                width: .23rem;
                height: .23rem;
                margin-left: .1rem;
            }
        }
        ul {
            height: .35rem;
            overflow: hidden;
            position: absolute;
            top:0px;
            li {
                display: flex;
                align-items: flex-start;
                margin-bottom: 0.12rem;
                /* height: .35rem; */
                &:nth-child(even) {
                    span {
                        background: #ff7612;
                    }
                }
                span {
                    font-size: .22rem;
                    color: #fff;
                    background: rgb(250, 84, 82);
                    width: .36rem;
                    height: .36rem;
                    line-height: .36rem;
                    text-align: center;
                    overflow: visible;
                    border-radius: 4px;
                    flex-shrink: 0;
                }
                p {
                    font-size: 0.24rem;
                    color: #f1f1f1;
                    padding-left: 0.12rem;
                }
            }
        }
    }

</style>

<style lang="scss">
    .infoDetail {
        // margin-bottom: 1rem;
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