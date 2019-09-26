<template>
    <div id="TicketList">
        <div class="top">
            <router-link to="/my">
                <svg  class="m-style-svg m-svg-def" style="color: #fff">
                    <use xlink:href="#icon-back"></use>
                </svg>
            </router-link>
            <p>集采返利</p>
        </div>
        <div class="box">
            <div class="balance">
                <p>您拥有的联票</p>
                <p id="money">{{lianBeiValue| display_price}}</p>
            </div>
            <router-link to="/income" class="box-a1">收入记录</router-link>
            <router-link to="/expenditure" class="box-a1" style="background: #fff;color: #2da2ff;">支出入记录</router-link>
        </div>

    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "TicketList",
        data() {
            return{
                currentValue: 0.00,
                lianBeiValue: 0.00,
            }
        },
        computed: {
            ...mapState({
                USER_TYPE: state => state.CURRENTUSER.user_type,
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER
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
        text-align: center;
        font-size: .36rem;
        padding-top: .2rem;
        font-weight: bold;
        svg {
            width: .32rem;
            height: .32rem;
            color: #fff;
            position: absolute;
            left: .2rem;
        }
    }
    .box {
        background: url("../../images/bg.png") no-repeat top;
        background-size: 100% 100%;

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
        padding-top: 0.45rem;
        color: rgba(255, 255, 255, 1);
        opacity: .8;
        line-height: 140%;
        font-size: .32rem;
    }

    .balance p:nth-child(2) {
        margin-top: 0.7rem;
        font-size: .8rem;
    }

    .balance p:nth-child(3) {
        margin-top: 0.29rem;
        font-size: 24px;
    }

</style>