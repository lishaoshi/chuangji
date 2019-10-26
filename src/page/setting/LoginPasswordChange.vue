<template>
    <div id="LoginPasswordChange">
        <clxsd-head-top title='修改登陆密码'></clxsd-head-top>
        <!---知道旧密码-->
        <div v-if="is_know">
            <main>
                <div class="m-form-row m-main">
                    <label for="old_password">旧密码</label>
                    <div class="m-input">
                        <input id="old_password" v-model="oldPassword"  type="password"  autocomplete="off" placeholder="请输入旧密码">
                    </div>
                </div>
                <div class="m-form-row m-main">
                    <label for="new_password">新密码</label>
                    <div class="m-input">
                        <input id="new_password" v-model="newPassword"  type="password"  autocomplete="off" placeholder="输入6位以上的登录密码"
                              >
                    </div>
                </div>
                <div class="m-form-row m-main">
                    <label for="new_again_password">确认密码</label>
                    <div class="m-input">
                        <input id="new_again_password" v-model="rePassword"  type="password"  autocomplete="off" placeholder="请再次输入新设置的密码"
                              >
                    </div>
                </div>
            </main>
            <button  class="m-long-btn m-signin-btn"  @click="handleOk" :disabled="loading||disabled">
                <span>确认修改</span>
            </button>
        </div>
        <div v-else>
                <p class="tel">手机号：<span>{{phone | filter_mobile}}</span></p>
                <div class="m-form-row m-main" style="padding-left: .2rem">
                    <label for="code">验证码</label>
                    <div class="m-input">
                        <input id="code" v-model="code"  type="number"  autocomplete="off" placeholder="请输入验证码" @input="handleCode">
                    </div>
                    <span :class="{ disabled: countdown > 0 }" class="code-text" @click="getCode">{{ codeText }}</span>
                </div>
                <main>
                    <div class="m-form-row m-main">
                        <label for="new_password">新密码</label>
                        <div class="m-input">
                            <input id="new_password" v-model="newPassword"  type="password"  autocomplete="off" placeholder="请输入新密码">
                        </div>
                    </div>
                    <div class="m-form-row m-main">
                        <label for="new_again_password">确认密码</label>
                        <div class="m-input">
                            <input id="new_again_password" v-model="rePassword"  type="password"  autocomplete="off"
                                   placeholder="请再次输入新密码">
                        </div>
                    </div>
                </main>
                <button  class="m-long-btn m-signin-btn"  @click="handlePasswordOk"  :disabled="loading||disabledRes">
                    <span>确认修改</span>
                </button>
        </div>
        <p class="change-tel" @click="is_know=!is_know">{{knowTitle}}</p>
        <!--不知道旧密码，手机验证-->
        <CircleLoading icon="loading-copy" v-if="loading"></CircleLoading>
    </div>
</template>

