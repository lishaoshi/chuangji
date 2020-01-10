<template>
  <div class="container">
      <clxsd-head-top title="我的邀请"></clxsd-head-top>
      <div class="list_box" v-if="list.length">
          <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
              <div class="item" v-for="(item, index) of list" :key="index">
                  <img :src="item.supplier.img_cover" alt="" v-if="item.supplier.img_cover">
                  <default-logo :name="item.shortName" :bgColor="index" v-else/>
                  <div>
                      <span>{{item.supplier.display_name || item.supplier.name}}</span>
                  </div>
              </div>
          </mt-loadmore>
      </div>
       <EmptySupplier v-else/>
  </div>
  
</template>

<script>
import { _getFactoryList } from "@/api/business";
import defaultLogo from "@/components/common/defaultLogo";
import EmptySupplier from '@/components/EmptyList';
export default {
    components: {
        defaultLogo,
        EmptySupplier
    },
    data() {
        return {
            isAutoFill: false,
            allLoaded: false,
            list: [],
            limit: 20,
            page: 1
        }
    },
    created () {
        this._initData();
    },
    methods: {
        loadBottom() {
            this.page++;
            let params = {
                page: this.page,
                limit: 20
            }
            _getFactoryList(params).then(res=>{
                let data = res.data;
                this.list = this.list.concat(this._handleData(data));
                if(this.list.length < this.limit) {
                    this.allLoaded = true;
                    this.$refs.loadmore.onBottomLoaded();
                }
            })
        },
        _handleData(data) {
            if(!data || !data.length) {
                return [];
            }
            data.forEach((item, index, arr)=>{
                const nameArr = [];
                if(item.supplier) {
                    for(let i=0; i < item.supplier.short_name.length; i++ ) {
                        nameArr.push(item.supplier.short_name.charAt(i));
                    }
                    arr[index].shortName = nameArr;
                }
            })
            return data.filter(item=>item.supplier!==null);
        },
        _initData() {
            let params = {
                page: 1,
                limit: 20
            }
            _getFactoryList(params).then(res=>{
                let data = res.data;
                this.list = this._handleData(data);
                if(this.list.length < this.limit) {
                    this.allLoaded = true
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    .list_box {
        flex: 1;
        padding: .2rem;
        border-radius: 8px;
        .item {
            height: 2rem;
            margin-top: .2rem;
            display: flex;
            align-items: center;
            background: #fff;
            border-radius: 8px;
            padding: 0 .3rem;
            img {
                width: .96rem;
                height: .96rem;
                border-radius: 8px;
            }
            div {
                font-weight: bold;
                font-size: .3rem;
                margin-left: .2rem;
            }
        }
    }
}
</style>