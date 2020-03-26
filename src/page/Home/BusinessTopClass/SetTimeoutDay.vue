<template>
  <div class="setTimeOutBox">
      <!-- <img src="@/images/setTimeout.png" alt=""> -->
      <div class="showTime">
          <!-- <div></div> -->
          <div :class="{zeroDay:!substrDay}">
            <span v-if="substrDay">
                {{this.substrDay}}天
            </span>

            <span>
                {{hourse | fillterTime}}时
            </span>
            <!-- <i>:</i> -->
            <span>
                {{minute | fillterTime}}分
            </span>
            <!-- <i>:</i> -->
            <span>
                {{second | fillterTime}}秒
            </span>
          </div>
            
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            nowTime: new Date().getTime(),
            nextWeekFirstDay: null,
            substrDay: 0,
            hourse: 0,
            munute: 0,
            second: 0,
            intv: null
        }
    },
    filters: {
        fillterTime(val) {
            if(val < 10) {
                return `0${val}`
            } else {
                return val
            }
        }
    },
    methods: {
        initTime() {
            this.nextWeekFirstDay = this.$moment().day();
            // debugger
            this.hourse = 23 - this.$moment().hour();
            this.minute = 60- this.$moment().minute();
            this.second = 60 -this.$moment().second();
            // this.substrDay = this.nextWeekFirstDay==1?0 : 8 - this.nextWeekFirstDay;
            switch(this.nextWeekFirstDay) {
                case 0 :
                    this.substrDay = 1;
                    break;
                case 1 :
                    this.substrDay = 0;
                    break;
                default :
                    this.substrDay = 8 - this.nextWeekFirstDay;
                    break;
            }
        }
    },
    created () {
        this.initTime();
        this.intv = setInterval(()=>{
            this.initTime();
        }, 1000);
    },
    beforeDestroy () {
        if(this.intv) {
            clearInterval(this.intv);
        }
    }
}
</script>

<style lang="scss" scoped>
.setTimeOutBox {
    padding:.2rem;
    img {
        width: 100%;
    }
    .showTime {
        height: 1.2rem;
        display: flex;
            align-items: flex-end;
        background: url('../../../images/setTimeout.png') no-repeat;
        background-size: 100% 100%;
        div {
            margin-left: 1.2rem;
            display: flex;
            align-items: center;
            height: .4rem;
            margin-bottom: .1rem;
        }
        .zeroDay {
            margin-left: 1.52rem;
        }
        span {
            background: #FF4A00;
            border-radius: 0.06rem;;
            display: block;
            color: #fff;
            font-size: .28rem;
            font-weight:bold;
            padding: 0 0.06rem;
        }
        span:not(:first-child) {
            
            margin-left: .08rem;
        }
        i {
            margin-left: .08rem;
            font-size: .28rem;
            font-weight: bold;
            color: #FF4A00;
        }
    }
}
</style>