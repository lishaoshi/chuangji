<template>
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
        <div class="p-signup">
            <clxsd-head-top title='' style="border:0px"></clxsd-head-top>
            <img src="../../images/login/icon.png" width="100%">
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
                is_phone:false
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
                .catch(({response: {data: {error = ['加载失败']} = {}} = {}}) => {
                    this.error = error;
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
                        console.log(response.data.data.istrue)
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
                    params
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