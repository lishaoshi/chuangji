<template>
  <div class="container">
       <clxsd-head-top title='定制生产'></clxsd-head-top>
       <load-more ref="loadMoreBox" :loadBottom="loadBottom" :allLoaded="allLoaded" v-if="list.length">
            <list v-for="(item, index) of list" :key="index" :data="item" :showBrand="false">
                <template slot="factoryCustom">
                    <section class="price-box">
                        <div class="min-price">
                            <span>定制价(元/{{item.group_buying.unit}})</span>
                            <span>{{item.group.customized_price}}</span>
                        </div>
                        <div>
                            <span>返利率</span>
                            <span>{{item.rates}}%
                            </span>
                        </div>
                        <div class="min-price">
                            <span>总订件数({{item.group_buying.big_unit}})</span>
                            <span>{{item.group.total}}</span>
                        </div>
                         <div class="min-price">
                            <span>我的订件数({{item.group_buying.big_unit}})</span>
                            <span>{{item.num}}</span>
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
import { getMyCustomList } from "@/api/factory"
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
            total: 0,
            limit: 10
        }
    },
    created() {
        this.inttData()
    },
    methods: {
        inttData() {
            let params = {
                page: this.page,
                limit: 10
            }
            Promise.all([getMyCustomList(params)]).then(res=>{
                let list = res[0].data || []
                this.list = this.handleData(list)
                if(!this.list || this.list.length < this.limit) {
                    this.allLoaded = true
                }
                
            })
        },
        /**
         * 处理数据
         */
        handleData(data) {
            let ruleList = []
            data.forEach((item, index, arr)=>{
                arr[index].group_buying = item.group;
                ruleList = item.group.rules.filter(rule=>{
                    return item.group.total > rule.num
                })
                arr[index].rates = ruleList[ruleList.length-1]&&ruleList[ruleList.length-1].profit || 0
            })
            return data
        },
        _getActivityJicaiList(type) {
            this.page++
            let params = {
                page: this.page,
                limit: 10
            }
            getMyCustomList(params).then(res=>{
                let list = this.list.concat(res.data.list.data)
                this.list = this.handleData(list)
                type=='bottom'&& this.$refs.loadMoreBox.$refs.loadmore.onBottomLoaded()
               if(!this.list || this.list.length < this.limit) {
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