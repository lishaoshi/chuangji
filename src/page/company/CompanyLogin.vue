<template>
	<transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
		<div class="m-box-model m-pos-f p-signin">
			<mt-header>
				<router-link to="/company-go-login" slot="left">
					<mt-button icon="back"></mt-button>
				</router-link>
			</mt-header>
			<div class="logo">
				<img src="../../images/default.jpg">
				<p>某某某药业</p>
			</div>
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
					<button :disabled="disabled" class="m-long-btn m-signin-btn" @click="signinByAccount">
                        <circle-loading v-if="loading" />
                        <span v-else>登录</span>
                    </button>
				</div>
				<div class="other-link">
					<router-link  to="/company-forgot">
						<a>忘记密码</a>
					</router-link>
				</div>
			</main>

			<!---是否从微信进入-->
			<footer v-if="isWechat" class="m-box-model m-trhsignin">
				<div class="m-box m-aln-center m-justify-aro m-trhsignin-list">
					<div class="m-box m-fd-col m-aln-center m-tr-item" @click="signinByWechat">
						<div class="m-tr-item-icon">
							<svg class="m-style-svg m-svg-def">
								<use xlink:href="#icon-login-wechat" />
							</svg>
						</div>
						<span>微信</span>
					</div>
				</div>
			</footer>
		</div>
	</transition>
</template>

<script>
	import { signinByAccount } from "@/api/user";
	import { signinByWechat } from "@/util/wechat";
	export default {
		name: "CompanyLogin",
		data() {
			return {
				err: "",
				eye: false,
				account: "",
				password: "",
				loading: false
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
			signinByWechat,
			signinByAccount() {
				this.err = "";
				if(this.account.length === 0) {
					this.err = "账户不正确";
					return false;
				}

				if(this.password.length < 6) {
					this.err = "密码不正确";
					return false;
				}

				this.loading = true;

				signinByAccount({
					login: this.account,
					password: this.password
				}).then(state => {
					console.log(state);
					this.loading = false;
					state &&
						this.$nextTick(() => {
							this.$router.push(this.$route.query.redirect || "/");
						});
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.logo {
		background: #26A2FF;
		text-align: center;
		padding: .6rem 0px;
		padding-bottom: .8rem;
		color: #fff;
		font-size: .32rem;
		line-height: 150%;
		img {
			width: 40%;
			height: 1.5rem;
			border-radius: .2rem;
		}
	}
	.m-main {
		font-size: 14px;
	}
	
	.p-signin {
		background-color: #f4f5f6;
		.other-link {
			margin-top: 2.8rem;
			text-align: center;
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
		border-radius: 1rem;
		&[disabled] {
			background: #26A2FF;
		}
	}
	.p-signin .dynamic-signin[data-v-12c8c2a6] {
		position: fixed;
		width: 100%;
		bottom: 1rem;
	}
</style>