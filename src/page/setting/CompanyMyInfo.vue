<template>
    <div id="CompanyMyInfo">
        <clxsd-head-top :title='`个人信息`'></clxsd-head-top>
        <mt-cell title="个人头像" style="margin-top: .2rem">
            <span><img  src="../../images/my/user_default.png" width="35" height="35" to="/my"></span>
        </mt-cell>
        <mt-cell title="联系电话" style="margin-top: .2rem">
            <span>{{userInfo.userTel}}</span>
        </mt-cell>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapState } from "vuex";
    export default {
        name: "CompanyMyInfo",
        data() {
            return {
                userName: '张无忌',
                userTel: '15237367722',
            }

        },
        computed:{
            ...mapState({
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER.data.userInfo
                    const configInfo = state.CONFIG
                    return {
                        userTel: 　currentInfo.phone || '丢失信息',
                    }

                },
            })
        }
    }
</script>

<style type="scss" scoped="scoped">
    .hint{
        width: 100%;
        height:24px;
        display: flex;
        align-items: center;
        background:rgb(245,245,245);
    }
    .hint p{
        margin-left:15px;
        font-size: 12px;
        color: rgb(153,153,153);
    }
    .hint p i{
        color: rgb(255,181,64);
    }
    .mint-cell {
        border-bottom: 1px solid #f1f1f1;
    }
    .icon1 {
        width: 20px;
        height: 20px;
        border-radius: 90%;
        margin-right: 5px;
        top: 3px;
        position: relative;
    }
</style>