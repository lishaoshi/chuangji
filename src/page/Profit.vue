<template>
    <div id="Profit">
        <clxsd-head-top title="联贝收益" append="1">
            <div  slot="prepend" @click="openMyFrame()" class="my">
                <img src="../images/my/user_default.png" />
            </div>

            <router-link slot="append" to="" class="message">
                <!--
                <svg>
                    <use xlink:href="#icon-promote-message"/>
                </svg>
                <span></span>
                -->
            </router-link>

        </clxsd-head-top>

        <div v-if="myFrame" style="position: fixed;width: 100%;height: 100%;z-index: 9999;top:0;left: 0">
            <CustomerMy :closedMyFrame="closedMyFrame"></CustomerMy>
        </div>
        <ProfitComponent style="position: relative;z-index: 2"></ProfitComponent>
        <clxsd-foot-guide :user-type="4" />
    </div>
</template>

<script>
    import CustomerMy from "./My/ExtensionMy";//我的
    import ProfitComponent from "@/components/modules/Extension/ProfitComponent";

    export default {
        name: "Profit",
        components:{
            CustomerMy,
            ProfitComponent
        },
        data(){
            return {
                selected: '2',
                profitData:{
                    lianbeiValue: 0.000,
                    addValue: 0.000,
                    totalValue: 0.000,
                    tongdaoValue: 0.000,
                    yeweiValue: 0.000,
                    adValue: 0.000,
                },
                myFrame: false,
            }
        },
        computed:{
            toUrl(){
                const userInfo = this.$store.state.CURRENTUSER;
                let url = '/channel-profit';
                if(userInfo.user_type===4 && userInfo.sub_type ===2){
                    return '';
                }
                return url;
            }
        },
        methods:{
            async initData(){
                const {data} = await this.$http.get('/user/profit');
                this.profitData = data;
            },
            openMyFrame() {
                this.myFrame = !this.myFrame
            },
            closedMyFrame() {
                this.myFrame = !this.myFrame
            }
        },
        created(){
            this.initData();
        }
    }
</script>

<style lang="scss" scoped>
    .my {
        padding-top: .1rem;
        img {
            width: .55rem;
            height: .55rem;
            border-radius: 100%;
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
    .profit-header {
        height: 1.55rem;
        background: #fff;
        display: flex;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: .2rem;
        padding: 0 .72rem;
        div {
            width: 50%;
            &:nth-child(2) {
                text-align: right;
                width: 48%;
                border-left: 1px solid #f1f1f1;
            }

            .title {
                font-size: .26rem;
                color: rgb(153,153,153);
                margin-top: .2rem;
            }
            .num {
                font-size: .36rem;
                line-height: 1;
            }
            .add {
                color: #03ad8f;
                margin-top: .1rem;
            }
        }
    }
    .detailed-item {
        margin: .1rem .2rem;
        background: #fff;
        border-radius: 5px;
        border:1px solid #f1f1f1;
        display: flex;
        padding: .35rem .2rem;
        align-items: center;

        .item-icon {
            width: 1rem;
            height: 1rem;
        }
        .title {
            font-size: .48rem;
            padding-left: .2rem;
            color: #333;
        }
        .num {
            text-align: center;
            margin-left: 24%;
            p {
                &:nth-child(1) {
                    font-size: .26rem;
                    color: rgb(153,153,153);
                }
                &:nth-child(2) {
                    font-size: .36rem;
                    line-height: 1;
                    color: #03ad8f;
                    font-weight: bold;
                    margin-top: .15rem;
                }
            }
        }
    }
</style>