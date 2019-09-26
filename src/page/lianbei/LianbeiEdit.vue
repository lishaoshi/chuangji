<template>
	<div id="LianbeiEdit">
		<clxsd-head-top title="我要发布"></clxsd-head-top>
		<div class="publish-box">
			<label>类别</label>
			<mt-radio  v-model="value" :options="['出售联贝', '购买联贝']">
			</mt-radio>
		</div>
	</div>
</template>
<script>
	export default {
		name: "LianbeiEdit",
	}
</script>

<style lang="scss" scoped>
	.publish-box {
		background: #fff;
		height: 1rem;
		line-height: 1rem;
		display: flex;
		padding: 0 .2rem;
		label {
			width: 1rem;
			display: inline-block;
			color: #666;
			font-size: .3rem;
		}
	}
	.mint-radiolist {
		display: flex;
	}
.mint-cell-wrapper {
	font-size: 14px;
}
</style>