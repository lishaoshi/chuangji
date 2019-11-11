<template>
    <div id="page-extension-home">
        <div class="header">
            <!-- <div  slot="prepend" @click="openMyFrame()" class="my" :class="{ my2: isFullScreen }">
                <img src="../../images/my/user_default.png" />
            </div> -->
        </div>
        <!-- <div class="box1"  :class="{ box2: isFullScreen }"></div> -->
            <un-sure-customer></un-sure-customer>
        <!--我的弹框-->
        <div v-if="myFrame" style="position: fixed;width: 100%;height: 100%;z-index: 9999;top:0;left: 0">
            <CustomerMy :closedMyFrame="closedMyFrame"></CustomerMy>
        </div>
        <clxsd-foot-guide :user-type="4" />
    </div>
</template>

<script>
    import { mapState, mapGetters } from "vuex";
    import { Picker } from 'mint-ui';
    import CustomerMy from "../My/ExtensionMy";//我的

    import UnSureCustomer from "./UnSureExtension/UnSureCustomer";
    export default {
        name: "page-extension-home",
        components:{
            CustomerMy,
            UnSureCustomer

        },
        data(){
            return {
                selected: '1',
                regionVisible: false,
                myFrame:false,
                pay_success:false,
                // isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
            }
        },
        computed:{
            ...mapState({
                USER_INFO: state => state.CURRENTUSER.data,
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
            active(){
                return this.USER_INFO.status === 1
            },
            waitStatus(){
                return this.USER_INFO.status === 2
            },
            unActive(){
                return this.USER_INFO.status === 0;
            }


        },
        methods:{
            showAddressPicker() {
                this.regionVisible = true;
            },
            addressChange(data) {
                this.region = data.region
                this.province = data.province
                this.regionVisible = false
            },
            openMyFrame() {
                this.myFrame = !this.myFrame
            },
            closedMyFrame() {
                this.myFrame = !this.myFrame
            },
            refresh(callback){
                this.$store.dispatch("fetchUserInfo");
                if(callback)callback();
            }
        },
    }
</script>

<style lang="scss" scoped>
    #page-extension-home {
        // min-height: 100%;
        height: 100%;
        background: #fff;
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
    .my2 {
        top:.76rem
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
        width: .45rem;
        height: .45rem;
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
        margin: .2rem;
        background: #fff;
        border: 1px solid #f1f1f1;
        border-radius: 4px;
    }
    .mint-tab-item svg {
        width: .85rem;
        height: .85rem;
        border-radius: 100%;
        margin-bottom: .1rem;
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom:0px;
        color: #666;
    }
    .mint-tab-item {
        color: #ccc;
    }
    .mint-tab-container {
        background: #fff;
        padding: .2rem;
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
    .box1 {
        height: .88rem;
    }
    .box2 {
        height: 1.5rem;
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {

    }
</style>