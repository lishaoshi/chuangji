<template>
    <div id="ForgetPayPassword">
        <clxsd-head-top title='修改支付密码'></clxsd-head-top>
        <div v-if="is_forget_psw">
            <p class="tel">手机号：<span>{{phone | filter_mobile}}</span></p>
            <div class="title-container">
                <p class="p1">我们已发送<span>验证码</span>到此手机</p>
            </div>
            <div class="codeNum">
                <span>{{code[0]}}</span>
                <span>{{code[1]}}</span>
                <span>{{code[2]}}</span>
                <span>{{code[3]}}</span>
                <span>{{code[4]}}</span>
                <span>{{code[5]}}</span>
                <input type="text" maxlength="6" v-model="code" @input="handleCode">
            </div>
            <p class="send-info" v-if="countdown">{{countdown}}秒后重新发送</p>
            <div v-else>
                <button class="send-again" @click="handleSendTelCode" :disabled="loading||disabled" >获取验证码</button>
            </div>
        </div>
        <!--身份证验证-->
        <div v-if="is_idNum">
            <div class="title-container">
                <p class="p1">请输入<span>身份证号</span>完成身份验证</p>
            </div>
            <div class="m-form-row">
                <label for="Id">身份证号</label>
                <div class="m-input">
                    <input id="Id" v-model="id_num" type="text" maxlength="18" autocomplete="off" placeholder="请输入身份证号" @input="handleUserId">
                </div>
            </div>
        </div>
        <!--重新输入密码-->
        <div v-if="is_remeber">
            <div class="title-container">
                <p class="p1">请为当前账号{{phone | filter_mobile}}<br><span>设置六位支付密码</span></p>
            </div>
            <div class="codeNum2">
                <span><small v-if="ResetCode[0]"></small></span>
                <span><small v-if="ResetCode[1]"></small></span>
                <span><small v-if="ResetCode[2]"></small></span>
                <span><small v-if="ResetCode[3]"></small></span>
                <span><small v-if="ResetCode[4]"></small></span>
                <span><small v-if="ResetCode[5]"></small></span>
                <input type="number" maxlength="6" v-model="ResetCode"  @input="handleNewPassword">
            </div>
        </div>
        <!--再次确认密码-->
        <div v-if="is_again">
            <div class="title-container">
                <p class="p1">请再次输入密码</p>
            </div>
            <div class="codeNum2" >
                <span><small v-if="AgainCode[0]"></small></span>
                <span><small v-if="AgainCode[1]"></small></span>
                <span><small v-if="AgainCode[2]"></small></span>
                <span><small v-if="AgainCode[3]"></small></span>
                <span><small v-if="AgainCode[4]"></small></span>
                <span><small v-if="AgainCode[5]"></small></span>
                <input type="number" maxlength="6" v-model="AgainCode" @input="handleAgainPassword">
            </div>
        </div>


        <CircleLoading icon="loading-copy" v-if="loading"></CircleLoading>
    </div>
</template>

