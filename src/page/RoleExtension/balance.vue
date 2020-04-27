<template>
    <div class="balance">
        <div>
            <span class="title">余额(元)</span>
            <div>
                <i-count-up
                    :startVal="0"
                    :endVal="balance"
                    :decimals="0"
                    :duration="23"
                    :options="options"
                ></i-count-up>
            </div>
        </div>
        <div class="line"></div>
        <div>
            <span class="title">{{rightTitle}}</span>
            <div>
                <i-count-up
                    v-if="!isPro"
                    :startVal="0"
                    :endVal="todayIncome"
                    :decimals="0"
                    :duration="23"
                    :options="options"
                ></i-count-up>
                <span v-else>{{this.USER_INFO.areaType=="promoter"?todayIncome:count}}</span>
            </div>
        </div>
        
    </div>
</template>

<script>
import ICountUp from '@/components/countUp';
import { mapState } from "vuex";
export default {
    props: ['balance', 'todayIncome', 'count'],
    components: {
        ICountUp
    },
    computed: {
        ...mapState({
            USER_INFO:state=>{
                return {
                    userType: state.CURRENTUSER.data.user_type,
                    areaType: state.CURRENTUSER.data.area_user&&state.CURRENTUSER.data.area_user.apply_role,
                }
            }
        }),
          rightTitle() {
            if(this.USER_INFO.userType==2) {
                return "今日收益(元)"
            }
            
            var titleObj = {
                "promoter": "用户(家)",
                "find_medicine": "厂商(家)",
                "province_company": "今日收益(元)",
                "city_company": "今日收益(元)"
            }
            return titleObj[this.USER_INFO.areaType]
        }
    },
    data() {
        return {
            options: {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: '',
                decimalPlaces: 2
            },
            // rightTitle: '',
            isPro: false  //是否是推广
        }
    },
    created() {
        // console.log( this.USER_INFO.userType)
        // debugger
        // this.rightTitle = this.USER_INFO.userType==2?'今日收益(元)':this.USER_INFO.areaType==null?"":this.USER_INFO.areaType=="promoter"?"用户(家)":"厂商(家)";
        this.isPro = this.rightTitle == '今日收益(元)'? false:true;
    },
}
</script>

<style lang="scss" scoped>
.balance {
  display: flex;
  align-items: center;
  color: #fff;
  height: 1rem;
  justify-content: space-between;
  background: rgba(45, 162, 255, 1);
  & > div {
      display: flex;
      font-size: .28rem;
     
      flex-direction: column;
      align-items: center;
      width: 50%;
      justify-content: cneter;
      .title {
        font-size: .24rem;
        opacity: 0.6;
      }
      & > div {
           font-weight: bold;
          margin-top: .1rem;
          font-size: .28rem;
      }
  }
  .line {
      background: #fff;
      height: 22px;
      opacity: .6;
      width: 2px;
  }
  
}
</style>