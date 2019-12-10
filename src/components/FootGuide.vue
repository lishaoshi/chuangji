<template>
    <div class="foodPage">
        <!-- <div class="foot-fade"></div> -->
        <!--连锁-->
        <footer class="clxsd-foot-guide foot-guide" v-if="userType ===3">
            <section
                    :class="{active: isCurPath('/home')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('/home')">
                <svg class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-footer-liansudian-shouye"/>
                </svg>
                <span>云工厂</span>
            </section>
            <section
                    :class="{active: isCurPath('/global-warehouse')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('/global-warehouse', true)">
                <svg class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-footer-gloable"/>
                </svg>
                <span>配送商</span>
            </section>
            <section
                    :class="{active: isCurPath('/purchasing-port-order')}"
                    class="clxsd-guide-item guide-item"
                    @click="authToRouter('/purchasing-port-order')">
                <clxsd-badge :dot="profile">
                    <svg class="m-style-svg m-svg-def">
                        <use xlink:href="#icon-footer-liansuodian-jicaidingzhi"/>
                    </svg>
                </clxsd-badge>
                <span>进货单</span>
            </section>
            <section
                    :class="{active: isCurPath('my')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('/my')">
                <clxsd-badge :dot="profile">
                    <svg class="m-style-svg m-svg-def">
                        <use xlink:href="#icon-factory-my-1" v-if="isCurPath('/my')"/>
                        <use xlink:href="#icon-footer-my" v-else/>
                    </svg>
                </clxsd-badge>
                <span>我的</span>
            </section>
        </footer>
        <!--商业公司-->
        <footer class="clxsd-foot-guide foot-guide" v-else-if="userType ===2">
            <section
                    :class="{active: isCurPath('/home')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('/home')">
                <svg class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-footer-liansudian-shouye"/>
                </svg>
                <span>云工厂</span>
            </section>
            <section
                    :class="{active: isCurPath('/item-categories')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('/item-categories', true)">
                <svg class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-footer-shangye-yaopin"/>
                </svg>
                <span>药品</span>
            </section>
             <section
                    :class="{active: isCurPath('/collect-parity')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('/collect-parity', true)">
                    <div style="width: .45rem;height: .45rem;position:relative">
                        <img src="@/images/collectParity.png" class="collectParity" alt="" />
                    </div>
               
                <span>集采比价</span>
            </section>
            <section
                    :class="{active: isCurPath('/business-service-order')}"
                    class="clxsd-guide-item guide-item"
                    @click="authToRouter('/business-service-order')">
                <clxsd-badge :dot="profile">
                    <svg class="m-style-svg m-svg-def">
                        <use xlink:href="#icon-footer-ordering"/>
                    </svg>
                </clxsd-badge>
                <span>订单</span>
            </section>
            <section
                    :class="{active: isCurPath('my')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('/my')">
                <svg class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-factory-my-1" 　v-if="isCurPath('/my')"/>
                    <use xlink:href="#icon-footer-my" 　v-else/>
                </svg>
                <span>我的</span>
            </section>
        </footer>
        <!--工业-->
        <footer class="clxsd-foot-guide foot-guide" v-else-if="userType ===1">
            <section
                    :class="{active: isCurPath('/home')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('/home')">
                <svg class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-footer-factory-home" 　v-if="isCurPath('/home')"/>
                    <use xlink:href="#icon-footer-factory-home-0" 　v-else/>
                </svg>
                <span>首页</span>
            </section>
            <section
                    :class="{active: isCurPath('/spread')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('/spread', true)">
                <svg class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-footer-factory-tuiguang" v-if="isCurPath('/spread')"/>
                    <use xlink:href="#icon-footer-factory-tuiguang-0" 　v-else/>
                </svg>
                <span>推广</span>
            </section>
            <section
                    :class="{active: isCurPath('/factory-port-order')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('/factory-port-order', true)">
                <clxsd-badge :dot="profile">
                    <svg class="m-style-svg m-svg-def">
                        <use xlink:href="#icon-footer-factory-qiangdan" v-if="isCurPath('/factory-port-order')"/>
                        <use xlink:href="#icon-footer-factory-qiangdan-0" v-else/>
                    </svg>
                </clxsd-badge>
                <span>订单</span>
            </section>
            <section
                    :class="{active: isCurPath('my')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('/my')">
                <clxsd-badge :dot="profile">
                    <svg class="m-style-svg m-svg-def">
                        <use xlink:href="#icon-factory-my-1" 　v-if="isCurPath('/my')"/>
                        <use xlink:href="#icon-footer-my" 　v-else/>
                    </svg>
                </clxsd-badge>
                <span>我的</span>
            </section>
        </footer>
        <!--推广人-->
        <footer class="clxsd-foot-guide foot-guide" v-else-if="userType ===4">
            <section
                    :class="{active: isCurPath('/home', '/promotersCustomer')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('isPromoters')">
                <svg class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-promote-footer-consumer"/>
                </svg>
                <span>客户</span>
            </section>
            <!-- <section
                    :class="{active: isCurPath('/Profit')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('/Profit')">
                <clxsd-badge :dot="profile">
                    <svg class="m-style-svg m-svg-def">
                        <use xlink:href="#icon-promote-footer-earnings"/>
                    </svg>
                </clxsd-badge>
                <span>收益</span>
            </section> -->

             <section
                    :class="{active: isCurPath('/UnautMy-us')}"
                    class="clxsd-guide-item guide-item"
                    @click="to('/UnautMy-us')">
                <clxsd-badge :dot="profile">
                    <svg class="m-style-svg m-svg-def">
                        <use xlink:href="#icon-promote-footer-earnings"/>
                    </svg>
                </clxsd-badge>
                <span>我的</span>
            </section>
        </footer>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex'

    export default {
        name: "clxsd-foot-guide",
        props: {
            userType: {type: Number, required: true}
        },
        computed: {
            ...mapState('message', {
                profile: state => true,
            }),
            ...mapGetters('message', {
                notification: 'unreadMessage',
            }),
            ...mapState({
                userInfo: state => state.CURRENTUSER.data
            })
        },
        updated(){
        },
        methods: {
            async to(path, flag=false) {
                if(path=='isPromoters') {
                    if(this.userInfo.user_type==4) {
                        this.$router.push('/home')
                    } else {
                        this.$router.push('/promotersCustomer')
                    }
                    return false
                    // this.UPDATAroleExtension(1)
                }
               
                if(flag) {
                    if(!this.userInfo.shop_supplier) {
                        //  debugger
                        await this.$messagebox.confirm('',{
                            title: '提示',
                            message:'没有操作权限,请先完成认证',
                            confirmButtonText: '去认证'
                        }).then(action => {
                            if (action === 'confirm') {
                                this.$router.push('/company-info')
                            }
                        }).catch(err => err);
                    } else {
                        this.$router.push({path})
                    }
                } else {
                     this.$router.push({path})
                }
                
            },
            isCurPath(path, newPath) {
                return this.$route.fullPath.indexOf(path) > -1 || this.$route.fullPath.indexOf(newPath) > -1;
            },
            ...mapMutations([
                'UPDATAroleExtension'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    .foot-fade {
        height: 1rem;
    }
    .foodPage {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
        border-top: 1px solid #e5e5e5;
    }

    .foot-guide {
        border-top: 1px solid #f1f1f1;
        padding: 0 .2rem;
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
    .collectParity {
        width: .9rem!important;
        height: .9rem!important;
        position: absolute;
        // left: 0;
        left: -50%;
        top: -110%;
        // top: -50%;
        
    }
</style>