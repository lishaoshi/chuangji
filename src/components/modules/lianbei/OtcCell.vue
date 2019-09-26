<template>
	<div id="OtcCell">
		<div class="otc-item">
			<div class="otc-item-lf">
				<p>大药房</p>
				<p>09-12 13:21</p>
			</div>
			<div class="otc-item-rt">223.00</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "OtcCell",
	}
</script>

<style lang="scss" scoped>
.otc-item {
		display: flex;
		background: #fff;
		border-bottom: 1px solid #f1f1f1;
		padding: .2rem;
		align-items: center;
		justify-content: space-between;
		&-lf {
			width: 70%;
			p {
				&:nth-child(1) {
					font-size: .34rem;
					margin-bottom: .1rem;
				}
				&:nth-child(2) {
					font-size: .26rem;
					color: #666;
				}
			}
		}
		&-rt {
			font-size: .38rem;
			font-family: arial;
		}
	}
</style>