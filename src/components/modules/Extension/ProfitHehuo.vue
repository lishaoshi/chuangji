<template>
    <div>
        <div class="detailed-item">
        	<img src="../../../images/extension/promote-promoter.png" class="item-icon" />
            <p class="title">推广人</p>
            <div class="num">
                <p>收益（贝）</p>
                <p>23449.00</p>
            </div>
        </div>
        <div class="detailed-item">
        	<img src="../../../images/extension/promote-multiple-shop.png" class="item-icon" />
            <p class="title">连锁店</p>
            <div class="num">
                <p>收益（贝）</p>
                <p>23449.00</p>
            </div>
        </div>
        <div class="detailed-item">
        	<img src="../../../images/extension/promote-hospital.png" class="item-icon" />
            <p class="title">医院</p>
            <div class="num">
                <p>收益（贝）</p>
                <p>23449.00</p>
            </div>
        </div>
        <div class="detailed-item">
        	<img src="../../../images/extension/promote-monomer.png" class="item-icon" />
            <p class="title">单体</p>
            <div class="num">
                <p>收益（贝）</p>
                <p>23449.00</p>
            </div>
        </div>
        <div class="detailed-item">
        	<img src="../../../images/extension/promote-clinic.png" class="item-icon" />
            <p class="title">诊所</p>
            <div class="num">
                <p>收益（贝）</p>
                <p>23449.00</p>
            </div>
        </div>
        <div class="detailed-item">
        	<img src="../../../images/extension/promote-business.png" class="item-icon" />
            <p class="title">商业</p>
            <div class="num">
                <p>收益（贝）</p>
                <p>23449.00</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProfitHehuo"
    }
</script>

<style lang="scss" scoped>
    .detailed-item {
        margin: .1rem .2rem;
        background: #fff;
        border-radius: 5px;
        border:1px solid #f1f1f1;
        display: flex;
        padding: .35rem .2rem;
        align-items: center;
        justify-content: space-around;
        .item-icon {
            width: 1.1rem;
            height: 1.1rem;
        }
        .title {
            font-size: .4rem;
            color: #333;
        }
        .num {
            text-align: center;
            margin-left: 30%;
            width: 30%;
            p {
                &:nth-child(1) {
                    font-size: .26rem;
                    color: rgb(153,153,153);
                }
                &:nth-child(2) {
                    font-size: .36rem;
                    line-height: 1;
                    color: #03ad8f;
                    font-weight: bold;
                    margin-top: .15rem;
                }
            }
        }
    }
</style>