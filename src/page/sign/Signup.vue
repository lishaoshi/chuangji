<template>
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
        <div class="p-signup">
            <clxsd-head-top title='' style="border:0px"></clxsd-head-top>
            <!-- <img src="../../images/login/icon.png" width="100%"> -->
            <img :src="icon_img" width="100%">
            <main>
                <div v-if="verifiable_type === 'sms'" class="m-form-row m-main">
                    <label for="phone">
                        <svg class="icon-svg">
                            <use xlink:href="#icon-denglushoujihao"/>
                        </svg>
                    </label>
                    <div class="m-input">
                        <input id="phone" :disabled="is_phone" v-model="phone" type="number" pattern="[0-9]*" oninput="value=value.slice(0, 11)" placeholder="输入11位手机号">
                        <!-- maxlength="11" -->
                    </div>
                </div>
                <div v-if="verifiable_type === 'mail'" class="m-form-row m-main">
                    <label for="email">邮箱</label>
                    <div class="m-input">
                        <input id="email" v-model.trim="email" type="email" placeholder="输入邮箱地址">
                    </div>
                    <span :class="{ disabled: email.length < 4 || countdown > 0 }" class="code-text" @click="getCode">
                        {{ codeText }}
                     </span>
                </div>
                <div class="m-form-row m-main">
                    <label for="code">
                        <svg class="icon-svg">
                            <use xlink:href="#icon-denglumima"/>
                        </svg>
                    </label>
                    <div class="m-input">
                        <input v-if="eye" id="password" v-model="password" type="text" maxlength="16" placeholder="输入6位以上登陆密码">
                        <input v-else id="password" v-model="password" maxlength="16" type="password" placeholder="输入6位以上登陆密码">
                    </div>
                    <svg class="m-style-svg m-svg-def" @click="eye = !eye">
                        <use :xlink:href="eye ? '#icon-eye-open' : '#icon-eye-close'"/>
                    </svg>
                </div>
                <div class="m-form-row m-main">
                    <label for="code">
                        <svg class="icon-svg">
                            <use xlink:href="#icon-querenmima"/>
                        </svg>
                    </label>
                    <div class="m-input">
                        <input v-if="eye" id="confirmPassword" v-model="confirmPassword" type="text" maxlength="16" placeholder="请再次输入登陆密码">
                        <input v-else id="confirmPassword" v-model="confirmPassword" maxlength="16" type="password" placeholder="请再次输入登陆密码">
                    </div>
                </div>
                <div class="m-form-row m-main">
                    <label for="code">
                        <svg class="icon-svg">
                            <use xlink:href="#icon-zhuceyanzhengma"/>
                        </svg>
                    </label>
                    <div class="m-input">
                        <input id="code" v-model="verifiable_code" type="number" pattern="[0-9]*" oninput="value=value.slice(0, 6)"
                               placeholder="输入6位验证码" @input="checkCode">
                    </div>
                    <span :class="{ disabled: phone.length < 11 || countdown > 0 }" class="code-text" @click="getCode">{{ codeText }}</span>
                    <svg v-show="verifiable_code.length > 0" class="m-style-svg m-svg-def" @click="verifiable_code = ''">
                        <use xlink:href="#icon-clean"/>
                    </svg>
                </div>
                <div class="error-info">
                    <span>{{ error | plusMessageFirst }}</span>
                </div>
                <div class="m-form-row" style="border: 0">
                    <button :disabled="loading||disabled ||is_code" class="m-long-btn m-signin-btn" @click="signUp">
                        <circle-loading v-if="loading"/>
                        <span v-else>下一步</span>
                    </button>
                </div>
            </main>

        </div>
    </transition>
</template>

