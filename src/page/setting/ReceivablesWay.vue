<template>
    <div>
        <clxsd-head-top title='收款方式'></clxsd-head-top>
        <span @click="save()" class="save">保存</span>
        <div class="address-box">
            <svg class="icon">
                <use xlink:href="#icon-uniteCoin-transferAccounts"/>
            </svg>
            <span>银行卡</span>
            <mt-switch v-model="switch_checked" @change="turn">
            </mt-switch>
        </div>
        <div class="address-box">
            <svg class="icon">
                <use xlink:href="#icon-uniteCoin-Alipay"/>
            </svg>
            <span>支付宝</span>
            <mt-switch v-model="switch_checked" @change="turn">
            </mt-switch>
        </div>
        <div class="address-box">
            <svg class="icon">
                <use xlink:href="#icon-uniteCoin-wechat"/>
            </svg>
            <span>微信</span>
            <mt-switch v-model="switch_checked" @change="turn">
            </mt-switch>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ReceivablesWay",
        data(){
            return {
                is_default: 1, //是否是默认地址1是默认,0不是
            }
        },
        methods: {
            turn: function() {
                if(this.switch_checked == true) {
                    this.is_default = 1
                } else {
                    this.is_default = 0
                }
            },
            save: function() {

            }
        },
    }
</script>

<style lang="scss" scoped>
    .address-box {
        background: #fff;
        margin-top: .2rem;
        display: flex;
        padding: 0 .2rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 16px;
        align-items: center;
        .icon {
            width: .45rem;
            height: .45rem;
        }
        span {
            width: 73%;
            margin-left: 3%;
        }
    }

    .save {
        position: absolute;
        top:.25rem;
        right: .2rem;
        color: #fff;
    }
</style>