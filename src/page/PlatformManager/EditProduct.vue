<template>
	<div class="EditProduct">
        <clxsd-head-top title='编辑'></clxsd-head-top>
		<div class="bg-white">
			<mt-field label="产品名称" placeholder="请输入产品名称"></mt-field>
			<mt-field label="生产厂家" placeholder="清输入详细的厂家，以方便查找"></mt-field>
			<div @click="showAddressPicker">
				<mt-field label="产品单位" placeholder="请选择产品包装单位" type="text" v-model="region" readonly="readonly" class="region-go">
					<img src="../../images/my/right_cowry.png" />
				</mt-field>
			</div>
			<mt-field label="产品规格" placeholder="例：100mg*10片*2/盒"></mt-field>
			<mt-field label="成件规格" placeholder="填写产品一件数量"></mt-field>
			<mt-field label="有效期至" placeholder="请输入产品到期日期"></mt-field>
			<mt-field label="产品名称" placeholder="请输入产品名称"></mt-field>
			<mt-cell title="上传产品图" label="点击右侧按钮选择产品图" class="add-box">
				<span><img src="../../images/add.png" width="50" height="50"></span>
			</mt-cell>
            <input type="file" class="pro-file">
		</div>
		<div class="bg-white">
			<mt-field label="采购价（元）" value="3.00" placeholder="请输入采购价"></mt-field>
			<div class="price">每件<span>5000</span></div>
			<mt-field label="建议零售价" placeholder="请输入建议零售价,单位（元)"></mt-field>
		</div>
		<mt-popup v-model="regionVisible" position="bottom" class="bottom-region" style="width:100%;">
			<mt-picker :slots="ProductionUnit" @change="onProductionUnitChange" class="bottom-region" showToolbar>
				<div class="picker-toolbar-title">
					<div class="usi-btn-cancel" @click="regionVisible = !regionVisible">取消</div>
					<div class="title">请选择生产单位</div>
					<div class="usi-btn-sure" @click="regionVisible = !regionVisible">确定</div>
				</div>
			</mt-picker>
		</mt-popup>
		<!--信息查看-->
		<div class="bg-white">
			<div class="img-scroll">
				<ul>
					<li><img src="../../images/index/img.png" alt=""></li>
					<li><img src="../../images/index/img.png" alt=""></li>
					<li><img src="../../images/index/img.png" alt=""></li>
					<li><img src="../../images/index/img.png" alt=""></li>
					<li><img src="../../images/index/img.png" alt=""></li>
				</ul>
			</div>
			<ul class="info-list">
				<li>
					<small>产品名称</small><span>维生素</span>
				</li>
				<li>
					<small>生产厂家</small><span>郑州</span>
				</li>
				<li>
					<small>产品单位</small><span>件</span>
				</li>
				<li>
					<small>产品规格</small><span>100mg*10片*2/盒</span>
				</li>
				<li>
					<small>成件规格</small><span>100</span>
				</li>
				<li>
					<small>有效期至</small><span>2017.03.03</span>
				</li>
			</ul>
		</div>
		<div class="bg-white">
			<ul class="info-list">
				<li>
					<small>采购价（元）</small><span>3.00</span>
					<div class="price">每件(元) <span>200</span></div>
				</li>
				<li>
					<small>建议零售价</small><span>10（元）</span>
				</li>
			</ul>
		</div>
		<div class="bg-fade"></div>
		<div class="state"><span class="btn-state">确认添加</span></div>
	</div>
</template>

<script>
	import { Picker } from 'mint-ui';
	export default {
		name: "EditProduct",
		components: {
			'mt-picker': Picker
		},
		data() {
			return {
				ProductionUnit: [],
				regionVisible: false,
			}
		},
		methods: {
			showAddressPicker() {
				console.log("aa");
				this.regionVisible = true;
			},
		}

	}
</script>

<style lang="scss" scoped>
	.picker-toolbar-title {
		padding: 10px;
		font-size: 14px;
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
	.pro-file {
        position: absolute;
        width: 50px;
        height: 50px;
        background: red;
        right: .4rem;
        margin-top: -69px;
        opacity: 0;
    }
	.region-go {
		img {
			width: 7px;
			height: 10px;
		}
		.bottom-region {
			width: 100%;
		}
	}
	
	.mint-cell {
		border-bottom: 1px solid #f1f1f1;
		.mint-cell-wrapper {
			font-size: 14px;
		}
		
	}
	.add-box {
		padding: .15rem 0;
		margin-bottom: .2rem;
	}
	.price {
		width: 40%;
		font-size: 16px;
		right: 0px;
		background: #fff;
		margin-top: -35px;
		z-index: 99;
		position: absolute;
		text-align: right;
		padding-right: .2rem;
		span{
			color: #F2385A;
			padding-left: 2px;
		}
	}
	.bg-white {
		background: #fff;
		padding: 0 .2rem;
	}
	.info-list {
		li {
			border-bottom: 1px solid #f1f1f1;
			font-size: 16px;
			line-height: 45px;
			padding: 0 .2rem;
			position: relative;
			small{
				color: #666666;
				font-size: 14px;
				display: inline-block;
				width: 108px;
			}
			.price {
				display: inline-block;
				right: 0px;
				position: absolute;
				margin-top:1px;
				line-height: 44px;
				font-size: 14px;
				color: #666;
				height: 40px;
				span {
					color: #F2385A;
				}
			}
		}
	}
	.img-scroll {
		width: 100%;
		overflow-x: scroll;
		height: 1.6rem;
		overflow-y: hidden;
		position: relative;
		padding-top: .2rem;
		ul{
			position: absolute;
			left: 0px;
			display: flex;
			flex-wrap: nowrap;
			width: auto;
			li{
				border:1px solid #f1f1f1;
				margin-right: .15rem;
				padding: .05rem;
				float: left;
				img {
					width: 1.5rem;
					height: 1.3rem;		
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
		font-size: .34rem;
		position: fixed;
		width: 100%;
		bottom: 0px;
		height: 1.2rem;
		z-index: 999;
		.btn-state {
			position: relative;
			display: inline-block;
			width: 1.9rem;
			height: .8rem;
			line-height: .8rem;
			border-radius: .8rem;
			background: #26A2FF;
			color: #fff;
			float: right;
			margin-top: .15rem;
			text-align: center;
			right: .3rem;
		}
	}
</style>