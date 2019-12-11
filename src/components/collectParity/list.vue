<template>
    <div class="collect-parity-list">
        <div class="goods-info">
            <img :src="data.product.cover" alt="">
            <div class="goods-name">
                <p>{{data.generic_name}}</p>
                <p>
                    <span>
                        品牌:&nbsp;
                    </span> {{data.brand_name}}
                </p>
                <p>
                    <span>
                        规格:&nbsp;
                    </span>
                     {{data.spec}}/{{data.unit}}
                </p>
                <p>
                    <span>
                        包装:&nbsp;
                    </span>
                    {{data | handleSpec}}
                </p>
            </div>
        </div>

        <div class="price-bottom">
            <scrollList :data="data"/>
            <div class="price-btn-group">
                <div class="price-group">
                    
                    <div class="min-price">
                        <span>最低价(元/{{data.unit}})</span>
                        <span>{{data.latest_price}}</span>
                    </div>
                    <div>
                        <span>已集采({{data.big_unit}})  </span>
                        <span>{{data.total}}
                        </span>
                    </div>
                    <div class="min-price">
                        <span>总金额(元)</span>
                        <span v-html="total"></span>
                    </div>
                </div>
                <div class="button-group">
                    <div @click="changePrice('请输入价格', data.id, 1)">
                        变价
                    </div>
                    <div @click="changePrice('请输入集采数量', data.id, 2)">
                        集采
                    </div>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
import scrollList from "./scrollPricelist"
export default {
    components: {
        scrollList
    },
    props: {
        data: Object,
        default: ()=>{}
    },
    methods: {
        /**
         * flag: input的placeholder, id:列表的id， type：1：变价按钮点击，2集采按钮
         */
        changePrice(flag, id, type) {
            this.$emit('changePrice',flag, id, type)
        }
    },
    computed: {
        total() {
            
            let total = this.data.latest_price*this.data.tran*this.data.total
            if(total > 10000) {
                total = total / 10000
                total = total.toFixed(1)
                return `${total}<i style="font-size:.28rem;">万</i>`
            }
            total = parseInt(total)
            return total
        }
    },
    filters: {
        handleSpec(data) {
            let text = `${data.tran}${data.unit}/${data.big_unit}`
            return text
        },
        
    }

}
</script>

<style lang="scss" scoped>
.collect-parity-list {
    &:not(:first-child) {
        margin-top: .2rem;
    }
    display: flex;
    flex-direction: column;
    padding:.2rem;
    background: #fff;
    border-radius: 10px;
    .goods-info {
        display: flex;
        img {
            width: 2rem;
            height: 2rem;
            border-radius: 10px;
            margin-right: .3rem;
        }
        .goods-name {
            display: flex;
            flex-direction: column;
            // flex: 1 0 auto;
            min-width: 100px;
            p {
                font-weight: bold;
                display: flex;
                span:first-child {
                    flex: 0 0 auto;
                }
            }
            p:first-child {
                font-size: .34rem;
               line-height: .56rem;
            }
            p:not(:first-child) {
                font-size: .24rem;
                color: #666;
                line-height: .4rem;
            }
        }
    }
    .price-bottom {
        display: flex;
        justify-content: space-between;
        margin-top: .24rem;
        .price-btn-group {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            .price-group {
                display: flex;
                justify-content: flex-end;
                div{
                    display: flex;
                    flex-direction: column;
                    margin-right: .2rem;
                    span {
                        text-align: center;
                        &:first-child {
                            font-size: .18rem;
                            color: #999999;
                        }
                        &:last-child {
                            font-size: .32rem;
                            color: #0090FF;
                            i {
                                font-size: .28rem;
                            }
                        }
                    }
                }
            }
            .button-group {
                display: flex;
                justify-content: flex-end;
                margin-top: .32rem;
                div {
                    width:1.6rem;
                    height:.8rem;
                    line-height: .8rem;
                    text-align: center;
                    color: #fff;
                    font-size: .28rem;
                    &:first-child {
                        background:linear-gradient(90deg,rgba(255,202,0,1),rgba(255,148,2,1));
                        border-radius:40px 0px 0px 40px;
                    }
                    &:last-child {
                        background:linear-gradient(90deg,rgba(254,118,0,1),rgba(255,73,0,1));
                        border-radius:0px 40px 40px 0px;
                    }
                }
            }
        }
    }
}
</style>