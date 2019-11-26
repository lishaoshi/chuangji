<template>
    <div id="TicketList">
        <div class="top">
            <div @click="goBack">
                 <svg  class="m-style-svg m-svg-def" style="color: #fff">
                    <use xlink:href="#icon-back"></use>
                </svg>
            </div>
            <p>集采返利</p>
        </div>
        <div class="box">
            <div class="balance">
                <p>您拥有的收益</p>
                <p>
                    <!-- <countTo :startVal='currentValue' :endVal='endVal' :duration='5000'></countTo>.00
                     -->
                    <i-count-up
                        :startVal="0"
                        :endVal="lianBeiValue"
                        :decimals="0"
                        :duration="23"
                        :options="options"
                    ></i-count-up>

                </p>
                <!-- <p id="money">{{lianBeiValue| display_price}}</p> -->
               
            </div>
            <router-link to="/income" class="box-a1">收入记录</router-link>
            <router-link to="/expenditure" class="box-a1" style="background: #fff;color: #2da2ff;">支出记录</router-link>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import ICountUp from '@/components/countUp'
    import { recordAmound, rebateFn } from '@/api/ticketList'
    export default {
        name: "TicketList",
        components: {
            // countTo
            ICountUp
        },
        data() {
            return{
                currentValue: 0.00,
                lianBeiValue: 0.00,
                options: {
                    useEasing: true,
                    useGrouping: true,
                    separator: ',',
                    decimal: '.',
                    prefix: '',
                    suffix: '',
                    decimalPlaces: 2
                },
                total: 100000.15
            }
        },
        computed: {
            ...mapState({
                USER_TYPE: state => state.CURRENTUSER.data.user_type,
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER.data
                    const configInfo = state.CONFIG
                    return {
                        lianBei: {
                            isOpen: !!currentInfo.lianbei,
                            value: !!currentInfo.lianbei ? (currentInfo.lianbei.balance / 100).toFixed(2) : '0.00'
                        },
                        lianBeiValue: (configInfo['lianbei'] && configInfo['lianbei']['real_value']) ? configInfo['lianbei']['real_value'] : '0.30',
                        lianPiaoVaule: currentInfo.lianpiao ? (parseFloat(currentInfo.lianpiao.add_balance) + parseFloat(currentInfo.lianpiao.balance)).toFixed(2) : '0.00',
                    }
                }
            })
        },
        created() {
            this._getRecord()
        },
        methods: {
            // 获取集采返利记录
            _getRecord() {
                // let params = {
                //     year: this.yte
                // }
                rebateFn().then(res=>{
                    // debugger
                    let data = res.data.balance
                    // debugger
                    this.lianBeiValue = data
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #TicketList {
        min-height: 100%;
        background: #fff;
    }
    .top {
        background: rgba(0, 144, 255, 1);
        color: #fff;
        // text-align: center;
        font-size: .36rem;
        height: .88rem;
        line-height: .88rem;
        display: flex;
        // align-items: center;
        font-weight: bold;
        padding: 0 .2rem;
        svg {
            width: .32rem;
            color: #fff;
            // position: absolute;
            // left: .2rem;
        }
        p {
            flex: 1;
            text-align: center;
        }
    }
    .box {
         background: linear-gradient(#0090ff,70%, #fff);

        &-a1 {
            display: block;
            text-align: center;
            width: 6.30rem;
            height: 1.09rem;
            line-height: 1.09rem;
            background: rgba(0, 144, 255, 1);
            box-shadow: 0px .2rem .4rem 0px rgba(0, 144, 255, 0.5);
            border-radius: .55rem;
            color: #fff;
            font-size: .36rem;
            margin: .23rem auto;
        }
    }

    .balance {
        /*margin-top: 0.88rem;*/
        width: 100%;
        position: relative;
        padding-bottom: 2.7rem;
        text-align: center;
    }

    .balance p {
        font-size: 12px;
        color: rgb(255, 255, 255);
    }

    .balance p:nth-child(1) {
        padding-top: 0.38rem;
        color: rgba(255, 255, 255, 1);
        opacity: .8;
        line-height: 140%;
        font-size: .32rem;
    }

    .balance p:nth-child(2) {
        margin-top: 0.5rem;
        font-size: 1.2rem;
        span {
            display: inline-block;
        }
    }

    .balance p:nth-child(3) {
        margin-top: 0.29rem;
        font-size: 24px;
    }

</style>