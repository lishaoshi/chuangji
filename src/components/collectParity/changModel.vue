<template>
    <div class="model">
        <div class="goods-info">
            <p>{{data.generic_name}}</p>
            <p>{{data.brand_name}}</p>
            <p>{{data.spec}}</p>
        </div>
        <slot />
        <div class="bottom-btn">
            <div @click="closeModel">
                取消
            </div>
            <div @click="confirmPrice">
                确定
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['isShowModel','data'],
    methods: {
        closeModel() {
            this.$emit('update:isShowModel', false)
        },
        confirmPrice() {
            this.$emit('confirmPrice')
        }
    }
}
</script>

<style lang="scss" scoped>
.model {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 20%;
    margin-left: -45%;
    background: #fff;
    z-index: 1000;
    border-radius: 6px;
    padding-top: .44rem;
    .input {
        input {
            text-align: center;
        }
    }
    .goods-info {
        text-align: center;
        p {
            line-height: .44rem;
        }
        p:first-child {
            font-size: .36rem;
            font-weight:bold;
            color: #333;
        }
        p:not(:first-child) {
            font-size: .28rem;
            color:#999;
        }
    }
    .input {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: .4rem 0;
        height: .6rem;
        input {
            border: 1px solid #999;
            border-radius: 30px;
            margin: 0 auto;
            width: 70%;
            height: 100%;
            &::-webkit-input-placeholder {
                color: #CCCCCC!important;
            }
            &::-moz-placeholder {/* Firefox 18- */
                color: #CCCCCC!important;
            }
            &::-moz-placeholder{/* Firefox 19+ */
                color: #CCCCCC!important;
            }
            &::-ms-input-placeholder {
                color: #CCCCCC!important;
            }
        }
    }
    .bottom-btn {
        display: flex;
        height: .98rem;
        width: 100%;
        div {
            height: 100%;
            text-align: center;
            line-height: .98rem;
            flex:1;
            border-top: 1px solid #e6e6e6;
            font-size: .36rem;
            color: #333;
            &:last-child {
                color: #fff;
                background: #0090ff;
            }
        }
    }

}
</style>