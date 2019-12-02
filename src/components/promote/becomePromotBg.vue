<template>
  <div class="container">
      <slot name="main">
        <img src="../../images/becomePromote.png" alt="">
        <div>
            <p>您还不能享受通道收益</p>
            现在去
            <span @click="toRouter('/customer-choose-role?type=promoter')">申请推广人</span>，
            终端采购我受益
        </div>
      </slot>
      
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.container {
    img {
        width: 3.4rem;
        height: 2.26rem;
    }
    padding: 0 1rem;
    padding-top: 2.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
        margin-top: .5rem;
        span {
            color: #0090FF
        }
        text-align: center;
        line-height: .44rem;
        color: #666;
        font-size: .28rem;
    }
    .becomePromote {
        img {
            height: 2.76rem;
        }
    }
}
</style>