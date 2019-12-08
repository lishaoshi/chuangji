<template>
    <div class="buyActivityList">
        <div class="head">
            <span>[2019/12/12] 集采活动</span>
        </div>

        <div class="main">
            <img src="@/images/default.png" alt="">
            <div class="info">
                <p>伊可新 维生素AD滴剂</p>
                <p>品牌: 上海上药信宜药业有限公司</p>
                <p>规格: 10粒*3板/盒 300盒/件</p>
            </div>
        </div>

        <div class="btn-group">
            <div @click="toRouter('/change-history')">
                变价历史
            </div>
            <div @click="toRouter('/buy-recoed')">
                集采记录
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.buyActivityList {
    background: #fff;
    margin: 0 .24rem;
    border-radius: 10px;
    margin-top: .2rem;
    .head {
        height: .98rem;
        display: inline-flex;
        align-items: center;
        position: relative;
        font-size: .28rem;
        color: #999999;
        border-bottom: 1px solid #e6e6e6;
        width: 100%;
        span {
            margin-left: 14px;
        }
        span::before {
            content: " ";
            display: inline-block;
            width: 3px;
            height: 16px;
            background: #0090ff;
            position: absolute;
            left: 0;
            top: 50%;
            margin-right: 10px;
            margin-top: -8px;
        }
    }
    .main {
        display: flex;
        padding: .26rem .2rem;
        p:first-child {
            font-size: .4rem;
            font-weight: bold;
            color: #333;
            line-height: .8rem;
        }
        p:not(:first-child) {
            font-size: .28rem;
            font-weight: bold;
            color: #666;
            line-height: .4rem;
        }
    }
    .btn-group {
        height: .9rem;
        display: flex;
        color: #0090FF;
        align-items: center;
        border-top: 1px solid #e5e5e5;
        div {
            flex: 1;
            text-align: center;
            height: 100%;
            line-height: .9rem;
            font-size: .32rem;
            &:first-child {
                border-right: 1px solid #e5e5e5;
            }
        }
    }
    img {
        width: 1.8rem;
        height: 1.8rem;
        margin-right: .2rem;
    }
}
</style>