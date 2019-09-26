<template>
    <div>
        <clxsd-head-top title='支付密码设置'></clxsd-head-top>
        <div class="title-container">
            <p class="p1" v-if="is_remeber">请为当前账号{{phone | filter_mobile}}<br><span>设置六位支付密码</span></p>
            <p class="p1" v-if="is_again">请再次输入密码</span></p>
            <p class="p1" v-if="is_remeber === false && is_again === false">输入<span>支付密码</span>完成身份验证</p>
        </div>
        <div class="codeNum"  v-if="is_remeber">
            <span><small v-if="ResetCode[0]"></small></span>
            <span><small v-if="ResetCode[1]"></small></span>
            <span><small v-if="ResetCode[2]"></small></span>
            <span><small v-if="ResetCode[3]"></small></span>
            <span><small v-if="ResetCode[4]"></small></span>
            <span><small v-if="ResetCode[5]"></small></span>
            <input type="number" maxlength="6" v-model="ResetCode"  @input="handleNewPassword">
        </div>
        <div class="codeNum"  v-if="is_again">
            <span><small v-if="AgainCode[0]"></small></span>
            <span><small v-if="AgainCode[1]"></small></span>
            <span><small v-if="AgainCode[2]"></small></span>
            <span><small v-if="AgainCode[3]"></small></span>
            <span><small v-if="AgainCode[4]"></small></span>
            <span><small v-if="AgainCode[5]"></small></span>
            <input type="number" maxlength="6" v-model="AgainCode" @input="handleAgainPassword">
        </div>

        <div class="codeNum" v-if="is_remeber == false && is_again == false">
            <span><small v-if="code[0]"></small></span>
            <span><small v-if="code[1]"></small></span>
            <span><small v-if="code[2]"></small></span>
            <span><small v-if="code[3]"></small></span>
            <span><small v-if="code[4]"></small></span>
            <span><small v-if="code[5]"></small></span>
            <input type="number" maxlength="6" v-model="code" @input="handleOldPassword">
        </div>
        <CircleLoading v-if="loading" />
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import CircleLoading from "../../icons/CircleLoading";
    export default {
        name: "RemoberPassword",
        components: {CircleLoading},
        data() {
            return {
                code:[],
                is_remeber:false,
                is_again:false,
                loading:false,
                AgainCode:[],
                ResetCode:[]
            };
        },
        computed:{
            ...mapState({
                USER_INFO: state => state.CURRENTUSER
            }),
            phone(){
                return this.USER_INFO.phone;
            }
        },
        methods: {
            handleOldPassword(){
                if(this.code.length === 6){
                    this.loading = true;
                    this.$http.get('safe/check-zhi',{
                        params:{password:this.code},
                        validate: state => state === 200
                    }).then(response =>{
                        this.loading = false;
                        if(response.data.verifyStatus){
                            this.$toast('输入密码正确');
                            this.is_remeber = true
                        }else{
                            this.$toast('输入密码不正确，请重新输入');
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
                            oldPassword:this.code,
                            type:'password'
                            },
                            {validate: state => state === 200
                        }).then(response =>{
                            this.loading = false;
                            this.$toast('修改成功');
                            this.goBack();
                        }).catch(error => {
                            this.loading = false;
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

        }

    }
</script>

<style lang="scss" scoped>
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
    .codeNum {
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
</style>