<script>
    import CircleLoading from "../../icons/CircleLoading";
    import { idl18nReg } from "@/util";
    import {mapState} from "vuex";
    export default {
        name: "ForgetPayPassword",
        components: {CircleLoading},
        data() {
            return {
                code: [],
                AgainCode:[],//确认密码
                ResetCode:[],//密码
                loading: false,
                countdown:0,
                is_forget_psw:true,
                is_idNum:false,
                id_num:'',//身份证
                is_remeber:false,
                is_again:false,
                send_again:false,
            };
        },
        computed:{
            ...mapState({
                USER_INFO: state => state.CURRENTUSER.data
            }),
            User_Id(){
                return this.USER_INFO.user_identity;
            },
            phone(){
                return this.USER_INFO.phone;
            }

        },
        methods:{
            countDown() {
                const t = setInterval(() => {
                    if(--this.countdown <= 0) {
                        this.countdown = 0;
                        clearInterval(t);
                    }
                }, 1000);
            },
            handleCode(){
                if(this.code.length === 6) {
                    let params = {
                        verifiable_code: this.code,
                    };
                    this.$http.get("/verifycodes/check", {params,validate: state => state === 200})
                    .then(response => {
                        if(response.data.status){
                            this.is_forget_psw =false
                            this.is_idNum=true
                        }else{
                            this.$toast('验证码不证确！')
                        }

                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$toast('输入验证不密码正确');
                    });
                }
            },
            handleSendTelCode(){
                this.code = []
                this.sendSmsCode()
            },
            handleUserId(){
                if(idl18nReg.test(this.id_num)) {
                    this.loading = true;
                    this.$http.get('user/check-identity',{
                        params:{
                            user_identity:this.id_num
                        },
                        validate: state => state === 200
                    }).then(response => {
                        this.loading = false;
                        if(response.data.status){
                            this.is_idNum = false
                            this.is_forget_psw = false
                            this.is_remeber = true
                        }else{
                            this.$toast('身份证验证失败！');
                        }

                    }).catch(error => {
                        this.loading = false;
                    })
                }

            },
            handleNewPassword(){
                if(this.ResetCode.length === 6) {
                    this.is_remeber = false
                    this.is_again = true
                }
            },
            handleAgainPassword(){
                if(this.AgainCode.length === 6) {
                    if (this.ResetCode === this.AgainCode) {
                        this.loading = true;
                        this.$http.post('safe/set-zhi',{
                                newPassword:this.AgainCode,
                                verifiable_code:this.code,
                                type:'phone'
                            },
                            {validate: state => state === 204
                        }).then(response =>{
                            this.loading = false;
                            this.$toast('修改成功');
                            this.goBack();

                        }).catch(error => {
                            let message = error.response.data.message ?
                                error.response.data.message:'修改失败！';
                            this.loading = false;
                            this.$toast(message)
                        })
                    }else {
                        this.$messagebox.confirm("确认密码和再次输入密码不一致,确认返回重新输入新密码吗?").then(action => {
                            if(action === 'confirm'){
                                this.is_remeber = true
                                this.is_again = false
                                this.ResetCode = ""
                                this.AgainCode = ""
                            }
                        }).catch(err => {
                            this.AgainCode = ""
                        });
                    }
                }
            },
            initData(){

                this.sendSmsCode();
            },
            //发送验证码
            sendSmsCode(){
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
            }
        },
        created() {
            this.initData()
        }

    }
</script>

<style scoped lang="scss">
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

    .codeNum {
        height: 2rem;
        width: 85%;
        margin: 0 auto;
        position: relative;
        text-align: left;

        > span {
            border-bottom: 1px solid #666;
            display: inline-block;
            width: .68rem;
            height: 1.5rem;
            margin-left: .4rem;
            text-align: center;
            vertical-align: middle;
            line-height: 1.9rem;
            font-size: .5rem;
            &:first-child {
                margin-left: 0;
            }
        }

        > input {
            position: absolute;
            width: 100%;
            letter-spacing: 1.3rem;
            padding-left: 0.3rem;
            color: #fff;
            opacity: 0;
            left: 0;
            height: 100%;
            font-size: .4rem;
        }
    }
    .send-info {
        text-align: center;
        font-size: .26rem;
        color: #666;
        line-height: 1rem;
    }
    .m-form-row {
        font-size: 14px;
        height: 1rem;
        padding: 0px;
        background: #fff;
        padding: 0 .2rem;
        margin-top: .2rem;
    }
    .m-form-row .m-input input {
        font-size: 14px;
    }

    .p-forgot .m-form-row label {
        width: 100px;
    }
    .codeNum2 {
        height: 1rem;
        width: 85%;
        margin: .4rem auto;
        position: relative;
        text-align: left;
        background: #fff;
        border:1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
        > span {
            border-right: 1px solid #ccc;
            display: inline-block;
            width: 16.6%;
            height: 1rem;
            text-align: center;
            vertical-align: middle;
            small {
                width: 10px;
                height: 10px;
                background: #333;
                border-radius: 100%;
                display: inline-block;
                margin-top: .42rem;
            }
            &:first-child {
                margin-left: 0;
            }
            &:nth-child(6) {
                border:0px
            }
        }

        > input {
            position: absolute;
            width: 100%;
            letter-spacing: 1.3rem;
            padding-left: 0.3rem;
            color: #fff;
            opacity: 0;
            left: 0;
            height: 100%;
            font-size: .4rem;
        }
    }
    .send-again {
        display: block;
        height: 1rem;
        border-radius: 4px;
        margin: 0 auto;
        color: #26a2ff;
        background: none;
        font-size: .26rem;
        &:disabled {
            color: #ccc;
        }
    }
</style>