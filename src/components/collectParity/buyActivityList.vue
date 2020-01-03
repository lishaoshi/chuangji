<template>
    <div class="buyActivityList">
        <div class="head">
            <div class="line"></div>
            <span>[{{data.group_buying.end_time | handleTime}}] {{data.group_buying.group_type.name}}
            </span>
            <span class="ismy" v-if="supplierId==data.supplier_id">我发布的</span>
            <svg v-if="supplierId==data.group_buying.successful_supplier_id">
                <use xlink:href="#icon-winBidding"/>
            </svg>    
        </div>

        <div class="main">
            <img :src="data.group_buying.product.cover" alt="">
            <div class="info">
                <p>{{data.group_buying.generic_name}}</p>
                <p> 
                    <span>
                        品牌:&nbsp;
                    </span>{{data.group_buying.brand_name}}</p>
                <p> 
                    <span>
                    规格:&nbsp;
                    </span> 
                    {{data.group_buying.spec}}/{{data.group_buying.unit}}
                </p>
                 <p>
                    <span>
                        包装:&nbsp;
                    </span>
                    {{data.group_buying | handleSpec}}
                </p>
                <slot name="price">
                    <section class="price-box">
                    <div class="min-price">
                            <span>最低价(元/{{data.group_buying.unit}})</span>
                            <span>{{data.group_buying.latest_price}}</span>
                        </div>
                        <div>
                            <span>已集采({{data.group_buying.big_unit}})  </span>
                            <span>{{data.group_buying.total}}
                            </span>
                        </div>
                        <div class="min-price">
                            <span>总金额(元)</span>
                            <span v-html="total">9999</span>
                        </div>
                    </section>
                </slot>
            </div>
        </div>
        <slot name="foot">
            <div class="btn-group">
                <div @click="toRouter(`/change-history/${data.group_buying.id}`)">
                    变价历史
                </div>
                <div @click="toRouter(`/buy-recoed/${data.group_buying.id}`)">
                    集采记录
                </div>
            </div>
        </slot>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        data: {
            type: Object,
            default:()=>{}
        }
    },
    computed: {
        ...mapState({
            supplierId:state=>state.CURRENTUSER.data.supplier_id
        }),
         total() {
            let total = this.data.group_buying.latest_price*this.data.group_buying.tran*this.data.group_buying.total
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
        handleTime(val) {
            let date = new Date(val*1000)
            let y = date.getFullYear()
            let m = date.getMonth()+1
            let d =  date.getDate()
            let h = date.getHours()
            let ms = date.getMinutes()
            let ss = date.getSeconds()
            return `${y}/${m}/${d}`
        },
        handleSpec(data) {
            let text = `${data.tran}${data.unit}/${data.big_unit}`
            return text
        }
    }

}
</script>

<style lang="scss" scoped>
.buyActivityList {
    background: #fff;
    margin: 0 .24rem;
    border-radius: 10px;
    margin-top: .2rem;
    .head {
        height: .98rem;
        display: inline-flex;
        align-items: center;
        position: relative;
        font-size: .28rem;
        color: #999999;
        border-bottom: 1px solid #f0f0f0;
        width: 100%;
        // justify-content: space-been;
        .line {
            width: 3px;
            height: 18px;
            background: #0090FF;
            border-radius:3px;
        }
        span {
            margin-left: 14px;
            margin-right: 8px;
            font-size: .28rem;
            font-weight: bold;
        }
        .ismy {
            margin: 0;
            display: flex;
            font-size: .18rem;
            background: #0090FF;
            color: #fff;
            padding: 0 .08rem;
            align-items: center;
            border-radius: 12px;
        }
        svg {
            width: 1rem;
            height: .8rem;
            align-self: flex-start;
            // margin-right: .4rem;
            position: absolute;
            right: .44rem;
        }
        // span::before {
        //     content: " ";
        //     display: inline-block;
        //     width: 3px;
        //     height: 16px;
        //     background: #0090ff;
        //     position: absolute;
        //     left: 0;
        //     top: 50%;
        //     margin-right: 10px;
        //     margin-top: -8px;
        //     border-radius:3px;
        // }
    }
    .main {
        display: flex;
        padding: .26rem .2rem;
        & > div {
            min-width: 100px;
            display: flex;
            flex-direction: column;
            flex: 1;
        }
        .price-box {
            display: flex;
            justify-content: space-around;
            margin-top: .56rem;
            div{
                display: flex;
                flex-direction: column;
                // margin-right: .2rem;
                span {
                    text-align: center;
                    &:first-child {
                        font-size: .18rem;
                        color: #999999;
                    }
                    &:last-child {
                        font-size: .32rem;
                        color: #FA5452;
                        margin-top: .1rem;
                        i {
                            font-size: .28rem;
                        }
                    }
                }
            }
        }
        p {
            width: 100%;
            display: flex;
            span:first-child {
                flex: 0 0 auto;
            }
        }
        p:first-child {
            font-size: .34rem;
            font-weight: bold;
            color: #333;
            line-height: .56rem;
            
        }
        p:not(:first-child) {
            font-size: .24rem;
            font-weight: bold;
            color: #666;
            line-height: .36rem;
        }
    }
    .btn-group {
        height: .9rem;
        display: flex;
        color: #0090FF;
        align-items: center;
        border-top: 1px solid #f0f0f0;
        div {
            flex: 1;
            text-align: center;
            height: 100%;
            line-height: .9rem;
            font-size: .32rem;
            &:first-child {
                border-right: 1px solid #f0f0f0;
            }
        }
    }
    img {
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 10px;
        margin-right: .2rem;
    }
}
</style>