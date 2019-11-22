<template>
	<transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
		<div class="m-box-model  p-signin">
			<div class="logo"></div>
			<main class="m-box-model m-flex-grow1">
				<div class="m-form-row m-main">
					<label for="account"><svg class="icon-svg"><use xlink:href="#icon-denglushoujihao"/></svg></label>
					<div class="m-input">
						<input id="account" v-model="account" type="number" placeholder="手机号">
					</div>
					<svg v-show="account.length > 0" class="m-style-svg m-svg-def" @click="account = ''">
						<use xlink:href="#icon-clean" />
					</svg>
				</div>
				<div class="m-form-row m-main">
					<label for="password"><svg class="icon-svg"><use xlink:href="#icon-denglumima"/></svg></label>
					<div class="m-input">
						<input v-if="eye" id="password" v-model="password" type="text" maxlength="16" placeholder="输入6位以上登录密码">
						<input v-else id="password" v-model="password" maxlength="16" type="password" placeholder="输入6位以上登录密码" @keyup.enter="signByAccount">
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
		created() {
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
					Toast('请输入正确的密码');
					// this.err = "密码不正确";
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
		// background: url("~@/images/login/logo.png") no-repeat center;
		background: url("data:image/png;base64,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") no-repeat center;
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