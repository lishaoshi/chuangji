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
                     {{data.spec}}/{{data.unit}}&nbsp;&nbsp;&nbsp;&nbsp;{{data | handleSpec}}
                </p>
            </div>
        </div>

        <div class="price-bottom">
            <div class="shops-price-list">
                <div v-for="(item, index) of dataPrice" :key="index">
                    <span>{{item.supplier_name}}</span>
                    <span>
                        采购价(元): 
                        <span class="price">
                            {{item.supplier_price}}
                        </span>
                    </span>
                </div>
            </div>
            <div class="price-btn-group">
                <div class="price-group">
                     <div class="min-price">
                        <span>最低价(元)</span>
                        <span>{{data.latest_price}}</span>
                    </div>
                    <div>
                        <span>已集采({{data.big_unit}})  </span>
                        <span>{{data.total || 0}}</span>
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
export default {
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
        dataPrice() {
            let arr = []
            if(this.data.price.length==0) {
                let obj = {
                    supplier_price: this.data.latest_price,
                    supplier_name: "**集采商"
                }
                arr.push(obj)
                return arr
            }
            return this.data.price
        }
    },
    filters: {
        handleSpec(data) {
            let text = `${data.tran}${data.unit}/${data.big_unit}`
            return text
        }
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
    padding:.32rem;
    background: #fff;
    border-radius: 10px;
    .goods-info {
        display: flex;
        img {
            width: 1.8rem;
            height: 1.8rem;
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
                font-size: .4rem;
               line-height: .8rem;
            }
            p:not(:first-child) {
                font-size: .28rem;
                color: #666;
                line-height: .4rem;
            }
        }
    }
    .price-bottom {
        display: flex;
        justify-content: space-between;
        margin-top: .24rem;
        .shops-price-list {
            background: #F9F9F9;
            border-radius: 8px;
            display: inline-flex;
            justify-content: space-between;
            flex-direction: column;
            padding: 0 .1rem;
            font-size: .22rem;
            align-self: flex-start;
            flex: 0 0 auto;
            span:first-child {
                margin-right: .1rem;
            }
            & > span {
                flex: 0 1 auto;
            }
            .price {
                color: #0090FF;
            }
            div {
                height: .64rem;
                line-height: .64rem;
            }
        }
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
                    &:first-child {
                        margin-right: .7rem;
                    }
                    span {
                        text-align: center;
                        &:first-child {
                            font-size: .2rem;
                            color: #999999;
                        }
                        &:last-child {
                            font-size: .36rem;
                            color: #0090FF;
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