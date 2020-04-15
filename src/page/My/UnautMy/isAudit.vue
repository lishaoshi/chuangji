<template>
    <div class="container">
        <clxsd-head-top :title="title" class="topBlue"></clxsd-head-top>
        <!-- <clxsd-head-top :title="title" class="topBlue"></clxsd-head-top> -->
            <becomePromote class="becomePromote_box">
                <div slot="main" class="becomePromote">
                    <img src="../../../images/waitLoading.png" alt="">
                    <div>
                        <p>
                    您已提交申请，请耐心等待审核                     </p>
                        我们将有工作人员与您联系   
                    </div>
                </div>
            </becomePromote>
    </div>
</template>>

<script>
import becomePromote from "@/components/promote/becomePromotBg"
export default {
    data() {
        return {
            title: "审核进度"
        }
    },
    components: {
        becomePromote
    }
}
</script>>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #fff;
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
    div {
        margin-top: 0!important;
    }
}

</style>