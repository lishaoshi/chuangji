<template>
    <div id="MyInfo">
        <clxsd-head-top title='个人信息'></clxsd-head-top>
        <PullRefresh @refresh="refresh">
            <div class="ul-info">
                <router-link to="/change-logo" class="ul-info-a">
                    <span class="left">头像</span>
                    <div class="right">
                        <img src="../../images/my/user_default.png" width="35" height="35" v-if="!userInfo.avatar">
                        <img :src="userInfo.avatar" v-else width="35" height="35"/>
                        <svg><use xlink:href="#icon-gongsixinxijinruicon"/></svg>
                    </div>
                </router-link>
                <div  class="ul-info-a" style="margin-top: .2rem">
                    <span class="left">实名认证</span>
                    <div class="right">
                        <span><svg class="icon1"><use xlink:href="#icon-global-footer-my-1"/></svg>{{userInfo.real_name || userInfo.display_name}}</span>
                    </div>
                </div>
                <router-link to="/change-phone" class="ul-info-a">
                    <span class="left">手机号</span>
                    <div class="right">
                        <span>{{userInfo.phone | filter_mobile}}</span>
                        <svg><use xlink:href="#icon-gongsixinxijinruicon"/></svg>
                    </div>
                </router-link>
                <div  class="ul-info-a" style="margin-top: .2rem">
                    <span class="left">身份证号</span>
                    <div class="right">
                        {{userInfo.user_identity}}
                    </div>
                </div>
            </div>
        </PullRefresh>

    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "MyInfo",
        data() {
            return {
                userName: '张无忌',
                userTel: '',
                userId: '',
                userLogo: '',
                roleDesc: '暂无角色类型',
                user_type: 0,
                info: []
            }

        },
        computed: {
            ...mapState({
                userInfo: state=>state.CURRENTUSER.data
            })
        },
        methods: {
            refresh(callback) {
                this.getInfo(callback);
            }
        },
    }
</script>

<style lang="scss" scoped>

    .ul-info {
        &-a {
            display: block;
            color: #333;
            background-color: #fff;
            box-sizing: border-box;
            color: inherit;
            height: 1rem;
            line-height: 1rem;
            overflow: hidden;
            position: relative;
            text-decoration: none;
            display: flex;
            padding: 0 0.2rem;
            justify-content: space-between;
            border-bottom: 1px solid #f4f5f5;
            .left {
                font-size: .32rem;
                color: #666666;
                float: left;
            }
            .right {
                font-size:.28rem;
                font-family:PingFang SC;
                color:#333;
                display: flex;
                align-items: center;
                height: 1rem;
                img {
                    width:.72rem;
                    height:.72rem;
                }
                svg {
                    width:.26rem;
                    height:.26rem;
                    margin-left: .05rem;
                }
                .icon1 {
                    width: .32rem;
                    height: .32rem;
                    border-radius: 90%;
                    margin-right: 5px;
                    top: 3px;
                    position: relative;
                }
            }
        }
    }
</style>