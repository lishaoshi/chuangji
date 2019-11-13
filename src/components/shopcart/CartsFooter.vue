<template>
    <div class="shopPrice">
        <div class="all-choice">
        	<svg class="check goods-check shopCheck" @click="$emit('shopCheckedAll')">
				<use :xlink:href="`#icon-IsCheckedShop-${data.checked ? 'open' : 'close' }`" />
			</svg>
			<label>全选</label>
        </div>
        <div class="total-price">
            总计：<span class="shop-total-amount ShopTotal">{{totalPrice |　display_price}} <span v-if="totalPrice>0" class="priceText">({{flag?'含配送费':'免配送费'}})</span></span>
           
        </div>
        <button  class="sub-btn" :class="hasActive ? 'active':''"  @click="onSubmit">提交</button>
    </div>
</template>

<script>
    let that
    import bus from '@/bus'
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
                flag: false,  //判断总额是否含有配送费
                totalPrice:　0
            }
        },
        beforeCreate() {
            console.log(this)
            // that = this
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
        mounted() {
           bus.$on('_cartCount',(value, flag)=>{
               console.log(123)
                this.$nextTick().then(()=>{
                    this.totalPrice = value.toFixed(2)
                    this.flag = flag
                })
                
            })
        },
        filters:{
            // _cartCount(data){
            //     let totalPrice = 0   
            //     // debugger
            //     // data.shops.forEach(shop =>{
            //     //     // debugger
                    
            //     //     shop.items.forEach(item => {
            //     //         console.log(item)
            //     //         if(item.checked) {
            //     //             totalPrice+=+item.sale_price * +item.num
            //     //             // item.totalPrice = +item.sale_price * +item.num
            //     //             // if(item.totalPrice < item.suppliersPrices.starting_price) {
            //     //             //     that.flag = 1
            //     //             //     item.totalPrice += +item.suppliersPrices.shipping_fee        
            //     //             // } else {
            //     //             //     that.flag = 2
            //     //             // }
            //     //             // totalPrice+=item.totalPrice
            //     //         }   
            //     //     })
            //     // })
            //     for(let i=0; i< )
            //     return totalPrice.toFixed(2)
            // }
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