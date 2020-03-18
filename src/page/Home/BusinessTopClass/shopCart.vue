<template>
    <div class="carImg">
        <svg class="icon shopCart" v-if="!item.cart_num"  @click="add_shop_car(item,index)" aria-hidden="true">
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
</template>

<script>
import { queryShopCarList, delShopCar, addShopCar, onlyDelShopCar } from '@/api/shopCar';
export default {
    props: ['item', 'index'],
    data () {
        return {
            
        }
    },
    methods: {
            // 添加至购物车
            add_shop_car(item) {	
				if(item.cart_num>=99999) {
					this.$toast('最大购买量为99999')
					return false
                }
				if(item.cart_num < item.product.order_min_num) {
					item.cart_num += item.order_min_num
				} else {
					item.num++
				}
                let data = {
                    supplier_id: item.supplier_id,
                    good_id: item.id
                }
                addShopCar(data);
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
                this.cartNum = this.calculateCartNum()
                this.totalPrice = this.calculateTotalPrice()
                
            },
    }
}
</script>

<style lang="scss" scoped>
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
</style>