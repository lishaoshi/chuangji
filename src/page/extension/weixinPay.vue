<template>
    <div id="weixinPay">
        <clxsd-head-top title='微信支付' style="border-bottom: 0px"></clxsd-head-top>
        <div class="weixin">
            <p>张无忌 12598789658</p>
            <img src="../../images/extension/ewm.png" width="100%">
            <p class="btn">保存图片</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "weixinPay"
    }
</script>

<style lang="scss" scoped>
    #weixinPay {
        position: fixed;
        width: 100%;
        height: 100%;
        background: #26a2ff;
    }
    .weixin {
        width: 80%;
        height: 66%;
        margin-top: 17%;
        margin-left: 10%;
        background: #fff;
        border-radius: 5px;
        padding: 3%;
        padding-top: .5rem;
        img {
            width: 90%;
            height: 4.8rem;
            margin-left: 5%;
            margin-top: .3rem;
        }
        p {
            font-size: .34rem;
            text-align: center;
            line-height: 2;
        }
        .btn {
            color: #26a2ff;
            margin-top: .5rem;
            font-size: .3rem;
        }
    }
</style>