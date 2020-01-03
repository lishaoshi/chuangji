<template>
  <div class="container">
       <clxsd-head-top title='定制生产'></clxsd-head-top>
       <load-more ref="loadMoreBox" :loadBottom="loadBottom" :allLoaded="allLoaded" v-if="list.length">
            <list v-for="(item, index) of list" :key="index" :data="item" :showBrand="false">
                <template slot="factoryCustom">
                    <section class="price-box">
                        <div class="min-price">
                            <span>最低价(元/{{item.group_buying.unit}})</span>
                            <span>{{item.group_buying.latest_price}}</span>
                        </div>
                        <div>
                            <span>已集采({{item.group_buying.big_unit}})  </span>
                            <span>{{item.group_buying.total}}
                            </span>
                        </div>
                        <div class="min-price">
                            <span>总金额(元)</span>
                            <span>9999</span>
                        </div>
                    </section>
                </template>
              <template slot="foot">
                <noframes></noframes>
              </template>
            </list>
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
.price-box {
    display: flex;
    justify-content: space-around;
    margin-top: .4rem;
    padding-bottom: .2rem;
    div{
        display: flex;
        flex-direction: column;
        // margin-right: .2rem;
        span {
            text-align: center;
            &:first-child {
                font-size: .18rem;
                color: #999999;
            }
            &:last-child {
                font-size: .32rem;
                color: #FA5452;
                margin-top: .1rem;
                i {
                    font-size: .28rem;
                }
            }
        }
    }
}
</style>