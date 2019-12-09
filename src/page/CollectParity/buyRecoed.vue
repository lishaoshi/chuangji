<template>
  <div class="container">
      <clxsd-head-top :title='`集采记录`'></clxsd-head-top>
      <!-- <span>集采记录</span>
       -->
      <load-more ref="loadMoreBox" :loadBottom="loadBottom" :allLoaded="allLoaded" v-if="list.length">
          <activite-list v-for="(item, index) of list" :key="index" :data="item"> 
            <div slot="right">
              <span>{{item.num}}{{item.group.unit}}</span>
            </div>
          </activite-list>
      </load-more>
      <EmptyList v-else/>
      
  </div>
</template>

<script>
import activiteList from '@/components/collectParity/activityList'
import { getRecoedActivityList } from "@/api/collectPrarity"
import loadMore from '@/components/common/loadMore';
import EmptyList from "@/components/EmptyList"
export default {
  components: {
    activiteList,
    loadMore,
    EmptyList
  },
  data() {
    return {
      list: [],
      id: this.$route.params.id,
      allLoaded: false,
      page: 1
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
      Promise.all([getRecoedActivityList(params)]).then(res=>{
        this.list = this.list.concat(res[0].data.list)
        if(!this.list || !this.list.length) {
          this.allLoaded = true
        }
      })
    },
    _getRecoedActivityList(type) {
       let params = {
        page: this.page,
        group_id: this.id
      }
      getRecoedActivityList(params).then(res=>{
        this.list = this.list.concat(res.data.list)
        type=='bottom'&& this.$refs.loadMoreBox.$refs.loadmore.onBottomLoaded()
        if(!res.data.list || !res.data.list.length) {
          this.allLoaded = true
        }
      })
    },
    loadBottom() {
      this.page++
      this._getRecoedActivityList('bottom')
    }
  }

}
</script>

<style>

</style>