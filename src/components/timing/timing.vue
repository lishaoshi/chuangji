<template>
  <span>{{text}}</span>
</template>

<script>
export default {
    data() {
        return {
            dateType: [],
            date: this.$props.time,
            timing: null,
            text: ''
        }
    },
    props: {
        time: {
            type: Number,
            required: true,
            default: 0
        }
    },
    methods: {
        initData() {
            if(this.date <= 0) {
                return false
            }
            let hours = 0
            //获取分钟Math.floor(item.diff_seconds/60)
            let minutes = Math.floor(this.date / 60)
            if(minutes > 60) {
                //获取小时
                hours = Math.floor(minutes / 60)
                minutes = Math.floor(minutes%60 )
            }
            //获取剩余的秒数
            let seconds = Math.ceil(this.date % 60)
            this.dateType = [hours, minutes, seconds]
            
        },
        getTime() {
            this.timing = setInterval(()=>{
                this.date--
                this.initData()
            }, 1000)
        }
    },
    destroyed() {
        if(this.timing!=null) {
            clearInterval(this.timing)
        }
    },
    watch: {
        date(newValue, oldValue) {
            if(oldValue<=0) {
                clearInterval(this.timing)
                this.$emit('timeout')
            }
        },
        dateType: {
            handler(value) {
                if (!value.length) return '';
                let result = '';
                // 时
                if(value[0] > 0 && value[0]>=10) {
                    result = `${value[0]}时`
                } else if(value[0] > 0 && value[0] < 10) {
                    result = `0${value[0]}时`
                }
                // 分
                if (value[1] < 10 && value[1] > 0) {
                    result = `${result}0${value[1]}分`;
                } else if(value[1] >= 10 && value[1] > 0) {
                    result = `${result}${value[1]}分`;
                } else if(value[1]==0) {
                    result = `${result}00分`;
                }

                // 秒
                if (value[2] < 10 && value[2] > 0) {
                    result = `${result}0${value[2]}秒`;
                } else if(value[2] >= 10 && value[2] > 0) {
                    result = `${result}${value[2]}秒`;
                } else if(value[2] == 0) {
                    result = `${result}00秒`;
                }
                this.text = result
            },
            deep: true
        }
    },
    mounted() {
        this.initData()
        this.getTime()
    }
}
</script>

<style>

</style>