<script>
    import {mapState} from "vuex";


    const prefixCls = "signup";
    const SMS = "sms"; // 手机
    const EMAIL = "mail"; // 邮箱
    const REGISTER_DATA = 'REGISTER_DATA';

    // 手机号码规则
    const phoneReg = /^1[3-9]\d{9}$/;
    // 邮箱验证
    const emailReg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

    // 验证码
    // const codeReg = /^[0-9]{4,6}$/;

    export default {
        name: "page-signup",
        data() {
            return {
                prefixCls,
                eye: false,
                error: "",
                loading: false,

                email: "",
                phone: "",
                countdown: 0,
                password: "",
                confirmPassword: "",
                verifiable_type: SMS,
                verifiable_code: "",
                user_type: 1,
                is_code:true,
                is_phone:false,
                hashid: '',
                icon_img:`data:image/png;base64,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`
            };
        },
        computed: {
            ...mapState(["CONFIG"]),
            allowType() {
                // mobile-only | mail-only | all
                return this.CONFIG.registerSettings.method;
            },
            currentType: {
                get() {
                    if (this.allowType === "all") return this.verifiable_type || SMS;
                    return this.allowType === "mail-only" ? EMAIL : SMS;
                },
                set(val) {
                    this.verifiable_type = val;
                }
            },
            showProtocol() {
                const registerSettings = this.CONFIG.registerSettings || {};
                return registerSettings.showTerms || false;
            },
            codeText() {
                return this.countdown > 0 ? `${this.countdown}s后重发` : "获取验证码";
            },
            canGetCode() {
                return (
                    (this.phone.length === 11 || this.email.length > 4) &&
                    this.countdown === 0
                );
            },
            disabled() {
                const {
                    phone,
                    email,
                    password,
                    confirmPassword,
                    verifiable_code: verifiableCode,
                    verifiable_type: verifiableType
                } = this.$data;

                const res = [password, confirmPassword, verifiableCode, verifiableType].every(
                    i => i !== ""
                );
                if (!res) return true;

                return this.verifiable_type === "sms" ?
                    phone.length !== 11 :
                    email.length <= 4;
            },
            _$type: {
                get() {
                    let label = "";
                    let label2 = "";
                    switch (this.currentType) {
                        case SMS:
                            label = "手机";
                            label2 = "邮箱";
                            break;
                        case EMAIL:
                            label = "邮箱";
                            label2 = "手机";
                            break;
                    }
                    return {
                        value: this.currentType,
                        label,
                        label2
                    };
                },
                set(val) {
                    this.currentType = val;
                }
            }
        },
        methods: {
            countDown() {
                const t = setInterval(() => {
                    if (--this.countdown <= 0) {
                        this.countdown = 0;
                        clearInterval(t);
                    }
                }, 1000);
            },
            //获得验证码
            getCode() {
                if (!this.canGetCode) return;
                const phone = this.phone;
                const email = this.email;
                let params = this.verifiable_type === SMS ? {
                    phone
                } : {
                    email
                };
                this.$http
                .post("verifycodes/register", params, {
                    validateStatus: status => status === 202
                })
                .then(() => {
                    this.countdown = 60;
                    this.countDown();
                    this.error = "";
                    this.is_phone = true
                })
                .catch(error => {
                    let title = error.response.data.message
                    this.$toast(title)
                });
            },
            //检查验证码是否正确
            checkCode(){
                if(this.verifiable_code.length === 6) {
                    this.$http.post("/verifycodes/validate", {
                        phone:this.phone,
                        verifiable_code: this.verifiable_code,
                    }).catch(() => resArray)
                    .then(response => {
                        if(response.data.data.istrue){
                            this.is_code = false
                        }else{
                            this.$toast('验证码不正确！')
                            this.loading = false;
                            this.is_code = true
                        }
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$toast('输入验证密码不正确');
                    });
                }
            },
            signUp() {
                const {
                    phone,
                    email,
                    password,
                    verifiable_code: verifiableCode,
                    verifiable_type: verifiableType,
                    confirmPassword,
                    user_type,
                } = this.$data;


                // 手机号
                if (verifiableType === SMS && !phoneReg.test(phone)) {
                    this.$toast("请输入正确的手机号码");
                    return;
                }


                // 邮箱
                if (verifiableType !== SMS && !emailReg.test(email)) {
                    this.$toast("请输入正确的邮箱号码");
                    return;
                }


                // 密码长度
                if (password.length < 6) {
                    this.$toast("密码长度必须大于6位");
                    return;
                }

                if (confirmPassword.length < 6) {
                    this.$toast("密码长度必须大于6位");
                    return;
                }

                if (confirmPassword !== password) {
                    this.$toast("两次输入密码不一致");
                    return;
                }

                let params = {
                    phone,
                    email,
                    verifiable_code: verifiableCode,
                    password,
                    verifiable_type: verifiableType,
                    org_type: user_type,
                };
                this.loading = true;
                verifiableType === SMS ? delete params.email : delete params.phone;
                this.$lstore.setData(REGISTER_DATA, params);
                this.$router.push({
                    path: 'register-step2',
                    params,
                    query: {
                        hashid: this.hashid
                    }
                })
            },
            changeType() {
                switch (this.currentType) {
                    case SMS:
                        this._$type = EMAIL;
                        break;
                    case EMAIL:
                        this._$type = SMS;
                        break;
                }
            },
            popProtocol() {
            },

        },
        created() {
            if (this.$lstore.hasData(REGISTER_DATA)) {
                let reigsterData = this.$lstore.getData(REGISTER_DATA)
                this.$data = Object.assign(this.$data, reigsterData)
            }
            if (!!this.$route.query.user_type) {
                this.user_type = parseInt(this.$route.query.user_type);
            }
            if(this.$route.query.hashid) {
                this.hashid = this.$route.query.hashid
            }

        }
    };
