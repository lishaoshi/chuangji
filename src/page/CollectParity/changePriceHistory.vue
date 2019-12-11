<template>
  <div class="container">
      <clxsd-head-top :title='`变价历史`'></clxsd-head-top>
      <load-more ref="loadMoreBox" :loadBottom="loadBottom" :allLoaded="allLoaded" v-if="list.length">
        <activite-list v-for="(item, index) of list" :key="index" :data="item">
          <!-- <div slot="right">
            <span>3件</span>
          </div> -->
        </activite-list>
      </load-more>

      <EmptyList v-else/>
  </div>
</template>

<script>
import activiteList from '@/components/collectParity/activityList';
import { getChangePriceList } from "@/api/collectPrarity";
import loadMore from '@/components/common/loadMore';
import EmptyList from "@/components/EmptyList";
export default {
  components: {
    activiteList,
    loadMore,
    EmptyList
  },
  data() {
    return {
      list: [],
      allLoaded: false,
      page: 1,
      id: this.$route.params.id,
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      let params = {
        page: this.page,
        group_id: this.id
      }
      Promise.all([getChangePriceList(params)]).then(res=>{
        if(res[0].data) {
          this.list = this.list.concat(res[0].data.list)
          if(!this.list || !this.list.length) {
            this.allLoaded = true
          }
        } else {
          this.allLoaded = true
        }
        
      })
    },
    _getChangePriceList(type) {
       let params = {
        page: this.page,
        group_id: this.id
      }
      getChangePriceList(params).then(res=>{
        this.list = this.list.concat(res.data.list)
        type=='bottom'&& this.$refs.loadMoreBox.$refs.loadmore.onBottomLoaded()
        if(!res.data.list || !res.data.list.length) {
          this.allLoaded = true
        }
      })
    },
    loadBottom() {
      this.page++
      this._getChangePriceList('bottom')
    }
  }

}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.loadMore {
    padding-bottom: 0;
}
</style>