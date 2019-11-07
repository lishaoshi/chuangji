<template>
  <div class="download">
    <div class="header">
    </div>
    <div class="middle">
      <div class="left">
        <div class="left-content">
          <img class="textTile" :src="titel"/>
          <img class="line" src="../../images/download/line.png"/> 
        </div>
        <div>
          <img class="text" src="../../images/download/text.png"/>
        </div>
      </div>
      <div class="right"></div>
    </div>
    <div class="footer">
      <img src="../../images/download/footer.png">
    </div>
  </div>
</template>


<script>
export default {
  name: "download",
  data(){
    return{
      titel:`data:image/png;base64,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`
    }
  },
  mounted() {
    this.initPage()
  },
  methods: {
    // 初始化页面
    initPage() {
      var ua = navigator.userAgent;
        var isWeixin = !!/MicroMessenger/i.test(ua);
        if(!isWeixin){
            if (ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1) {//安卓系统
                window.location.href="https://clxsd-jicai-images.oss-cn-beijing.aliyuncs.com/app/app.apk";
            } else if (ua.indexOf('iPhone') > -1) {//ios系统
              alert('苹果APP上架中，请通过微信公众号底部登录移动系统');
              // window.location.href='https://itunes.apple.com/app/palringo-group-messenger-chat/id286274367?mt=8';
            }
        }
    }
  }
};
</script>


<style lang="scss" scoped>
.download {
  .header {
    height: 2.06rem;
  }
  .middle {
    .left-content {
      padding: 0 .49rem 0 1.39rem;
    }
    .left {
      text-align: center;
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      .line {
        width:1.23rem;
        height:2.47rem;
      }
      div {
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .textTile {
        margin-top: .35rem;
        margin-right: .27rem;
        width:3.62rem;
        height:1.20rem;
      }
      .text {
        height:.77rem;
        width:3.4rem;
      }
    }
   
  }
  .footer {
    img {
      width: 100%;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>