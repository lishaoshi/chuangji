<template>
<div id="CompanyForgot">
		<mt-header title="修改登陆密码">
			<router-link to="/company-go-login" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="change">
			<div class="tel">注册手机号：<span>123*****234</span></div>
			<div class="info">我们已发送<span>验证码</span>到此手机</div>
		</div>
		<div class="m-form-row m-main">
			<label for="code">验证码</label>
			<div class="m-input">
				<input id="code" v-model.trim="verifiable_code" type="number" pattern="[0-9]*" oninput="value=value.slice(0, 6)" placeholder="输入4-6位验证码">
			</div>
			<span class="send">50秒后重发</span>
		</div>
</div>
</template>

<script>
	export default {
		name: "CompanyForgot",
		data() {

		}
	}
</script>

<style lang="scss" scoped>
.change {
	background: #fff;
	margin-top: .15rem;
	.tel {
		line-height: 1rem;
		font-size: .26rem;
		padding: 0 .2rem;
		border-bottom: 1px solid #f1f1f1;
		color: #5C5C5C;
		span {
			color: #333;
			font-size: .32rem;
		}
	}
	.info {
		text-align: center;
		padding: .5rem 0px;
		font-size: .3rem;
		color: #7C7C7C;
		letter-spacing: 1px;
		span {
			font-size: .32rem;
			color: #333;
		}
	}
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
		padding: 0px .15rem;
		margin-top: .15rem;
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
		border: 1px solid #26A2FF
	}
	.send {
		font-size: 10px;
		border:1px solid #ccc;
		padding: 2px 5px;
		border-radius: 3px;
		color: #ccc;
	}
</style>