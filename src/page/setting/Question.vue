<template>
    <div>
        <clxsd-head-top title='问题求助'></clxsd-head-top>
        <ul class="question-list">
            <li>
                <span>如何更换手机号</span>
                <svg>
                    <use xlink:href="#icon-promote-my-enter" />
                </svg>
            </li>
        </ul>
        <div class="tel-box">
            <div>
                <p>服务热线 0371-xxxxxxxx</p>
                <p>服务时间：9：00-18：00</p>
            </div>
            <div>
                <a href="tel:0371-xxxxxxx">
                    <svg>
                        <use xlink:href="#icon-dianhua" />
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Question"
    }
</script>

<style lang="scss" scoped>
    .question-list {
        padding: 0 .2rem;
        background: #fff;
        margin-top: .2rem;
        li {
            height: 1rem;
            line-height: 1rem;
            font-size: .3rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            svg {
                width: .32rem;
                height: .32rem;

            }
        }
    }
    .tel-box {
        background: #fff;
        border-top: 1px solid #f1f1f1;
        height: 1rem;
        position: fixed;
        width: 100%;
        bottom: 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .2rem;
        svg {
            width: .4rem;
            height: .4rem;
        }
        p {
            &:nth-child(1) {
                font-size: .3rem;
            }
            &:nth-child(2) {
                font-size: .24rem;
                color: #7C7C7C;
            }
        }
    }
</style>