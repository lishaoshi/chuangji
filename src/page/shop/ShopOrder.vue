<template>
    <div id="ShopOrder">
        <div v-if="!is_success">
            <clxsd-head-top :title='`确认订单`'></clxsd-head-top>
            <router-link to="/address/choose?choose=1" class="address-choice address-container">

                <svg class="img-icon1">
                    <use xlink:href="#icon-submitOrder-position"/>
                </svg>
                <div class="add-address" v-if="!choosedAddress" style="color: #333;text-align: left;width: 87%;font-size: .32rem;">请添加一个收货地址</div>
                <div v-else class="address-detail-container">
                    <div class="address_detail">
                        <p>
                            <span>{{choosedAddress.consignee}}</span>
                            <span>{{choosedAddress.tel}}</span>
                        </p>
                        <p>{{choosedAddress.full_address}}</p>
                    </div>
                </div>
                <svg class="img-icon1">
                    <use xlink:href="#icon-submitOrder-enter"/>
                </svg>
            </router-link>

            <!---选择的产品内--->
            <div class="shop-list-container">
                <div class="shop-group-item" :key="index" v-for="(shop,index) in　shopData">
                    <div class="shop-name">
                        <div>
                            <img src="../../images/default.jpg" width="30" height="30" v-if="shop.logo==null">
                            <img :src="shop.img_cover" v-else width="30" height="30">
                            <a href="#" class="company-name">{{shop.display_name || shop.name}}</a>
                        </div>
                    </div>
                    <div class="shop-entities-list">
                        <div class="cart-item" :key="`${index}:${enIndex}`" v-for="(entity,enIndex) in shop.entities">
                            <div class="cart-item-img">
                                <a href="#">
                                    <img :src="entity.cover">
                                </a>
                            </div>
                            <div class="cart-info-text">
                                <h4>{{entity.good_name}}</h4>
                                <div class="shop-price">
                                    <div class="shop-pices">
                                        ￥<span class="price">{{entity.price | display_price}}<i>/{{entity.unit || '件'}}</i></span>
                                    </div>
                                    <div class="shop-num">x{{ entity.num || 1}}{{entity.unit || '件'}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul class="shop-ul">
                        <li>
                            <span>{{userType==2?"件数":"数量"}}</span>
                            <i>{{shop.cnum}} {{userType==2?"件":""}}</i>
                        </li>
                        <!-- <li>
                            <span>原价</span>
                            <i>￥{{shop.cprice | display_price}}</i>
                        </li> -->
                        <li v-if="shop.conpou">
                            <router-link to="/choice-coupon" class="yhj">
                                <span>可用优惠卷</span>
                                <mt-badge size="small" type="error">10个可用</mt-badge>
                            </router-link>
                        </li>
                        <li>
                            <span>小计</span>
                            <i>￥{{shop.real_price | display_price}}</i>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="fade"></div>
            <div class="shopPrice">
                <div class="total-price">
                    合计：
                    <span class="shop-total-amount ShopTotal">￥{{totalPrice| display_price}}</span>
                </div>
                <a @click="onSubmit" class="sub-btn">确认提交</a>
            </div>
        </div>
        <SuccessOrder v-else style="background:#fff;position: fixed;width: 100%;height: 100%;top:0px" :order-type="orderType"/>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getAddressList} from '@/api/address'
    import SuccessOrder from './OrderSuccess'
    import { confirmOrder } from '@/api/shopCar'

    export default {
        name: "ShopOrder",
        data() {
            return {
                shopData: [],
                is_success:false,
                orderType:1
            }
        },
        components:{
          SuccessOrder
        },
        computed: {
            ...mapState({
                confirmOrderData: state => state.shop.CONFIRM_ORDER_DATA,
                choosedAddress: state => state.shop.CHOOSED_ADDRESS,
                userType: state => state.CURRENTUSER.data.user_type
            }),
            totalPrice() {
                let price = 0
                const shopData = this.shopData
                shopData.forEach((shop, i) => {
                    price += shop.real_price

                })
                return price
            }
        },
        created() {
            // debugger
            
            if(JSON.stringify(this.confirmOrderData)=="{}") {
                this.$router.go(-1)
            }
            this.initData()
        },
        methods: {
            ...mapMutations(['CHOOSE_ADDRESS', 'CLEAR_CONFIRM_ORDER_DATA']),
            //初始化数据
            initData() {
                if (!this.confirmOrderData) {
                    this.goBack()
                }
                const confirmOrderData = this.confirmOrderData
                this.orderType = confirmOrderData.type
                switch (confirmOrderData.type) {
                    case 'factory':
                        this.initFactoryData(confirmOrderData.checkedItems)
                        break
                    case 'business':
                        this.initBusinessData(confirmOrderData)
                        break
                }

                this.initAddress()
            },
            //获取地址信息，第一个地址为默认选择地址
            async initAddress() {
                if (!this.choosedAddress) {
                    const {data} = await getAddressList()
                    if (data instanceof Array && data.length) {
                        let defaultAddress = data[0]
                        if (!defaultAddress.is_default) {
                            data.forEach(address => {
                                if (address.is_default) {
                                    defaultAddress = address
                                }
                            })
                        }

                        this.CHOOSE_ADDRESS({address: defaultAddress})
                    }
                }
            },
            async initFactoryData(checkedItems) {
                const params = {
                    type: 'factory',
                    items: checkedItems
                }
                const {data} = await this.$http.post('hippo-shop/confirm-order', params)
                data.forEach((shop, i) => {
                    let cnum = 0
                    let cprice = 0
                    Object.values(shop.entities).forEach((entity, ix) => {
                        entity['show_unit'] = entity.big_unit
                        // entity['sale_price'] = entity.price * entity.tran    //盒单价*盒数==价格
                        checkedItems.forEach(item => {
                            if (item.id === entity.id) {
                                cnum += +item.num
                                entity['num'] = item.num
                                // cprice += entity['sale_price'] * entity['num']
                                cprice += entity.price*entity['num']
                            }
                        })
                    })
                    shop.cnum = cnum
                    shop.cprice = cprice
                    shop.real_price = cprice
                })
                this.shopData = data
               
            },
            async initBusinessData(confirmData) {
                const params = {
                    type: 'business',
                    shopId: confirmData.shopId,
                    items: confirmData.checkedItems
                }
                // debugger
                let {data} = await this.$http.post('hippo-shop/confirm-order', params)
                data.forEach((shop, i) => {
                    let cnum = 0
                    let cprice = 0
                    shop.entities.forEach((entity, ix) => {
                        entity['sale_price'] = entity.price
                        entity['show_unit'] = entity.unit
                        confirmData.checkedItems.forEach(item => {
                            if (item.id === entity.id) {
                                cnum += +item.num
                                entity['num'] = +item.num
                                cprice += entity['sale_price'] * entity['num']
                            }
                        })
                    })
                    shop.cnum = cnum
                    shop.cprice = cprice
                    shop.real_price = cprice
                })
                
                this.shopData = data
            },
            onSubmit() {
                if (!this.choosedAddress) {
                    this.$messagebox.alert('请添加收货地址！')
                    return
                }

                
                let ids = {}
                this.confirmOrderData.checkedItems.forEach((item, index, arr)=>{
                    if(ids[item.shopId]) {
                        ids[`${item.shopId}`] = [...ids[item.shopId], item.id]
                    } else {
                        ids[`${item.shopId}`] = [item.id]
                    }
                })
                ids = JSON.stringify(ids)
                const params = {
                    address_id: this.choosedAddress.id,
                    ids
                }
                
                confirmOrder(params).then(res=>{
                    let data = res.data.data.orders
                    let time = res.data.data.timeout_to_order_cancel
                    this.CLEAR_CONFIRM_ORDER_DATA()
                    this.$router.push({name: 'OrderSuccess', params: {data:data,time: time, orderType: this.orderType}})
                }).catch(err=>{
                    this.$toast('下单失败')
                })
                // console.log(params, ids, this.confirmOrderData)

                // this.$http.post('/hippo-shop/to-order', params)
                // .then(response => {
                //     //this.$router.push({path: '/order-success', query: {}})
                //     this.is_success = true
                //     console.log(response)
                // })
                // .catch(err => {
                //     console.log(err)
                // })
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .address-choice {
        display: flex;
        align-items: center;
        padding: .16rem .2rem;
        background: #fff;
        justify-content: space-between;

        .img-icon1 {
            width: 19px;
            height: 20px;
            color: #666;
        }

        .address-detail-container {
            width: 85%;
            margin-left: 2%;

            p {
                &:nth-child(1) {
                    color: #333;
                    font-size: .32rem;

                    span {
                        &:nth-child(2) {
                            color: #666;
                            font-size: .24rem;
                            padding-left: .1rem;
                        }
                    }
                }

                &:nth-child(2) {
                    color: #666;
                    font-size: .24rem;
                    line-height: 1.5;
                }
            }
        }
    }


    .shop-group-item {
        margin-top: .2rem;
        background: #fff;
        padding: .2rem;

        .shop-name {
            display: flex;
            font-size: 12px;
            margin-bottom: .2rem;
            height: .6rem;
            line-height: .6rem;

            div {
                display: flex;

                img {
                    // border: 1px solid #f1f1f1;
                }

                .company-name {
                    color: #333;
                    background: url(../../images/my/right_cowry.png) no-repeat right;
                    padding-left: 4px;
                    background-size: 6px 9px;
                    padding-right: 15px;
                }
            }
        }
    }

    .cart-item {
        display: flex;
        position: relative;
        justify-content: space-between;
        align-items: center;
        padding: .15rem 0;

        &-img {
            // border: 1px solid #f1f1f1;
            border-radius: 2px;
            padding: .02rem;

            img {
                width: 1.2rem;
                height: 1.2rem;
            }
        }

        .cart-info-text {
            width: 78%;

            h4 {
                font-size: .32rem;
                color: #000;
                line-height: 1.5;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .shop-price {
                display: flex;
                justify-content: space-between;
                margin-top: .3rem;

                .shop-pices {
                    font-size: .26rem;
                }

                .shop-num {
                    letter-spacing: 1px;
                }
            }
        }
    }

    .shop-ul {

        li {
            height: .8rem;
            line-height: .8rem;
            border-bottom: 1px solid #f1f1f1;
            display: flex;
            justify-content: space-between;
            font-size: .26rem;

            &:last-child {
                border: 0px
            }

            .yhj {
                display: block;
                background: url(../../images/my/right.png) no-repeat right;
                background-size: 5px 9px;
                padding-right: 13px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                color: #333;

                .is-size-small {
                    height: 25px;
                    line-height: 23px;
                    float: right;
                }
            }
        }
    }

    .shopPrice {
        position: fixed;
        bottom: 0px;
        width: 100%;
        height: 1rem;
        background: #fff;
        left: 0px;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid #f1f1f1;
        align-items: center;
        padding-left: .2rem;

        .total-price {
            font-size: .26rem;
            width: 70%;

            span {
                color: #F2385A;
                font-size: .3rem;
            }

        }

        .sub-btn {
            width: 2.3rem;
            height: 1rem;
            background: #26A2FF;
            color: #fff;
            text-align: center;
            font-size: .32rem;
            line-height: 1rem;
        }
    }

    .fade {
        height: 1.5rem;
    }
</style>