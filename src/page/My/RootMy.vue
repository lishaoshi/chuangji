<template>
    <div class="RootMy">
        <img src="../../images/default_company_logo.png" class="img">
        <div class="login-out" @click="loginChange">退出</div>
        <footer class="clxsd-foot-guide foot-guide">
            <section class="clxsd-guide-item guide-item"
              >
                <router-link to="/home">
                <svg class="m-style-svg m-svg-def" style="display: block">
                    <use xlink:href="#icon-footer-liansudian-shouye"/>
                </svg>
                <span>授权</span>
                </router-link>
            </section>
            <section class="clxsd-guide-item guide-item">
                <router-link to="/root-my">
                    <svg class="m-style-svg m-svg-def" style="display: block">
                        <use xlink:href="#icon-factory-my-1"/>
                    </svg>
                    <span>我的</span>
                </router-link>
            </section>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "RootMy",
        methods:{
            to(path){
                this.$router.push({ path })
            },
            isCurPath (path){
                return this.$route.fullPath.indexOf(path) > -1;
            },
            loginChange: function() {

                this.$messagebox.confirm("确定要切换账号吗?").then(action => {
                    if('confirm' === action){
                        this.$store.dispatch('SIGN_OUT');
                        this.$router.push('/home')
                    }
                }).catch(err => err);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .RootMy {
        min-height: 100%;
        text-align: center;
        background: #fff;
        padding-top: 30%;
        img {
            width: 2.8rem;
            height: 2.8rem;
        }
    }
    .login-out {
        width: 40%;
        height: 1rem;
        line-height: 1rem;
        margin-left: 30%;
        margin-top: 1rem;
        background: #26a2ff;
        color: #fff;
        font-size: .34rem;
        text-align: center;
        border-radius: 5px;
    }
    .foot-guide {
        position: fixed;
        border-top: 1px solid #f1f1f1;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0 .2rem;
        max-width: 768px;
        margin: 0 auto;
        height: 1rem;
        display: flex;
        background: #fff;
        .m-svg-def {
            width: .5rem;
            height: .5rem;
            margin-bottom: 2px;
            &.plus {
                width: 65px;
                height: 65px;
            }
            + .v-badge-dot {
                top: 0;
                box-shadow: 0 0 0 1px #ed3f14; /*no*/
            }
        }

        .guide-item {
            flex: 1;
            display: flex;
            text-align: center;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #999;
            font-size: .24rem;
            &.active {
                color: #2da2ff;
                svg {
                    color: #2da2ff;
                }
            }
        }
    }
    .foot-guide .m-svg-def {
        width: .45rem;
        height: .45rem;
    }
</style>