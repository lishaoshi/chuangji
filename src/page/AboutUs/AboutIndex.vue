<template>
    <div>
        <clxsd-head-top title='关于我们'></clxsd-head-top>
        <div class="about-box1">
            <img src="../../images/logo.png">
            <p>版本号 1.0</p>
        </div>
        <clxsd-cell :title="'版本更新'" :to="'/update-list'" is-link/>
        <clxsd-cell :title="'服务协议'" :to="'/protocal'" is-link/>
        <clxsd-cell :title="'服务条款'" :to="'/serve'" is-link/>
        <clxsd-cell :title="'隐私条款'" :to="'/privacy'" is-link/>
        <div class="tel-box">
            <div>
                <p>服务热线 0371-xxxxxxxx</p>
                <p>服务时间:9：00-18:00</p>
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
    import ClxsdCell from '@/components/common/Cell';
    export default {
        name: "AboutIndex",
        components:{
            ClxsdCell
        },
    }
</script>

<style lang="scss" scoped>
    .about-box1 {
        padding: .4rem;
        text-align: center;
        font-size:.30rem;
        color:rgba(153,153,153,1);
        line-height: 1.8;
        img {
            width:1.18rem;
            height:1.18rem;
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