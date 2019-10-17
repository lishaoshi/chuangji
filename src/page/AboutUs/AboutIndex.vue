<template>
    <div>
        <clxsd-head-top title='关于我们'></clxsd-head-top>
        <div class="about-box1">
            <img src="../../images/logo.png">
            <p>版本号 1.0</p>
            <p>创联工厂</p>
        </div>
        <clxsd-cell :title="'版本介绍'" :to="'/update-list'" is-link/>
        <clxsd-cell :title="'服务协议'" :to="'/protocal'" is-link/>
        <clxsd-cell :title="'服务条款'" :to="'/serve'" is-link/>
        <clxsd-cell :title="'隐私条款'" :to="'/privacy'" is-link/>
        <div class="tel-box" v-if="userType==-1">
            <div>
                <p>服务热线<span class="tel">0371-xxxxxxxx</span></p>
                <p>服务时间<span class="time">9:00-18:00</span></p>
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
    import {mapState} from 'vuex'
    export default {
        name: "AboutIndex",
        components:{
            ClxsdCell
        },
        computed: {
            ...mapState({
                userType: state=>state.CURRENTUSER.data.user_type
            })
        },
        created() {
            // debugger
            console.log(this.userType)
        }
    }
</script>

<style lang="scss" scoped>
    .about-box1 {
        padding: .4rem;
        text-align: center;
        font-size:.18rem;
        color:rgba(153,153,153,1);
        p:last-child {
            font-size: .32rem;
            color: #333;
        }
        p:nth-last-child(2) {
            margin-top: .3rem;
        }
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
    .tel {
        margin-left: 12px;
    }
    .time {
        margin-left: 9px;
    }
</style>