<script>
    import CircleLoading from "../../icons/CircleLoading";
    import {mapState} from "vuex";
    export default {
        name: "LoginPasswordChange",
        data() {
            return {
                oldPassword: "",
                newPassword: "",
                rePassword: "",
                loading: false,
                error: "",
                is_know:true,
                code:null,
                countdown:0,
                is_code:true,
                psInfo:""
            };
        },
        computed: {
            ...mapState({
                USER_INFO: state => state.CURRENTUSER.data
            }),

            phone(){
                return this.USER_INFO.phone;
            },
            codeText() {
                return this.countdown > 0 ? `${this.countdown}s后重发` : "获取验证码";
            },
            disabled() {
                    return(
                        this.oldPassword.length < 6  || this.newPassword.length < 6 || this.rePassword.length < 6
                     )
            },
            disabledRes() {
                return(
                    this.rePassword.length < 6  || this.newPassword.length < 6 || this.rePassword != this.newPassword
                )
            },
            knowTitle(){
                return this.is_know ? '使用验证码修改':"使用旧密码修改"
            }
        },
        methods: {
            handleOldPassword() {
                if(this.oldPassword.length>=6) {
                    this.$http.get('safe/check-password', {
                        params: {password: this.oldPassword},
                        validate: state => state === 200
                    }).then(response => {
                        this.loading = false;
                        if (!response.data.verifyStatus) {
                            this.$toast("密码不正确，请重新输入")
                            this.oldPassword = ""
                            return
                        }
                    }).catch(error => {
                        this.loading = false;
                        this.$toast(error)
                        return
                    })
                }else {
                    this.$toast("请输入正确的密码")
                    this.newPassword = ""
                    return
                }

            },
            handleRePassword() {
                if (this.oldPassword=="") {
                    this.$toast("请输入旧密码")
                    return;
                }
                if (this.rePassword.length>=6) {
                    if(this.newPassword === this.rePassword){
                    }else {

                        this.$toast("两次密码不一致")
                        return;
                    }

                }

            },
            handleOk() {
                if(this.loading) return;
                // this.handleOldPassword()
                // 密码长度
                if(this.newPassword.length < 6 && this.rePassword <6) {
                    this.$toast("密码长度必须在6-16位之间")
                    return;
                }

                // 重复新密码
                if(this.rePassword !== this.newPassword) {
                    this.rePassword =''
                    this.newPassword =''
                    this.$toast("密码确认不一致，请重新输入")
                    return;
                }
                this.handleOldPassword()

                let param = {
                    newPassword:this.newPassword,
                    oldPassword:this.oldPassword,
                    type:'password'
                };
                this.changePassword(param)
            },

            //手机验证
            getCode() {
                if(this.loading) return;
                let params = {
                    phone:this.phone,
                    type:'phone'
                };
                this.loading = true;
                this.$http.post("verifycodes", params, {
                    validateStatus: status => status === 202
                }).then(response => {
                    this.loading = false;
                    this.countdown = 60;
                    this.countDown();
                    this.error = "";
                })
                .catch(error =>{
                    this.loading = false;
                    let message = error.response.data.message ? error.response.data.message:'发送失败！';
                    this.$toast(message)
                })
            },
            countDown() {
                const t = setInterval(() => {
                    if(--this.countdown <= 0) {
                        this.countdown = 0;
                        clearInterval(t);
                    }
                }, 1000);
            },
            handleCode() {
                if(this.code.length === 6) {
                    this.loading = true
                    let params = {
                        verifiable_code: this.code,
                        phone: this.USER_INFO.phone
                    };
                    this.$http.post("/verifycodes/validate", params,{validate: state => state === 200})
                    .then(res => {
                        // console.log()
                        // console.log(res)
                        if(res.data.data.istrue){
                            this.is_code = false
                        }else{
                            this.$toast('验证码不正确！')
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$toast('输入验证密码不正确');
                    });
                }
            },
            handlePasswordOk() {
                if(this.loading) return;

                // 密码长度
                if(this.newPassword.length < 6) {
                    this.$toast("新密码长度必须在6-16位之间")
                    return;
                }
                // if ()
                // 重复新密码
                if(this.rePassword !== this.newPassword) {
                    this.$toast("密码确认不一致，请重新输入")
                    return;
                }

                let param = {
                    newPassword:this.newPassword,
                    verifiable_code: this.code,
                    type:'phone'
                };
                this.changePassword(param)
            },
            //修改密码公有函数
            changePassword(param){
                this.loading = true;
                this.$http.post("safe/set-password", param,
                    {validate: state => state === 204})
                .then(() => {
                    this.loading = false;
                    this.$toast("密码修改成功，请使用新密码重新登陆");
                    this.$lstore.removeData("H5_CUR_USER");
                    this.$lstore.removeData("H5_ACCESS_TOKEN");
                    this.$store.dispatch("SIGN_OUT");
                    this.oldPassword = ""
                    this.newPassword = ""
                    this.rePassword =""
                    setTimeout(() => {
                        this.$router.push('/home')
                    }, 1000);
                })
                .catch(error => {
                    this.loading = false;
                    this.toast(error.response.data.message)
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .errorInfo {
        font-size: .26rem;
        color: #f30000;
        padding-left: .2rem;
        line-height: 2;
    }
    main {
        background: #fff;
        margin-top: .2rem;
        padding: 0 .2rem;
    }
    .m-form-row {
        font-size: 14px;
        height: 1rem;
        padding: 0px;
    }
    label {
        width: 56px;
    }
    .m-form-row .m-input input {
        font-size: 14px;
    }
    .m-long-btn {
        height: 1rem;
        background: #26A2FF;
        color: #fff;
        font-size: 16px;
        width: 95%;
        margin: .4rem auto;
        display: block;
        margin-top: 1rem;
        &:disabled {
            background: #ccc;
        }
    }
    .title-container {
        background: #fff;
        text-align: center;
        padding: .5rem .2rem;
        font-size: .26rem;
        color: #666;
        line-height: .45rem;
        .p1 {
            span {
                color: #333;
                font-size: .32rem;
            }
        }
    }
    .tel {
        background: #fff;
        border-bottom: 1px solid #f1f1f1;
        line-height: 1rem;
        padding: 0 .2rem;
        color: #666;
        font-size: .26rem;
        span {
            color: #333;
            font-size: .32rem;
        }
    }
    .code-text {
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
    .disabled {
        color: #666;
        border-color: #666;
    }
    .change-tel {
        position: fixed;
        bottom: 0px;
        width: 100%;
        left: 0;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: .34rem;
        color: #26a2ff;
    }
</style>