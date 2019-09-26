<template>
    <div>
        <div class="auth-list">
            <div>
                <div class="info-box">
                    <img src="../../../images/pic_default_man.png">
                    <div class="info">
                        <p><span>{{data.shou.real_name}}</span></p>
                        <p>{{data.shou.phone}}</p>
                    </div>
                </div>
                <p class="zf">支付时间：{{data.updated_at}}</p>
            </div>

            <div class="right" v-if="data.status===0">
                <p v-if="data.pay_type == 'wechat' ">微信支付</p>
                <p v-if="data.pay_type == 'xianjin' ">现金支付</p>
                <p v-if="data.pay_type == 'lianbei' ">联贝支付</p>
                <button class="btn" @click="sureAuth(data.id)">确认授权</button>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "otherAuthorization"
    }
</script>

<style lang="scss" scoped>
    .auth-list {
        display: flex;
        background: #fff;
        margin: .2rem;
        margin-top: 0px;
        border-radius: 5px;
        border:1px solid #f1f1f1;
        padding: .25rem .2rem;
        align-items: center;
        min-height: 2rem;
        >div {
            width: 68%;
            .zf {
                font-size: .24rem;
                color: #7C7C7C;
                line-height: 2;
                margin-top: .2rem;
            }
        }
        .info-box {
            display: flex;
            img {
                width: .9rem;
                height: .9rem;
                border-radius: 100%;
            }
            .info {
                width: 60%;
                padding-left: .2rem;
                p {
                    line-height: 1.5;
                    font-size: .3rem;
                }
            }

        }

        .right {
            border-left: 1px solid #f1f1f1;
            padding: .2rem;
            width: 30%;
            .btn {
                width: 1.9rem;
                height: .7rem;
                border-radius: .7rem;
                background: #26a2ff;
                color: #fff;
                font-size: .28rem;
            }
            p {
                font-size: .28rem;
                margin-bottom: .5rem;
                text-align: center;
            }
        }
    }
</style>