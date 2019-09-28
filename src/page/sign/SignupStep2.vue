<template>
    <div class="RegisterStep2">
        <clxsd-head-top title='' style="border:0px"></clxsd-head-top>
        <img src="../../images/login/icon.png" width="100%" style="margin-bottom: .2rem">
        <main>
            <div class="m-form-row m-main">
                <label for="real_name">真实姓名</label>
                <div class="m-input">
                    <input id="real_name" v-model="real_name" type="text" autocomplete="off" placeholder="请输入真实姓名">
                </div>
            </div>
            <div class="m-form-row m-main">
                <label for="user_identity">身份证号</label>
                <div class="m-input">
                    <input id="user_identity" v-model="user_identity"
                           type="text" pattern="[0-9x|X]*"
                           oninput="value=value.slice(0, 18)" maxlength="18" autocomplete="off" placeholder="请输入真实身份证号">
                </div>
            </div>
            <div class="m-form-row m-main" style="margin-top: .2rem">
                <label>邀请人手机号</label>
                <div class="m-input">
                    <input id="yao-tel" v-model="yao_mobile" type="number" @input="handleChange"
                           maxlength="11"
                           autocomplete="off" placeholder="请输入邀请人手机号">
                </div>
            </div>
            <p class="errinfo">{{error}}</p>
            <div class="yaoinfo" v-if="code===203">
                <div class="yaodes">
                    <p class="yaoname">未查到此邀请人</p>
                </div>
            </div>
            <div class="yaoinfo" v-if="code===200">
                <div><img src="../../images/my/user_default.png" v-if="!yaoData.avatar">
                    <img :src="yaoData.avatar" v-else>
                </div>
                <div class="yaodes">
                    <p class="yaoname">{{yaoData.display_name || yaoData.real_name}}</p>
                </div>
            </div>
            <!--
            <div class="yaoinfo" v-else>
                <div class="yaodes">
                    <p class="yaoname">未查到此邀请人</p>
                </div>
            </div>
            -->
            <div class="zcxy">
                <svg @click="isAgree=!isAgree">
                    <use :xlink:href="isAgree ? '#icon-promote-pay-chose-1':'#icon-promote-pay-chose-0'"></use>
                </svg>
                <span class="register-protocol" @click="is_Elastic = true">
                    同意入驻协议
                </span>
            </div>

            <div class="m-form-row" style="border: 0;margin-top:.1rem;">
                <button :disabled="!active" class="m-long-btn m-signin-btn" @click="signUp">
                    <span>立即注册</span>
                </button>
            </div>
        </main>
        <!--弹框-->
        <div class="fixed-bg" v-if="is_Elastic" @click="is_Elastic = false"></div>
        <transition name="fade">
            <protocol v-if="is_Elastic" :closed="closed" :notAgree = "notAgree" :agree = "agree"/>
        </transition>
        <CircleLoading v-if="loading"/>
    </div>
</template>

