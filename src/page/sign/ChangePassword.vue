<template>
	<div class="p-change-password">
		<mt-header title="修改密码">
			<router-link to="/signin" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
			<span slot="right" @click="handleOk">更改</span>
		</mt-header>
		<img src="../../images/login/icon.png" width="100%">
		<main>
			<div class="m-form-row m-main">
				<label for="old-password">旧密码</label>
				<div class="m-input">
					<input id="old-password" v-model="oldPassword" type="password" maxlength="16" autocomplete="off" placeholder="输入6位以上的原始密码">
				</div>
			</div>
			<div class="m-form-row m-main">
				<label for="new-password">新密码</label>
				<div class="m-input">
					<input id="new-password" v-model="newPassword" type="password" maxlength="16" autocomplete="off" placeholder="输入6位以上新密码">
				</div>
			</div>
			<div class="m-form-row m-main">
				<label for="re-password">确认新密码</label>
				<div class="m-input">
					<input id="re-password" v-model="rePassword" type="password" maxlength="16" autocomplete="off" placeholder="请确认新密码">
				</div>
			</div>

			<div class="m-box m-aln-center m-text-box m-form-err-box">
				<span>{{ error | plusMessageFirst }}</span>
			</div>
		</main>
	</div>
</template>

<script>
	export default {
		name: "Forgot",
		data() {
			return {
				oldPassword: "",
				newPassword: "",
				rePassword: "",
				loading: false,
				error: ""
			};
		},
		computed: {
			disabled: {
				get() {
					const rules = [this.oldPassword, this.newPassword, this.rePassword];
					return rules.some(val => val.length < 6);
				},

				set(val) {
					if(val) {
						this.oldPassword = "";
						this.newPassword = "";
						this.rePassword = "";
					}
				}
			}
		},
		methods: {
			handleOk() {
				if(this.disabled) return;
				const {
					oldPassword,
					newPassword,
					rePassword
				} = this.$data;

				// 密码长度
				if(newPassword.length < 6) {
					this.$Message.error({
						newPassword: "新密码长度必须在6-16位之间"
					});
					return;
				}

				// 重复新密码
				if(rePassword !== newPassword) {
					this.$Message.error({
						rePassword: "密码确认不一致，请重新输入"
					});
					return;
				}

				let param = {
					old_password: oldPassword,
					password: newPassword,
					password_confirmation: rePassword,
					validateStatus: s => s === 204
				};
				this.loading = true;
				this.$http
					.put("/user/password", param)
					.then(() => {
						this.$Message.success("密码修改成功, 返回重新登陆");
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
			}
		}
	};
</script>

<style lang="scss" scoped>
	.p-change-password {
		.submit-btn {
			color: $primary;
			&.disabled {
				color: $gray;
			}
		}
		.m-form-row {
			.m-input {
				padding-right: 30px;
			}
			label {
				width: 180px;
			}
		}
	}
	
	.p-forgot .m-form-row label {
		flex: 0 0 60px;
	}
	
	body,
	html {
		background: #fff;
	}
	
	.m-form-row {
		font-size: 14px;
		height: 38px;
		padding: 0px;
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
	}
	
	.p-change-password .m-form-row label[data-v-d719fc14] {
		width: 75px;
	}
</style>