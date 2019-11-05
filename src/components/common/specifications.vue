<template>
    <div class="specifications">
        <ul>
            <li>
                <div>商品名称</div>
                <div>{{this.data.good_name}}</div>
            </li>
            <li v-if="this.data.generic_name">
                <div>通用名称</div>
                <div>{{this.data.generic_name}}</div>
            </li>
            <li>
                <div class="textLett">品 牌</div>
                <div>{{data.brand.name}}</div>
            </li>
            <li>
                <div class="textLett">规 格</div>
                <div>{{data.spec}}</div>
            </li>
            <li>
                <div>生产日期</div>
                <div>{{production_time}}</div>
            </li>
            <li>
                <div class="textLett2">有效期</div>
                <div>{{valid_time}}</div>
            </li>
            <li>
                <div>批准文号</div>
                <div>{{data.approval_number}}</div>
            </li>
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
            return this.$moment(this.data.valid_time*1000).format("YYYY.MM.DD")
        },
        // 生产日期
        production_time() {
            return this.$moment(this.data.production_time*1000).format("YYYY.MM.DD")
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
            align-items: center;
            &:first-child {
                border-top: 1px solid #E7E7E7;
                
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
        }
    }
}
</style>