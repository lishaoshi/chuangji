<template>
    <div class="specifications">
        <ul>
            <li>
                <div>商品编号</div>
                <div>{{this.data.good_sn}}</div>
            </li>
            <li>
                <div class="once">基本信息</div>
            </li>
            <li v-if="this.data.generic_name">
                <div>通用名称</div>
                <div>{{this.data.generic_name}}</div>
            </li>
            <li v-if="data.good_names">
                <div>商品学名</div>
                <div>{{this.data.good_name}}</div>
            </li>
            <li>
                <div class="textLett">品 牌</div>
                <div>{{data.brand.name}}</div>
            </li>
            <li>
                <div class="textLett">规 格</div>
                <div>{{data.spec}}</div>
            </li>
            <li v-if="production_time">
                <div>生产日期</div>
                <div>{{production_time}}</div>
            </li>
            <li v-if="valid_time">
                <div class="textLett2">有效期</div>
                <div>{{valid_time}}</div>
            </li>
            <li>
                <div>批准文号</div>
                <div>{{data.approval_number}}</div>
            </li>
            <template v-if="isShop">
                <li>
                    <div class="once">商品单位</div>
                </li>
                <li v-if="data.big_unit">
                    <div>
                        <i class="text3">大</i>
                        <i class="text3">单</i>
                        位</div>
                    <div>{{data.big_unit}}</div>
                </li>
                <li>
                    <div>销售单位</div>
                    <div>{{data.unit }}</div>
                </li>
                <li v-if="data.big_unit">
                    <div>转换系数</div>
                    <div>{{data.tran}}</div>
                    
                </li>
                
            </template>
            
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        data: Object,
        default:()=>{
            return {}
        }
    },
    computed: {
        //有效期
        valid_time() {
             if(!this.data.valid_time) {
                return ''
            }
            return this.$moment(this.data.valid_time*1000).format("YYYY.MM.DD")
        },
        // 生产日期
        production_time() {
            if(!this.data.production_time) {
                return ''
            }
            return this.$moment(this.data.production_time*1000).format("YYYY.MM.DD")
        },
        isShop() {
            // return this.$moment(this.data.valid_time*1000).format("YYYY.MM.DD")
            if(this.$route.path.includes('business')) {
                return false
            } else {
                return true
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.specifications {
    background: #fff;
    position: absolute;
    left: 0;
    top: .88rem;
    right: 0;
    bottom: 0;
    ul {
        padding: 0 .2rem;
        margin-top: .2rem;
        li {
            display: flex;
            border-bottom: 1px solid #E7E7E7;
            // border-top: 1px solid #E7E7E7;
            border-left: 1px solid #E7E7E7;
            border-right: 1px solid #E7E7E7;
            height: .8rem;
            font-size: .24rem;
            align-items: center;
            color: #848689;
            &:first-child {
                border-top: 1px solid #E7E7E7;  
            }
            .text3 {
                letter-spacing: .5em;
            }
            div {
                text-align: left;
                margin-left:.38rem;
            }
            div:first-child {
                height: 100%;
                line-height: .8rem;
                width: 2.1rem;
                border-right: 1px solid #E7E7E7;
            }
            div:last-child {
                flex: 1;
                text-align: left;
            }
            .textLett {
                letter-spacing: 0.6em;
            }
            .textLett2 {
                 letter-spacing: 0.3em;
            }
            .once {
                 border-right: 0!important;
            }
        }
    }
}
</style>