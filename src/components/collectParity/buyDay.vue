<template>
    <div class="buyDay">
        <svg>
            <use xlink:href="#icon-riqi" fill="#999"/>
        </svg>    
        <span>
           剩余: {{day}}天{{house}}小时{{minutes}}分{{seconds}}秒
        </span>
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
    filters: {
        setTime() {

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
            if(nowDay < 12) {
                let nowMonth = this.$moment(this.remaningTime).month()+1;
                let nowYeary = this.$moment(this.remaningTime).year();
                let nextDate = this.$moment(`${nowYeary}.${nowMonth}.12 23:59:59`)
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
                    nextDate = this.$moment(`${nowYeary}.${1}.12 23:59:59`)
                } else {
                    nextDate = this.$moment(`${nowYeary}.${nowMonth+1}.12 23:59:59`)
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
    height: .8rem;
    display: flex;
    align-items: center;
    padding: .32rem;
    svg {
        width: .34rem;
        height: .34rem;
        margin-right: .15rem;
    }
}
</style>