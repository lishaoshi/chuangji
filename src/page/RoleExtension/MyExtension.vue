<template>
  <div class="UnautMy">
    <div class="container">
      <div class="header">
        <span>{{userInfo.companyName}}</span>
      </div>
      <div class="userinfo">
        <div class="userinfo-left">
          <img :src="userInfo.avatar" v-if="userInfo.avatar!=null" />
          <img src="../../images/my/user_default.png" v-else />
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
    </div>

    <div class="my-list">
      <div style="margin-bottom: .2rem" v-if="!is_apply">
        <clxsd-cell title="角色选择" to="/customer-choose-role" is-link icon="my-collection" />
      </div>
      <clxsd-cell title="消息通知" :to="'/develop'" is-link icon="my-message" />
      <clxsd-cell title="个人信息" :to="'/business-setting'" is-link icon="my-employee" />
      <div style="margin-top: .2rem;margin-bottom: .2rem">
        <clxsd-cell title="设置" :to="'/setting'" is-link icon="my-setting" />
      </div>
      <clxsd-cell title="返回" :to="'/my'" is-link icon="my-setting" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ClxsdCell from "@/components/common/Cell";
export default {
  name: "MyExtension",
  components: {
    ClxsdCell
  },
  data(){
    return{
      is_apply:false
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
          companyName: currentInfo.shop_supplier.display_name,
          //role: currentInfo
          user_type: currentInfo.user_type,
          sub_type: currentInfo.sub_type,
          state: currentInfo.status,
          avatar: currentInfo.avatar
        };
      }
    }),
    canShou() {
      const userInfo = this.userInfo;
      console.log(userInfo);
      return (
        userInfo.state === 1 &&
        (userInfo.sub_type === 1 ||
          userInfo.sub_type === 2 ||
          userInfo.sub_type === 3)
      );
    }
  },
  created(){
    this.initData()
  },
  methods:{
    initData(){
    this.$http.get('hippo-shop/area-user/is-apply')
      .then(response => {
          console.log(response.data.data);
          if(response.data.data.is_apply){
            this.is_apply = response.data.data.is_apply
          }
      }).catch(err => {

      })
    }
  }

};
</script>

<style lang="scss" scoped>
.UnautMy {
  background: #f4f5f5;
  font-size: 0.34rem;
}
.container {
  background: rgba(45, 162, 255, 1);
  .header {
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;

    span {
      width: 1.09rem;
      height: 0.35rem;
      font-size: 0.37rem;
      color: rgba(255, 255, 255, 1);
    }
  }
  .userinfo {
    display: flex;
    height: 1.7rem;

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