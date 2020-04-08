<template>
    <div class="UnautMy">
         <div class="header">
                <span>我的</span>
            </div>
        <div class="container">
            <div class="userinfo">
                <div class="userinfo-left">
                    <img :src="userInfo.avatar | display_avatar" class="logo" v-if="userInfo.avatar"/>
                    <img src="../../../images/my/user_default.png" v-else/>
                     <!-- <div v-if="userInfo.area_type === 'promoter'">
                        <img src="../../../images/extension/promoter.png" class="tag"/>
                    </div>
                    <div v-if="userInfo.area_type === 'partner'">
                        <img :src="partner" class="tag"/>
                    </div> -->
                    <!-- <div v-if="userInfo.sub_type === 1">
                        <img src="../../../images/extension/province.png" class="tag"/>
                    </div>
                    <div v-if="userInfo.sub_type === 2">
                        <img src="../../../images/extension/city.png" class="tag"/>
                    </div>
                    <div v-if="userInfo.sub_type === 3">
                        <img src="../../../images/extension/partner.png" class="tag"/>
                    </div>
                    <div v-if="userInfo.sub_type === 4">
                        <img src="../../../images/extension/promoter.png" class="tag"/>
                    </div> -->
                </div>
                <div class="userinfo-centre">
                    <p class="name">
                        {{userInfo.userName}}(厂商对接人)
                    </p>
                    <span class="phone">{{userInfo.userTel}}</span>
                </div>
                <div class="userinfo-right">
                    <router-link to="/invitation">
                        <svg>
                            <use xlink:href="#icon-QRCode"/>
                        </svg>
                        <span style="color: #fff">邀请</span>
                    </router-link>
                </div>
            </div>
            <!-- <div style="width: 100%;height: 1px;background: #2da2ff;opacity: 0.7;"></div> -->
            <balance :balance="balance" :todayIncome="todayIncome"/>
            <!-- <div class="balance">
                <div>
                <span>余额(元)</span>
                </div>
                <div>
                <i-count-up
                    :startVal="20"
                    :endVal="balance"
                    :options="options"
                ></i-count-up>
                </div>
            </div> -->
            <!-- <div class="userinfo-lianshu">
                <span>联数(包)</span>
                <b>1800.00</b>
            </div> -->
             <!-- <div class="becomePartner" v-if="is_apply!=-1">
            <img src="../../../images/becomePartnr3.png" alt="" @click="queryPartnerInfo">
        </div> -->
        <!--- 邀请详情 ---->
            <div class="typeBox" v-if="is_apply!=-1&&userInfo.area_type!='find_medicine'">
                <div class="typeItem"  v-for="(item, index) of typeList" :key="index">
                    <div>
                        <svg>
                            <use :xlink:href="item.img"/>
                        </svg>
                        <span>{{item.name}}</span>
                    </div>
                    <div>
                        <span>{{item.num}}</span>
                        <span>{{item.price}}元</span>
                    </div>
                </div>
            </div>
         <!-- <clxsd-cell :title="'广告收益'" :to="'/develop'" :value="userInfo.lianPiaoVaule" is-link icon="promoter_ad" style="margin-bottom: .2rem"/> -->
        <ul class="unautMy-userlist">
            <div style="margin:.2rem 0">
                <clxsd-cell v-if="is_apply==-1" :title="'角色选择'" :to="'/customer-choose-role'" is-link icon="my-collection"/>
            </div>
        </ul>
        <clxsd-cell style="margin-top:.2rem;" v-if="is_apply!=-1&&userInfo.area_type=='find_medicine'" :title="'我的邀请'" :to="'/findRecord'" is-link icon="wode-wodeyaoqing" />
        <clxsd-cell style="margin-top:.2rem;" v-else :title="'我的邀请'" :to="'/record'" is-link icon="wode-wodeyaoqing" />

        
        <clxsd-cell :title="'厂商分润'" v-if="is_apply!=-1&&userInfo.area_type=='find_medicine'" :to="'/channel-profit'" :value="userInfo.lianPiaoVaule" is-link icon="promoter_pass"/>
        <clxsd-cell :title="'终端分润'" v-else :to="'/channel-profit'" :value="userInfo.lianPiaoVaule" is-link icon="promoter_pass"/>
        <!-- <clxsd-cell :title="'合伙收益'" v-if="userInfo.area_type=='partner'" :to="'/cooperation-profit'" :value="userInfo.lianPiaoVaule" is-link icon="my-banknote"/> -->
       
        <div style="margin:.2rem 0">
            <clxsd-cell :title="'消息通知'" :to="'/new-message/promoter'" is-link icon="my-message">
                <template  v-if="messageCount > 0">
                    <message-count :count="messageCount"></message-count>
                </template>
            </clxsd-cell>
            <clxsd-cell :title="'个人信息'" :to="'/business-setting'" is-link icon="my-employee"/>
        </div>
        <clxsd-cell :title="'设置'" :to="'/setting'" icon="my-setting"/>
        
        </div>
       <clxsd-foot-guide :user-type="4"/>
    </div>
