<template>
  <div class="activityList">
      <div class="shopInfo">
          <span>{{data.supplier_name}}</span>
          <span>{{data.created_at | handleTime}}</span>
      </div>
      <slot name="right">
          <div>
              <span>
                  {{data.supplier_price}}元
              </span>
          </div>
      </slot>
  </div>
</template>

<script>
export default {
    data() {
        return {
            shopName: '****集采商',
            date: '2018.10.9 15:06:06'
        }
    },
    props: {
        data: {
            type: Object,
            default:()=>{}
        }
    },
    filters: {
        　handleTime(val) {
            let date = new Date(val*1000)
            let y = date.getFullYear()
            let m = date.getMonth()+1
            let d =  date.getDate()
            let h = date.getHours()
            let ms = date.getMinutes()
            let ss = date.getSeconds()
            return `${y}.${m}.${d} ${h}:${ms}${ss}`
        }
    }
}
</script>

<style lang="scss" scoped>
.activityList {
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 .32rem;
    align-items: center;
    height: 1.4rem;
    &:not(:first-child) {
        border-top: 1px solid #f0f0f0;
    }
   .shopInfo {
       display: flex;
       flex-direction: column;
       span:last-child {
           font-size: .24rem;
           color: #999;
           margin-top: .06rem;
       }
   }
   div:first-child {
        font-size: .28rem;
        color: #333;
   }
    div:last-child {
        font-size: .34rem;
        color: #333;
   }
}
</style>