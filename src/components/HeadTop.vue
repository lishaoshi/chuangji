<template>
    <div class="top1" >
        <div class="head-top" >
            <slot>
                <div class="head-top-goback">
                    <slot name="prepend">
                        <section v-if="goBack" @click="goBackFn">
                            <template v-if="typeof goBackFnc === 'string'">
                                {{ goBackFnc }}
                            </template>
                            <template v-else>
                                <svg class="m-style-svg m-svg-def">
                                    <use xlink:href="#icon-back"/>
                                </svg>
                            </template>
                        </section>
                    </slot>
                </div>
                <div v-if="title" class="head-top-title">
                    <slot name="title">
                    <span class="ellipsis">
                        {{ title || $route.meta.title }}
                    </span>
                    </slot>
                </div>
                <slot name="nav"/>
                <div v-if="append" class="head-top-append">
                    <slot name="append">
                        <section @click="to('/signup')">注册</section>
                    </slot>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from "vuex";

    export default {
        name: "clxsd-head-top",
        data() {
            return {
                // isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                isBROWSER: false
            }
        },
        props: {
            title: {type: String, default: '公告详情'},
            goBackFnc: {type: [Boolean, Function], default: false},
            append: {type: [Boolean, String], default: false},
            transparent: {type: Boolean, default: false},
            goBackNum: {type: Number, default: -1}
        },
        methods: {
            goBackFn() {
                if(this.isBROWSER) {
                    this.UPDATAroleExtension(2)
                }
                if(this.goBackNum == -3) {
                    return this.$router.go(this.goBackNum)
                }
                return typeof this.goBackFnc === 'function'
                    ? this.goBack(this.goBackNum)
                    : this.$router.go(-1)
            },
            to(path) {
                if (path) {
                    this.$router.push({path})
                }
            },
            ...mapMutations([
                'UPDATAroleExtension'
            ])
        },
        created() {
        },
        mounted() {
            
            if(this.$route.path=='/business-setting') {
                this.isBROWSER = true
            }else if(this.$route.path=='/develop'){
                this.isBROWSER = true

            }else if(this.$route.path=='/setting'){
                this.isBROWSER = true
            }else if (this.$route.path=='/customer-choose-role'){
                this.isBROWSER = true
            }else if (this.$route.path =='/invitation'){
                this.isBROWSER = true
            }else if (this.$route.path == '/channel-profit'){
                this.isBROWSER = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .head-top {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #0090ff;
        box-sizing: border-box;
        color: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: .3rem;
        height: .88rem;
        line-height: 1;
        padding: 0;
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 9;
        text-align: center;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        /* no */
        transition: all 0.3s;

        &.transparent {
            background-color: transparent;
            border-bottom-color: transparent;
            color: #fff;
        }

        & + * {
            padding-top: 90px;
        }

        .diy-select {
            font-size: 36px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            margin: auto;
            text-align: center;
            height: 100%;

            &--label {
                display: inline-block;

                &:after {
                    font-size: 16px;
                    right: 0;
                    color: #ccc;
                }
            }

            &--option {
                background-color: #fff;
            }

            &--options {
                position: fixed;
                top: 90px;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: rgba(0, 0, 0, 0.2);
            }
        }

        &-title {
            position: absolute;
            width: 100%;
            text-align: center;
            font-size: .36rem;
            font-weight: bold;
            z-index: 3;
        }

        &-nav {
            display: flex;
            -ms-align-items: center;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 80%;
            height: 100%;

            &-item {
                box-sizing: border-box;
                color: #999;
                text-align: center;
                font-size: 32px;
                width: 90px;
                border-bottom: 2px solid transparent; /* no */
                & + & {
                    margin-left: 50px;
                }
            }

            .router-link-active {
                color: #333;
                border-bottom-color: $primary;
            }
        }

        &-tabs-nav {
            display: flex;
            -ms-align-items: center;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 80%;
            height: 100%;

            &-item {
                padding: 0 30px;
                font-size: 32px;
                color: $primary;
                height: 60px;
                line-height: 60px;
                border-width: 1px 0; /*no*/
                border-style: solid;
                border-color: $primary;

                &:first-child {
                    border-left-width: 1px; /*no*/
                    border-top-left-radius: 4px; /*no*/
                    border-bottom-left-radius: 4px; /*no*/
                }

                &:last-child {
                    border-right-width: 1px; /*no*/
                    border-top-right-radius: 4px; /*no*/
                    border-bottom-right-radius: 4px; /*no*/
                }

                &.router-link-active {
                    background-color: $primary;
                    color: #fff;
                }
            }
        }

        &-goback {
            padding: .13rem 0.2rem .2rem 0;
            font-size: .3rem;
            position: relative;
            z-index: 10;
            padding-left: .2rem;
        }

        &-append {
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 16px;

            svg {
                width: 40px;
                height: 40px;
                margin-right: 4px;
                margin-left: -4px;

                + & {
                    margin-left: 10px;
                }
            }
        }

        &-cancel {
            color: $primary;
        }

        &-search {
            display: flex;
            padding: 0 10px;
            align-items: center;
            justify-content: flex-start;
            width: 600px;
            height: 55px;
            background-color: #f4f5f5;
            border-radius: 10px;

            &-input {
                margin-left: 15px;
                flex: 1 1 auto;
                height: 100%;
                background: none;
            }
        }
    }

    .m-svg-def {
        width: .3rem;
        height: .3rem;
        color: #fff;
    }

    .head-top-append {
        position: absolute;
        display: inline-block;
        float: right;
        z-index: 99;
        right: .2rem;
    }
    .top1 {
        height: .88rem;
    }
    .topHeight {
        // height: 1.4rem;
    }
    .activeFull {
        // padding-top: .52rem;
        // height: 1.4rem;
    }

    // @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    //     .head-top {
    //         padding-top: .52rem;
    //         height: 1.4rem;
    //     }
    // }
</style>