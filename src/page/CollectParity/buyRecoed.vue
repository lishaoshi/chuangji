<template>
  <div class="container">
      <clxsd-head-top :title='`集采记录`'></clxsd-head-top>
      <!-- <span>集采记录</span>
       -->
      <load-more ref="loadMoreBox" :loadBottom="loadBottom" :allLoaded="allLoaded" v-if="list.length">
          <activite-list v-for="(item, index) of list" :key="index" :data="item"> 
            <!-- <div slot="header">
              <div>
                 <span>{{item.num}}{{item.group.big_unit}}</span>
                <span>1{{item.group.big_unit}}={{item.group.tran}}{{item.group.unit}}</span>
              </div>
             
            </div> -->
            <div slot="bottom">
              <div class="changeInfo">
                <div>
                  <span>集采数量</span>
                  <span class="color">{{item.num}}{{item.group.big_unit}}</span>
              </div>
              <div>
                <span class="two">包装</span>
                <span>1{{item.group.big_unit}}={{item.group.tran}}{{item.group.unit}}</span>
              </div>
              </div>
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