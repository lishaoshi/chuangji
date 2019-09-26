<template>
    <div id="AuthorizationAgreement">
        <clxsd-head-top title='授权协议'></clxsd-head-top>
        <img src="../../images/extension/sq.jpg" width="100%">
        <div class="title">创联工厂推广授权协议</div>
        <p class="edit">
            感谢你下载创联工厂！当你开始使用本软件时，我们可能会对你的部分个人信息进行收集、使用、共享和保护。为了让您更好地了解我们对您的信息的使用和保护。
        </p>
        <div class="fade"></div>
        <div class="is-agress">
            <button @click="goBack">
                不同意
            </button>
            <router-link to="/extension-pay">
                同意
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AuthorizationAgreement"
    }
</script>

<style lang="scss" scoped>
    #AuthorizationAgreement {
        min-height: 100%;
        background: #fff;
    }
    .title {
        font-size: .4rem;
        padding: .3rem .2rem;
        padding-top: .76rem;
        text-align: center;
    }
    .edit {
        padding: .1rem .2rem;
        font-size: .26rem;
        line-height: 1.7;
    }
    .fade {
        height: 1.4rem;
    }
    .is-agress {
        width: 100%;
        border-top: 1px solid #f1f1f1;
        position: fixed;
        bottom: 0px;
        display: flex;
        justify-content: space-between;
        padding: .2rem .6rem;
        a,button {
            display: inline-block;
            width: 2.6rem;
            height: .8rem;
            line-height: .8rem;
            border-radius: .8rem;
            font-size: .3rem;
            border:1px solid #f1f1f1;
            text-align: center;
            color: #333;
            &:nth-child(2) {
                background: #26a2ff;
                color: #fff;
                border-color: #26a2ff;
            }
        }
    }
</style>