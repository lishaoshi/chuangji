<template>
    <div id="PayPassword">
        <clxsd-head-top title='支付密码设置'></clxsd-head-top>
        <div class="title-container">
            <p class="p1">您是否记得账号<span>{{phone | filter_mobile}}</span><br>当前使用的支付密码</p>
        </div>
        <div class="state-box">
            <p><router-link to="/user/forget-pay-password">不记得</router-link></p>
            <p><router-link to="/remober-pay-password" style="color: #fff">记得</router-link></p>
        </div>
        <p class="info">初次重置密码请选择<span>不记得</span></p>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: "PayPassword",
        computed:{
            ...mapState({
                USER_INFO: state => state.CURRENTUSER.data
            }),
            phone(){
                return this.USER_INFO.phone;
            }
        },
    }
</script>

<style scoped lang="scss">
    .title-container {
        background: #fff;
        text-align: center;
        padding: .5rem .2rem;
        font-size: .26rem;
        color: #666;
        line-height: .45rem;
        .p1 {
            span {
                color: #333;
                font-size: .32rem;
            }
        }
    }
    .state-box {
        margin: .4rem;
        display: flex;
        justify-content: space-between;
        p {
            width: 45%;
            height: .8rem;
            line-height: .8rem;
            text-align: center;
            font-size: .3rem;
            background: #fff;
            border-radius: 5px;
            border:1px solid #e5e5e5;
            a {
                display: block;
                width: 100%;
                height: 100%;
                color: #333;
            }
            &:nth-child(2) {
            background: #26a2ff;
                color: #fff;
                border-color: #26a2ff;
        }
        }
    }
    .info {
        padding: 0 .4rem;
        font-size: .26rem;
        color: #666;
        span {
            color: #333;
            font-size: .3rem;
        }
    }
</style>