<template>
  <div class="containerPage">
        <clxsd-head-top title='收益明细' style="border-bottom: 0px">
            <!-- <div slot="append">
                <span @click="toRouter('/earnings-detail')" class="detail-go">明细</span>
            </div> -->
        </clxsd-head-top>
        <div style="overflow:auto;flex:1;">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="false">
                <div class="title">
                    <div class="blach">
                        <svg class="leaf small">
                            <use xlink:href="#icon-leaf-small"/>
                        </svg>
                        <svg class="leaf big">
                            <use xlink:href="#icon-leaf-big"/>
                        </svg>

                        <div>可提现金额(元)</div>
                        <div class="bottom-price">
                            <span>{{(data.can_expend) |　display_price | moneyCon}}</span>
                            <span>{{userInfo.area_type=='partner'?'合伙人':'推广人'}}</span>
                        </div>
                    </div>
                    <div class="dateTime">
                        <div v-for="(item, index) of dateList" :key="index" @click="handleChoose(index)" :class="{active:(dateDiff==item.dateDiff)}">
                            {{item.name}}
                        </div>
                        <div class="screening" @click="handleScreening">
                            <span>筛选</span>
                            <svg>
                                <use xlink:href="#icon-filter-gray"/>
                            </svg>
                        
                    </div>
                    </div>
                    
                    
                </div>
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
                        <span>{{data.income | display_price| moneyCon}}</span>
                    </div>

                    <div class="total-price-spending">
                        <span>总提现(元)</span>
                        <span>{{data.expend | display_price| moneyCon}}</span>
                    </div>
                </div>

                <!-- 收益列表 -->
                <div class="price-list" v-if="data.list.length>0">
                    <list v-for="(item, index) of data.list" :key="index" :data="item"></list>
                </div>
                <EmptyList v-else/>
                 <!-- 筛选弹出 -->
             
            </mt-loadmore>
        </div>
          <transition 
            name="fade" 
            enter-active-class="animated slideInRight"  
            leave-active-class="animated slideOutRight"
            >
                <scrrenning @comfirmQueryData="comfirmQueryData" v-if="isScrrenning" :startDate.sync="startDate" :endDate.sync="endDate" :isScrrenning.sync="isScrrenning"> </scrrenning>
            </transition>
  </div>
</template>

<script>
import headTop from '@/components/head'
import list from './list'
import scrrenning from './screening'
import { incomeTrans } from '@/api/ticketList'
import { mapState  } from 'vuex'
import EmptyList from "@/components/EmptyList"
export default {
    components: {
        headTop,
        list,
        scrrenning,
        EmptyList
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
            dateDiff: 30, //计算开始时间与结束时间的差值
            tranType: 0,
            limit: 15,
            page: 1,
            data: {
                list: [],
                expend: 0,
                income: 0,
                can_expend: 0
            },
            allLoaded: false
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
        this.initData()
    },
    computed: {
        ...mapState({
            userInfo: state => {
                const currentInfo = state.CURRENTUSER.data
                return {
                    area_type: currentInfo.area_user&&currentInfo.area_user.apply_role
                }
            },
        }),
    },

    methods: {
        handleChoose(index) {
            this.currentIndex = index
            if(index==2) {
                this.startDate = this.$moment(new Date()).subtract(30, 'day').format('YYYY/MM/DD')
                this.endDate = this.$moment(new Date()).format('YYYY/MM/DD')
            } else if(index==0) {
                this.startDate = this.$moment(new Date()).format('YYYY/MM/DD')
                this.endDate = this.$moment(new Date()).format('YYYY/MM/DD')
            } else {
                this.startDate = this.$moment(new Date()).subtract(7, 'day').format('YYYY/MM/DD')
                this.endDate = this.$moment(new Date()).format('YYYY/MM/DD')
            }
            this.page = 1
            this.allLoaded = false
            this.initData()
        },
        /**
         * 获取收益明细
         */
        initData() {
            let params = {
                tran_type: this.tranType,   //: 分润 2: 提现 3:合伙人分润
                start_time:　this.startDate,
                end_time: this.endDate,
                limit: this.limit,
                page: this.page
            }
            incomeTrans(params).then(res=>{
                if(this.page>1) {
                    // debugger
                    res.data.list.forEach((item, index,  arr)=>{
                        if(item.tag===0) {
                            arr[index].benefit_old_value = (+item.benefit_old_value) +　(+item.benefit_value)
                        } else {
                            arr[index].benefit_old_value = (+item.benefit_old_value) -　(+item.benefit_value)
                        }
                        alert(arr[index].benefit_old_value,'text')
                    })
                    this.data.list = this.data.list.concat(res.data.list)
                    this.$refs.loadmore.onBottomLoaded()
                } else {
                    this.data = res.data
                }
                if(res.data.list.length==0) {
                    this.allLoaded = true
                }
            })
        },
        // 初始化时间
        initDate() {
            this.endDate= this.$moment(new Date()).format('YYYY/MM/DD')
            this.startDate = this.$moment(new Date()).subtract(30, 'day').format('YYYY/MM/DD')
            // this.endDate = this.$moment(new Date()).format('YYYY/MM/DD')
        },
        // 筛选
        handleScreening() {
            
            // debugger
            this.isScrrenning = true
        },
        //确认按钮
        comfirmQueryData(priceFlag,incomeFlag) {
            if(priceFlag!=2&&incomeFlag==1) {
                this.tranType = 1
            } else if(priceFlag!=2&&incomeFlag==2) {
                this.tranType = 3
            } else if(priceFlag==2) {
                this.tranType = 2
            }
            this.page = 1
            this.allLoaded = false
            this.initData()
            this.isScrrenning = false
        },
        loadBottom() {
            this.page++
            this.initData()
        }
    },
    
}
</script>

<style lang="scss" scoped>
.containerPage {
    display: flex;
    flex-direction: column;
    height: 100%;
    .title {
        background: #fff;
        display: flex;
        flex-direction: column;
        .blach {
            height: 2.34rem;
            background:linear-gradient(to right,#75BCF5, #15CBB2);
            // width: 100%;
            margin: .24rem;
            border-radius: 5px;
            position: relative;
            padding: .48rem .36rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: #fff;
            .leaf {
                opacity: 0.1;
            }
            .big {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 3rem;
                height: 1.3rem;
                // z-index: -1;
            }
            .small {
                position: absolute;
                right: 0;
                top: 0;
                width: .82rem;
                height: .92rem;
                // z-index: -1;
            }
            .bottom-price {
                display: inline-flex;
                justify-content: space-between;
                align-items: center;
                span {
                    font-size: .30rem;
                }
                span:first-child {
                    font-size: .58rem;
                    font-weight: bold;
                }
            }
            // margin: 0 .24rem;
        }
        .dateTime {
            display: flex;
             align-items: center;
             height: .8rem;
             position: relative;
            //   margin: 0 .46rem;
            &>div {
                 margin: 0 .46rem;
            }
        }
        .screening {
            // float: right;
            position: absolute;
            right: 0;
            svg {
                width: .2rem;
                height: .2rem;
                margin-left: 2px;
            }
        }
    }
    .active {
        color: #0090FF;
        // font-size:.26rem;
        // font-weight: bold;
        height: .8rem;
        line-height: .8rem;
        border-bottom: 2px solid #0090ff;
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
                font-size: .44rem;
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
                font-size: .44rem;
            }
        }
    }
}
</style>