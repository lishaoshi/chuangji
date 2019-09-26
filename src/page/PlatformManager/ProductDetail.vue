<template>
	<div id="ProductDetail">
		<clxsd-head-top :title='`详情`'></clxsd-head-top>
		<mt-swipe :auto="4000" style="height: 5.6rem;background: #fff;">
			<mt-swipe-item><img src="../../images/index/img3.png" width="100%"></mt-swipe-item>
			<mt-swipe-item><img src="../../images/index/img3.png" width="100%"></mt-swipe-item>
			<mt-swipe-item><img src="../../images/index/img3.png" width="100%"></mt-swipe-item>
		</mt-swipe>
		<div class="contant">
			<div class="title">维生素</div>
			<div class="price-flex">
				<div>
					<p class="price"><span>￥600</span><small>/盒</small></p>
					<p class="name">采购价</p>
				</div>
				<div>
					<p class="price"><span>￥600</span><small>/盒</small></p>
					<p class="name">建议零售价</p>
				</div>
			</div>
			<div class="info">
				<span>厂家名称：</span>
				<samp>1000mg*20</samp>
			</div>
			<div class="info">
				<span>产品规格：</span>
				<samp>华夏制药集团股份有限责任公司</samp>
			</div>
			<div class="info">
				<span>有效期至：</span>
				<samp>两年</samp>
			</div>
		</div>
		<div class="bg-fade"></div>
		<div class="state"><span>审核中</span><span class="btn-state">下架 &darr;</span></div>
	</div>
</template>

<script>
	export default {
		name: "ProductDetail",
	}
</script>

<style scoped lang="scss">
	#ProductDetail {
		min-height: 100%;
		background: #fff;
	}
	.contant {
		background: #fff;
		padding: 10px;
		border-top: .2rem solid #f1f1f1;
		.title {
			font-size: .32rem;
			line-height: 150%;
			margin-bottom: .3rem;
		}
		.info {
			font-size: .22rem;
			line-height: 180%;
			color: #7C7C7C;
		}
	}
	
	.price-flex {
		display: flex;
		background: #f1f1f1;
		justify-content: space-between;
		padding: .4rem 0px;
		margin-bottom: .2rem;
		>div {
			width: 50%;
			text-align: center;
			&:nth-child(1) {
				border-right: 1px solid #CCCCCC;
			}
			p {
				&:nth-child(1) {
					color: #F2385A;
					font-size: .32rem;
					line-height: 160%;
					small {
						color: #ccc;
						font-size: .24rem;
					}
				}
				&:nth-child(2) {
					color: #999999;
					font-size: .24rem;
				}
			}
		}
	}
	
	.bg-fade {
		height: 1.5rem;
	}
	
	.state {
		background: #fff;
		border-top: 1px solid #f1f1f1;
		line-height: 1rem;
		text-align: center;
		color: #F2385A;
		font-size: .34rem;
		position: fixed;
		width: 100%;
		bottom: 0px;
		.btn-state {
			position: relative;
			display: inline-block;
			width: 1.7rem;
			height: .7rem;
			line-height: .7rem;
			border-radius: .7rem;
			background: #26A2FF;
			color: #fff;
			position: absolute;
			right: .2rem;
			margin-top: .15rem;
			display: none;
		}
	}
</style>