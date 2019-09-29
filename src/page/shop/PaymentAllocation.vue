<template>
    <div>
        <clxsd-head-top title='支付分配'></clxsd-head-top>
        <div class="top-box">
            <p>订单总金额（元）</p>
            <p><span>￥</span>1000.00</p>
        </div>
        <div class="form-box">
            <div class="form-box-box1">
                <label>对公账号使用金额（元）</label>
                <input type="number" v-model="publicAccount" placeholder="请输入金额">
                <label>联票使用数量</label>
                <input type="number" v-model="lianpiao" placeholder="请输入联票数量">
                <label>
                    联票可用余额 {{userInfo.lianPiaoVaule}}
                    <span class="all" @click="useAllLianpiao" v-if="userInfo.lianPiaoVaule>0">全部</span>
                </label>
            </div>
            <div class="form-box-box2">
                <label>等待时间</label>
                <input type="text" v-model="lastTime" placeholder="请填写供货最迟接单时间，默认为三天">
            </div>
            <div class="btn" @click="goPay">确认支付</div>
        </div>
        <PayPassword v-if="showPay" ref="payPassword"
                     @backFnc="showPay=false"
                     @keyUpHandle="payPasswordComputed"/>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import PayPassword from "@/components/common/PayPassword";
    export default {
        name: "PaymentAllocation",
        data(){
            return {
                publicAccount:"",
                lianpiao:"",
                lianPiaoValue: 0.00,
                lastTime:'',
                showPay:false
            }
        },
        components:{
            PayPassword
        },
        computed: {
            ...mapState({
                USER_TYPE: state => state.CURRENTUSER.data.userInfo.user_type,
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER.data.userInfo
                    const configInfo = state.CONFIG
                    return {
                        lianBei: {
                            isOpen: !!currentInfo.lianbei,
                            value: !!currentInfo.lianbei ? (currentInfo.lianbei.balance / 100).toFixed(2) : '0.00'
                        },
                        lianPiaoVaule: currentInfo.lianpiao ? (parseFloat(currentInfo.lianpiao.add_balance) + parseFloat(currentInfo.lianpiao.balance)).toFixed(2) : '0.00',
                    }
                }
            })
        },
        methods:{
            useAllLianpiao(){
                this.lianpiao = this.userInfo.lianPiaoVaule
            },
            goPay(){
                if(this.publicAccount==''){
                    this.$toast('请输入对公账号使用金额');
                    return
                }
                if(this.lianpiao>this.userInfo.lianPiaoVaule) {
                    this.$toast("抱歉！您没有足够的联票余额");
                    return
                }
                this.showPay = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .top-box {
        text-align: center;
        background: #fff;
        padding: .5rem 0;
        border-bottom: 1px solid #e6e6e6;
        p {
            &:nth-child(1){
                font-size:.3rem;
                font-weight:500;
                color:rgba(153,153,153,1);
            }
            &:nth-child(2){
                font-size:.7rem;
                font-weight:bold;
                margin-top: .2rem;
                color:rgba(51,51,51,1);
                span {
                    font-size:.36rem;
                }
            }
        }
    }
    .form-box {
        &-box1 {
            background: #fff;
            padding: 0 .3rem;
            label {
                display: block;
                font-size:.3rem;
                height: 1rem;
                line-height: 1rem;
            }
            input {
                display: block;
                border-bottom: 1px solid #e6e6e6;
                width: 100%;
                height: .6rem;
            }
            .all {
                float: right;
                color: #2da2ff;
            }
        }
        &-box2 {
            height: 1.2rem;
            line-height: 1.2rem;
            background: #fff;
            margin-top: .3rem;
            display: flex;
            padding: 0 .3rem;
            font-size: .28rem;
            input {
                width: 70%;
                margin-left: .2rem;
            }
        }
        .btn {
            width:7.10rem;
            height:.88rem;
            background:rgba(0,144,255,1);
            border-radius:6px;
            color: #fff;
            font-size: .34rem;
            line-height: .88rem;
            text-align: center;
            margin: 0 auto;
            margin-top: 1rem;
        }
    }
</style>