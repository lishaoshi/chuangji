<template>
    <div class="container">
        <clxsd-head-top title='定制生产'></clxsd-head-top>
        <timeOut :title="title"/>
        <div class="loadMoerBox">
            <mt-loadmore :bottom-all-loaded="allLoaded" :bottom-method="loadBottom" ref="loadmore" :autoFill="isAutoFill">
                <div class="goods-list">
                    <list @upDtaScess="upDtaScess" v-for="(item, index) of customizeList" :key="index" :data="item" class="list-item"/>
                </div>
            </mt-loadmore>
        </div>
       
    </div>
</template>

<script>
import timeOut from "@/components/collectParity/buyDay"
import list from "./list"
import { getFactoryCustomizeList } from "@/api/factory"
export default {
    components: {
        timeOut,
        list
    },
    data() {
        return {
            title: "限时定制",
            page: 1,
            limit: 10,
            customizeList: [],
            allLoaded: false,
            isAutoFill: false
        }
    },
    created() {
        this.initData()
    },
    methods: {
        initData() {
            const params = {
                page: this.page,
                limit: this.limit
            }
            Promise.all([getFactoryCustomizeList(params)]).then(res=>{
                this.customizeList = res[0].data
            })
        },
        upDtaScess() {
             const params = {
                page: this.page,
                limit: this.limit
            }
            Promise.all([getFactoryCustomizeList(params)]).then(res=>{
                this.customizeList = res[0].data
            })
        },
        loadBottom() {
            this.page++
            const params = {
                page: this.page,
                limit: this.limit
            }
            getFactoryCustomizeList(params).then(res=>{
                const list = res.data || []
                this.customizeList = this.customizeList.concat(list)
                if(list.length <= 0) {
                    this.allLoaded = true
                }
                this.$refs.loadmore.onBottomLoaded();
            })
        },
        /** 
         * 定制按钮
        */
        handleCustom(data) {
            console.log(data)
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
    .goods-list {
        margin: 0 .2rem;
    }
    .list-item:not(:first-child) {
        margin-top: .2rem;
    }
    .loadMoerBox {
        overflow: auto;
        flex: 1;
    }
}
</style>