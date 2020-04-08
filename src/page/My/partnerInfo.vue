<template>
    <div class="container">
        <template v-if="isApply==-1">
            <clxsd-head-top :title="title" class="top"></clxsd-head-top>
        
        
            <div class="content">
                <div class="banner">
                    <img :src="partnerImg" alt="">
                </div>
                <h1>集采商简介</h1>
                <testTtile></testTtile>

                <testTtile>
                    <div slot="title">
                        <div class="title">
                            <span>平台优势</span>
                        </div>
                    </div>
                    <div slot="content">
                        <div class="content">
                            <span>中国医药产业链金融服务平台 </span>
                            <span>(集中采购  订单金融  数据运营  精准推广)</span>
                        </div>
                    </div>
                </testTtile>

                <testTtile>
                    <div slot="title">
                        <div class="title">
                            <span>公司支持</span>
                        </div>
                    </div>
                    <div slot="content">
                        <div class="content">
                            <span>系统支持、培训支持、宣传支持 </span>
                        </div>
                    </div>
                </testTtile>
                <testTtile>
                    <div slot="title">
                        <div class="title">
                            <span>收益方式</span>
                        </div>
                    </div>
                    <div slot="content">
                        <div class="content">
                            <span>推广人输入提成以及药店采购返利分润</span>
                        </div>
                    </div>
                </testTtile>
            </div>
            <div v-if="!isToView" class="becomePartnerBtn" @click="handleBecomePartner">
                <svg>
                    <use xlink:href="#icon-bePartner"/>
                </svg>
                <span>
                    成为集采商
                </span>
            </div>
        </template>

        <template v-if="isApply==0">
            <clxsd-head-top :title="title" class="topBlue"></clxsd-head-top>
            <becomePromote class="becomePromote_box">
                <div slot="main" class="becomePromote">
                    <img src="../../images/waitLoading.png" alt="">
                    <div>
                        <p>
                    您已提交申请，请耐心等待审核                     </p>
                        我们将有工作人员与您联系   
                    </div>
                </div>
            </becomePromote>
        </template>

        
    </div>
</template>

<script>
    import testTtile from "@/components/common/textCom";
    import bgImg from '../../images/promoteBgImg.png';
    import becomePromote from "@/components/promote/becomePromotBg"
    import { mapState } from "vuex";
export default {
    data() {
        return {
            partnerImg:bgImg,
            isToView: false
        }
    },
    methods: {
        handleBecomePartner() {
            this.$router.push({path: '/customer-choose-role', query: {type: 'partner'}})
        }
    },
    created() {
        this.isToView = this.$route.query.toView;
        // console.log('isAll',this.isApply )
    },
    components: {
        testTtile,
        becomePromote
    },
    computed: {
        ...mapState({
            isApply: state=>state.is_apply
        }),
        title() {
            return this.isToView?'推广简介': '集采商简介'
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    .banner {
        img {
            width: 100%;
        }
        // width: 100%;
        // height: 4rem;
        // background: url("../../images/partnerBgImg.png") no-repeat;
        // background-size: 100% 100%;
    }
    .content {
        flex: 1;
        overflow: auto;
        h1 {
            font-size: 0.48rem;
            color: #333;
            font-weight: bold;
            margin-bottom: 0.57rem;
            padding: 0 0.5rem;
            margin-top: 1rem;
        }
        // text-indent: 2em;
    }
    .becomePartnerBtn {
        svg {
            width: .4rem;
            height: .4rem;
            margin-right: .12rem;
        }
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background:#fff;
        color: #2DA2FF;
        height: .98rem;
        font-size: .34rem;
    }
}

</style>

<style scoped>
    .top /deep/ .head-top{
        background-color: #6659ff!important;
    }
    .topBlue /deep/ .head-top{
        background-color: #0090ff!important;
    }
</style>