<template>
  <div class="container">
       <head-top title='收益明细' :append="true">
           <div slot="title">
                <div class="title">
                    <span v-for="(item, index) of dateList" :key="index" @click="handleChoose(index)" :class="{active:(dateDiff==item.dateDiff)}">
                        {{item.name}}
                    </span>
                    
                </div>
            </div>
            <div slot="append">
                <section @click="handleScreening">筛选</section>
            </div>
        </head-top>

        <!-- 时间间隔 -->
        <div class="timeBox">
            <svg class="timeBox-icon">
                <use xlink:href="#icon-my-remainingSum-date"/>
            </svg>
            <div>
                <span>
                    {{startDate}}
                    
                    
                </span>
                至
                <span>
                    {{endDate}}
                </span>
            </div>
        </div>

        <!-- 总收益 -->
        <div class="total-price">
            <div class="total-price-income">
                <span>总收入(元)</span>
                <span>100000.00</span>
            </div>

             <div class="total-price-spending">
                <span>总提现(元)</span>
                <span>100000.00</span>
            </div>
        </div>

        <!-- 收益列表 -->
        <div class="price-list">
            <list v-for="(item, index) of priceList" :key="index"></list>
        </div>
        <!-- 筛选弹出 -->
        <scrrenning v-if="isScrrenning" :startDate.sync="startDate" :endDate.sync="endDate" :isScrrenning.sync="isScrrenning"> </scrrenning>
  </div>
</template>

<script>
import headTop from '@/components/head'
import list from './list'
import scrrenning from './screening'
export default {
    components: {
        headTop,
        list,
        scrrenning
    },
    data() {
        return {
            dateList:[
                {
                    name: '当天',
                    type: 0,
                    dateDiff: 0
                },
                {
                    name: '七天',
                    type: 1,
                    dateDiff: 7
                },
                {
                    name: '一月',
                    type: 2,
                    dateDiff: 30
                }
            ],
            currentIndex: 0,
            startDate: '',
            endDate: '',
            priceList: [
                {
                    time: new Date().getTime(),
                    type: 0,
                    balance: 100000,
                    Abstract: '提现'
                },{
                    time: new Date().getTime(),
                    type: 0,
                    balance: 100000,
                    Abstract: '提现'
                },{
                    time: new Date().getTime(),
                    type: 0,
                    balance: 100000,
                    Abstract: '提现'
                },{
                    time: new Date().getTime(),
                    type: 0,
                    balance: 100000,
                    Abstract: '提现'
                },
            ],   //收益列表
            isScrrenning: false, //是否是筛选
            dateDiff: 0, //计算开始时间与结束时间的差值
        }
    },
    watch:{
        startDate(newVal, oldVa) {
            this.dateDiff = Math.abs(this.$moment(newVal).diff(this.endDate, 'days'))
            return newVal
        },
        endDate(newVal, oldVa) {
            this.dateDiff = Math.abs(this.$moment(this.startDate).diff(newVal, 'days'))
            return newVal
        },
    },
    created() {
        this.initDate()
    },
    methods: {
        handleChoose(index) {
            this.currentIndex = index
            if(index==2) {
                this.startDate = this.$moment(new Date()).subtract(30, 'day').format('YYYY/MM/DD')
            } else if(index==0) {
                this.startDate = this.$moment(new Date()).format('YYYY/MM/DD')
            } else {
                this.startDate = this.$moment(new Date()).subtract(7, 'day').format('YYYY/MM/DD')
            }
        },

        // 初始化时间
        initDate() {
            this.startDate = this.$moment(new Date()).format('YYYY/MM/DD')
            this.endDate = this.$moment(new Date()).format('YYYY/MM/DD')
        },
        // 筛选
        handleScreening() {
            // debugger
            this.isScrrenning = true
        }
    },
    
}
</script>

<style lang="scss" scoped>
.container {
    .title {
        text-align: left;
    }
    .active {
        color: #fff;
        font-size:.36rem;
        font-weight: bold;
    }
    .price-list {
      margin-top: .28rem;
    }
    .timeBox {
        height: .8rem;
        display: flex;
        padding: 0 .2rem;
        align-items: center;
        font-size: .24rem;
        color: #999;
        &-icon {
            width: .3rem;
            height: .3rem;
            margin-right: .2rem;
            
        }
        span {
            font-size: .28rem;
            color: #333;
        }
    }
    .total-price {
        display: flex;
        height: 1.5rem;
        background: #fff;
        padding: 0 .2rem;
        &-income {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: .24rem;
            border-right: 1px solid #e6e6e6;
            span:last-child {
                color: #E53C6F;
                font-size: .38rem;
            }
        }
         &-spending {
            width: 50%;
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            font-size: .24rem;
            margin-left: .2rem;
            span:last-child {
                color: #4DB266;
                font-size: .38rem;
            }
        }
    }
}
</style>