</template>

<script>
    import ClxsdCell from "@/components/common/Cell";
    import ICountUp from '@/components/countUp'
    import {mapState, mapMutations} from "vuex";
    import { recordAmound, rebateFn } from '@/api/ticketList'
    import messageCount from '@/components/promote/messageCount'
    import { getMessageCount } from "@/api/newMessage.js";
    import Balance from "../../RoleExtension/balance.vue";
    import { _incomeDetails } from "@/api/promotes";
    import promoteBusiness from "../../../images/extension/promote-business.png"
    import promoteMonomer from "../../../images/extension/promote-monomer.png"
    import promoteHospital from "../../../images/extension/promote-hospital.png"
    import promoteClinic from "../../../images/extension/promote-clinic.png"
    import promoteMultipleShop from "../../../images/extension/promote-multiple-shop.png"
    export default {
        name: "Myinfo",
        components: {
            ClxsdCell,
            ICountUp,
            messageCount,
            Balance
        },
        data(){
          return{
                companyName: '未认证',
                is_apply: true,  //是否是推广员
                partner: require("../../../images/extension/partner.png"),
                options: {
                    useEasing: true,
                    useGrouping: true,
                    separator: ',',
                    decimal: '.',
                    prefix: '',
                    suffix: '',
                    decimalPlaces: 2,
                },
                balance:0,
                todayIncome: 0,
                messageCount: 0,
                 typeList: [
                
              ]
          }
        },
        computed: {
            ...mapState({
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER.data
                    return {
                        companyName: currentInfo.shop_supplier&&(currentInfo.shop_supplier.display_name || currentInfo.shop_supplier.name || ''),
                        userName: currentInfo.display_name || currentInfo.real_name || currentInfo.phone || '丢失信息',
                        userTel: currentInfo.phone || '丢失信息',
                        //role: currentInfo
                        user_type: currentInfo.user_type,
                        sub_type: currentInfo.sub_type,
                        state: currentInfo.status,
                        avatar: currentInfo.avatar,
                        area_type: currentInfo.area_user&&currentInfo.area_user.apply_role
                    }
                },
            }),
            canShou() {
                const userInfo = this.userInfo
                // console.log(userInfo)
                return (userInfo.state === 1) && (
                    userInfo.sub_type === 1 ||
                    userInfo.sub_type === 2 ||
                    userInfo.sub_type === 3)
            }
        },
        created() {
            this.initData()
            this._getRecord();
            this.promerteTotal()
        },
        methods: {
            ...mapMutations(['changApplyPromote']),
            initData(){
                this.$http.get('hippo-shop/area-user/is-apply')
                .then(response => {
                    this.is_apply = response.data.data.is_apply
                    this.$lstore.setData('is_apply', response.data.data.is_apply)
                    this.changApplyPromote( response.data.data.is_apply)
                }).catch(err => {

                })
                getMessageCount({type:'promoter'}).then(res=>{
                    this.messageCount = res.data.total
                })
            },
             _getRecord() {
                // let params = {
                //     year: this.yte
                // }
                rebateFn().then(res=>{
                    let data = res.data.promoter_balance
                    this.balance = data;
                    this.todayIncome = res.data.today_income;
                })
            },

            /**
             * 查看集采商简介
             */
            queryPartnerInfo() {
                this.$router.push('/partnerInfo')
            },

             async promerteTotal(){
                _incomeDetails().then(res=>{
                    // debugger
                    let list = res.data?res.data: []

                    if(list.length > 0){
                        let name = "",
                            img = "";
                        list.forEach((item, index, arr) => {
                            
                            if(item.type) {
                                switch (item.type) {
                                    case 'business':
                                        name = "商业";
                                        img = '';
                                        break;
                                    case 'danti':
                                        name = "单体";
                                        // debugger
                                        img = '#icon-group-client-drugshops';
                                        break;
                                    case 'yiyuan':
                                        name = "医院";
                                        img = '#icon-group-client-hospital';
                                        break;
                                    case 'zhenshuo':
                                        name = "诊所";
                                        img = '#icon-group-client-clinic';
                                        break;
                                    case 'lianshuo':
                                        name = "连锁";
                                        img = '#icon-group-client-chain';
                                        break;
                                }
                            }
                            
                            arr[index].name = name;
                            arr[index].price = parseFloat(item.value).toFixed(2);
                            arr[index].img = img;
                            arr[index].num = item.count;
                        })
                    }
                    // debugger
                    this.typeList = list
                })
         } 
    }

}
</script>

