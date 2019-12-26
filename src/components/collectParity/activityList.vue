<template>
  <div class="activityList">
      <!-- <div class="shopInfo">
          <span>{{data.supplier_name}}</span>
          <span>{{data.created_at | handleTime}}</span>
      </div>
      <slot name="right">
          <div>
              <span>
                  {{data.supplier_price}}元/{{unit}}
              </span>
              <span>1{{big_unit}}={{tran}}{{unit}}</span>
          </div>
      </slot> -->
      <slot name="header">
           <div class="header">
                <span>{{data.supplier_name}}</span>
                <span>{{data.created_at | handleTime}}</span>
            </div>
      </slot>
      
      <slot name="bottom">
          <section class="changeInfo">
            <div >
                <span>
                    变动价格
                </span>
                <span class="color">
                   {{data.supplier_price}}元/{{unit}}
                </span>
            </div>
             <div>
                <span class="two">
                    包装
                </span>
                <span>
                    1{{big_unit}}={{tran}}{{unit}}
                </span>
            </div>
             <div>
                <span>
                    保证金额
                </span>
                <span>
                   {{data.margin_money}}包
                </span>
            </div>
        </section>
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
    computed: {
        big_unit() {
            return this.data.group_buying&&this.data.group_buying.big_unit || this.data.group&&this.data.group.big_unit
        },
        tran() {
            return this.data.group_buying&&this.data.group_buying.tran || this.data.group&&this.data.group.tran
        },
        unit() {
            return this.data.group_buying&&this.data.group_buying.unit || this.data.group&&this.data.group.unit
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
            return `${y}.${m}.${d} ${h}:${ms}:${ss}`
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    height: .8rem;
    justify-content: space-between;
    padding: 0 .2rem;
    align-items: center;
    color: #333;
    border-bottom: 1px solid #f0f0f0;
    span:first-child {
        width: 65%;
        overflow: hidden;
        text-overflow:ellipsis; //用省略号显示
        white-space:nowrap; //不换行
        font-size: .28rem;
        
    }
    span:last-child {
        font-size: .24rem;
    }
    
}
.activityList {
    display: flex;
    flex-direction: column;
    background: #fff;
    margin: .2rem .2rem 0;
    border-radius: 10px;
    .changeInfo {
        padding: .2rem 0;
        div {
            display: flex;
            justify-content: space-between;
            padding: 0 .2rem;
            line-height: .6rem;
            font-size: .28rem;
            .two {
                letter-spacing: 2em;
            }
            .color {
                color: #FA5452;
            }
            span:last-child {
                font-weight: bold;
            }
        }
    }
//     background: #fff;
//     display: flex;
//     &:not(:first-child) {
//         border-top: 1px solid #f0f0f0;
//     }
//    .shopInfo {
//        display: flex;
//        flex-direction: column;
//        span:last-child {
//            font-size: .24rem;
//            color: #999;
//            margin-top: .06rem;
//        }
//    }
//    div:first-child {
//         font-size: .28rem;
//         color: #333;
//    }
//     div:last-child {
//         font-size: .34rem;
//         color: #333;
//         display: inline-flex;
//         flex-direction: column;
//         justify-content: center;
//         text-align: right;
//         height: 100%;
//         line-height: .48rem;
//         span:last-child {
//             font-size: .24rem;
//             color: #999;
//         }
//    }
}
</style>