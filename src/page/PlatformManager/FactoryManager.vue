<template>
	<div>
		<clxsd-head-top :title='`工厂管理`'></clxsd-head-top>
		<img src="../../images/shopping/company_bg.jpg" width="100%">
		<div class="factory-message">
			<img src="../../images/default.jpg" class="logo">
			<p>某某某公司</p>
			<div>
				<span>粉丝量（0）</span>
				<span>优惠数（0）</span>
			</div>
		</div>
		<div class="item-flex">
			<div>
				<p class="name">今日成交额</p>
				<p class="num">0.00</p>
			</div>
			<div>
				<p class="name">今日订单数</p>
				<p class="num">0.00</p>
			</div>
			<div>
				<p class="name">今日已收款</p>
				<p class="num">0.00</p>
			</div>
		</div>
		<div class="contant">
			<mt-cell title="店铺背景"><span><img src="../../images/shopping/company_bg.png" width="50" height="50"></span></mt-cell>
			<div @click="showAddressPicker">
				<mt-field label="生产地区" placeholder="请选择选择生产地区" type="text" v-model="region" readonly="readonly" class="region-go">
				</mt-field>
			</div>
			<mt-cell title="我的粉丝" to="/platform-fans" is-link></mt-cell>
		</div>
		<div class="contant">
			<mt-cell title="优惠活动" is-link to="/add-activity"><span></span></mt-cell>
			<div class="active-item">
				<div class="target">
					<span>满减</span>
				</div>
				<div class="des">
					<p>满200减100</p>
					<p class="time">2018.03.03-2019.03.03</p>
				</div>
				<div class="del">删除</div>
			</div>
			<div class="active-item">
				<div class="target">
					<span>满减</span>
				</div>
				<div class="des">
					<p>满200减100</p>
					<p class="time">2018.03.03-2019.03.03</p>
				</div>
				<div class="del">删除</div>
			</div>
		</div>
		
		<mt-popup v-model="regionVisible" position="bottom" class="bottom-region" style="width:100%;">
			<mt-picker :slots="myAddressSlots" @change="onMyAddressChange" class="bottom-region" showToolbar>
				<div class="picker-toolbar-title">
					<div class="usi-btn-cancel" @click="regionVisible = !regionVisible">取消</div>
					<div class="title">请选择生产地区</div>
					<div class="usi-btn-sure" @click="regionVisible = !regionVisible">确定</div>
				</div>
			</mt-picker>
		</mt-popup>
	</div>
</template>

<script>
	import { Picker } from 'mint-ui';
	export default {
		name: "FactoryManager",
		components: {
			'mt-picker': Picker
		},
		props: {},
		data() {
			return {
				myAddressSlots: [],
				regionVisible: false,
			}
		},
		created() {

		},
		methods: {
			showAddressPicker() {
				console.log("aa");
				this.regionVisible = true;
			},
			onMyAddressChange(picker, values) {
				console.log(picker);

			},
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.head-top {
		position: absolute;
		background: none;
		border-bottom: 0px;
	}
	
	.factory-message {
		position: relative;
		text-align: center;
		width: 85%;
		margin: 0 auto;
		background: #ff5452;
		color: #fff;
		font-size: .34rem;
		border-radius: 7px;
		margin-top: -1.9rem;
		box-shadow: 0px 0px 10px #F30000;
		padding-bottom: .5rem;
		z-index: 99;
		.logo {
			position: relative;
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 100%;
			margin-top: -.8rem;
		}
		p {
			margin-top: .2rem;
		}
		div {
			margin-top: .5rem;
			span {
				display: inline-block;
				width: 2.5rem;
				height: .75rem;
				line-height: .75rem;
				background: #fff;
				color: #F30000;
				font-size: .3rem;
				border-radius: 5px;
				&:nth-child(2) {
					margin-left: .3rem;
				}
			}
		}
	}
	
	.item-flex {
		display: flex;
		position: relative;
		justify-content: space-around;
		text-align: center;
		background: #fff;
		border-top: 1px solid #f1f1f1;
		padding-top: 2.5rem;
		padding-bottom: .3rem;
		margin-top: -2rem;
		margin-bottom: .2rem;
		>div {
			border-right: 1px solid #f1f1f1;
			width: 33.3%;
			&:nth-child(3) {
				border: 0px;
			}
		}
		.num {
			font-size: .36rem;
			line-height: 150%;
			color: #000;
		}
		.name {
			font-size: .24rem;
			color: #999999;
		}
	}
	
	.mint-cell {
		border-bottom: 1px solid #F1F1F1;
	}
	
	.picker-toolbar-title {
		font-size: 14px;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		line-height: 30px;
		.usi-btn-cancel,
		.usi-btn-sure {
			background: #999;
			padding: 0px 9px;
			display: inline-block;
			border-radius: 3px;
			color: #fff;
		}
		.usi-btn-sure {
			background: #f30000;
		}
		.title {
			font-size: 16px;
		}
	}
	.contant {
		padding: 0 .2rem;
		background: #fff;
		margin-bottom: .2rem;
	}
	.active-item {
		margin-top: .2rem;
		border-bottom: 1px solid #f1f1f1;
		height: 1rem;
		background: #fff;
		display: flex;
		justify-content: space-around;
		.target {
			span {
				background: #FA5452;
				color: #fff;
				font-size: 12px;
				padding: 1px 3px;
			}
		}
		.des {
			width: 53%;
			p {
				font-size: .32rem;
				color: #333;
				line-height: 1.3;
			}
			.time {
				font-size: .24rem;
				color: #666;
			}
		}
		.del {
			width: 30%;
			height: 100%;
			background: #FA5452;
			color: #fff;
			line-height: 1rem;
			text-align: center;
			font-size: .3rem;
		}
	}
</style>