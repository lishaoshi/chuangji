<template>
    <div class="lianshuPage">
        <clxsd-head-top title='联数明细' style="border-bottom: 0px"></clxsd-head-top>
        <div class="top">
            <div class="otc-box">
                <div @click="showTimePicker">
                    <p>{{year}}年</p>
                    <span>{{month}}<small style="font-size: .3rem">月</small></span>
                    <svg>
                        <use xlink:href="#icon-tuiguang-xialasanjiao"/>
                    </svg>
                </div>
            </div>
            <div class="trans">
                <p class="title">收入(包)</p>
                <p class="num">{{totalIncome | display_price}}</p>
            </div>
            <div class="trans">
                <p class="title">支出(包)</p>
                <p class="num">{{ totalExpenditure| display_price }}</p>
            </div>
        </div>
        <ul class="otc-list" v-if="entities.length>0">
            <li v-for="(entity,index) in entities" :key="`en-${index}`">
                <div class="detail">
                    <p >{{entity.message}}</p>
                    <p>{{entity.created_at.date | formatDate('MM-dd hh:mm')}}</p>
                </div>
                <div class="num">
                    <div v-if="entity.tag=='+'" style="color: #E63C6F">
                        <span>{{entity.tag}}</span>
                        <span>{{entity.value}}</span>
                    </div>
                    <div v-else style="color: #4DB366">
                        <span>{{entity.tag}}</span>
                        <span>{{entity.value}}</span>
                    </div>
                </div>
            </li>
        </ul>
        <EmptyList v-if="entities.length==0&&loading==false" message="数据为空！" />
        <CircleLoading v-if="loading" />
        <!-- <mt-popup v-model="regionVisible" :position="position" class="bottom-region" style="width:100%;">
            <mt-datetime-picker v-model="dateValue" type="date" ref="datePicker" year-format="{value} 年" month-format="{value} 月"
                                :startDate="startDate"
                                :endDate="new Date()"
                                @confirm="handleConfirm">
            </mt-datetime-picker>
        </mt-popup> -->
          <mt-datetime-picker v-model="dateValue" type="date" ref="datePicker" year-format="{value} 年" month-format="{value} 月"
                                :startDate="startDate"
                                :endDate="new Date()"
                                @confirm="handleConfirm">
            </mt-datetime-picker>
        <!-- <div class="bgBox" v-if="regionVisible"></div> -->
    </div>
</template>

<script>
    import EmptyList from "@/components/EmptyList";
    import CircleLoading from "@/icons/CircleLoading";
    export default {
        name: "lianshu",
        components: {CircleLoading, EmptyList},
        data() {
            return {
                regionVisible: false,
                dateValue:null,
                year:(new Date()).getFullYear(),
                month:(new Date()).getMonth()+1,
                startDate:new Date('2018-01'),
                //startDate:new Date().getFullYear(),
                popupVisible:false,
                loading:false,
                activeType:0,
                totalIncome:0.00,
                totalExpenditure:0.00,
                entities:[],
                position: 'bottom'
            }
        },
        computed:{
            userId(){
                return this.$store.state.CURRENTUSER.data.id;
            }
        },
        created(){
            this.queryTransData();
        },
        methods: {
            showTimePicker() {
                this.regionVisible = true;
                this.popupVisible = false;
                this.$refs.datePicker.open();
                let pickerSlots = document.getElementsByClassName('picker-slot');
                for(let i = 0;pickerSlots && i<pickerSlots.length;i++) {
                    if (i === 2) {
                        pickerSlots[i].style.display = 'none';
                    }
                }

            },
            showRolePicker() {
                this.popupVisible = true;
                this.regionVisible = false;
            },
            hiddenRolePicker() {
                this.popupVisible = false;
            },
            handleConfirm() {
                this.year = this.dateValue.getFullYear();
                this.month = this.dateValue.getMonth() + 1;
                this.queryTransData();
            },
            queryTransData(){
                this.loading = true;
                const params = {
                    year:this.year,
                    month: this.month,
                }
                this.$http.get('lianbei/list',{params}).then(response => {
                    this.totalIncome = response.data.income;
                    this.totalExpenditure = response.data.expenditure;
                    this.entities = response.data.items;
                    console.log(this.entities)
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.bgBox {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 10;
    background: #000;
    opacity: 0.5;
}
    .otc-box {
        margin-bottom: .18rem;
        padding: 0 .2rem;
        padding-right: .4rem;
        border-right: 1px dashed #E6E6E6;
        svg {
            width: .2rem;
            height: .18rem;
            margin-left: .05rem;
        }
        p {
            font-size: .3rem;
            opacity: .7;
        }
        span {
            font-size: .6rem;
        }
    }
    .trans {
        padding-left: .5rem;
        padding-right: .4rem;
        width: 35%;
        font-size: .24rem;
        .title {
            opacity: .8;
        }
        .num {
            font-size: .38rem;
            margin-top: .25rem;
            opacity: 1;
        }

    }
    .top {
        background: #26a2ff;
        color: #fff;
        padding: .2rem .26rem;
        display: flex;
    }
    .choice-role {
        padding: .2rem;
        display: flex;
        justify-content: space-between;
        svg {
            width: .4rem;
            height: .4rem;
            margin-top: .1rem;
        }
        span {
            background: #fff;
            padding: .1rem .2rem;
            border-radius: 2px;
            color: #7C7C7C;
            font-size: .3rem;
        }
    }
    .pop-title {
        text-align: center;
        font-size: .3rem;
        line-height: 3;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: .2rem;
    }
    .pop-list {
        padding: .2rem;
        li {
            display: inline-block;
            width: 2.1rem;
            height: 1.2rem;
            line-height: 1.2rem;
            background: #fff;
            color: #333;
            border-radius: 3px;
            margin-right: .25rem;
            text-align: center;
            margin-bottom: .16rem;
            font-size: .3rem;
        }
        .active {
            background: #26a2ff;
            color: #fff;
        }
    }
    .otc-list {
        background: #fff;
        li {
            display: flex;
            padding: .3rem .2rem;
            align-items: center;
            border-bottom: 1px solid #f1f1f1;
            .detail {
                width: 60%;
                p {
                    &:nth-child(1) {
                        font-size: .34rem;

                    }
                    &:nth-child(2) {
                        font-size: .24rem;
                        color: rgb(153,153,153);
                        margin-top: .15rem;
                    }
                }
            }
            .num {
                text-align: right;
                font-size: .36rem;
                width: 40%;
                font-weight: bold
            }
        }
    }
    .pop-chacle {
        border-top: 3px solid #f1f1f1;
        color: #7C7C7C;
        border-bottom: 0px;
        margin-top: .3rem;
        margin-bottom: 0px;
    }
</style>
<style lang="scss">
.lianshuPage {
    .picker-toolbar {
        background: #F5F5F5;
        height: .88rem;
        display: flex;
        align-items: center;
    }
}
</style>