<template>
	<transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
		<div class="m-box-model  p-signin">
			<div class="logo"></div>
			<main class="m-box-model m-flex-grow1">
				<div class="m-form-row m-main">
					<label for="account"><svg class="icon-svg"><use xlink:href="#icon-denglushoujihao"/></svg></label>
					<div class="m-input">
						<input id="account" v-model="account" type="text" placeholder="手机号/邮箱">
					</div>
					<svg v-show="account.length > 0" class="m-style-svg m-svg-def" @click="account = ''">
						<use xlink:href="#icon-clean" />
					</svg>
				</div>
				<div class="m-form-row m-main">
					<label for="password"><svg class="icon-svg"><use xlink:href="#icon-denglumima"/></svg></label>
					<div class="m-input">
						<input v-if="eye" id="password" v-model="password" type="text" maxlength="16" placeholder="输入6位以上登录密码">
						<input v-else id="password" v-model="password" maxlength="16" type="password" placeholder="输入6位以上登录密码" @keyup.enter="signinByAccount">
					</div>
					<svg class="m-style-svg m-svg-def" @click="eye = !eye">
						<use :xlink:href="eye ? '#icon-eye-open' : '#icon-eye-close'" />
					</svg>
				</div>
				<div class="m-box m-aln-center m-text-box m-form-err-box">
					<span>{{ err | plusMessageFirst }}</span>
				</div>
				<div class="m-form-row" style="border: 0">
					<button :disabled="disabled" class="m-long-btn m-signin-btn" @click="signByAccount">
                        <circle-loading v-if="loading" />
                        <span v-else>登录</span>
                    </button>
				</div>
				<div class="m-box m-aln-center m-justify-bet other-link">
					<router-link tag="span" to="/forgot">
						<a>忘记密码</a>
					</router-link>
					<router-link tag="span" to="/register-choice">
						<a>注册</a>
					</router-link>
				</div>
			</main>

			<!---是否从微信进入-->
            <!--
			<footer v-if="isWechat" class="m-box-model m-trhsignin">
				<div class="m-box m-aln-center m-justify-aro m-trhsignin-list">
					<div class="m-box m-fd-col m-aln-center m-tr-item" @click="signinByWechat">
						<div class="m-tr-item-icon" style="height: auto; margin-bottom: 0px;">
							<svg class="m-style-svg m-svg-def">
								<use xlink:href="#icon-weixin" />
							</svg>
						</div>
						<span>微信</span>
					</div>
				</div>
			</footer>
            -->
		</div>
	</transition>
</template>

<script>
	import { signinByAccount, fetchUserInfo } from "@/api/user";
	import { signinByWechat } from "@/util/wechat";
	import { mapActions } from "vuex"
	import { Toast } from 'mint-ui';
	export default {
		name: "Signin",
		data() {
			return {
				err: "",
				eye: false,
				account: "",
				password: "",
				loading: false,
				isTrue: false
			}
		},
		computed: {
			disabled() {
				return(
					this.account.length === 0 || this.password.length < 6 || this.loading
				);
			},
			isWechat() {
				return this.$store.state.BROWSER.isWechat;
			}
		},
		methods: {
		    async  signByAccount() {
				// console.log(this.$route)
				// return
				// debugger
				this.err = "";
				if(this.account.length === 0) {
					Toast('账户不正确');
					//this.err = "账户不正确";
					return false;
				}

				if(this.password.length < 6) {
					Toast('密码至少6位数，请输入正确的登陆密码');
					this.err = "密码不正确";
					return false;
				}
				let stateType = true
				this.loading = true;
				await signinByAccount({
					login: this.account,
					password: this.password
				}).then(state => {
					this.loading = false
					if(state.access_token) {
						Toast("登陆成功");
						this.isTrue = true
					} else {
						return false
					}
				}).catch(error =>{
				})
				if(this.isTrue) {
					await this.$store.dispatch("fetchUserInfo");
				this.$router.push(this.$route.fullPath.redirect || "/");
				}
				
			},
			...mapActions([
				'UPDATECURRENTUSER'
			])
		}
	}
</script>

<style lang="scss" scoped>
	.logo{
		height:5rem;
		width:100%;
		background: url("~@/images/login/logo.png") no-repeat center;
		background-size: cover;
	}
	.m-main {
		font-size: 14px;
	}
	
	.p-signin {
		background-color: #ffff;
		min-height: 100%;
		.other-link {
			margin-top: 25px;
			margin-bottom: 25px;
			padding: 0 30px;
			font-size: 14px;
			a {
				color: $text-color3;
			}
		}
		.dynamic-signin {
			font-size: 14px;
			margin-top: 80px;
			text-align: center;
		}
		.m-trhsignin {
			position: relative;
			text-align: center;
			padding: 20px 30px;
			&:before {
				position: absolute;
				top: 0;
				left: 80px;
				right: 80px;
				content: "";
				display: block;
				height: 0;
				border-top: 1px solid #ccc;
				/*no*/
			}
			&:after {
				color: #ccc;
				content: "社交账号登陆";
				display: inline-block;
				position: absolute;
				top: 0;
				left: 50%;
				transform: translate(-50%, -50%);
				padding: 0 10px;
				background-color: #f4f5f6;
			}
			.m-tr-item {
				font-size: 12px;
				line-height: 26px;
				color: $text-color3;
				&-icon {
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 20px;
					width: 80px;
					height: 80px;
					border-radius: 40px;
					background-color: #ffffff;
					.m-svg-def {
						width: 38px;
						height: 38px;
					}
				}
			}
		}
	}
	.icon-svg,.m-form-row .m-svg-def {
		width: 25px;
	}
	.m-form-row {
		font-size: 14px;
		height: 1rem;
		padding: 0px;
		label {
			width: 40px;
		}
		.m-input {
			padding: 0px 5px;
		}
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
	
	main {
		padding: 20px;
		background: #fff;
	}
	.m-long-btn {
		height: 1rem;
		background: #26A2FF;
		color: #fff;
		font-size: 16px;
	}
	.tel-login {
		text-align: center;
		font-size: .3rem;
		margin-bottom: .3rem;
	}
</style>