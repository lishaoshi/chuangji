<template>
    <div class="roleExtension">
       <mt-loadmore
         :top-method="loadTop"
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          ref="loadmore"
          :autoFill="isAutoFill"
        >
        <Swiper space="tuiguang-all" />
        <!-- <Notice :entities="notices"></Notice> -->
        <div v-if="notices&&notices.length" class="noticesBox">
          <notice class="noticesBox-notices" :notices="notices"></notice>
        </div>

        <div class="notice" v-else>
            <svg>
                <use xlink:href="#icon-notice"/>
            </svg>
            <span style="padding-left: 5px">暂时没有消息</span>
        </div>
        <UnSureNav type="all"></UnSureNav>
        <CircleLoading v-if="loading" />
        <div class="main-body" v-if="entities.length" ref="wrapper" style="padding-bottom: .1rem;">
            <CustomerCell v-for="(entity, index) in entities" :isShow="true" :key="`en-${index}`" :index="index" :data="entity"></CustomerCell>
        </div>
        <!-- <p v-if="allLoaded" class="loader-over">加载完毕</p> -->
        <EmptyList v-else/>
      </mt-loadmore>
      
    </div>
</template>

<script>
import CustomerCell from "@/components/modules/Extension/userList";
import EmptyList from "@/components/EmptyList";
import CircleLoading from "@/icons/CircleLoading";
import UnSureNav from "./UnSureNav";
// import Notice from "@/components/modules/Extension/Notice"

import notice from "@/components/common/notice";

import Swiper from "@/components/common/Swiper";

export default {
  name: "AllCustomerComponent",
  props: {
    notices: {
      type: Array,
      default: ()=>{
          return [] 
      }
    }
  },
  components: {
    CircleLoading,
    EmptyList,
    CustomerCell,
    UnSureNav,
    notice,
    // Notice,
    Swiper
  },
  data() {
    return {
      entities: [],
      loading: false,
      // notices:[],
      allLoaded: false, 
      isAutoFill: false,//是否自动触发上拉函数
      wrapperHeight: 0,
      courrentPage: 1,
      limit: 20,
      page: 1
    };
  },
  mounted() {
    // 父控件要加上高度，否则会出现上拉不动的情况
    // this.wrapperHeight =
    //   document.documentElement.clientHeight -
    //   this.$refs.wrapper.getBoundingClientRect().top;
  },
  created() {
    this.getData();
    // this.loadFrist();
  },
  methods: {
    getData(first) {
      this._getData(first)
    },
    refresh(callback) {
      this.getData(callback);
    },
    // 上拉加载
    loadBottom() {
      this._getData(false, 'bottom')
    },

    /*
    封装获取全国推广员列表
    参数first表示是否是页面第一次加载
    */
    _getData(first=true, type) {
      // debugger
      this.loading = true;
      let params = {
        apply_role: '',
        apply_sub_role: '',
        limit: this.limit,
        page: this.page
      }

      this.$http.get("users/list", {params},
        {
          validate: state => state === 200
        }).then(response => {
          this.loading = false;
           if(!first&&type=="top") {
            this.$refs.loadmore.onTopLoaded()
          }
          if(!first&&type=="bottom") {
            this.$refs.loadmore.onBottomLoaded()
          }
          let list = response.data.data
          if(!list) {
            this.allLoaded = true
            // return false
          }
          if(!list ||　list && list.length<this.limit) {
            this.allLoaded = true
          }
          if(this.page>1) {
            this.entities = [...this.entities, ...list]
          } else {
            // debugger
            this.entities = list;
          }
         
          this.page++
        })
        .catch(error => {
          this.loading = false;
        });
       
    },
    loadTop() {
      this.allLoaded = false
      this.page = 1
      this._getData(false, 'top')
    },
  }
};
</script>

<style lang="scss" scoped>
    .main-body {
        /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
        overflow: scroll;
    }
    .noticesBox {
        margin:  .22rem auto 0;
        width:6.86rem;
        .noticesBox-notices {
            // background: red;
            height: .64rem;
            line-height: .64rem;
        }
    }
    .notice {
        margin:  .22rem auto 0;
        width:6.86rem;
        background: #f9f9f9;
        line-height: .56rem;
        display: flex;
        padding: 0 .24rem;
        align-items: center;
        height: .64rem;
        .notice-list {
          width: 6.2rem;
          height: .88rem;
          overflow-y: hidden;
          margin-left: .1rem;
          a {
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: .24rem;
            line-height: .64rem;
            color: #333;
          }
        } 
        svg {
          width: .38rem;
          height: .38rem;
        }
    }
</style>

<style lang="scss">
.noticesBox-notices {
  background:rgba(249,249,249,1) !important;
  height: .64rem;
  line-height: .64rem;
  border-radius:0.08rem;
  .scroll-wrap {
      height: .54rem !important;
      line-height: .54rem;
          .anim {
              margin-top: -.54rem;
              transition: linear .6s;
          }
  }
  ul,li,a {
      line-height: .54rem !important;
      width: 100%;
      height: .54rem !important;
  }
}
</style>