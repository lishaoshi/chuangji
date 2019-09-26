<template>
	<div id="GoLogin">
		<mt-header title="医药系统推荐">
			<router-link to="/global-warehouse" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
			<router-link to="/company-login" slot="right">
				<span>去登陆</span>
			</router-link>
		</mt-header>
		<img src="../../images/recommended.png" width="100%">
		<a href="tel:123455677889" class="tel"><span>咨询电话：122455667778</span>
			<svg class="m-style-svg">
				<use xlink:href="#icon-dianhua" />
			</svg>
		</a>
	</div>
</template>

<script>
	export default {
		name: "GoLogin",
	}
</script>

<style lang="scss" scoped>
	.tel {
		position: fixed;
		display: flex;
		justify-content: space-between;
		background: #fff;
		font-size: .32rem;
		line-height: 250%;
		bottom: 0px;
		width: 100%;
		border-top: 1px solid #f1f1f1;
		padding: 0 .2rem;
	}
	
	.m-style-svg {
		width: .5rem;
		height: .5rem;
		margin-top: .1rem;
	}
</style>