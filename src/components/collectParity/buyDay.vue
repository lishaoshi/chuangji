<template>
    <div class="buyDay">
        <section>
            <svg>
                <use xlink:href="#icon-collect-countdown"/>
            </svg>    
            <span class="title">
                {{title || "限时集采"}}
            </span>
        </section>
        
        <div>
            <p>
                距本月活动结束
            </p>
            <p>
                <span v-if="day">
                    {{day}}天
                </span>{{house | handleNum}}小时{{minutes | handleNum}}分{{seconds | handleNum}}秒
            </p>
            
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            remaningTime: new Date().getTime(),
            willTime: 0,
            day: 0,
            house: 0,
            minutes: 0,
            seconds: 0,
            t1: 0, //两个时间差（毫秒数）
            timing: null
        }
    },
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    filters: {
        handleNum(val) {
            if(val<10) {
                return `0${val}`
            }
            return val

        }

    },
    mounted() {
        this.initTime()
        this.setTiming()
    },
    methods: {
        initTime() {
            let nowTime = this.$moment()
            let allSeconds = nowTime.get('seconds')
            let nowDay = this.$moment(this.remaningTime).get('date');
            if(nowDay <= 12) {
                let nowMonth = this.$moment(this.remaningTime).month()+1;
                let nowYeary = this.$moment(this.remaningTime).year();
                let nextDate = this.$moment(`${nowYeary}-${nowMonth}-12 23:59:59`)
                this.t1 = Math.floor(nextDate.diff(nowTime)/1000)
                this.day = Math.floor(this.t1/(60*60*24))
                this.house = Math.floor(this.t1/(60*60)%24)
                this.minutes = Math.floor(this.t1/(60)%60)
                this.seconds = Math.floor(this.t1%60)
            } else {
                let nowMonth = this.$moment(this.remaningTime).month()+1;
                let nowYeary = this.$moment(this.remaningTime).year();
                let nextDate
                if(nowMonth == 12) {
                    nowYeary++
                    nowMonth = `0${nowMonth}`
                    nextDate = this.$moment(`${nowYeary}-01-12 23:59:59`)
                } else if(nowMonth < 10) {
                    nowMonth = `0${nowMonth+1}`
                    nextDate = this.$moment(`${nowYeary}-${nowMonth}-12 23:59:59`)
                }
                this.t1 = Math.floor(nextDate.diff(nowTime)/1000)
                
                this.day = Math.floor(this.t1/(60*60*24))
                this.house = Math.floor(this.t1/(60*60)%24)
                this.minutes = Math.floor(this.t1/(60)%60)
                this.seconds = Math.floor(this.t1%60)
            }
        },
        setTiming() {
            this.timing = setInterval(()=>{
                this.initTime()
            },1000)
        }
    },
    // watch: {
    //     t1() {
    //         this.initTime()
    //     }
    // },
    destroyed() {
        if(this.timing) {
            clearInterval( this.timing)
        }
    }
}
</script>

<style lang="scss" scoped>
.buyDay {
    height: 1rem;
    display: inline-flex;
    align-items: center;
    margin: .2rem;
    background: #fff;
    border-radius:10px;
    padding: 0 .2rem;
    justify-content: space-between;
    // width: 100%;
    section {
        display: flex;
        align-items: center;
    }
    .title {
        font-size: .32rem;
        font-weight: bold;
        color: #EB8949;
    }
    div {
        // flex: 1;
        // text-align: right;
        display: inline-flex;
        // border-radius:10px;
        align-items: center;
        height: .4rem;
        border-radius:4px;
         border: 1px solid #FF3B30;
        p:first-child {
            color: #fff;
            background: #FF3B30;
            padding: .06rem;
            font-size: .2rem;
            height: 100%;
            display: flex;
            align-items: center;
            // border: 1px solid #FF3B30;
            // border-top-left-radius:4px;
            // border-bottom-left-radius:4px;
            // border-radius:10px;
        }
        p:last-child {
            color: #FF3B30;
            padding: .06rem;
            height: 100%;
            display: flex;
            align-items: center;
            min-width: 2.36rem;
            justify-content: center;
            // border: 1px solid #FF3B30;
            // border-top-right-radius:4px;
            // border-bottom-right-radius:4px;

        }
    }
    svg {
        width: .4rem;
        height: .4rem;
        margin-right: .3rem;
    }
}
</style>