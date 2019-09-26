<template>
	<div id="lianbei-otc">
		<mt-header title="联贝CLT">
			<router-link to="/my" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
			<router-link to="" slot="right">
				<svg class="lb-svg">
	                <use xlink:href="#icon-uniteCoin-account"/>
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
		<div class="otc-box">
			<div @click="showTimePicker">
				<span>2015.05</span>
				<svg>
	                <use xlink:href="#icon-uniteCoin-dropdownButton"/>
	            </svg>
			</div>
			<div class="total">总计 258787</div>
		</div>
		<div class="otc-item">
			<div class="otc-item-lf">
				<p>张仲景大药房</p>
				<p>02-12 13:21</p>
			</div>
			<div class="otc-item-rt">+223.00</div>
		</div>
		<div class="otc-item">
			<div class="otc-item-lf">
				<p>张仲景大药房</p>
				<p>03-02 15:01</p>
			</div>
			<div class="otc-item-rt">-103.00</div>
		</div>
		<div class="otc-item">
			<div class="otc-item-lf">
				<p>张仲景大药房</p>
				<p>05-02 5:51</p>
			</div>
			<div class="otc-item-rt">+73.00</div>
		</div>
		<mt-popup position="bottom" class="bottom-region" style="width:100%;">
			<mt-datetime-picker type="date" ref="datePicker" year-format="{value} 年" month-format="{value} 月"  
				:endDate="new Date()" @confirm="handleConfirm">
			</mt-datetime-picker>
		</mt-popup>
		<div class="foot-fade"></div>
		<div class="footer">
			<router-link to="/gzh-lianbei" class="footer-item active">
				<svg>
	                <use xlink:href="#icon-uniteCoin-footer-marketplace-1"/>
	            </svg>
	            <p>市场</p>
			</router-link>
			<router-link to="/gzh-buy"  class="footer-item">
				<svg>
	                <use xlink:href="#icon-uniteCoin-footer-buy"/>
	            </svg>
	            <p>购买</p>
			</router-link>
			<router-link to="/gzh-trans" class="footer-item">
				<svg>
	                <use xlink:href="#icon-uniteCoin-footer-apply"/>
	            </svg>
	            <p>应用</p>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: "lianbei-otc",
		data() {
			return {
				regionVisible: false,
			}
		},
		methods: {
			showTimePicker() {
				this.regionVisible = true;
				this.$refs.datePicker.open();
			},
			handleConfirm() {
				this.year = value.getFullYear();
				this.month = value.getMonth() + 1;
				this.isClicked = true;
				console.log(this.formatDate(this.$refs.datePicker.value));
			},
		},
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
	.foot-fade {
		height: 1rem;
	}
</style>