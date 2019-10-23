<template>
	<div class="p-forgot forgot signup">
		<mt-header class="mint-header" title="">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<img src="../../images/login/icon.png" width="100%">
		<main>
			<div v-if="verifiable_type === 'sms'" class="m-form-row m-main send-code">
				<label for="phone"><svg class="icon-svg"><use xlink:href="#icon-denglushoujihao"/></svg></label>
				<div class="m-input">
					<input id="phone" v-model="phone" type="number" autocomplete="off" pattern="[0-9]*" oninput="value=value.slice(0, 11)" placeholder="输入11位手机号">
				</div>
				<span :class="{ disabled: phone.length < 11 || countdown > 0 }" class="m-flex-grow0 m-flex-shrink0 signup-form--row-append c_59b6d7 inp-sp" @click="getCode">{{ codeText }}</span>
			</div>
			<div v-if="verifiable_type === 'mail'" class="m-form-row m-main send-code">
				<label for="mail"><svg class="icon-svg"><use xlink:href="#icon-denglushoujihao"/></svg></label>
				<div class="m-input">
					<input id="mail" v-model="email" type="mail" autocomplete="off" placeholder="输入邮箱地址">
				</div>
				<span :class="{ disabled: email.length < 11 || countdown > 0 }" class="signup-form--row-append c_59b6d7" @click="getCode">{{ codeText }}</span>
			</div>
			<div class="m-form-row m-main">
				<label for="code"><svg class="icon-svg"><use xlink:href="#icon-zhuceyanzhengma"/></svg></label>
				<div class="m-input">
					<input id="code" v-model.trim="verifiable_code" type="number" pattern="[0-9]*" oninput="value=value.slice(0, 6)" placeholder="输入6位验证码">
				</div>
				<svg v-show="verifiable_code.length > 0" class="m-style-svg m-svg-def" @click="verifiable_code = ''">
					<use xlink:href="#icon-clean" />
				</svg>
			</div>

			<div class="m-form-row m-main">
				<label for="password"><svg class="icon-svg"><use xlink:href="#icon-denglumima"/></svg></label>
				<div class="m-input">
					<input v-if="eye" id="password" v-model="password" type="text" maxlength="16" placeholder="输入6位以上登录密码">
					<input v-else id="password" v-model="password" type="password" maxlength="16" placeholder="输入6位以上登录密码">
				</div>
				<svg class="m-style-svg m-svg-def" @click="eye=!eye">
					<use :xlink:href="`#icon-eye-${eye ? 'open' : 'close' }`" />
				</svg>
			</div>
			<div class="m-box m-aln-center m-text-box m-form-err-box">
				<span>{{ error | plusMessageFirst }}</span>
			</div>

			<div class="m-form-row" style="border: 0">
				<button :disabled="loading||disabled" class="m-long-btn m-signin-btn" @click="handleOk">
					<circle-loading v-if="loading" />
					<span v-else>修改</span>
        		</button>
			</div>
		</main>
	</div>
</template>

