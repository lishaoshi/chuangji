<template>
    <PullRefresh @refresh="refresh">
        <page-aptitude v-if="CERT_STATUS === 3" />
        <section v-else-if="CERT_STATUS === 1">
            <clxsd-head-top title="审核中"></clxsd-head-top>
            <div class="examining">
                <img src="../images/my/audit.png" width="40%">
                <p>正在审核中，请耐心等待。。。</p>
            </div>
        </section>
        <page-edit-aptitude v-else-if="CERT_STATUS === 0" :user-type="USER_TYPE"/>
    </PullRefresh>
</template>

<script>
    import { mapState } from "vuex";
    import PageAptitude from "@/page/aptitude/Aptitudes";
    import PageEditAptitude from "./aptitude/AptitudesEdit";
    import PullRefresh from "../components/PullRefresh";
    export default {
        name: 'page-company',
        components:{
            PullRefresh,
            PageEditAptitude,
            PageAptitude,
        },
        computed:{
            ...mapState({
                //0 还没有真写认证信息,1　已提交正审中,2,据,3正常
                CERT_STATUS: state => {
                    let returnValue = 3
                    const userInfo = state.CURRENTUSER.data.userInfo
                    if(!userInfo['certification']){
                        returnValue = 0
                    }else if(!!userInfo['certification'] && userInfo['certification']['status'] === 0){
                        returnValue = 1
                    }else if(!!userInfo['certification'] && userInfo['certification']['status'] === 1){
                        returnValue = 3
                    }else if(!!userInfo['certification'] && userInfo['certification']['status'] === 2){
                        returnValue = 2
                    }
                    return returnValue
                },
                USER_TYPE: state => state.CURRENTUSER.data.userInfo.user_type
            })

        },
        methods:{
            refresh(callback){
                this.$store.dispatch("fetchUserInfo");
                callback();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .examining {
        text-align: center;
        font-size: 12px;
        color: #575757;
        line-height: 300%;
        padding-top: 3.5rem;
    }
    .clxsd-pull-refresh {
        height: 100% !important;
    }
</style>
