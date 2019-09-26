<template>
	<div class="SiteUpgrade">
		<clxsd-head-top :title="'功能开发中...'"></clxsd-head-top>
		<div class="detail">
			<img src="../images/developing.png" width="50%">
			<p>
				<span>功能开发中, 敬请期待...</span>
			</p>
		</div>

	</div>
</template>

<script>
	export default {
		name: "SiteUpgrade"
	}
</script>

<style scoped lang="scss">
	.detail {
		font-size: .3rem;
		text-align: center;
		padding-top: 2rem;
		line-height: 3;
		color: #575757;
	}
</style>