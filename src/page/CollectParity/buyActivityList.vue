<template>
    <div class="container">
        <clxsd-head-top :title='`集采活动`'></clxsd-head-top>
        <load-more ref="loadMoreBox" :loadBottom="loadBottom" :allLoaded="allLoaded" v-if="list.length">
            <list v-for="(item, index) of list" :key="index" :data="item"/>
        </load-more>
        <EmptyList v-else/>
    </div>
</template>

<script>
import list from '@/components/collectParity/buyActivityList'
import loadMore from '@/components/common/loadMore'
import { getActivityJicaiList } from "@/api/collectPrarity"
import EmptyList from "@/components/EmptyList"
export default {
    components: {
        list,
        loadMore,
        EmptyList
    },
    data() {
        return {
            allLoaded: false,
            page: 1,
            list: [],
            total: 0
        }
    },
    created() {
        this.inttData()
    },
    methods: {
        inttData() {
            let params = {
                page: this.page
            }
            Promise.all([getActivityJicaiList(params)]).then(res=>{
                this.list = res[0].data.list.data
                this.total = res[0].data.list.total
                if(!this.list || this.list.length == this.total) {
                    this.allLoaded = true
                }
                
            })
        },
        _getActivityJicaiList(type) {
            this.page++
            let params = {
                page: this.page
            }
            getActivityJicaiList(params).then(res=>{
                this.list = this.list.concat(res.data.list.data)
                this.total = res.data.list.total
                type=='bottom'&& this.$refs.loadMoreBox.$refs.loadmore.onBottomLoaded()
                if(!this.list || this.list.length == this.total) {
                    this.allLoaded = true
                }
            })
        },
        loadBottom() {
            this._getActivityJicaiList('bottom')
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