<template>
    <div style="min-height: 100%;background: #fff">
        <clxsd-head-top title='支出记录' style="border-bottom: 0px"></clxsd-head-top>
        <div class="list-title">
            <div class="left">
                <p>{{year}}-{{month}}</p>
                <p>总支出{{ totalExpenditure| display_price }}</p>
            </div>
            <div class="right" @click="showTimePicker">
                <svg>
                    <use xlink:href="#icon-my-remainingSum-date"></use>
                </svg>
            </div>
        </div>
        <ul class="otc-list" v-if="entities.length>0">
            <li v-for="(entity,index) in entities" :key="`en-${index}`">
                <div class="detail">
                    <p >{{entity.message}}</p>
                    <p>{{entity.created_at | formatDate('MM-dd hh:mm')}}</p>
                </div>
                <div class="num" style="color: #4DB366;font-weight: bold">
                    <span>{{entity.tag}}</span>
                    {{entity.value}}
                </div>
            </li>
        </ul>
        <EmptyList v-else message="数据为空！" />
        <CircleLoading v-if="loading" />
        <mt-popup v-model="regionVisible" position="bottom" class="bottom-region" style="width:100%;">
            <mt-datetime-picker v-model="dateValue" type="date" ref="datePicker" year-format="{value} 年" month-format="{value} 月"
                                :startDate="startDate"
                                :endDate="new Date()"
                                @confirm="handleConfirm">
            </mt-datetime-picker>
        </mt-popup>
    </div>
</template>

<script>
    import EmptyList from "@/components/EmptyList";
    import CircleLoading from "@/icons/CircleLoading";
    export default {
        name: "expenditure",
        components: {CircleLoading, EmptyList},
        data() {
            return {
                regionVisible: false,
                dateValue:null,
                year:(new Date()).getFullYear(),
                month:(new Date()).getMonth()+1,
                startDate:new Date('2018-01'),
                popupVisible:false,
                loading:false,
                activeType:0,
                totalIncome:0.00,
                totalExpenditure:0.00,
                entities:[]
            }
        },
        computed:{
            userId(){
                return this.$store.state.CURRENTUSER.data.userInfo.id;
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
                this.$http.get('',{params}).then(response => {
                    this.totalIncome = response.data.income;
                    this.totalExpenditure = response.data.expenditure;
                    this.entities = response.data.items;
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .otc-box {
        margin-bottom: .18rem;
        padding: 0 .2rem;
        padding-right: .4rem;
        border-right: 1px dashed #fff;
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
    .list-title {
        display: flex;
        background: #F5F5F5;
        justify-content: space-between;
        padding: .1rem .2rem;
        align-items: center;
        .left {
            p{
                &:nth-child(1){
                    font-size:.28rem;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                }
                &:nth-child(2){
                    font-size:.24rem;
                    font-weight:500;
                    color:rgba(153,153,153,1);
                }
            }
        }
        svg {
            width: .38rem;
            height: .38rem;
        }
    }
</style>