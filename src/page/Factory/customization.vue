<template>
    <div class="container">
        <clxsd-head-top title='定制生产'></clxsd-head-top>
        <timeOut :title="title"/>
        <div class="loadMoerBox">
            <mt-loadmore :bottom-all-loaded="allLoaded" :bottom-method="loadBottom" ref="loadmore" :autoFill="isAutoFill">
                <div class="goods-list">
                    <list @buyCustom="buyCustom" v-for="(item, index) of customizeList" :key="index" :data="item" class="list-item"/>
                </div>
            </mt-loadmore>
        </div>
        <template v-if="isShowModel">
            <chang-model :isShowModel.sync="isShowModel" :data="curData" @confirmPrice="confirmPrice">
                <div class="input">
                    <input type="text" @input="handleInput" :placeholder="placeholder" v-model="input">
                    <div>
                    <span>{{curData.big_unit}}</span>
                </div>
                </div>
                <p class="margin">
                    <span>
                    此次定制扣除{{curData.base_margin | handleLianshu}}保证金
                    </span>
                </p>
            </chang-model>
            <bg />
      </template>
    </div>
</template>

<script>
import timeOut from "@/components/collectParity/buyDay"
import list from "./list"
import { getFactoryCustomizeList, buyCustomize } from "@/api/factory"
import changModel from "@/components/collectParity/changModel"
import bg from "@/components/collectParity/bg";
export default {
    components: {
        timeOut,
        list,
        changModel,
        bg
    },
    data() {
        return {
            title: "限时定制",
            page: 1,
            limit: 10,
            customizeList: [],
            allLoaded: false,
            isAutoFill: false,
            isShowModel: false,
            curData: {},
            placeholder: "请输入定制数量",
            factoryId: 0
        }
    },
     filters: {
        handleLianshu(val) {
            return val.toFixed(2)
        }
    },
    created() {
        this.factoryId = this.$route.params.id
        this.initData();
    },
    methods: {
        initData() {
            const params = {
                page: this.page,
                limit: this.limit,
                supplier_id: this.factoryId
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
        buyCustom(val, data) {
            this.input = val;
            this.curData = data;
            this.isShowModel = true;
        },
        confirmPrice() {
            const params = {
                num: this.input
            }
            buyCustomize(params, this.curData.id).then(res=>{
                if(res.code==200) {
                    this.$toast("定制成功")
                    this.isShowModel = false
                    this.upDtaScess()
                } else {
                    this.$toast(res.message)
                }
            })
            // console.log(123)
        },
        handleInput(e) {
             this.input = e.target.value.replace(/[^0-9]/g, '')
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
    .margin {
        color: #E6A23C;
        font-size: .24rem;
        padding: .2rem 0;
    }
}
</style>