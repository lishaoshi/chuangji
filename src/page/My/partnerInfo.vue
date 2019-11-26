<template>
    <div class="container">
        <clxsd-head-top title="合伙人简介"></clxsd-head-top>
        

    <div class="content">
        <div class="banner">
            <img :src="partnerImg" alt="">
        </div>
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

    <div class="becomePartnerBtn" @click="handleBecomePartner">
        <svg>
            <use xlink:href="#icon-bePartner"/>
        </svg>
        <span>
            成为合伙人
        </span>
      </div>
    </div>
</template>

<script>
    import testTtile from "@/components/common/textCom";
    import bgImg from '../../images/partnerBgImg.png'
export default {
    data() {
        return {
            partnerImg:bgImg
        }
    },
    methods: {
        handleBecomePartner() {
            this.$router.push('/customer-choose-role')
        }
    },
    components: {
        testTtile
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