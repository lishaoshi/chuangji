<template>
    <div class="buyActivityList">
        <div class="head">
            <span>[{{data.group_buying.end_time | handleTime}}] {{data.group_buying.group_type.name}}
                <span v-if="supplierId==data.supplier_id">我发布的</span>
            </span>
            <svg v-if="supplierId==data.group_buying.successful_supplier_id">
                <use xlink:href="#icon-winBidding"/>
            </svg>    
        </div>

        <div class="main">
            <img :src="data.group_buying.product.cover" alt="">
            <div class="info">
                <p>{{data.group_buying.generic_name}}</p>
                <p>品牌: {{data.group_buying.brand_name}}</p>
                <p>规格: {{data.group_buying.spec}}</p>
            </div>
        </div>

        <div class="btn-group">
            <div @click="toRouter(`/change-history/${data.group_buying.id}`)">
                变价历史
            </div>
            <div @click="toRouter(`/buy-recoed/${data.group_buying.id}`)">
                集采记录
            </div>
        </div>
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
        })
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
        border-bottom: 1px solid #e6e6e6;
        width: 100%;
        justify-content: space-between;
        span {
            margin-left: 14px;
            span {
                margin: 0;
                display: inline-block;
                font-size: .01rem;
                background: #0090FF;
                color: #fff;
                padding: 0 .08rem;
                border-radius: 12px;
            }
        }
        svg {
            width: 1rem;
            height: .8rem;
            align-self: flex-start;
            margin-right: .4rem;
        }
        span::before {
            content: " ";
            display: inline-block;
            width: 3px;
            height: 16px;
            background: #0090ff;
            position: absolute;
            left: 0;
            top: 50%;
            margin-right: 10px;
            margin-top: -8px;
        }
    }
    .main {
        display: flex;
        padding: .26rem .2rem;
        p:first-child {
            font-size: .4rem;
            font-weight: bold;
            color: #333;
            line-height: .8rem;
        }
        p:not(:first-child) {
            font-size: .28rem;
            font-weight: bold;
            color: #666;
            line-height: .4rem;
        }
    }
    .btn-group {
        height: .9rem;
        display: flex;
        color: #0090FF;
        align-items: center;
        border-top: 1px solid #e5e5e5;
        div {
            flex: 1;
            text-align: center;
            height: 100%;
            line-height: .9rem;
            font-size: .32rem;
            &:first-child {
                border-right: 1px solid #e5e5e5;
            }
        }
    }
    img {
        width: 1.8rem;
        height: 1.8rem;
        margin-right: .2rem;
    }
}
</style>