<script>
	const SMS = "sms"; // 手机
	const EMAIL = "mail"; // 邮箱
	// const phoneReg = /^(((13[0-9]{1})|14[0-9]{1}|(15[0-9]{1})|17[0-9]{1}|(18[0-9]{1}))+\d{8})$/;
	const phoneReg = /^1[345678]\d{9}$/;
	const emailReg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

	export default {
		name: "Forgot",
		data() {
			return {
				phone: "",
				email: "",
				password: "",
				verifiable_code: "",
				verifiable_type: SMS,

				eye: false,
				countdown: 0,
				loading: false,
				error: ""
			};
		},
		computed: {
			disabled: {
				get() {
					return(
						this.verifiable_code.length < 4 ||
						(this.phone.length < 11 && this.email.length < 4) ||
						this.password.length < 6
					);
				},

				set(val) {
					if(val) {
						this.phone = "";
						this.email = "";
						this.password = "";
						this.verifiable_code = "";
					}
				}
			},
			canGetCode() {
				return(
					(this.phone.length === 11 || this.email.length > 4) &&
					this.countdown === 0
				);
			},
			codeText() {
				return this.countdown > 0 ? `${this.countdown}s后重发` : "获取验证码";
			},
			_$type: {
				get() {
					let label = "";
					let label2 = "";
					switch(this.verifiable_type) {
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
						value: this.verifiable_type,
						label,
						label2
					};
				},
				set(val) {
					this.verifiable_type = val;
				}
			}
		},
		methods: {
			handleOk() {
				const {
					phone,
					email,
					password,
					verifiable_code: verifiableCode,
					verifiable_type: verifiableType
				} = this.$data;
				// 手机号
				if(verifiableType === SMS && !phoneReg.test(phone)) {
					this.$Message.error({
						phone: "请输入正确的手机号码"
					});
					return;
				}

				// 邮箱
				if(verifiableType !== SMS && !emailReg.test(email)) {
					this.$Message.error({
						email: "请输入正确的邮箱号码"
					});
					return;
				}

				// 密码长度
				if(password.length < 6) {
					this.$Message.error({
						password: "密码长度必须大于6位"
					});
					return;
				}
				if(password.length > 16) {
					this.$Message.error({
						password: "密码长度不得超过16位"
					});
					return;
				}

				let param = {
					phone,
					email,
					verifiable_code: verifiableCode,
					password,
					verifiable_type: verifiableType,
					validateStatus: s => s === 201
				};
				this.loading = true;
				verifiableType === SMS ? delete param.email : delete param.phone;
				this.$http
					.put("/user/retrieve-password", param)
					.then(() => {
						// this.$Message.success("密码修改成功, 返回重新登陆");
						this.$toast('密码修改成功')
						this.$lstore.removeData("H5_CUR_USER");
						this.$lstore.removeData("H5_ACCESS_TOKEN");
						this.$store.dispatch("SIGN_OUT");
						this.$router.push("/signin");
						this.loading = false;
					})
					.catch(() => {
						this.loading = false;
						this.disabled = true;
					});
			},
			countDown() {
				const t = setInterval(() => {
					if(--this.countdown <= 0) {
						this.countdown = 0;
						clearInterval(t);
					}
				}, 1000);
			},
			getCode() {
				if(!this.canGetCode) return;
				const phone = this.phone;
				const email = this.email;
				let param = {
					phone,
					email
				};
				this.verifiable_type === SMS ? delete param.email : delete param.phone;
				this.$http
					.post("verifycodes", param, {
						validateStatus: status => status === 202
					})
					.then(() => {
						this.countdown = 60;
						this.countDown();
						this.error = "";
					})
					.catch(
						({
							response: {
								status = null,
								data: {
									error = []
								} = {}
							} = {}
						}) => {
							if(status === 500) {
								this.error = {
									message: "网络错误,请联系管理员"
								};
								return;
							}
							if(status === 422) {
								// debugger
								// console.log(error[0])
								// this.error = error;
								this.$toast(error[0])
							}
							setTimeout(() => {
								this.error = "";
							}, 3000);
						}
					);
			},
			changeType() {
				switch(this.verifiable_type) {
					case SMS:
						this._$type = EMAIL;
						break;
					case EMAIL:
						this._$type = SMS;
						break;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
.signup {
	height: 100%;
	background: #fff;
}
	body {
		background: #fff !important;
	}
	.icon-svg {
		width: 25px;
        height: 25px;
	}
	.m-svg-def.m-svg-eye{
		color:#1d68a7;
	}
	
	.p-forgot .m-form-row .m-input {
		padding: 0 30px 0 0;
	}
	
	.p-forgot .m-form-row label {
		flex: 0 0 40px;
	}
	
	.m-form-row {
		font-size: 14px;
		height: 1rem;
		padding: 0px;
	}
	
	.m-form-row .m-input input {
		font-size: 14px;
	}
	
	.p-forgot .m-form-row label {
		width: 100px;
	}
	
	.p-forgot .m-form-row .inp-sp {
		font-size: 10px;
		padding: 2px 5px;
		border-radius: 4px;
		border: 1px solid #0090ff
	}
.p-forgot .m-form-row .disabled {
    border: 1px solid #7C7C7C;
    color: #7C7C7C;
}
	
	main {
		padding: 20px;
		background: #fff;
	}
	
	.m-long-btn {
		height: 1rem;
		background: #0090ff;
		color: #fff;
		font-size: 16px;
		&[disabled] {
			background: #0090ff;
		}
	}
	.mint-header {
		background: #0090ff;
	}

</style>