<template>
	<div id="platformIndex">
        <clxsd-head-top title='平台管理'></clxsd-head-top>
		<mt-cell title="交易数据"></mt-cell>
		<div class="item-flex">
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">今日成交额</p>
			</router-link>
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">今日订单数</p>
			</router-link>
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">今日已收款</p>
			</router-link>
		</div>
		<mt-cell title="工厂管理" to="/factory-manager" is-link>
		</mt-cell>
		<div class="item-flex">
			<div>
				<img src="../../images/index/banner.png" class="factory-logo">
			</div>
			<div>
				<p class="num">0</p>
				<p class="name">我的粉丝</p>
			</div>
			<div>
				<p class="num">0.00</p>
				<p class="name">优惠数</p>
			</div>
		</div>
		<p class="title">云工厂</p>
		<mt-cell title="产品管理" to="/product-manager" is-link></mt-cell>
		<div class="item-flex item-box2">
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">审核</p>
			</router-link>
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">出售</p>
			</router-link>
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">下架</p>
			</router-link>
			<router-link to="/product-edit">
				<div class="add">
					<p>+</p>
					<p>添加产品</p>
				</div>
			</router-link>
		</div>
		<mt-cell title="订单管理" to="/platform-order" is-link></mt-cell>
		<div class="item-flex">
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">待付款</p>
			</router-link>
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">待发货</p>
			</router-link>
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">代收款</p>
			</router-link>
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">已收款</p>
			</router-link>
		</div>
        <!--
		<p class="title">定量生产</p>
		<mt-cell title="产品管理" to="/ration-manager" is-link></mt-cell>
		<div class="item-flex item-box2">
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">审核</p>
			</router-link>
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">定制</p>
			</router-link>
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">未完成</p>
			</router-link>
			<router-link to="">
				<div class="add">
					<p>+</p>
					<p>添加产品</p>
				</div>
			</router-link>
		</div>
		<mt-cell title="订单管理" to="" is-link></mt-cell>
		<div class="item-flex">
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">待发货</p>
			</router-link>
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">代收款</p>
			</router-link>
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">已收款</p>
			</router-link>
		</div>
		<p class="title">终端采集</p>
		<div class="item-flex">
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">待发货</p>
			</router-link>
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">代收款</p>
			</router-link>
			<router-link to="">
				<p class="num">0.00</p>
				<p class="name">已收款</p>
			</router-link>
		</div>
		-->
	</div>
</template>

<script>
	export default {
		name: "platformIndex",
	}
</script>

<style lang="scss" scoped>
	.mint-cell {
		min-height: .6rem;
		line-height: .6rem;
		font-size: .24rem;
	}
	
	.mint-cell-wrapper {
		font-size: .24rem;
	}
	.item-flex {
		display: flex;
		position: relative;
		justify-content: space-around;
		text-align: center;
		background: #fff;
		border-top: 1px solid #f1f1f1;
		padding: .2rem 0 .25rem;
		margin-bottom: .2rem;
		height: 1.4rem;
		.num {
			font-size: .36rem;
			line-height: 150%;
			color: #000;
		}
		.name {
			font-size: .24rem;
			color: #999999;
		}
		.factory-logo {
			margin-top: -.2rem;
			margin-bottom: -.2rem;
			height: 1.4rem;
			width: 2.8rem;
			margin-left: -.8rem;
		}
		.add {
			width: 1.8rem;
			height: 1.4rem;
			background: #f1f9ff;
			color: #26A2FF;
			margin-top: -.2rem;
			position: absolute;
			right: 0px;
			text-align: center;
			p {
				font-size: .24rem;
				&:nth-child(1) {
					font-size: .48rem;
					font-weight: bold;
					padding-top: .1rem;
				}
				
			}
		}
	}
	.item-box2 {
		padding-right: 1rem;
	}
	.title {
		padding-left: .2rem;
		padding-bottom: .2rem;
	}
</style>