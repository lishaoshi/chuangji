<template>
    <div>
        <clxsd-head-top :title='`支付方式`'></clxsd-head-top>
        <div class="box1">
            <h2>订单金额(元)</h2>
            <p><span>￥</span>2000</p>
        </div>
        <ul class="list">
            <li>
                <span>贷款方式</span>
                <div @click="choiceMethods">
                    <span>{{typeTitle}}</span>
                    <svg>
                        <use xlink:href="#icon-cell-allow-right"></use>
                    </svg>
                </div>
            </li>
            <li style="font-size: .3rem;line-height: 2.4;border-bottom: 0px">
                <span>联票可用余额 {{userInfo.lianPiaoVaule}}</span>
            </li>
        </ul>
        <ul class="list">
            <li style="border: 0px">
                <span>等待时间</span>
                <input type="text" v-model="day" placeholder="请填写最迟接单时间，默认为20小时">
            </li>
        </ul>
        <button class="btn" @click="surePay">确认支付</button>
        <mt-popup v-model="popupVisible" position="bottom" style="width: 100%;background:#fff">
            <p class="pop-title">选择交易类型</p>
            <p class="pop-chacle"  @click="hiddenRolePicker">取消</p>
            <ul class="pop-list">
                <li @click="chooseTranTypes(tranType.type)"
                    v-for="(tranType,ind_) in transMap"
                    :key="`t-${ind_}`">
                    <svg>
                        <use :xlink:href="`#icon-uniteCoin-${tranType.icon}`"></use>
                    </svg>
                    <span>{{tranType.label}}</span>
                    <svg v-if="activeType===tranType.type">
                        <use xlink:href="#icon-pay-chosed"></use>
                    </svg>
                </li>
            </ul>
        </mt-popup>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        name: "PaymentMethod",
        data(){
            return{
                popupVisible:false,
                transMap:[
                    {
                        icon:'bankCart',
                        label:'中国邮政银行储蓄卡(7788)',
                        type:0,
                    },
                    {
                        icon:'bankCart',
                        label:'中国建设银行储蓄卡(7788)',
                        type:1,
                    },
                    {
                        icon:'Alipay',
                        label:'支付宝',
                        type:2,
                    },
                    {
                        icon:'wechat',
                        label:'微信',
                        type:3,
                    },
                ],
                activeType:0,
                day:'3天'
            }
        },
        computed:{
            typeTitle(){
                let title='';
                this.transMap.forEach((typeD,ind_) => {
                    if(this.activeType === typeD.type){
                        title = typeD.label;
                    }
                });
                return title;
            },
            ...mapState({
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER.data.userInfo
                    return {
                        lianPiaoVaule:currentInfo.lianpiao ? (parseFloat(currentInfo.lianpiao.add_balance) + parseFloat(currentInfo.lianpiao.balance)).toFixed(2):'0.00',
                    }

                },
            })
        },
        methods:{
            choiceMethods(){
                this.popupVisible = true;
            },
            hiddenRolePicker() {
                this.popupVisible = false;
            },
            chooseTranTypes(type){
                this.activeType = type;
                this.popupVisible = false;
            },
            surePay(){
                const params = {
                    type:this.activeType,
                    price:this.price,
                    day: this.day,
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .box1 {
        height:2.2rem;
        background:rgba(255,255,255,1);
        text-align: center;
        h2 {
            font-size:.3rem;
            font-weight:500;
            color:rgba(153,153,153,1);
            padding-top: .5rem;
        }
        p {
            font-size:.70rem;
            font-weight:bold;
            color:rgba(51,51,51,1);
            span {
                font-size:.36rem;
            }
        }
    }
    .list {
        margin-top: .2rem;
        padding: 0 .2rem;
        background: #fff;
        li {
            font-size: .34rem;
            display: flex;
            justify-content: space-between;
            background: #fff;
            line-height: 3;
            border-bottom: 1px solid #e6e6e6;
            svg {
                width: .38rem;
                height: .38rem;
                top: .06rem;
                position: relative;
            }
            input {
                width: 78%;
            }
        }
    }
    .pop-title {
        text-align: center;
        font-size: .3rem;
        line-height: 3;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: .2rem;
        background: #fff;
    }
    .pop-list {
        padding: .2rem;
        background: #fff;
        li {
            height:1.2rem;
            line-height: 1.2rem;
            font-size: .34rem;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e6e6e6;
            padding-left: .1rem;
            svg {
                width: .42rem;
                height: .42rem;
                margin-right: .1rem;
            }
            span {
                width: 82%;
                display: inline-block;
            }
        }
    }
    .btn {
        display: block;
        width:7.1rem;
        height:.88rem;
        background:rgba(0,144,255,1);
        border-radius:6px;
        color: #fff;
        font-size: .34rem;
        margin: 0 auto;
        margin-top: 1rem;
    }
</style>