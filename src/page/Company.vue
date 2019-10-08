<template>
    <PullRefresh @refresh="refresh">
        <page-aptitude v-if="CERT_STATUS === 3" />
        <section v-else-if="CERT_STATUS === 1">
            <clxsd-head-top title="审核中"></clxsd-head-top>
            <div class="examining">
                <img src="../images/my/audit.png" />
                <p>正在审核中，请耐心等待...</p>
            </div>
        </section>
        <page-edit-aptitude v-else-if="CERT_STATUS === 0 || CERT_STATUS===4" :user-type="USER_TYPE" :imgList="imgList" :isEdit="true" :certStatus="CERT_STATUS" :org_name="org_name"/>
        <PageAptitudesRefused v-else-if="CERT_STATUS===2" :cate_name="cate_name" :org_name="org_name" :imgList="imgList" :refuse_reason="refuse_reason" @updateCompany="updateCompany(3)"></PageAptitudesRefused>
    </PullRefresh>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import PageAptitude from "@/page/aptitude/Aptitudes";
    import PageEditAptitude from "./aptitude/AptitudesEdit";
    import PageAptitudesRefused from "./aptitude/AptitudesRefused"
    import PullRefresh from "../components/PullRefresh";
    import { fetchUserInfo } from '@/api/user'
    import { queryCompayResults } from "@/api/company"
    export default {
        name: 'page-company',
        data() {
            return {
                cate_name: '',
                org_name: '',
                imgList:[],
                refuse_reason: ''
            }
        },
        components:{
            PullRefresh,
            PageEditAptitude,
            PageAptitude,
            PageAptitudesRefused
        },
        computed:{
            ...mapState({
                //0 还没有真写认证信息,1　已提交正审中,2,拒绝,3正常，4重新编辑
                CERT_STATUS: state => {
                    // debugger
                        let returnValue = 1
                        const userInfo = state.CURRENTUSER.data
                        if(!userInfo['certification']){
                            returnValue = 0
                        }else if(!!userInfo['certification'] && userInfo['certification']['status'] === 0){
                            returnValue = 1
                        }else if(!!userInfo['certification'] && userInfo['certification']['status'] === 1){
                            returnValue = 3
                        }else if(!!userInfo['certification'] && userInfo['certification']['status'] === 2){
                            returnValue = 2
                        }else if(!!userInfo['certification'] && userInfo['certification']['status'] === 3) {
                             returnValue = 4
                        }
                        return returnValue
                },
                USER_TYPE: state => state.CURRENTUSER.data.user_type
            })
        },
        beforeRouteLeave(to, from, next) {
            // console.log(to, from ,this.CERT_STATUS)
            if(this.CERT_STATUS!=4) {
                next()
            } else {
                this.updateCompany(2)
                console.log(this.$store)
                next()
            }
        },
        created() {
            this._queryCompayResults()
        },
        methods:{
            refresh(){
                this.$store.dispatch("fetchUserInfo");
            },
            updateCompany(state) {
               this.UPDATEUSERSTATE(state)
            },

            // 获取公司资质信息
            async _queryCompayResults() {
                // console.log('queryCompayResults')
                await this.fetchUserInfo()
                this.CERT_STATUS==2&&queryCompayResults({}).then(res=>{
                    // console.log(res, 'queryCompayResults')
                    if(res.code==200) {
                        let data = res.data
                        this.cate_name = data.certificationInfo.cate_name
                        this.org_name = data.certificationInfo.org_name
                        this.imgList = data.certificationInfo.files.reverse()
                        this.refuse_reason = data.certificationInfo.refuse_reason
                    }
                })
            },

            // 重新获取用户信息
            ...mapActions([
                'fetchUserInfo',
                'UPDATEUSERSTATE'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    .examining {
        text-align: center;
        font-size: 12px;
        color: #575757;
        line-height: 300%;
        padding-top: 1.6rem;
        img {
            width: 3.94rem;
            height: 3.94rem;
        }
    }
    .clxsd-pull-refresh {
        height: 100% !important;
    }
</style>