<script>
    import {phonePattern, idl18nReg} from "@/util";
    import CircleLoading from "@/icons/CircleLoading";
    import protocol from "./RegisterProtocol"
    const REGISTER_DATA = 'REGISTER_DATA'
    // 用户名验证
    const usernameReg = /^[a-zA-Z_\u4E00-\u9FA5\uF900-\uFA2D][a-zA-Z0-9_\u4E00-\u9FA5\uF900-\uFA2D]*$/


    function strLength(str) {
        let totalLength = 0;
        let i = 0;
        let charCode;
        for (; i < str.length; i++) {
            charCode = str.charCodeAt(i);
            if (charCode < 0x007f) {
                totalLength = totalLength + 1;
            } else if (charCode >= 0x0080 && charCode <= 0x07ff) {
                totalLength += 2;
            } else if (charCode >= 0x0800 && charCode <= 0xffff) {
                totalLength += 3;
            }
        }
        return totalLength;
    }

    export default {
        name: "page-register-step2",
        components: {CircleLoading},
        data() {
            return {
                isAgree: true,
                real_name: '',
                user_identity: '',
                yao_mobile: '',
                yaoData: null,

                loading: false,
                error: '',
                is_Elastic: false,
                code:''
            }
        },
        components:{
            protocol
        },
        computed: {
            active() {
                return idl18nReg.test(this.user_identity) && this.real_name && this.isAgree;
            }
        },

        methods: {
            closed(){
                this.is_Elastic = false
            },
            notAgree(){
                this.isAgree = false;
                this.is_Elastic=false
            },
            agree(){
                this.isAgree = true;
                this.is_Elastic=false
            },
            signUp() {
                if (this.loading) return;

                const {real_name, user_identity, yao_mobile} = this.$data

                if (!real_name) {
                    this.$toast('用户名不能为空!');
                    return;
                }

                if (!this.isAgree) {
                    this.$toast('协议未授权!');
                    return;
                }


                // 判断特殊字符及空格
                if (!usernameReg.test(real_name)) {
                    this.$toast('用户名不能包含特殊符号以及空格!');
                    return;
                }


                // 判断字节数
                if (strLength(real_name) > 48 || strLength(real_name) < 4) {
                    this.$toast('用户名不能少于2个中文或4个英文!');
                    return;
                }


                if (!idl18nReg.test(user_identity)) {
                    this.$toast('请输入合法的用户身份证！');
                    return;
                }

                const params = Object.assign({real_name, user_identity, yao_mobile},
                    this.$lstore.getData(REGISTER_DATA))

                this.loading = true;
                this.$http.post('/register', params, {
                    validateStatus: s => s === 204
                }).then(response => {
                    //console.log(response);
                    this.loading = false;
                    this.$toast('注册成功!');
                    this.$lstore.removeData(REGISTER_DATA)
                    this.$router.push('/signin');
                }).catch(error => {
                    this.loading = false;
                    this.$toast(error.response.data.message);
                })

            },
            handleChange() {

                if (phonePattern.test(this.yao_mobile)) {
                    this.loading = true;
                    this.$http.get('users/find-user', {
                        params: {phone: this.yao_mobile},
                        validate: state => state === 200
                    }).then(response => {
                        this.loading = false;
                       // console.log(response.data.data)
                        this.code = response.data.code
                        console.log(this.code)
                        this.yaoData = response.data.data.userInfo;
                        this.error = null;
                    }).catch(error => {
                        this.loading = false;
                    })
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .RegisterStep2 {
        min-height: 100%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .fixed-bg {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 99;
        background: #333;
        opacity: .4;
        left: 0px;
        top: 0px
    }

    .fixed-box {
        background: #fff;
        position: fixed;
        width: 6.90rem;
        height: 11rem;
        left: 50%;
        margin-left: -3.45rem;
        top: 50%;
        margin-top: -5.5rem;
        z-index: 100;
        text-align: center;

        .icon {
            width: .32rem;
            height: .32rem;
            position: relative;
            float: right;
            margin-top: .2rem;
            margin-right: .2rem;
        }

        h2 {
            text-align: center;
            font-size: .44rem;
            padding-top: .7rem;
        }

        img {
            width: 2.5rem;
            margin-top: .3rem;
        }

        .edit {
            font-size: .28rem;
            padding: .5rem;
            letter-spacing: 1px;
            line-height: 1.5;
            height: 6rem;
            margin-bottom: .6rem;
            overflow-y: scroll;
            overflow-x: hidden;
            text-align: left;
            h3 {
                font-size: .32rem;
            }
            p {
                text-indent:2em;
            }
        }

        .btn {
            p {
                width: 5.78rem;
                height: .9rem;
                background: rgba(0, 144, 255, 1);
                border-radius: .45rem;
                color: #fff;
                font-size: .36rem;
                line-height: .9rem;
                margin: .2rem auto;

                &:nth-child(2) {
                    background: #fff;
                    color: rgba(0, 144, 255, 1);
                }
            }
        }
    }

    .p-change-password {
        .submit-btn {
            color: $primary;

            &.disabled {
                color: $gray;
            }
        }

        .m-form-row {
            .m-input {
                padding-right: 30px;
            }

            label {
                width: 180px;
            }
        }
    }

    .p-forgot .m-form-row label {
        flex: 0 0 60px;
    }

    .m-form-row {
        font-size: 14px;
        height: 1.2rem;
        padding: 0px;
    }

    .m-form-row .m-input input {
        font-size: 14px;
    }

    .p-forgot .m-form-row .inp-sp {
        color: #26A2FF;
        font-size: 10px;
        padding: 2px 5px;
        border-radius: 4px;
        border: 1px solid #26A2FF
    }

    .p-change-password .m-form-row label[data-v-d719fc14] {
        width: 75px;
    }

    main {
        margin-bottom: 10px;

    }

    .m-main {
        padding: 0 .2rem;
    }

    .errinfo {
        line-height: 280%;
        color: #f30000;
        font-size: 12px;
    }

    .yaoinfo {
        display: flex;
        padding: 0 .2rem;
        height: 1.6rem;
        align-items: center;
        background: #fff;

        img {
            width: .9rem;
            height: .9rem;
            border-radius: 3px;
        }

        .yaodes {
            width: 70%;
            padding-left: .25rem;

            p {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .yaoname {
            font-size: .28rem;
            line-height: 150%;
            padding-top: 8px;
        }

        .yaotel {
            font-size: .24rem;
            color: #666;
            margin-top: .1rem;
        }
    }

    .m-long-btn {
        height: 1rem;
        background: #26A2FF;
        color: #fff;
        font-size: 16px;
        margin-left: 10px;
        margin-right: 10px;

        &[disabled] {
            //background: #26A2FF;
        }
    }

    .sign-xieyi {
        font-size: 12px;
        color: #26A2FF;
        display: flex;
        height: 30px;
        line-height: 30px;
        padding: 10px;

        img {
            width: 15px;
            height: 15px;
            margin-right: 3px;
            margin-top: 7px;
        }
    }

    .zcxy {
        text-align: center;
        display: flex;
        height: .8rem;
        align-items: center;
        margin-top: .2rem;
        padding-left: .2rem;

        svg {
            width: .36rem;
            height: .36rem;
        }

        .register-protocol {
            margin-left: .1rem;
            font-size: 0.28rem;
            color: #26a2ff;
        }
    }

    .errinfo {
        background: #fff;
        line-height: 1.6rem;
        text-align: center;
        color: #333;
        font-size: .3rem;
    }
</style>