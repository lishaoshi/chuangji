<template>
    <div id="my">
        <div class="container">
            <div class="title" :class="{ topHeight: isFullScreen }">
                <span>我的</span>
                <svg class="closed" @click="closedMyFrame()">
                    <use xlink:href="#icon-promote-my-close" />
                </svg>
            </div>
            <div class="user-information">
                <div class="user-main-info">
                    <div class="avatar">
                        <img :src="userInfo.avatar | display_avatar" class="logo" v-if="userInfo.avatar"/>
                        <img src="../../images/pic_default_man.png" class="logo" v-else>
                        <div v-if="userInfo.state===1 && userInfo.sub_type === 1">
                            <img src="../../images/extension/province.png" class="tag"/>
                        </div>
                        <div v-if="userInfo.state===1 && userInfo.sub_type === 2">
                            <img src="../../images/extension/city.png" class="tag"/>
                        </div>
                        <div v-if="userInfo.state===1 && userInfo.sub_type === 3">
                            <img src="../../images/extension/partner.png" class="tag"/>
                        </div>
                        <div v-if="userInfo.state==1 && userInfo.sub_type === 4">
                            <img src="../../images/extension/promoter.png" class="tag"/>
                        </div>
                    </div>
                    <div class="name">
                        <p>{{userInfo.userName}}</p>
                        <p id='U_phone'>{{userInfo.userTel}}</p>
                    </div>
                    <div class="code">
                        <router-link to="/develop">
                            <svg>
                                <use xlink:href="#icon-promote-my-QR" />
                            </svg>
                            <p>邀请</p>
                        </router-link>
                    </div>
                </div>
            </div>
            <!-- 列表 -->
            <div class="my-list">
                <clxsd-cell title="我的联贝" to="/extension-lianbei" is-link icon="promote-my-cell"/>
                <clxsd-cell v-if="canShou" title="客户授权" to="/customer-authorization" is-link icon="promote-my-safety"/>
                <clxsd-cell v-if="userInfo.state !== 1" title="选择角色" to="/customer-choose-role" is-link icon="promote-my-safety"/>
                <div v-if="userInfo.state===1 && userInfo.sub_type===4">
                    <clxsd-cell title="增加角色" to="/add-role" is-link icon="promote-my-safety"/>
                </div>
                <clxsd-cell title="业务提成" to="/develop" is-link icon="group-client-percentage" v-show="userInfo.state === 1"/>
                <clxsd-cell title="消息通知" to="/company-message" is-link icon="group-client-message"/>
                <clxsd-cell title="个人信息" to="/user/info" is-link icon="promote-my-personMessage"/>
                <div v-if="userInfo.state === 1 && (userInfo.sub_type === 1 || userInfo.sub_type === 2)">
                    <clxsd-cell title="公司信息" to="/company-info" is-link icon="promote-my-companyMessage" :value="userInfo.infoText"/>
                </div>
                <clxsd-cell title="问题求助" to="/develop" is-link icon="promote-my-help"/>
            </div>
            <router-link to="/setting" class="setting">
                <span>设置</span>
            </router-link>
        </div>
        <div class="fadeBox" @click="closedMyFrame()"></div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import ClxsdCell from '@/components/common/Cell';
    export default {
        name: "page-extension-my",
        components: {
            ClxsdCell
        },
        props: [
           "closedMyFrame"
        ],
        data(){
          return {
              isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
          }
        },
        computed: {
            ...mapState({
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER.data
                    return {
                        userName: currentInfo.display_name || currentInfo.real_name || currentInfo.phone || '丢失信息',
                        userTel: 　currentInfo.phone || '丢失信息',
                        //role: currentInfo
                        user_type: currentInfo.user_type,
                        sub_type: currentInfo.sub_type,
                        state:currentInfo.status,
                        avatar:currentInfo.avatar
                    }

                },
            }),
            canShou(){
                const userInfo = this.userInfo
                return (userInfo.state === 1 ) && (
                    userInfo.sub_type === 1 ||
                    userInfo.sub_type === 2 ||
                    userInfo.sub_type === 3)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @-webkit-keyframes mymove{
        0%{
            width: 0;
            opacity: 0;
        }
        100%{
            width: 100%;
            opacity: 1;
        }
    }
    .clxsd-cell {
        .clxsd-cell-wrapper {
            border-bottom: 0px;
        }

    }
    #my {
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 999;
        background: #fff;
       // animation:mymove .35s ease-in-out alternate forwards;
        position: relative;
    }
    .title {
        border-bottom: 1px solid #f1f1f1;
        height: .88rem;
        line-height: .88rem;
        margin-left: .5rem;
        font-size: .36rem;
        font-weight: bold;
        svg {
            width: .24rem;
            height: .24rem;
            margin-top: .3rem;
            float: right;
            margin-right: .4rem;
        }
    }
    .container {
        position: fixed;
        width: 80%;
        height: 100%;
        background: #fff;
        z-index: 999;
        float: left;
        top:0px;
        left: 0px;
    }
    .fadeBox {
        position: fixed;
        width: 100%;
        height: 100%;
        background: #333;
        opacity: .6;
        z-index: 998;
        left: 0;
        top:0
    }

    .user-information {
        padding: .12rem .2rem 0;

    }

    .user-information {
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-direction: column;
    }

    .user-information .user-main-info {
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-direction: row;
        position: relative;
    }

    .user-main-info .code {
        position: absolute;
        right: .2rem;
        top: .28rem;
        text-align: center;
    }

    .user-main-info .code svg {
        width: .54rem;
        height: .54rem;
    }

    .code p {
        font-size: .22rem;
        color: rgb(45,162,255);
        line-height: 90%;

    }

    .user-main-info .avatar {
        margin-left: .2rem;
        margin-right: .28rem;
        height: 1.36rem;
        width: 1.36rem;
        position: relative;
    }

    .user-main-info .avatar .logo {
        border-radius: 100%;
        width: 1.3rem;
        height: 1.3rem;

    }
    .user-main-info .avatar .tag {
        width: .3rem;
        height: auto;
        position: absolute;
        top:.9rem;
        right:.06rem;
    }

    .user-main-info .name {
        width: 56%;
    }

    .user-main-info .name p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 60%;
    }

    .user-main-info .name p:nth-child(1) {
        font-size: .32rem;
        margin-top: .23rem;
        line-height: 180%;
        color: #333;
    }

    .user-main-info .name p:nth-child(2) {
        font-size: .28rem;
        color: rgb(153,153,153);
    }

    .my-list {
        margin-top: .3rem;
        padding: 0 .3rem;
    }
    .setting {
        height: .88rem;
        position: absolute;
        bottom: 0px;
        line-height: .88rem;
        font-size: .32rem;
        display: block;
        color: rgb(51,51,51);
        width: 100%;
        text-align: right;
        padding-left: .5rem;
        span {
            background: url("../../images/extension/setting.png") no-repeat left;
            background-size:.32rem .32rem ;
            padding-left: .4rem;
            border-top: 1px solid #f1f1f1;
            background-position-x:76% ;
            width: 100%;
            display: block;
            padding-right: .5rem;
        }
    }
    .topHeight {
        margin-top: 34px;
    }
</style>
