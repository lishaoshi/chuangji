<template>
  <PullRefresh @refresh="refresh">
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
    <div class="main-body" ref="wrapper" style="height: auto">
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
        :autoFill="isAutoFill"
      >
        <CustomerCell v-for="(entity, index) in entities" :key="`en-${index}`" :data="entity"></CustomerCell>
      </mt-loadmore>
    </div>
    <!-- {{entities}} -->
    <p v-if="allLoaded" class="loader-over">加载完毕</p>
  </PullRefresh>
</template>

<script>
import CustomerCell from "@/components/modules/Extension/CustomerCell";
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
      allLoaded: false, //是否自动触发上拉函数
      isAutoFill: false,
      wrapperHeight: 0,
      courrentPage: 1,
      limit: 15
    };
  },
  mounted() {
    // 父控件要加上高度，否则会出现上拉不动的情况
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  },
  created() {
    this.getData();
    this.loadFrist();
  },
  methods: {
    getData(callback) {
      this.loading = true;

      this.$http
        .get("users/list", {
          params: { "user-type": "all" },
          validate: state => state === 200
        })
        .then(response => {
          this.loading = false;
          this.entities = response.data.data;
          if (callback) callback();
        })
        .catch(error => {
          this.loading = false;
          if (callback) callback();
        });
    },
    refresh(callback) {
      this.getData(callback);
    },
    loadTop() {
      this.courrentPage = 1;
      this.loadFrist();
    },
    // 上拉加载
    loadBottom() {
      this.loadMore();
    },
    // 下来刷新加载
    loadFrist() {
      const params = {
        page: this.courrentPage,
        limit: this.limit
      };
      this.$http
        .get("users/list", {
          params: { "user-type": "all" },
          validate: state => state === 200
        })
        .then(response => {
          console.log(response.data.data);
          this.allLoaded = true; // 可以进行上拉
          this.entities = response.data.data;  //此数据还没有
          this.$refs.loadmore.onTopLoaded();
        });
    },
    // 加载更多
    loadMore() {
      this.courrentPage++;
      const params = {
        page: this.courrentPage,
        limit: this.limit
      };
      this.$http
        .get("users/list", {
          params: { "user-type": "all" },
          validate: state => state === 200
        })
        .then(response => {
          // concat数组的追加
          this.entities = this.entities.concat(response.data.data.allEntities);
          if (this.courrentPage > 1) {
            this.allLoaded = true; // 若数据已全部获取完毕
          }

          this.$refs.loadmore.onBottomLoaded();
        });
    }
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