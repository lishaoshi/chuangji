<template>
    <div id="AddRole">
        <clxsd-head-top title='增加角色'></clxsd-head-top>
        <pull-refresh @refresh="refresh" >
            <ul class="tui-list">
                <!--已成为-->
                <li v-if="USER_INFO.can_shangye === 1">
                    <img src="../../images/extension/promote-pay-business-0.png">
                    <p class="title over-title">商业</p>
                    <svg class="over">
                        <use xlink:href="#icon-promote-pay-haveBecome"/>
                    </svg>
                </li>
                <li v-if="USER_INFO.can_yiyan === 1">
                    <img src="../../images/extension/promote-pay-clinic-0.png">
                    <p class="title over-title">医院</p>
                    <svg class="over">
                        <use xlink:href="#icon-promote-pay-haveBecome"/>
                    </svg>
                </li>
                <li v-if="USER_INFO.can_lianshuo === 1">
                    <img src="../../images/extension/promote-pay-drugstore-0.png">
                    <p class="title over-title">连锁店</p>
                    <svg class="over">
                        <use xlink:href="#icon-promote-pay-haveBecome"/>
                    </svg>
                </li>
                <li v-if="USER_INFO.can_dianti === 1">
                    <img src="../../images/extension/promote-pay-hospital-0.png" >
                    <p class="title over-title">单体药店</p>
                    <svg class="over">
                        <use xlink:href="#icon-promote-pay-haveBecome"/>
                    </svg>
                </li>
                <li  v-if="USER_INFO.can_zhenshuo === 1">
                    <img src="../../images/extension/promote-pay-multiple-0.png" >
                    <p class="title over-title">诊所</p>
                    <svg class="over">
                        <use xlink:href="#icon-promote-pay-haveBecome"/>
                    </svg>
                </li>

                <!--未成为-->
                <li @click="handlePromoterChecked('business')" v-if="USER_INFO.can_shangye === 0">
                    <div v-if="promoterTypeData">
                        <img src="../../images/extension/promote-pay-business.png" >
                        <p class="title">商业</p>
                        <p class="gray">{{promoterTypeData.business.xianjin | display_price}}元</p>
                        <p class="gray">{{promoterTypeData.business.lianbei | display_price}}贝</p>
                        <svg class="active" v-if="promoterData.business">
                            <use xlink:href="#icon-promote-pay-moreChose"/>
                        </svg>
                    </div>
                </li>
                <li @click="handlePromoterChecked('yiyuan')"  v-if="USER_INFO.can_yiyan === 0">
                    <div v-if="promoterTypeData">
                        <img src="../../images/extension/promote-pay-client.png">
                        <p class="title">医院</p>
                        <p class="gray">{{promoterTypeData.yiyuan.xianjin | display_price}}元</p>
                        <p class="gray">{{promoterTypeData.yiyuan.lianbei | display_price}}贝</p>
                        <svg class="active" v-if="promoterData.yiyuan">
                            <use xlink:href="#icon-promote-pay-moreChose"/>
                        </svg>
                    </div>
                </li>
                <li @click="handlePromoterChecked('lianshuo')"   v-if="USER_INFO.can_lianshuo === 0">
                    <div v-if="promoterTypeData">
                        <img src="../../images/extension/promote-pay-drugstore.png">
                        <p class="title">连锁店</p>
                        <p class="gray">{{promoterTypeData.lianshuo.xianjin | display_price}}元</p>
                        <p class="gray">{{promoterTypeData.lianshuo.lianbei | display_price}}贝</p>
                        <svg class="active" v-if="promoterData.lianshuo">
                            <use xlink:href="#icon-promote-pay-moreChose"/>
                        </svg>
                    </div>
                </li>
                <li @click="handlePromoterChecked('danti')"  v-if="USER_INFO.can_dianti === 0">
                    <div v-if="promoterTypeData">
                        <img src="../../images/extension/promote-pay-hospital.png">
                        <p class="title">单体药店</p>
                        <p class="gray">{{promoterTypeData.danti.xianjin | display_price}}元</p>
                        <p class="gray">{{promoterTypeData.danti.lianbei | display_price}}贝</p>
                        <svg class="active" v-if="promoterData.danti">
                            <use xlink:href="#icon-promote-pay-moreChose"/>
                        </svg>
                    </div>
                </li>
                <li @click="handlePromoterChecked('zhenshuo')"   v-if="USER_INFO.can_zhenshuo === 0">
                    <div v-if="promoterTypeData">
                        <img src="../../images/extension/promote-pay-multipleShop.png">
                        <p class="title">诊所</p>
                        <p class="gray">{{promoterTypeData.zhenshuo.xianjin | display_price}}元</p>
                        <p class="gray">{{promoterTypeData.zhenshuo.lianbei | display_price}}贝</p>
                        <svg class="active" v-if="promoterData.zhenshuo">
                            <use xlink:href="#icon-promote-pay-moreChose"/>
                        </svg>
                    </div>
                </li>
            </ul>
            <div style="clear: both"></div>
            <div class="go-info" style="text-align: center;">
                <button @click="handlePromoter"
                        :class="promoterActive ? 'active':''"
                        :disabled="!promoterActive"
                        >
                    开启权限
                </button>
                <router-link to="/introduction/4">
                    初步了解
                </router-link>
            </div>
        </pull-refresh>
    </div>

