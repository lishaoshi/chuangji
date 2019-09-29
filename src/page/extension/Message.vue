<template>
    <div>
        <clxsd-head-top title='业务提成'></clxsd-head-top>
        <div  v-if="currentUser.status === 1">
            <div class="container">
                <div class="message-item">
                    <div class="left">
                        <p class="gray">授权者</p>
                        <p class="info">张无忌（15896587896）</p>
                        <p class="gray" style="margin-top: .4rem">被授权者</p>
                        <div class="detail">
                            <img src="../../images/default2.png">
                            <div class="detail-info">
                                <p>张三丰<span>(12598987887)</span></p>
                                <p><span>省公司</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <p>应收提成</p>
                        <p>￥15258.00</p>
                        <p  v-if="is_sure">收款成功</p>
                        <div @click="sureProfit" v-else>已收提成</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import Empty from "@/components/EmptyList"
    export default {
        name: "Message",
        data(){
            return {
                selected: "all",
                is_sure:false,
                Empty,
            }
        },
        components:{
            Empty
        },
        computed:{
            ...mapState({
                currentUser: state => state.CURRENTUSER.data.userInfo
            })
        },
        methods: {
            sureProfit: function() {
                this.$messagebox.confirm("确定已收提成吗?").then(action => {
                    if('confirm' === action){
                        this.is_sure = true
                    }
                }).catch(err => err);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .nav {
        background-color: #fff;
        margin: .2rem;
        border-radius: 5px;
        box-shadow: 0px 0px 4px #ccc;
        margin-bottom: 0px;
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 0px;
        color: #333;
        margin-bottom: 0;
        font-weight: bold;
    }
    .tag-icon {
        width: .96rem;
        height: .96rem;
        margin-bottom: .07rem;
    }
    .container {
        padding: .2rem;
    }
    .message-item {
        display: flex;
        border-radius: 4px;
        justify-content: space-between;
        background: #fff;
        padding: .2rem;
        margin-bottom: .2rem;
        .left {
            width: 64%;
            border-right: 1px solid #f1f1f1;
            .gray {
                color: #999;
                font-size: .24rem;
                margin-bottom: .1rem;
            }
            .info {
                color: #333;
                font-size: .28rem;
            }
            .detail {
                display: flex;
                margin-top: .15rem;
                img {
                    width: .8rem;
                    height: .8rem;
                    border-radius: 100%;
                }
                .detail-info {
                    padding-left: .2rem;
                    p {
                        &:nth-child(1) {
                            font-size: .28rem;
                            padding-top: .05rem;
                            span {
                                color: #666;
                                font-size: .24rem;
                            }
                        }
                        &:nth-child(2) {
                            font-size: .24rem;
                            color: #999999;
                            line-height: 1.5;
                            span {
                                padding-right: .15rem;
                            }
                        }
                    }
                }
            }
        }
        .right {
            width: 36%;
            text-align: center;
            padding-left: .2rem;
            p {
                &:nth-child(1) {
                    padding-top: .4rem;
                    font-size: .24rem;
                }
                &:nth-child(2) {
                    font-size: .28rem;
                    color: rgb(3,173,143);
                    margin-top: .2rem;
                    margin-bottom: .8rem;
                    font-weight: bold;
                }
                &:nth-child(3) {
                    color: rgb(250,84,82);
                    font-size: .28rem;
                    font-weight: bold;
                }
            }
            div {
                width: 100%;
                height: .64rem;
                line-height: .64rem;
                border-radius: .64rem;
                background: #26a2ff;
                color: #fff;
                font-size: .28rem;
            }
        }
    }
    .info-item {
        display: block;
        margin: .3rem .3rem 0;
        background: #fff;
        padding: .15rem;
        border-radius: .1rem;
        .item-top {
            line-height: .6rem;
            height: .6rem;
            .title {
                display: inline-block;
                line-height: 1;
                width: 70%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #333;
                font-size: .34rem;
            }
            .time {
                font-size: 10px;
                color: #CCCCCC;
                float: right;
            }
        }
        .item-content {
            background: #F1F1F1;
            color: #5C5C5C;
            line-height: 25px;
            max-height: 80px;
            display: inline-flex;
            width: 100%;
            span {
                padding: 3px 9px;
                display: inline-block;
                max-height: 80px;
                overflow: hidden;

            }
            img {
                width: 76px;
                height: 75px;

            }
        }
    }
</style>