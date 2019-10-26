<template>
	<div id="ChoiceCoupon">
		<clxsd-head-top :title="'可用活动卷'"></clxsd-head-top>
		<div class="not-choice" @click="notChoice()" v-bind:class="{use: isActive }">任性，不使用</div>
		<div class="title">
			<span class="name">代金卷</span>
			<div class="line"></div>
		</div>
		<div class="coupon" v-bind:class="{active: isCoupon }" @click="ChoiceCoupon()">
			<div class="coupon-lf">
				<h1>立减200元</h1>
				<p>够满2000元试用</p>
				<p class="time">2018.03.03-2018.06.03</p>
			</div>
			<div class="coupon-rt">
				<h1>代金卷</h1>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "ChoiceCoupon",
		data() {
			return {
				isActive:false,
				isCoupon:false
			}
		},
		computed: {

		},
		methods: {
			notChoice:function(){
				this.isCoupon=false;
				this.isActive=false;
			},
			ChoiceCoupon:function(){
				this.isCoupon=true;
				this.isActive=true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.not-choice {
		height: .8rem;
		line-height: .8rem;
		color: #fff;
		font-size: .24rem;
		background: url(../../images/coupon/none-1.png) no-repeat center;
		background-size: 100% 100%;
		margin: .2rem .2rem;
		text-align: center;
	}
	.use {
		background-image:url(../../images/coupon/none-0.png) ;
	}
	.title {
		position: relative;
		text-align: center;
		height: .7rem;
		line-height: .7rem;
		.name {
			font-size: .24rem;
			color: #666;
			position: absolute;
			display: block;
			width: 20%;
			margin-left: 40%;
			background: #f4f5f5;
			z-index: 9;
		}
		.line {
			height: 1px;
			margin-left: .2rem;
			margin-right: .2rem;
			background: #7C7C7C;
			top: .33rem;
			position: relative;
			z-index: 8;
		}
	}
	
	.coupon {
		background: url(../../images/coupon/ticket-0.png) no-repeat center;
		background-size: 100% 100%;
		margin: .2rem .2rem 0;
		height: 2.4rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		&-lf {
			width: 60%;
			text-align: center;
			color: #fff;
			h1 {
				font-size: .5rem;
			}
			p {
				font-size: .24rem;
				opacity: .9;
				margin-top: .2rem;
			}
			.time {
				margin-top: 0;
				opacity: .8;
				font-size: .24rem;
			}
		}
		&-rt {
			width: 40%;
			text-align: center;
			h1 {
				font-size: .5rem;
				color: #333;
				font-weight: bold;
			}
			p {
				font-size: .24rem;
				opacity: .9;
				margin-top: .2rem;
				color: #666;
			}
		}
	}
	
	.active {
		background-image: url(../../images/coupon/ticket-1.png);
	}
</style>