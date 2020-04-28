<template>
    <div class="UnautMy">
         <div class="header">
                <span>我的</span>
            </div>
        <div class="container">
            <div class="userinfo">
                <div class="userinfo-left">
                    <img :src="userInfo.avatar" class="logo" v-if="userInfo.avatarPro"/>
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
                        {{userInfo.userName}}
                        <template v-if="userInfo.area_type!==null">({{areaType}})</template>
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
            <balance v-if="userInfo.area_type!=null" :balance="balance" :todayIncome="todayIncome" :count="count"/>
            <!-- is_apply:角色选择是否已经通过，isShowJCBanner：是否是省市公司，isApply：是否已经成为集采商 -->
            <div class="becomePartner" v-if="is_collector!==1&&isShowJCBanner&&isApply == 1">
                <img src="../../../images/becomePartnr3.png" alt="" @click="queryPartnerInfo" />
            </div>
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
            <div class="typeBox" v-if="userInfo.area_type=='promoter'">
                <div class="typeItem"  v-for="(item, index) of typeList" :key="index">
                    <div>
                        <svg>
                            <use :xlink:href="item.img"/>
                        </svg>
                        <span>{{item.name}}</span>
                    </div>
                    <div>
                        <span>{{item.num}}家</span>
                        <span>{{item.price}}元</span>
                    </div>
                </div>
            </div>
        <div v-if="is_collector == 1 && isShowJCBanner">
            <PramterNum />
        </div>
         <!-- <clxsd-cell :title="'广告收益'" :to="'/develop'" :value="userInfo.lianPiaoVaule" is-link icon="promoter_ad" style="margin-bottom: .2rem"/> -->
        <ul class="unautMy-userlist">
            <div style="margin:.2rem 0">
                <clxsd-cell :title="'角色选择'" v-if="is_apply==-1" :to="'/customer-choose-role'" is-link icon="my-collection"/>
            </div>
        </ul>
        <clxsd-cell style="margin-top:.2rem;" v-if="userInfo.area_type=='find_medicine'" :title="'我的邀请'" :to="'/findRecord'" is-link icon="wode-wodeyaoqing" />
        <clxsd-cell style="margin-top:.2rem;" v-if="userInfo.area_type=='promoter'" :title="'我的邀请'" :to="'/record'" is-link icon="wode-wodeyaoqing" />

        
        <clxsd-cell :title="'厂商分润'" v-if="userInfo.area_type=='find_medicine'" :to="'/channel-profit'" :value="userInfo.lianPiaoVaule" is-link icon="promoter_pass"/>
        <clxsd-cell :title="'终端分润'" v-if="userInfo.area_type=='promoter'" :to="'/channel-profit'" :value="userInfo.lianPiaoVaule" is-link icon="promoter_pass"/>
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
    import {mapState, mapMutations, mapActions} from "vuex";
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
    import { _becomeJc,isJc } from "@/api/business";
    import PramterNum from "@/page/RoleExtension/totalNum";

    export default {
        name: "Myinfo",
        components: {
            ClxsdCell,
            ICountUp,
            messageCount,
            Balance,
            PramterNum
        },
        data(){
          return{
                companyName: '未认证',
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
                 typeList: [],
                 totalCount: 0,
                 count: 0,
                 is_apply: 1
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
                        avatar: currentInfo.avatar+'?x-oss-process=image/resize,m_lfit,w_64,limit_0',
                        avatarPro: currentInfo.avatar,
                        area_type: currentInfo.area_user&&currentInfo.area_user.apply_role
                    }
                },
                isApply: state=>state.is_apply,
                is_collector: state=>state.is_collector
            }),
            canShou() {
                const userInfo = this.userInfo
                // console.log(userInfo)
                return (userInfo.state === 1) && (
                    userInfo.sub_type === 1 ||
                    userInfo.sub_type === 2 ||
                    userInfo.sub_type === 3)
            },
            areaType() {
                var objMessgae = {
                    "promoter": "终端对接人",
                    "find_medicine": "厂商对接人",
                    "province_company": "省公司",
                    "city_company": "市公司"
                };
                return objMessgae[this.userInfo.area_type] || "";
            },
            //是否显示成为集采商banner
            isShowJCBanner() {
                let isShow = this.userInfo.area_type == "province_company" || this.userInfo.area_type == "city_company";
                return isShow;
            },
        },
        created() {
            this.initData()
            this._getRecord();
            if(this.is_apply==1&&this.userInfo.area_type==null) {
                this.fetchUserInfo();
            }
            this.userInfo.area_type=="promoter"&&this.promerteTotal()
        },
        methods: {
            ...mapMutations(['changApplyPromote', 'UPDATA_COLLECTOR']),
            initData(){
                // this.$http.get('hippo-shop/supplier/is-collector')
                getMessageCount({type:'promoter'}).then(res=>{
                    this.messageCount = res.data.total
                })
                this.$http.get('hippo-shop/area-user/is-apply')
                .then(response => {
                    let data = response.data.data;
                    this.$lstore.setData('is_apply', data.is_apply);
                    this.changApplyPromote(data.is_apply)
                }).catch(err => {
                    
                })
                if(this.userInfo.area_type == "province_company" || this.userInfo.area_type == "city_company") {
                    this.$http.get('hippo-shop/supplier/is-collector')
                    .then(response => {
                        let data = response.data.data;
                        
                        this.UPDATA_COLLECTOR(data.status)
                    }).catch(err => {

                    })
                }
                
            },
            ...mapActions(['fetchUserInfo']),
             _getRecord() {
                rebateFn().then(res=>{
                    this.balance = res.data.promoter_balance
                    this.todayIncome = parseFloat(res.data.today_income, 2);
                    this.count = res.data.count;
                })
            },

            /**
             * 查看集采商简介
             */
            queryPartnerInfo() {
                this.$messagebox.confirm('',{
                    title: '提示',
                    message: '集采商将享受推广工业订单的分润收入，确定成为集采商吗？',
                }).then(res=>{
                    if(res=='confirm') {
						_becomeJc().then(res=>{
							if(res.code==200) {
								this.$toast('申请成功');
							} else {
								this.$toast(res.message);
							}
						}).catch(err=>{
							this.$toast('申请失败');
						})
                        // console.log(123)
                    }
                })
            },

             async promerteTotal(){
                _incomeDetails().then(res=>{
                    // debugger
                    let list = res.data?res.data: []
                    // this.count = 0;
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
                            // this.count += item.count;
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
        // padding: 0 .2rem;
        margin: .2rem;
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
        .becomePartner {
            padding: .2rem .3rem 0;
            img {
                width: 100%;
            }
        }
    }
   
</style>

<style scoped>
    /deep/  .clxsd-cell-value {
        width: auto!important;
    }
</style>