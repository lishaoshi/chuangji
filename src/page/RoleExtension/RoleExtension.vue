<template>
    <div id="RoleExtension" class="RoleExtension">

        <mt-tab-container v-model="selected" :class="{ Box2: selected==1 }">
            <mt-tab-container-item id="1" style="border-radius: 4px;min-height: 11.5rem;background: #fff;height:100%;">
                <div class="header">
                </div>
                <!--非正常情况，没有客户，需要去推广-->
                <UnSureCustomer :notices="noticeList"/>
            </mt-tab-container-item>
            <mt-tab-container-item id="2"  v-if="selected=='2'" :class="{ Box3: selected==2 }">
                <!--<p class="t1"  :class="{ t2: isFullScreen }">联贝收益</p>-->
               <MyFrame :balance="balance" :todayIncome="todayIncome"></MyFrame>
            </mt-tab-container-item>
        </mt-tab-container>

        <mt-navbar v-model="selected" class="footer">
            <mt-tab-item id="1">
                <svg class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-promote-footer-consumer"/>
                </svg>
                <p>客户</p>
            </mt-tab-item>
             <mt-tab-item id="2">
                <svg class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-promote-footer-earnings"/>
                </svg>
                <p>我的</p> 
            </mt-tab-item>
        </mt-navbar>
        <!--我的弹框-->
        <div v-if="myFrame" style="position: fixed;width: 100%;height: 100%;z-index: 9999;top:0rem;left: 0">
            <CustomerMy :closedMyFrame="closedMyFrame"></CustomerMy>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters } from "vuex";
    import ProfitComponent from "@/components/modules/Extension/ProfitComponent";
    import CustomerMy from "@/page/My/ExtensionMy";//我的
    import UnSureCustomer from "@/page/Home/UnSureExtension/UnSureCustomer";
    import MyFrame from "./MyExtension"
    import {adList, infoList} from "@/api/ad";
    import { recordAmound, rebateFn } from '@/api/ticketList';
    
    export default {
        name: "RoleExtension",
        components:{
            UnSureCustomer,
            ProfitComponent,
            CustomerMy,
            MyFrame
        },
        data(){
            return {
                selected: '1',
                regionVisible: false,
                myFrame:false,
                pay_success:false,
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                noticeList: [],
                limit: 6,
                balance: 0,
                todayIncome: 0
            }
        },
        computed:{
            // this.$store.commit("SAVE_CURRENTUSER", { ...user, token });
            ...mapState({
                USER_INFO: state => state.CURRENTUSER.data,
                // selected: state => state.RoleExtension
            }),
            title(){
                let shopSupplier = this.USER_INFO.shop_supplier;
                return shopSupplier ? shopSupplier.display_name
                    || shopSupplier.name
                    :'未授权用户'
            },
            role(){
                return this.USER_INFO.sub_type;
            },
            isActive(){
                return this.role && (this.USER_INFO.status === 1)
            },
            waitStatus(){
                return this.USER_INFO.status === 2
            },
            unActive(){
                return this.USER_INFO.status === 0;
            },


        },
        watch: {
            selected(value) {
                if(value==2) {
                    this._getRecord()
                }
            }
        },
        created(){
            this.currentId= this.$store.state.RoleExtension
            this.currentId==1?this.selected = "1":this.selected = "2"
            this._initData()
            //  this.selected==2&&
            // this.selected==2
            
        },
        methods:{
            openMyFrame() {
                this.myFrame = !this.myFrame
            },
            closedMyFrame() {
                this.myFrame = !this.myFrame
            },
             _getRecord() {
                // let params = {
                //     year: this.yte
                // }
                rebateFn().then(res=>{
                    let data = res.data;
                    this.balance = data.promoter_balance;  //余额
                    this.todayIncome = +data.today_income;  //今日收益
                    // debugger
                    // this.earnings = data.
                })
            },

            // 初始化banner、公告数据
            _initData() {
                // banner参数
                let bannerParams = {
                    channel: 'app',
                    space:　"tuiguang-all："
                }
                
                // 公告参数
                let infoParams = {
                    from: "platform",
                    supplier_id: 0,
                    space: "tuiguang-all",
                    limit: this.limit
                }
                infoList(infoParams).then(res=>{
                    // debugger
                    let data = res.data.data
                    this.noticeList = res.data.data
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #RoleExtension {
        // min-height: 100%;
        height: 100%;
    }
    .close {
        position: fixed;
        top:.05rem;
        right: .05rem;
        z-index: 9998;
        color: #fff;
    }
    .m-style-svg {
        width: 18px;
        height: 18px;
    }
    .header {
        height: .88rem;
        line-height: .88rem;
        background: #0090ff;
        color: #fff;
        font-size: .36rem;
        font-weight: bold;
        padding: 0 .2rem;
        position: fixed;
        width: 100%;
        top:0px;
        left: 0px;
        z-index: 1;
        justify-content: space-between;
    }
    .my {
        display: inline-block;
        z-index: 99;
        position: absolute;
        z-index: 99;
        top:.18rem;
        left: .2rem;
        img {
            width: .55rem;
            height: .55rem;
            border-radius: 100%;
            z-index: 999;
        }
    }
    .icons {
        width: .22rem;
        height: .22rem;
    }
    .search {
        padding: .2rem .2rem 0;
        z-index: 999;
        &-inp1 {
            background: #fff;
            width: 100%;
            height: .72rem;
            border-radius: 6px;
            padding: 0 5px;
            font-size: .34rem;
            &::placeholder {
                text-align: center;
                background: url(../../images/index/search-1.png) no-repeat center;
                background-size:.35rem .35rem ;
                background-position-x: 41%;
            }
        }
    }
    .message {
        position: absolute;
        width: .45rem;
        height: .45rem;
        top:.2rem;
        right: .2rem;
        svg {
            width: .4rem;
            height: .4rem;
            position: relative;
            z-index: 5;
        }
        span {
            width: 4px;
            height: 4px;
            border-radius: 100%;
            background: #f30000;
            z-index: 6;
            position: absolute;
            top: .05rem;
            right: .027rem;

        }
    }
    .mint-navbar {
        background: #fff;
        width: 100%;
        position: fixed;
        bottom: 0px;
        height: 1rem;
        border-top: 1px solid #f1f1f1;
        padding-top: .13rem;
    }
    .mint-tab-item svg {
        width: .45rem;
        height: .45rem;
        border-radius: 100%;
        margin-bottom: 1px;
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom:0px;
        color: #26a2ff;
    }
    .mint-tab-item {
        color: #ccc;
        padding: 0px;
    }
    .mint-tab-container {
        height: 100%;
        // overflow: auto;
        // margin-bottom: 1.1rem;
    }
    .go-info {
        margin-top: 1.5rem;
        a {
            display: block;
            width: 3.2rem;
            height: .88rem;
            line-height: .88rem;
            background: #26a2ff;
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
    }
    .error {
        color: #f30000;
        font-size: .24rem;
        line-height: 2;
    }
    .topHeight {
        height: 1.55rem;
        .my {
            top:.78rem
        }
    }
    .closeBox {
        top:.7rem
    }
    .Box2 {
        // margin-top: .5rem;
    }
    .Box4 {
        margin-top: .85rem;
    }
    .Box3 {
        // margin-top: 1.3rem;
    }
    .t1 {
        color: #fff;
        font-size: .32rem;
        font-weight: bold;
        width: 60%;
        left: 20%;
        text-align: center;
        position: fixed;
        top:.2rem;
        z-index: 2;
    }
    .t2 {
        top:.85rem;
        z-index: 9;
    }
</style>
<style lang="scss">
.RoleExtension {
    .mint-tab-container-wrap {
        height: 100%;
    }
}
</style>