<template>
<div>
	<div class="lianbei-item">
		<div class="lianbei-item-lf">
			<p class="title"><img src="../../../images/my/user_default.png" width="30" height="30"><span>张</span></p>
			<p class="info">数量 3455 CLB</p>
			<p class="info">限额 ￥500-￥5000</p>
			<div class="pay">
				<svg>
					<use xlink:href="#icon-uniteCoin-Alipay" />
				</svg>
				<svg>
					<use xlink:href="#icon-uniteCoin-wechat" />
				</svg>
				<svg>
					<use xlink:href="#icon-uniteCoin-bankCart" />
				</svg>
			</div>
		</div>
		<div class="lianbei-item-rt">
			<p class="info">3837 | 99%</p>
			<p class="info">单价</p>
			<p class="price">￥ 258</p>
			<div class="buy">购买</div>
		</div>
	</div>
</div>
</template>

<script>
	export default {
		name: "lianbeiCard",
		
	}
</script>

<style lang="scss" scoped>
	.lianbei-item {
		padding: .2rem;
		background: #fff;
		margin-bottom: .2rem;
		display: flex;
		justify-content: space-between;
		&-lf {
			width: 70%;
			.title {
				font-size: .3rem;
				line-height: .5rem;
				height: .5rem;
				display: flex;
				margin-bottom: .1rem;
				img {
					width: .5rem;
					height: .5rem;
					border-radius: 100%;
				}
			}
			.info {
				color: #666;
				font-size: .26rem;
				line-height: 1.8;
			}
			.pay {
				padding-top: .16rem;
				svg {
					width: .48rem;
					height: .48rem;
					margin-right: .1rem;
				}
			}
		}
		&-rt {
			width: 27%;
			text-align: right;
			.info {
				color: #666;
				font-size: .26rem;
				line-height: 1.5;
				margin-top: .1rem;
			}
			.price {
				color: #26A2FF;
				font-size: .36rem;
				font-weight: 500;
			}
			.buy {
				background: #26A2FF;
				color: #fff;
				width: 100%;
				text-align: center;
				height: .68rem;
				line-height: .68rem;
				border-radius: 8px;
				margin-top: .15rem;
				font-size: .28rem;
			}
		}
		
	}
</style>