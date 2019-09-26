<template>
    <div class="RootHome">
        <header>总部授权</header>
        <div style="height: .88rem"></div>
        <search></search>
        <CircleLoading v-if="loading"></CircleLoading>
        <PullRefresh @refresh="refresh">
            <div v-if="entities.length >0">
                <ShouRole v-for="(entity,ind) in entities"
                          :data="entity"
                          :key="ind"
                          :sureAuth="sureAuth" :delAuth="delAuth"></ShouRole>
            </div>
            <EmptyList v-else></EmptyList>
        </PullRefresh>
        <div class="foot-fade"></div>
        <footer class="clxsd-foot-guide foot-guide">
            <section
                    :class="{active: isCurPath('/home')}"
                    class="clxsd-guide-item guide-item"
            >
                <svg class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-footer-liansudian-shouye"/>
                </svg>
                <span>授权</span>
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
    import search from "@/components/modules/Extension/ExtensionSeach"
    import ShouRole from "@/components/modules/Extension/AuthorizationCell"
    import EmptyList from "@/components/EmptyList";
    import CircleLoading from "@/icons/CircleLoading";

    export default {
        name: "RootHome",
        components: {
            search,
            ShouRole,
            EmptyList,
            CircleLoading,
        },
        data() {
            return {
                entities: [],
                loading: false,
            }
        },
        methods: {
            to(path) {
                this.$router.push({path})
            },
            isCurPath(path) {
                return this.$route.fullPath.indexOf(path) > -1;
            },
            refresh(callback){
                this.getData(callback);
            },
            getData(callback) {
                this.loading = true;
                this.$http.get('user-empower', {
                    validate: state => state === 200
                }).then(response => {
                    this.loading = false;
                    this.entities = response.data;
                    if(callback)callback();
                }).catch(error => {
                    this.entities = [];
                    this.loading = false;
                    if(callback)callback();
                })
            },
            sureAuth(id) {
                this.$messagebox.confirm("确定开启权限吗?").then(action => {
                    if (action === 'confirm') {
                        this.$http.put(`user-empower/shou/${id}`)
                        .then(response => {
                            this.loading = false;
                            this.$toast('成功授权！');
                            this.getData();
                        }).catch(error => {
                            this.loading = false;
                            this.$toast(error.response.data.message);
                        });
                    }
                }).catch(err => err);
            },
            delAuth(id) {
                this.$messagebox.confirm("确定要删除此用户吗?").then(action => {
                    if (action === 'confirm') {
                        this.$http.delete(`user-empower/shou/${id}`)
                        .then(response => {
                            this.loading = false;
                            this.$toast('删除完成！');
                            this.getData();
                        }).catch(error => {
                            this.loading = false;
                            this.$toast(error.response.data.message);
                        });
                    }
                }).catch(err => err);
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style lang="scss" scoped>
    header {
        height: .88rem;
        line-height: .88rem;
        background: rgb(45, 162, 255);
        color: #fff;
        font-size: .37rem;
        font-weight: bold;
        text-align: center;
        position: fixed;
        top: 0px;
        width: 100%;
        left: 0px;
    }

    .foot-fade {
        height: 1rem;
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

    .container {
        padding: 0 .2rem;
    }

</style>