</script>

<style lang="scss" scoped>
    .p-signup {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: #fff;

        > * {
            width: 100%;
        }

        .m-form-row {
            label {
                flex: 0 0 30 * 4px;
                width: 30 * 4px;
            }

            .m-input {
                padding: 0 30px 0 0;
            }

            .code-text {
                color: $primary;

                &.disabled,
                &[disabled] {
                    color: #ccc;
                    border-color: #ccc;
                }
            }

            &-append {
                flex: 0 0 170px;
                width: 170px;
                text-align: right;

                svg {
                    width: 38px;
                    height: 38px;
                    fill: #b3b3b3;
                }
            }
        }

    }

    body {
        background: #fff;
    }

    .icon-svg {
        width: 25px;
        height: 25px;
        color: #26A2FF;
    }

    .signup-form--row-append.disabled,
    .signup-form--row-append[disabled] {
        color: #d3d3d3;
    }

    .p-signup .m-form-row .m-input {
        padding: 0 30px 0 0;
    }

    .p-signup .m-form-row label {
        flex: 0 0 40px;
    }

    .m-form-row {
        font-size: 14px;
        height: 1rem;
        padding: 0px;
    }

    .m-form-row .m-input input {
        font-size: 14px;
        height: .9rem;
        padding-left: .2rem;
    }

    .p-signup .m-form-row .m-input[data-v-0b31f523] {
        padding: 0 10px 0 0;
    }

    .p-signup .m-form-row .code-text {
        color: #26A2FF;
        font-size: 10px;
        padding: 2px 5px;
        border-radius: 4px;
        border: 1px solid #26A2FF;
        width: 84px;
        position: absolute;
        right: .46rem;
        text-align: center;
    }

    main {
        padding: 20px;
        background: #fff;
    }

    .m-long-btn {
        height: 1rem;
        background: #26A2FF;
        color: #fff;
        font-size: 16px;

        &[disabled] {
            background: #ccc;
        }
    }

    .zcxy {
        text-align: center;
        padding: 0.2rem;

        .register-protocol {
            font-size: 0.3rem;
            color: #666;
        }
    }

    .error-info {
        padding: .2rem;
        font-size: .24rem;
        color: #f30000;
    }
</style>