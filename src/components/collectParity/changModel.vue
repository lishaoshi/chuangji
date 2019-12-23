<template>
    <div class="model" :class="{isRule:isShowRules}" >
        <template v-if="isShowModel">
            <div class="goods-info">
                <p>{{data.generic_name}}</p>
                <p>{{data.brand_name}}</p>
                <p>{{data.spec}}/{{data.unit}} {{data | handleSpec}}</p>
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
        </template>
        <div v-if="isShowRules" class="rules_box">
            <img src="@/images/ruleActive.png" alt="">
             <svg class="svgClose" @click="handleCloseBtn">
                <use xlink:href="#icon-close"/>
            </svg>    
            <div class="confirmRule" @click="handleConfirm">
                我已了解
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['isShowModel','data', 'isShowRules'],
    methods: {
        closeModel() {
            this.$emit('update:isShowModel', false)
        },
        confirmPrice() {
            this.$emit('confirmPrice')
        },
        handleCloseBtn() {
            this.$emit('update:isShowRules', false)
        },
        handleConfirm() {
            this.$emit('update:isShowRules', false)
            this.$emit('update:isShowModel', true)
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
        width: 60%;
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
        margin: .4rem auto 0;
        height: .6rem;
        border: 1px solid #999;
        // margin-bottom: .4rem;
        border-radius: 30px;
        position: relative;
        input {
            width: 80%;
            height: 100%;
            border-radius: 30px;
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
       
        div {
            // border-left: 1px solid #f0f0f0;
            height: 100%;
            position: absolute;
            right: 0;
            top: 0;
            width: .8rem;
            display: flex;
            font-size: .28rem;
            color: #999;
            align-items: center;
            justify-content: center;
        }
    }
        .margin {
            text-align: center;
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
    
    .rules_box {
        width: 80%;
        height: 80%;
        display: flex;
        margin: 0 auto;
        flex-direction: column;
        align-items: center;
        img {
            width: 100%;
            height: 100%;
        }
        .svgClose {
            width: .6rem;
            height: .6rem;
            fill: #FEF2D4;
            margin-top: .4rem;
        }
        .confirmRule {
            background: linear-gradient(90deg, #FE7600, #FF4900);
            color: #fff;
            border-radius: .36rem;
            padding: 0 1.2rem;
            line-height: .72rem;
            height: .72rem;
            position: absolute;
            left: 50%;
            bottom: 1.4rem;
            transform: translate(-50%, 0)

        }
    }
}
.isRule {
    padding: 0;
    background: transparent;
}
</style>