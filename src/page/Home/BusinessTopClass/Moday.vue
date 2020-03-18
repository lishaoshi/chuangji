<template>
  <div class="moday">
      <div class="listItem" v-for="(item, index) of list" :key="index">
          <router-link :to="`/factory/shop/${item.supplier.id}`">
          <div class="compName" @click="goFactoryInfo">
              <img src="@/images/pic_default_man.png" alt="">
              <p>{{item.supplier.name}} </p>
              <!-- <div></div> -->
                <svg>
                    <use xlink:href="#icon-factory_enter"/>
                </svg>
          </div>
          </router-link>
          <div class="center">
              <img :src="item.product.cover" alt="">
              <div>
                  <section>
                        <p>{{item.product.generic_name}}</p>
                        <p v-if="item.product.limit_type==1">产期: {{item.product.valid_time | filterValidTime}}</p> 
                        <p v-else>产期: {{item.product.production_date | filterValidTime}}</p>
                        <p>规格: {{item.product.spec}}</p>
                        <p>包装: {{item.product.tran}}{{item.product.unit}}/{{item.product.big_unit}}</p>
                        <p v-if="item.product.limit_type==2">效期: {{item.product.duration}}年</p>
                  </section>

                  <section class="price">
                      <span>￥{{item.product.price}}/{{item.product.unit}}</span>
                      <ShopCart :item="item" :index="index"/>
                  </section>
              </div>
          </div>
          <div class="iconBox">
              <div class="item" v-for="(items, index) of item.group_promote" :key="index">
                    <div>
                        {{items.promotion_type=="give"?"赠":"返"}}
                    </div>
                    <p>
                      满{{items.enough_num}}{{item.product.big_unit}}，获赠品"{{items.give_name}}"{{items.give_num}}个
                    </p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import ShopCart from "./shopCart";
import moment from "moment";
export default {
    props: [
        'list'
    ],
    components: {
        ShopCart
    },
    filters: {
      filterValidTime(val) {
          var tiem = moment.unix(val);
          let year = tiem.year();
          let month = tiem.month()+1;
          let day = tiem.date();
          return `${year}/${month}/${day}`;
      }  
    },
    methods: {
        goFactoryInfo() {
            // console.log(123)
            this.$router.push();
        }
    }

}
</script>

<style lang='scss' scoped>
.moday {
    padding: 0 .2rem;
    margin-bottom: 30px;
    .listItem {
        background: #fff;
        border-radius: 20px;
        /* margin-top: .2rem; */
    }
    .listItem:not(:nth-of-type(1)) {
        margin-top: .2rem;;
    }
    .compName {
        display: flex;
        align-items: center;
        height: 1rem;
        font-size: .32rem;
        font-weight: bold;
        color: #333;
        padding: 0 .26rem;
        border-bottom: 1px solid #EBEBEB;
        img {
            width: .52rem;
            height: .52rem;
            margin-right: .2rem;
        }
        svg {
            width: .4rem;
            height: .3rem;
            margin-left: .1rem;
        }
    } 
    .center {
        display: flex;
        margin: .1rem;
        padding-bottom: .1rem;
        border-bottom: 1px solid #EBEBEB;
        img {
            width: 2.6rem;
            height: 2.6rem;
            margin-right: .2rem;
        }
        & > div {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            justify-content: space-between;
        }
        p:first-child {
            font-size: .32rem;
            width: 100%;
            font-weight: bold;
            margin-top: .2rem;
            color: #333;
            margin-bottom: .08rem;
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //用省略号显示
            white-space:nowrap; //不换行
        }
        p {
            font-size: .26rem;
            font-weight: bold;
            color: #666;
        }
        .price {
            /* margin-top: .16rem; */
            color: #FF3B30;
            font-weight: bold;
            font-size: .28rem;
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: space-between;
            padding-right: 20px;
            /* align-self: flex-end; */
        }
    }
    .iconBox {
        padding: .2rem;
       .item:nth-child(even) {
           div {
               background: #ff7612;
           }
       }
        .item {
            display: flex;
            &:not(:first-child) {
                margin-top: .16rem;
            }
            
            div {
                background: #FA5452;
                color: #fff;
                font-size: .24rem;
                padding: 0rem .04rem;
                border-radius: 4px;
                margin-right: .08rem;
            }
        }
    }

}
</style>