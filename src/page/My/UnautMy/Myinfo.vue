<template>
  <div class="UnautMy">
    <div class="container">
      <div class="header">
        <span>未授权</span>
      </div>

      <div class="userinfo">
        <div class="userinfo-left">
          <img src="../../../images/my/user_default.png" alt />
        </div>

        <div class="province-logo">
          <img src="../../../images/my/province.png" />
        </div>
        <div class="userinfo-centre">
          <p class="name">
            张无忌
            <small>(0168)</small>
          </p>
          <span class="phone">111111111111</span>
        </div>
        <div class="userinfo-right">
          <svg>
            <use xlink:href="#icon-QRCode" />
          </svg>
          <span>邀请</span>
        </div>
      </div>

      <div></div>
    </div>

    <ul class="unautMy-userlist">
      <div style="margin-bottom:.2rem">
        <clxsd-cell :title="'角色选择'" :to="'/customer-choose-role'" is-link icon="my-collection" />
      </div>
    </ul>
    <div style="margin-bottom:.2rem">
      <clxsd-cell :title="'消息通知'" :to="'/develop'" is-link icon="my-message" />
      <clxsd-cell :title="'个人信息'" :to="'/business-setting'" is-link icon="my-employee" />
    </div>
    <clxsd-cell :title="'设置'" :to="'/setting'" is-link icon="my-setting" />

    <clxsd-foot-guide :user-type="4" />
  </div>
</template>

<script>
import ClxsdCell from "@/components/common/Cell";
export default {
  name: "Myinfo",
  components: {
    ClxsdCell
  }
};
</script>

<style lang="scss" scoped>
.UnautMy {
  background: #f4f5f5;
  font-size: 0.34rem;
}
.container {
  position: relative;
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
  .province-logo {
    position: absolute;
    bottom: 0.26rem;
    left: 1.33rem;
    img {
      width: 0.28rem;
      height: 0.3rem;
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