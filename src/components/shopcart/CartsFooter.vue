<template>
    <div class="shopPrice">
        <div class="all-choice">
        	<svg class="check goods-check shopCheck" @click="$emit('shopCheckedAll')">
				<use :xlink:href="`#icon-IsCheckedShop-${data.checked ? 'open' : 'close' }`" />
			</svg>
			<label>全选</label>
        </div>
        <div class="total-price">
            总计：<span class="shop-total-amount ShopTotal">{{ data | _cartCount}} <span v-if="flag" class="priceText">({{flag==1?'含配送费':flag==2?'免配送费':''}})</span></span>
           
        </div>
        <button  class="sub-btn" :class="hasActive ? 'active':''"  @click="onSubmit">提交</button>
    </div>
</template>

<script>
    let that
    export default {
        name: "CartsFooter",
        props:{
            data:{},
            toSubmitDataFnc:{
                type: Function,
                default:()=>{}
            }
        },
        data() {
            return {
                flag: 0  //判断总额是否含有配送费
            }
        },
        beforeCreate() {
            console.log(this)
            that = this
        },
        computed:{
            hasActive(){
                let active = false
                this.data.shops.forEach(shop =>{
                    shop.items.forEach(item => {
                        if(item.checked){
                            active = true
                            return
                        }
                    })
                })
                return active
            }
        },
        filters:{
            _cartCount(data){
                let totalPrice = 0   
                data.shops.forEach(shop =>{
                    shop.items.forEach(item => {
                        if(item.checked) {
                            item.totalPrice = +item.sale_price * +item.num
                            if(item.totalPrice < item.suppliersPrices.starting_price) {
                                that.flag = 1
                                item.totalPrice += +item.suppliersPrices.shipping_fee        
                            } else {
                                that.flag = 2
                            }
                            totalPrice+=item.totalPrice
                        }   
                    })
                })
                return totalPrice.toFixed(2)
            }
        },
        methods: {
            onSubmit() {
				if(this.hasActive){
                    this.toSubmitDataFnc()
                }
			}
		},
    }
</script>

<style scoped lang="scss">
        .priceText {
            color: #999!important;
            font-size: .24rem!important;
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
        align-items: center;
        .all-choice {
			font-size: .24rem;
			padding-left: .2rem;
			color: #666;
			display:flex;
			height: 1rem;
			align-items: center;
			line-height: 1rem;
			width:1.58rem;

			svg {
				width: .35rem;
				height: .35rem;
				margin-right: .1rem;
			}
		}
        .total-price {
            font-size: .28rem;
            width: 62%;
            span {
                color: #F2385A;
                font-size: .3rem;
                padding-right: .2rem;
            }

        }
      
        .sub-btn {
            width: 2.3rem;
            height: 1rem;
            background: #eee;
            color: #555;
            text-align: center;
            font-size: .34rem;
            line-height: 1rem;

            &.active{
                background: #26A2FF;
                color:#fff
            }
        }
    }
</style>