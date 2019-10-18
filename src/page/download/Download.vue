<template>
  <div class="download">
    <!-- 2 -->
    <div class="header">
      <svg class="bg">
        <use xlink:href="#icon-xiazaiyindaoye-dianzhui" />
      </svg>

      <div class="logo-container">
        <!-- <svg class="logo">
          <use xlink:href="#icon-loading" />
        </svg>-->
        <img class="logo" src="../../images/download/1080_1920.png" alt="logo" />
      </div>
    </div>

    <div class="middle">
      <h2>创联工厂</h2>
      <p>一切源于科技&nbsp;&nbsp;&nbsp;&nbsp;万物始于信任</p>
    </div>

    <div class="footer">
      <div class="footer-bg-container">
        <!-- icon-xiazaiyindaoye-beijing -->
        <svg class="footer-bg">
          <use xlink:href="#icon-xiazaiyindaoye-beijing" />
        </svg>

        <div class="download-iphone">
          <svg class="download-logo">
            <use xlink:href="#icon-xiazaiyindaoye-pingguo" />
          </svg>
          <span>iphone下载</span>
        </div>
        <div class="download-android">
          <svg class="download-logo">
            <use xlink:href="#icon-xiazaiyindaoye-anzhuo" />
          </svg>
          <span>android下载</span>
        </div>

        <div class="app-info">
          <p>医药人的APP</p>
          <p>让药业进入快速通道</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {};
</script>


<style lang="scss" scoped>
.download {
  // overflow: hidden;
  background-color: #fff;
  position: relative;
//   border: 0.01rem solid red;
  height: 100vh;
  padding-top: 1.42rem;
  .header {
    margin: 0 auto;
    width: 5.05rem;
    height: 4.57rem;
    position: relative;
    .bg {
      width: 5.46rem;
      height: 4.05rem;
    }
    .logo-container {
      width: 2.06rem;
      position: absolute;
      transform: translate(50%, -50%);
      top: 50%;
      right: 50%;
    }
    .logo {
      width: 2.06rem;
      height: 2.07rem;
    }
  }
  .middle {
    text-align: center;
    margin-top: 0.79rem;
    h2 {
      font-size: 0.42rem;
      font-family: KaiTi;
      font-weight: 400;
      color: rgba(77, 111, 255, 1);
      height: 0.36rem;
      line-height: 1;
    }
    p {
      height: 0.25rem;
      margin-top: 0.22rem;
      font-size: 0.28rem;
      font-family: KaiTi;
      font-weight: 400;
      line-height: 1;

      color: rgba(77, 111, 255, 1);
    }
  }
  .footer {
      overflow: hidden;
    margin-top: 0.67rem;
    // widows: 100%;
    position: absolute;
    bottom: 0;

    .footer-bg-container {
      height: 5.06rem;
      .footer-bg {
        width: 7.5rem;
        height: 5.07rem;
      }
      .download-iphone,
      .download-android {
        width: 2.52rem;
        height: 0.73rem;
        position: absolute;
        bottom: 2.35rem;
        line-height: 0.73rem;
        border: 0.02rem solid #fff;
        border-radius: 0.1rem;

        .download-logo {
          margin-left: 0.32rem;
          margin-right: 0.07rem;
          width: 0.42rem;
          height: 0.49rem;
          vertical-align: middle;
        }

        span {
          color: #fff;
          font-weight: 500;
          font-size: 0.24rem;
          vertical-align: middle;
        }
      }
      .download-iphone {
        margin-left: 1.02rem;
      }
      .download-android {
        right: 1.04rem;
      }

      .app-info {
        width: 100%;
        color: #fff;
        font-weight: bold;
        font-size: 0.36rem;
        position: absolute;
        text-align: center;
        bottom: 0.91rem;
      }
    }
  }
}
</style>