<style lang="scss" scoped>
    .UnautMy {
        background: #f4f5f5;
        font-size: 0.34rem;
        display: flex;
        flex-direction: column;
        height: 100%;
        padding-bottom: 1.1rem;
         .header {
            height: 0.88rem;
            line-height: 0.88rem;
            text-align: center;
            background: rgba(45, 162, 255, 1);
            span {
                width: 1.09rem;
                height: 0.35rem;
                font-size: 0.37rem;
                color: rgba(255, 255, 255, 1);
            }
        }
    }
    .becomePartner {
        padding: .2rem .3rem 0;
        img {
            width: 100%;
        }
    }

    .container {
        flex: 1;
        overflow: auto;
        .userinfo {
            display: flex;
            height: 1.7rem;
            background: rgba(45, 162, 255, 1);
            .userinfo-left {
                margin-left: 0.36rem;
                margin-right: 0.32rem;
                width: 1.28rem;
                height: 1.28rem;
                background: rgba(255, 255, 255, 1);
                padding: 0.04rem;
                border-radius: 0.06rem;
                opacity: 0.9;

                img {
                    display: block;
                    width: 1.2rem;
                    height: 1.2rem;
                    z-index: 9;
                    position: relative;
                }
                >div {
                    img {
                        width: .3rem;
                        height: .3rem;
                        float: right;
                        margin-top: -.2rem;
                        z-index: 99;
                        position: relative;
                    }
                }
            }

            .userinfo-centre {
                flex-grow: 1;

                .name {
                    height: 0.32rem;
                    line-height: 1;
                    margin-top: 0.24rem;
                    margin-bottom: 0.18rem;
                    font-size: 0.34rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);

                    small {
                        color: #fff;
                        font-weight: 200;
                    }
                }

                .phone {
                    width: 1.8rem;
                    height: 0.22rem;
                    font-size: 0.28rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                }
            }

            .userinfo-right {
                margin-right: 0.44rem;
                font-size: 0.22rem;
                padding-top: 0.24rem;
                text-align: center;

                svg {
                    width: 0.54rem;
                    height: 0.54rem;
                }

                img {
                    display: block;
                    width: 0.54rem;
                    height: 0.54rem;
                    border: 0.01rem solid #000;
                }

                span {
                    display: block;
                    margin-top: 0.02rem;
                    color: rgba(255, 255, 255, 1);
                    font-size: 0.22rem;
                    font-weight: 500;
                }
            }
        }
        .balance {
            display: flex;
            align-items: center;
            color: #fff;
            height: 1rem;
            justify-content: space-between;
            padding: 0 .44rem;
            background: rgba(45, 162, 255, 1);
            div:first-child {
                font-size: .24rem;
            }
            div:last-child {
                font-size: .44rem;
            }
        }
    }
    .userinfo-lianshu {
        height: 1rem;
        border-top: 1px solid #33a6ff;
        line-height: 1rem;
        padding: 0 .3rem;
        display: flex;
        justify-content: space-between;
        color: #fff;
        span {
            font-size:.24rem;
        }
        b {
            font-size: .44rem;
        }
    }
    .typeBox {
        display: grid;
        grid-template-columns:50% 50%;
        padding: 0 .2rem;
        margin-top: .2rem;
        background: #EDF0F3;
        grid-column-gap: .02rem;
        grid-row-gap: .02rem;
        border-radius: 16px;
        // grid-template-rows: 
        svg {
            width: .46rem;
            height: .46rem;
            margin-right: .2rem;
        }
        .typeItem {
            height: 1.4rem;
            background: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            // align-items: center;
            padding: 0 .32rem;
            div {
                display: flex;
                align-items: center;
            }
            div:last-of-type {
                justify-content: space-between;
                margin-top: .1rem;
                font-weight: bold;
                span {
                    color: #03AD8F;
                    font-size: .3rem;
                    
                }
                span:first-of-type {
                    color: #333;
                }
            }
        }
    }
   
</style>

<style scoped>
    /deep/  .clxsd-cell-value {
        width: auto!important;
    }
</style>