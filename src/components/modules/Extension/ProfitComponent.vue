<template>
    <div class="ProfitComponent">
        <div class="profit-header">
            <div>
                <p class="title">价值(元)</p>
                <p class="num" style="margin-top: .45rem">&asymp; {{profitData.lianbeiValue | display_price(3)}}</p>
            </div>
            <div>
                <p class="title">收益(贝)</p>
                <p class="add">+{{profitData.addValue | display_price}}</p>
                <p class="num">{{profitData.totalValue | display_price }}</p>
            </div>
        </div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">
                <p>市场</p>
            </mt-tab-item>
            <mt-tab-item id="2">
                <p>明细</p>
            </mt-tab-item>
            <mt-tab-item id="3">
                <p>应用</p>
            </mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" style="min-height: 5rem;padding-top: .1rem">
            <mt-tab-container-item id="1">
                <Developping></Developping>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <router-link :to="toUrl" class="detailed-item">
                    <svg class="item-icon">
                        <use xlink:href="#icon-promote-channelGains"/>
                    </svg>
                    <p class="title">通道收益</p>
                    <div class="num">
                        <p>收益(贝)</p>
                        <p>{{profitData.tongdaoValue | display_price }}</p>
                    </div>
                </router-link>
                <router-link to="/business-profit" class="detailed-item">
                    <svg class="item-icon">
                        <use xlink:href="#icon-promote-performanceGains"/>
                    </svg>
                    <p class="title">业务收益</p>
                    <div class="num">
                        <p>收益(贝)</p>
                        <p>{{profitData.yeweiValue | display_price }}</p>
                    </div>
                </router-link>
                <router-link to="/develop" class="detailed-item">
                    <svg class="item-icon">
                        <use xlink:href="#icon-promote-advertisingGains"/>
                    </svg>
                    <p class="title">广告收益</p>
                    <div class="num">
                        <p>收益(贝)</p>
                        <p>{{profitData.adValue | display_price }}</p>
                    </div>
                </router-link>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <Developping/>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>
    import Developping from "../../developping"
    export default {
        name: "ProfitComponent",
        components:{
            Developping
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
                const userInfo = this.$store.state.CURRENTUSER.data;
                let url = '/channel-profit';
                if(userInfo.user_type===4 && userInfo.sub_type ===2){
                    return '';
                }
                return url;
            },
            active(){
                return this.$store.CURRENTUSER.status === 1;
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
    .ProfitComponent {
        min-height: 10rem;
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