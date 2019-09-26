<template>
	<div id="CompanyFooterNav">
		<div class="footer-fade"></div>
		<footer class="clxsd-foot-guide foot-guide">
			<section :class="{active: isCurPath('/business-shop')}" class="clxsd-guide-item guide-item" @click="to('/business-shop')">
				<svg class="m-style-svg m-svg-def">
					<use xlink:href="#icon-global-footer-home-1" v-if="isCurPath('/business-shop')" />
					<use xlink:href="#icon-global-footer-home-0" 　v-else/>
				</svg>
				<span>首页</span>
			</section>
			<section :class="{active: isCurPath('/company-product-list')}" class="clxsd-guide-item guide-item" @click="to('/company-product-list')">
				<svg class="m-style-svg m-svg-def">
					<use xlink:href="#icon-global-footer-classify-1" v-if="isCurPath('/company-product-list')" />
					<use xlink:href="#icon-global-footer-classify-0" 　v-else/>
				</svg>
				<span>分类</span>
			</section>
			<section :class="{active: isCurPath('/company-my-order')}" class="clxsd-guide-item guide-item" @click="authToRouter('/company-my-order')">
				<svg class="m-style-svg m-svg-def">
					<use xlink:href="#icon-global-footer-ording-1" v-if="isCurPath('/company-my-order')" />
					<use xlink:href="#icon-global-footer-ordering-0" 　v-else/>
				</svg>
				<span>订单</span>
			</section>
			<section :class="{active: isCurPath('/company-user')}" class="clxsd-guide-item guide-item" @click="to('/company-user')">
				<svg class="m-style-svg m-svg-def">
					<use xlink:href="#icon-global-footer-my-1" v-if="isCurPath('/company-user')" />
					<use xlink:href="#icon-global-my-0" 　v-else/>
				</svg>
				<span>我的</span>
			</section>
		</footer>
	</div>
</template>

<script>
	export default {
		name: "CompanyFooterNav",
		methods: {
			to(path) {
				this.$router.push({
					path
				})
			},
			isCurPath(path) {
				return this.$route.fullPath.indexOf(path) > -1;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.footer-fade {
		height: 1.2rem;
	}
	
	.foot-guide {
		position: fixed;
		border-top: 1px solid #f1f1f1;
		z-index: 100;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0 .2rem;
		max-width: 768px;
		margin: 0 auto;
		height: 1rem;
		display: flex;
		background: #fff;
		.m-svg-def {
			width: .5rem;
			height: .5rem;
			margin-bottom: 2px;
			&.plus {
				width: 65px;
				height: 65px;
			}
			+.v-badge-dot {
				top: 0;
				box-shadow: 0 0 0 1px #ed3f14;
				/*no*/
			}
		}
		.guide-item {
			flex: 1;
			display: flex;
			text-align: center;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: #999;
			font-size: .24rem;
			&.active {
				color: #2da2ff;
				svg {
					color: #2da2ff;
				}
			}
		}
	}
	
	.foot-guide .m-svg-def {
		width: .4rem;
		height: .4rem;
		padding-bottom: .05rem;
	}
</style>