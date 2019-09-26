<template>
    <div id="Invitation">
        <clxsd-head-top :title='`邀请二维码`' style="border:0px"></clxsd-head-top>
        <div class="box">
            <p>扫下方二维码，入驻创联</p>
            <img src="../../images/extension/ewm.png" width="100%">
            <div class="btn"><router-link to="">邀请记录</router-link><small>|</small><span>保存图片</span></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Invitation"
    }
</script>

<style lang="scss" scoped>
    #Invitation {
        min-height: 100%;
        background: #26a2ff;
    }
    .box {
        height: 8.83rem;
        width: 6.66rem;
        margin: 0 auto;
        margin-top: 10%;
        position: relative;
        background: #fff;
        border-radius: 10px;
        padding: .6rem;
        text-align: center;
        p {
            margin-bottom: .5rem;
            font-size: .36rem;
        }
        img {
            width: 5rem;
            height: 5rem;

        }
        .btn {
            display: flex;
            justify-content: space-around;
            margin-top: .6rem;
            padding-bottom: .3rem;
            font-size: .3rem;
            color: #26a2ff;
            a {
                color: #26a2ff;
            }
            small {
                font-size: .24rem;
                color: #f1f1f1;
            }
        }
    }
</style>