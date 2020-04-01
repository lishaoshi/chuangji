<!----查看详情---->
<template>
    <div class="balance">
        <clxsd-head-top :title="title" class="top"></clxsd-head-top>
        <div class="title">
            <div v-for="(item, index) of titleList" :key="index">
                <span>{{item}}</span>
            </div>
        </div>
        <div class="intverLList">
            <show-detail-item v-for="(item, index) of intverLList" :key="index"/>
        </div>
        
        <div class="echartInfo">
            <echart-info/>
        </div>
        </div>
</template>

<script>
import ShowDetailItem from "./showDetailItem";
import EchartInfo from "./echartInfo.vue";
export default {
    data() {
        return {
            title: this.$route.query.type=="factory"?"厂商对接人":"终端对接人",
            titleList: [
                '对接人',
                '厂商',
                '收益'
            ],
            intverLList: [
                {},{}
            ]
        }
    },
    components: {
        ShowDetailItem,
        EchartInfo
    }
}
</script>

<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: space-around;
    height: .78rem;
    color: #999;
    font-size: .28rem;
    align-items: center;
}
.echartInfo {
    height: 5rem;
}
</style>