</template>

<script>
    import { mapState } from 'vuex';
    import PullRefresh from "../../components/PullRefresh";
    export default {
        name: "AddRole",
        components: {PullRefresh},
        data(){
            return {
                promoterTypeData:null,//推广人类型数据信息
                promoterData:{
                    business:false,
                    yiyuan:false,
                    lianshuo: false,
                    danti: false,
                    zhenshuo: false,
                },
            }
        },
        computed:{
            ...mapState({
                USER_CHOOSED_DATA: state => state.USER_CHOOSED_DATA,
                USER_INFO:state => state.CURRENTUSER.data.userInfo
            }),
            promoterActive(){
                const promoterdata = this.promoterData;
                return promoterdata.business || promoterdata.yiyuan ||
                    promoterdata.lianshuo || promoterdata.danti ||
                    promoterdata.zhenshuo
            },
            selectedSaveData(){
                return this.USER_CHOOSED_DATA.selected_save_data
            },
        },
        created(){
            this.$store.dispatch("fetchUserInfo");
            this.initData();

        },

        methods:{
            initData(){
                this.$http.get('user-permission/init-check',{params:{
                        role:4,
                        data:JSON.stringify({}),
                    }})
                .then(response => {
                    if(response.data.name){
                        this.name = response.data.name;
                    }
                    if(response.data.data){
                        this.promoterTypeData = response.data.data;
                    }

                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                })



            },
            handlePromoter(){
                if(!this.promoterActive) return;
                this.$store.commit('SAVE_USER_CHOOSE_DATA', {role:'promoter', data:this.promoterData});
                this.$router.push('/authorization-agreement');
            },
            handlePromoterChecked(value){
                this.promoterData[value] = !this.promoterData[value];
            },
            refresh(callback){
                this.$store.dispatch("fetchUserInfo");
                if(callback) callback();
            }

        },
    }
</script>

<style lang="scss" scoped>
    #AddRole {
        min-height: 100%;
        background: #fff;
    }
    .go-info {
        margin-top: 1rem;
        a,button {
            display: block;
            width: 3.2rem;
            height: .88rem;
            line-height: .88rem;
            color: #fff;
            margin: .3rem auto;
            border-radius: .88rem;
            font-size: .26rem;
            text-align: center;
            &:nth-child(2) {
                color: #26a2ff;
                background: #fff;
                border:1px solid #26a2ff;
            }
        }
        button.active{
            background: #26a2ff;
        }
        button {
            &:disabled  {
                background: #ccc;
            }
        }
    }
    .tui-list {
        padding: .26rem;
        li {
            display: block;
            float: left;
            width: 2.1rem;
            height: 2.6rem;
            background: rgb(241,248,254);
            text-align: center;
            margin-right: .25rem;
            border-radius: 5px;
            margin-bottom: .24rem;
            position: relative;
                &:nth-child(3n) {
                     margin-right: 0px;
                 }
                img {
                    width: .68rem;
                    height: .68rem;
                    margin-top: .4rem;
                }
                .title {
                    font-size: .3rem;
                    color: rgb(51,51,51);
                    line-height: 2;
                }
                .over-title {
                    color:rgb(169,169,169);
                }
                .gray {
                    color: #ccc;
                    font-size: .2rem;
                }
                svg {
                    display: none;
                }
                .active {
                    position: absolute;
                    width: .45rem;
                    height: .28rem;
                    top:0px;
                    right: 0px;
                    display: block;
                }
            .over {
                display: inline-block;
                width: .7rem;
                height: .7rem;
            }
        }
    }
</style>