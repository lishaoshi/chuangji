<template>
    <div class="RegisterStep2">
        <clxsd-head-top title='' style="border:0px"></clxsd-head-top>
        <!-- <img src="../../images/login/icon.png" width="100%" style="margin-bottom: .2rem"> -->
        <img :src="icon_img" width="100%" style="margin-bottom: .2rem">
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
                <div class="yaodes" style="width: 100%;text-align: center;padding: 0px">
                    <!-- <img src="../../images/my/user_default.png"> -->
                    <img :src="user_img">
                    <p class="yaoname" style="font-size: .3rem">未查到此邀请人</p>
                </div>
            </div>
            <div class="yaoinfo" v-if="code===200">
                <div><img :src="user_img" v-if="!yaoData.avatar">
                    <img :src="yaoData.avatar" v-else>
                </div>
                <div class="yaodes">
                    <p class="yaoname">{{yaoData.display_name || yaoData.real_name}}</p>
                </div>
            </div>
            <div class="zcxy">
                <svg @click="isAgree=!isAgree">
                    <use :xlink:href="isAgree ? '#icon-promote-pay-chose-1':'#icon-promote-pay-chose-0'"></use>
                </svg>
                <span class="register-protocol" @click="is_Elastic = true">
                    同意入驻协议
                </span>
            </div>

            <div class="m-form-row" style="border: 0;margin-top:.1rem;">
                <button class="m-long-btn m-signin-btn" @click="signUp">
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
                code:'',
                hashid: '',
                icon_img:`data:image/png;base64,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`
                ,user_img:`data:image/png;base64,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`
            }
        },
        components:{
            protocol
        },
        created() {
            if(this.$route.query.hashid) {
                this.hashid = this.$route.query.hashid
                this.$http.get('users/find-user', {
                    params: {
                        hash_id: this.hashid
                    },
                    validate: state => state === 200
                }).then(response => {
                    let data = response.data
                    this.loading = false;
                    this.code = data.code
                    this.yaoData = data.data.userInfo;
                    this.yao_mobile = data.data.userInfo.phone
                    this.error = null;
                }).catch(error => {
                    this.loading = false;
                })
            }
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
                    console.log(params)
                    debugger
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
                    this.$toast(error.response.data.message)
                    // console.log(error.response.data.error, 'err')
                    this.loading = false;
                    // this.$toast(error.response.data.error[0]);
                })

            },
            handleChange() {

                if (phonePattern.test(this.yao_mobile)) {
                    this.loading = true;
                    this.$http.get('users/find-user', {
                        params: {
                            phone: this.yao_mobile,
                            hashid: this.hashid
                        },
                        validate: state => state === 200
                    }).then(response => {
                        this.loading = false;
                        this.code = response.data.code
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
            display: flex;
            align-items: center;
            p {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-left: .25rem;
                padding-left: .25rem;
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