<template>
    <div>
        <div  class="extension-item">
            <img src="../../../images/default.png" class="extension-item-img">
            <div class="extension-item-info">
                <p><span>张无忌</span>（17756985698）</p>
                <p>
                    <span>商业</span>
                    <span>医院</span>
                    <span>连锁</span>
                    <span>单体</span>
                    <span>诊所</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UnSureTuiguangCell"
    }
</script>

<style lang="scss" scoped>
    .extension-item {
        background: #fff;
        margin: .2rem .2rem 0px;
        border-radius: 5px;
        padding: .37rem .2rem;
        display: flex;
        height: 2rem;
        position: relative;
        align-items: center;
        box-shadow: 0px 0px 3px #ccc;
        &-img {
            width: .96rem;
            height: .96rem;
            border-radius: 100%;
        }
        &-info {
            width: 80%;
            margin-left:.24rem;
            p {
                color: #333;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &:nth-child(1) {
                    font-size: .26rem;
                    color: #666;
                    span {
                        font-size: .34rem;
                        color: #333;
                        margin-right: .15rem;
                    }
                }
                &:nth-child(2) {
                    font-size: .22rem;
                    color: rgb(102,102,102);
                    margin-top: .15rem;
                    span {
                        color: #26a2ff;
                        border-radius: .04rem;
                        min-width: .9rem;
                        height: .36rem;
                        line-height: .36rem;
                        text-align: center;
                        display: inline-block;
                        margin-right: .08rem;
                        padding: 0 .2rem;
                        background: #f0f8ff;
                    }
                }
            }
        }
    }
    .nav-small {
        background: #fff;
        height: .8rem;
        line-height: .8rem;
        font-size: .28rem;
        padding: 0 .2rem;
        span {
            margin-right: .2rem;
        }
    }
</style>