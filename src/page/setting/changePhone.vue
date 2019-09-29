<template>
    <div>
        <clxsd-head-top :title='`更换手机号`'></clxsd-head-top>
        <div v-if="is_change">
            <div class="m-form-row m-main">
                手机号 &nbsp;&nbsp;&nbsp; {{phone | filter_mobile}}
            </div>
            <button  class="send-again" @click="is_change = !is_change" >
                <span>更换手机号</span>
            </button>
        </div>
        <!--输入并验证新手机号-->
        <div v-else>
            <div v-if="is_next">
                <div class="m-form-row m-main">
                    <label for="phone">手机号</label>
                    <div class="m-input">
                        <input id="phone" v-model="newPhone"  type="tel"  autocomplete="off" placeholder="请输入新的手机号码" @input="handleNewPhone">
                    </div>
                </div>
                <div class="title-container">
                    <p class="p1"><span>{{message}}</span></p>
                </div>
                <button  class="send-again"  :disabled = "disabled" @click="sendSmsCode" >
                    <span>下一步</span>
                </button>
            </div>
            <!--验证码发送-->
            <div v-else>
                <p class="tel">手机号：<span>{{newPhone | filter_mobile}}</span></p>
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
                    <button class="send-again" @click="sendSmsCode" :disabled="loading||disabled" >点击重新发送</button>
                </div>
            </div>
        </div>
        <CircleLoading v-if="loading" />
    </div>
</template>

<script>
    import { phonePattern} from "@/util";
    import {mapState} from "vuex";
    import CircleLoading from "@/icons/CircleLoading";
    export default {
        name: "changePhone",
        components: {CircleLoading},
        data() {
            return {
                is_change:true,
                is_next:true,
                newPhone:"",
                disabled:true,
                message:null,
                code:[],
                countdown:0,
                loading: false,
            };
        },
        computed:{
            ...mapState({
                USER_INFO: state => state.CURRENTUSER.data.userInfo
            }),
            phone(){
                return this.USER_INFO.phone;
            },

        },
        methods:{
            //判断新手机号是否注册
            handleNewPhone(){
                if(phonePattern.test(this.newPhone)){
                    this.loading = true;
                    this.$http.get('users/check-phone',{
                        params:{phone: this.newPhone},
                        validate:state => state === 200
                    }).then(response => {
                        this.loading = false;
                        if(response.data.status){
                            this.message = "此手机号已经被注册";
                        }else{
                            this.message = null;
                            this.disabled = false;
                        }
                        //this.$toast("此手机号已经被注册");
                    }).catch(error => {
                        this.loading = false;
                        this.error = error.response.data.message;
                        this.$toast(error.response.data.message);
                    })
                }
            },
            countDown() {
                const t = setInterval(() => {
                    if(--this.countdown <= 0) {
                        this.countdown = 0;
                        clearInterval(t);
                    }
                }, 1000);
            },

            //发送验证码
            sendSmsCode(){
                this.is_next = ! this.is_next;
                if(this.loading) return;
                let params = {
                    phone:this.newPhone,
                };
                this.loading = true;
                this.$http.post("verifycodes/register", params, {
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
            //验证码是否正确更换手机号
            handleCode(){
                if(this.code.length === 6) {
                    let params = {
                        verifiable_code: this.code,
                        phone:this.newPhone
                    };
                    this.$http.put("user/phone-email", params, {
                        validateStatus: status => status === 204
                    })
                    .then(response => {
                        this.loading = false;
                        this.$toast('修改成功！')
                        this.$store.dispatch("fetchUserInfo");
                        this.goBack(-1)
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$toast('输入验证不密码正确');
                    });
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
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
    .send-again {
        display: block;
        height: .88rem;
        border-radius: 4px;
        margin: 0 auto;
        color: #fff;
        background: none;
        font-size: .28rem;
        background: #26a2ff;
        width: 95%;
        margin-top: .2rem;
        margin-bottom: .2rem;
        &:disabled {
            background: #ccc;
        }
    }
    .info {
        padding-left: .2rem;
    }
    .title-container {
        background: #fff;
        text-align: center;
        font-size: .26rem;
        color: #666;
        line-height: 1.4rem;
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
</style>