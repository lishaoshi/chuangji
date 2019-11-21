<template>
  <div class="container">
      <!-- 日期选择 -->
        <div class="main-box">
            <div class="date">
                <div class="title">日期选择</div>
                <div class="content">
                    <div @click="handleChooseDate('start')">
                        {{startDate}}
                       
                    </div>
                    <section style="margin: 0 .1rem;"> — </section>
                    <div @click="handleChooseDate('end')">
                         {{endDate}}
                    </div>
                </div>
            </div>
            
            <!-- 收支类型 -->
            <div class="price-type">
                <div class="title">收支类型</div>
                <div class="content">
                    <div @click="handlePrice(1)" :class="{active:priceFlag==1}">
                        <span>收入</span>
                    </div>
                    <!-- <section style="margin: 0 .1rem;"> — </section> -->
                    <div @click="handlePrice(2)" :class="{active:priceFlag==2}">
                        <span>提现</span>
                    </div>
                </div>
            </div>
             <!-- 收益类型 -->
            <div class="income-type" v-if="priceFlag!=2">
                <div class="title">收益类型</div>
                <div class="content">
                    <div @click="handleIncome(1)" :class="{active:incomeFlag==1}">
                        <span>通道收益</span>
                    </div>
                    <!-- <section style="margin: 0 .1rem;"> — </section> -->
                    <div @click="handleIncome(2)" v-if="userInfo.area_type=='partner'" :class="{active:incomeFlag==2}">
                        <span>合伙收益</span>
                    </div>
                </div>
            </div>
             <!-- 底部按钮 -->
            <div class="bottom-btn">
                <div @click="clone">取消</div>
                <div class="confirm" @click="comfirmQueryData">确定</div>
            </div>
        </div>

        <!-- 日期选择器 -->
            <mt-datetime-picker v-model="dateValue" type="date" ref="datePicker" year-format="{value} 年" month-format="{value} 月"
                                :startDate="new Date('2018-01')"
                                :endDate="new Date()"
                                :visible.sync="pickerVisible"
                                @confirm="handleConfirm">
            </mt-datetime-picker>
       
        <!-- 背景层 -->
        <div class="bg"></div>
  </div>
</template>

<script>
import { mapState  } from 'vuex'
export default {
    props: {
        isScrrenning: {
            type: Boolean,
            default: false
        },
        startDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            incomeFlag: 0,   //z正在激活收益类型
            priceFlag: 0, //收入支出激活
            pickerValue: '',
            pickerVisible: false,
            regionVisible: false,
            // startDate: '',
            dateValue: new Date(),
            dateFlag: 0
        }
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
        clone() {
            this.$emit('update:isScrrenning', false)
        },
        handleIncome(flag) {
            this.incomeFlag = flag
        },
        handlePrice(flag) {
            this.priceFlag = flag
        },
        handleChooseDate(type) {
            this.dateFlag = type
            if(this.dateFlag=='start') {
                this.dateValue = new Date(this.startDate)
            } else if(this.dateFlag=='end') {
                 this.dateValue = new Date(this.endDate)
            }
            this.$refs.datePicker.open();
        },
        handleConfirm(val) {
            
            let date = this.$moment(val).format('YYYY/MM/DD')
            this.dateFlag=='start'&&(this.$emit('update:startDate', date))
            this.dateFlag=='end'&&this.$emit('update:endDate', date)

        } ,
        /**
         * 确认搜索按钮
         */
        comfirmQueryData() {
            this.$emit('comfirmQueryData', this.priceFlag, this.incomeFlag)
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    .main-box {
        background: #fff;
        position: absolute;
        left: .8rem;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 100;
        opacity: 1;
        padding: 0 .4rem;
        .title {
            font-size: .26rem;
            color: #333;
            font-weight: bold;
            line-height: 1rem;
        }
        .content {
            display: flex;
            align-items: center;
            div {
                background: #f5f5f5;
                height: .7rem;
                line-height: .7rem;
                padding: 0 .68rem;
                border-radius: 16px;
                margin-right: .24rem;
            }
            .active {
                background: #E5F4FF;
                color: #0090FF;
            }
        }
        .date {
            .content {
                div {
                    background: #f5f5f5;
                    font-size: .24rem;
                    height: .64rem;
                    line-height: .64rem;
                    border-radius: 16px;
                    padding: 0 .68rem;
                    margin-right: 0;
                }
            }
        }
        .income-type {
            .content {
                div {
                    padding: 0 .45rem;
                    
                }
            }
          
            
        }
        .bottom-btn {
            position: absolute;
            left: .36rem;
            right: .36rem;
            bottom: .14rem;
            display: flex;
            justify-content: space-between;
            div {
                padding: 0 1.18rem;
                border-radius: 18px;
                height: .74rem;
                line-height: .74rem;
                
                color: #666;
            }
            div:last-child {
                border:0!important;
            }
            .confirm {
                background: #0090FF;
                color: #fff;
            }
        }
    }
    .bg {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: #000;
        opacity: 0.4;
        z-index: 99;
    }
}
</style>