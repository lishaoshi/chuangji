<template>
	<div id="lianbei-otc">
		<mt-header title="联贝CLT">
			<router-link to="/my" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
			<router-link to="" slot="right">
				<svg class="lb-svg">
					<use xlink:href="#icon-uniteCoin-account" />
				</svg>
			</router-link>
		</mt-header>
		<div class="info-bottom">
			<div class="account">
				<p>价值(RMB)</p>
				<p id="U_gold_value">0.3</p>
			</div>
			<div class="line">
			</div>
			<div class="lianbei">
				<p>联贝(CLB)</p>
				<p id='U_gold'>12.00</p>
			</div>
		</div>
		<div class="buy-form">
			<form>
				<div class="inp1"><input type="text"><label>RMB</label></div>
				<div class="inp1"><input type="text"><label>CLB</label></div>
				<button type="submit" class="btn-sub">购买</button>
			</form>
		</div>
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
				<div class="buy" @click="buy">购买</div>
			</div>
		</div>
		<div class="lianbei-item">
			<div class="lianbei-item-lf">
				<p class="title"><img src="../../../images/my/user_default.png" width="30" height="30"><span>王**</span></p>
				<p class="info">数量 455 CLB</p>
				<p class="info">限额 ￥50-￥1500</p>
				<div class="pay">
					<svg>
						<use xlink:href="#icon-uniteCoin-Alipay" />
					</svg>
					<svg>
						<use xlink:href="#icon-uniteCoin-bankCart" />
					</svg>
				</div>
			</div>
			<div class="lianbei-item-rt">
				<p class="info">837 | 69%</p>
				<p class="info">单价</p>
				<p class="price">￥ 58</p>
				<div class="buy" @click="buy">购买</div>
			</div>
		</div>
		<div class="foot-fade"></div>
		<div class="footer">
			<router-link to="/gzh-lianbei" class="footer-item">
				<svg>
					<use xlink:href="#icon-uniteCoin-footer-marketplace" />
				</svg>
				<p>市场</p>
			</router-link>
			<router-link to="/gzh-buy" class="footer-item active">
				<svg>
					<use xlink:href="#icon-uniteCoin-footer-buy-1" />
				</svg>
				<p>购买</p>
			</router-link>
			<router-link to="/gzh-trans" class="footer-item">
				<svg>
					<use xlink:href="#icon-uniteCoin-footer-apply" />
				</svg>
				<p>应用</p>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: "lianbei-buy",
		methods: {
			buy: function() {
				this.$messagebox.confirm("确认购买?").then(action => {
					console.log(action);
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.info-bottom {
		text-align: center;
		padding: .3rem 0px .4rem;
		background: #26a2ff;
	}
	
	.info-bottom .account,
	.info-bottom .lianbei {
		width: 45%;
		display: inline-block;
	}
	
	.info-bottom .line {
		width: 1px;
		height: 20px;
		background: rgb(245, 245, 245);
		margin: auto 0;
		display: inline-block;
	}
	
	.info-bottom .account p:nth-child(1),
	.info-bottom .lianbei p:nth-child(1) {
		font-size: 11px;
		line-height: 160%;
		color: rgba(255, 255, 255, 0.6);
	}
	
	.info-bottom .account p:nth-child(2),
	.info-bottom .lianbei p:nth-child(2) {
		font-size: 14px;
		color: rgb(255, 255, 255);
		line-height: 160%;
	}
	
	.lb-svg {
		width: .45rem;
		height: .45rem;
	}
	
	.otc-box {
		display: flex;
		justify-content: space-between;
		padding: .2rem .2rem;
		svg {
			width: .2rem;
			height: .18rem;
			margin-left: .05rem;
		}
		.total {
			color: #666;
			font-size: .24rem;
		}
	}
	
	.footer {
		text-align: center;
		position: fixed;
		bottom: 0px;
		width: 100%;
		background: #fff;
		padding: .15rem .2rem;
		border-top: 1px solid #f1f1f1;
		display: flex;
		justify-content: space-around;
		svg {
			width: .5rem;
			height: .5rem;
		}
		.footer-item {
			display: inline-block;
			width: 33%;
			p {
				color: #666;
			}
		}
		.active {
			p {
				color: #26A2FF;
			}
		}
	}
	
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
	.buy-form {
		background: #fff;
		padding: .2rem;
		margin-top: .2rem;
		margin-bottom: .2rem;
		form {
		 width: 100%;	
		}
		.inp1 {
			display: inline-block;
			width: 39%;
			border:1px solid #f1f1f1;
			height: .6rem;
			line-height: .6rem;
			margin-right: 2%;
			input {
				border:0px;
				width: 70%;
				height: 90%;
			}
			label {
				float: right;
				padding-right: .1rem;
			}
		}
		.btn-sub {
			width: 17%;
			height: .6rem;
			background: #26A2FF;
			color: #fff;
			float: right;
			border-radius: 3px;
		}
	}
</style>