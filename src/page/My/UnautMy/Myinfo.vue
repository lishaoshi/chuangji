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
    </div>

    <ul class="unautMy-userlist">
      <li>
        <svg>
          <use xlink:href="#icon-my-collection" />
        </svg>
        角色选择
        <svg>
          <use xlink:href="#icon-cell-allow-right" />
        </svg>
      </li>
    </ul>

    <ul class="unautMy-infolist">
      <li>
        <svg>
          <use xlink:href="#icon-my-message" />
        </svg>
        消息通知
        <svg>
          <use xlink:href="#icon-cell-allow-right" />
        </svg>
      </li>
      <li class="line"></li>
      <li>
        <svg>
          <use xlink:href="#icon-my-employee" />
        </svg>
        个人信息
        <svg>
          <use xlink:href="#icon-cell-allow-right" />
        </svg>
      </li>
    </ul>

    <ul class="setting">
      <li>
        <svg>
          <use xlink:href="#icon-my-setting" />
        </svg>
        设置
        <svg>
          <use xlink:href="#icon-cell-allow-right" />
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
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
.unautMy-userlist,
.unautMy-infolist,
.setting {
  padding: 0 0.24rem 0 0.27rem;
  background-color: #fff;

  li {
    height: 1rem;
    line-height: 1rem;
    font-size: 0.34rem;
    color: #333;
    font-weight: 500;

    svg {
      vertical-align: middle;
      width: 0.46rem;
      height: 0.5rem;

      &:last-child {
        margin-top: 0.28rem;
        float: right;
      }
    }
  }
}
.unautMy-infolist {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;

  .line {
    height: 0.01rem;
    border-top: 0.01rem solid #ccc;
  }
}
</style>