<template>
  <div class="UnautMy">
    <div class="header">
      <span>我的</span>
    </div>
    <div class="container">
      <div class="userinfo">
        <div class="userinfo-left">
          <img :src="userInfo.avatar" v-if="userInfo.avatar!=null" />
          <!-- <img src="../../images/my/user_default.png" v-else /> -->
          <img src="data:image/png;base64,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" v-else />
          <div v-if="userInfo.area_type === 'promoter'">
              <img src="../../images/extension/promoter.png" class="tag"/>
          </div>
          <div v-if="userInfo.area_type === 'partner'">
              <img src="../../images/extension/partner.png" class="tag"/>
          </div>
        </div>
        <div class="userinfo-centre">
          <p class="name">
            {{userInfo.userName}}
          </p>
          <span class="phone">{{userInfo.userTel}}</span>
        </div>
          <router-link to="/invitation">
            <div class="userinfo-right">
              <svg>
                <use xlink:href="#icon-QRCode" />
              </svg>
              <span>邀请</span>
            </div>
          </router-link>
      </div>
      <div style="width: 100%;height: 1px;background: #2da2ff;opacity: 0.7;"></div>
      <div class="balance">
        <div>
          <span>余额(元)</span>
        </div>
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
      <div class="becomePartner" v-if="(userInfo.area_type&&userInfo.area_type!=='partner') || !is_apply">
        <img src="../../images/becomePartnr3.jpg" alt="" @click="queryPartnerInfo" />
      </div>
      <div class="my-list">
        <div style="margin-top: .2rem" v-if="!is_apply">
          <clxsd-cell title="角色选择" to="/customer-choose-role" is-link icon="my-collection" />
        </div>
        <div style="margin-top: .2rem">
          <clxsd-cell title="我的邀请" :to="'/record'" is-link icon="wode-wodeyaoqing" />
        </div>
        
        <div style="margin-top: .2rem">
          <clxsd-cell title="通道收益" :to="'/channel-profit'" is-link icon="promoter_pass" />
          <clxsd-cell :title="'合伙收益'" v-if="userInfo.area_type=='partner'" :to="'/cooperation-profit'" :value="userInfo.lianPiaoVaule" is-link icon="my-banknote"/>
          <!-- <clxsd-cell title="广告收益" :to="'/develop'" is-link icon="promoter_ad" /> -->
        </div>
        <div style="margin-top: .2rem">
          <clxsd-cell title="消息通知" :to="'/new-message/promoter'" is-link icon="my-message">
            <template v-if="messageCount > 0">
              <message-count :count="messageCount"></message-count>
            </template>
          </clxsd-cell>
        </div>
        <router-link to="/my" style="color:#333;">
          <div class="back" style="margin-top: .2rem">
            <span>返回</span>
          </div>
        </router-link>
      </div>
    </div>

      
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import ClxsdCell from "@/components/common/Cell";
import messageCount from '@/components/promote/messageCount'
import ICountUp from '@/components/countUp'
import { getMessageCount } from "@/api/newMessage.js";
export default {
  name: "MyExtension",
  components: {
    ClxsdCell,
    ICountUp,
    messageCount
  },
  props: {
    balance: {
      type: Number,
      default: 0
    }
  },
  data(){
    return{
      is_apply:true,
      options: {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: '',
          decimalPlaces: 2
      },
      messageCount: 0
    }
  },
  computed: {
    ...mapState({
      userInfo: state => {
        const currentInfo = state.CURRENTUSER.data;
        return {
          userName:
            currentInfo.display_name ||
            currentInfo.real_name ||
            currentInfo.phone ||
            "丢失信息",
          userTel: currentInfo.phone || "丢失信息",
          companyName: currentInfo.shop_supplier&&currentInfo.shop_supplier.display_name,
          //role: currentInfo
          user_type: currentInfo.user_type,
          sub_type: currentInfo.sub_type,
          state: currentInfo.status,
          avatar: currentInfo.avatar,
          area_type: currentInfo.area_user&&currentInfo.area_user.apply_role
        };
      }
    }),
    canShou() {
      const userInfo = this.userInfo;
      return (
        userInfo.state === 1 &&
        (userInfo.sub_type === 1 ||
          userInfo.sub_type === 2 ||
          userInfo.sub_type === 3)
      );
    },
     
  },
  created(){
    this.initData()
  },
  methods:{
    ...mapMutations(['changApplyPromote']),
    initData(){
       this.$http.get('hippo-shop/area-user/is-apply')
        .then(response => {
            this.is_apply = response.data.data.is_apply;
            this.$lstore.setData('is_apply', response.data.data.is_apply)
            this.changApplyPromote(response.data.data.is_apply)
        }).catch(err => {

        })
       getMessageCount({type:'promoter'}).then(res=>{
          this.messageCount = res.data.total
      })
     
    },
     /**
       * 查看集采商简介
       */
      queryPartnerInfo() {
          this.$router.push('/partnerInfo')
      }
  }

};
</script>

<style lang="scss" scoped>
.UnautMy {
  background: #f4f5f5;
  font-size: 0.34rem;
  display: flex;
  flex-direction: column;
  
  height: 100%;
  padding-bottom: 1.1rem;
   .header {
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
    background: rgba(45, 162, 255, 1);

    span {
      width: 1.09rem;
      height: 0.35rem;
      font-size: 0.37rem;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.becomePartner {
  padding: .2rem .3rem 0;
  img {
    width: 100%;
  }
}
.balance {
  display: flex;
  align-items: center;
  color: #fff;
  height: 1rem;
  justify-content: space-between;
  padding: 0 .44rem;
  background: rgba(45, 162, 255, 1);
  div:first-child {
    font-size: .24rem;
  }
  div:last-child {
    font-size: .44rem;
  }
}
.back {
  background: #fff;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
}
.container {
  // 
 flex: 1;
 overflow: auto;
  .userinfo {
    display: flex;
    height: 1.7rem;
    background: rgba(45, 162, 255, 1);
    .userinfo-left {
      margin-left: 0.36rem;
      margin-right: 0.32rem;
      width: 1.28rem;
      height: 1.28rem;
      background: rgba(255, 255, 255, 1);
      padding: 0.04rem;
      border-radius: 0.06rem;
      opacity: 0.9;
      img {
        display: block;
        width: 1.2rem;
        height: 1.2rem;
      }
      .tag {
        width: 0.3rem;
        height: 0.3rem;
        float: right;
        margin-top: -0.2rem;
        z-index: 99;
        position: relative;
      }
    }

    .userinfo-centre {
      flex-grow: 1;
      .name {
        height: 0.32rem;
        line-height: 1;
        margin-top: 0.24rem;
        margin-bottom: 0.18rem;
        font-size: 0.34rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);

        small {
          color: #fff;
          font-weight: 200;
        }
      }

      .phone {
        width: 1.8rem;
        height: 0.22rem;
        font-size: 0.28rem;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
    .userinfo-right {
      margin-right: 0.44rem;
      font-size: 0.22rem;
      padding-top: 0.24rem;
      text-align: center;

      svg {
        width: 0.54rem;
        height: 0.54rem;
      }
      img {
        display: block;
        width: 0.54rem;
        height: 0.54rem;
        border: 0.01rem solid #000;
      }
      span {
        display: block;
        margin-top: 0.02rem;
        color: rgba(255, 255, 255, 1);
        font-size: 0.22rem;
        font-weight: 500;
      }
    }
  }
}
</style>


<style scoped>
    /deep/  .clxsd-cell-value {
        width: auto!important;
    }
</style>