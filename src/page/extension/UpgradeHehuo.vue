<template>
    <div id="UpgradeHehuo">
        <clxsd-head-top title='升级合伙人'></clxsd-head-top>
        <img src="../../images/extension/upgrade.png" width="30%" />
        <p style="margin-top: .3rem">升级为合伙人，享受更多权益</p>
        <div class="go-info">
            <button>
               升级合伙人
            </button>
            <router-link to="/introduction">
                初步了解
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UpgradeHehuo"
    }
</script>

<style lang="scss" scoped>
    #UpgradeHehuo {
        min-height: 100%;
        background: #fff;
        text-align: center;
        font-size: .32rem;
        img {
            padding-top: 2rem;
        }
    }
    .go-info {
        margin-top: 1.5rem;
        a,button {
            display: block;
            width: 3.2rem;
            height: .88rem;
            line-height: .88rem;
            color: #fff;
            margin: .3rem auto;
            border-radius: .88rem;
            font-size: .26rem;
            text-align: center;
            &:nth-child(2) {
                color: #26a2ff;
                background: #fff;
                border:1px solid #26a2ff;
            }
        }
        button.active{
            background: #26a2ff;
        }
    }
</style>