<template>
	<div id="EditMyInfo">
		<mt-header title="编辑个人信息">
			<router-link to="/my/setting/MyInfo" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
			<div slot="right">
				<span>保存</span>
			</div>
		</mt-header>
		<mt-cell title="个人头像" is-link>
			<span><img src="../../../images/cert_user.png" width="35" height="35" to="/my"></span>
		</mt-cell>
		<mt-cell title="实名认证">
			<span>{{userName}}</span>
		</mt-cell>
		<mt-cell title="手机号" is-link>
			<span>{{userTel}}</span>
		</mt-cell>
		<mt-cell title="身份证号">
			<span>{{userId}}</span>
		</mt-cell>
		<div class="hint">
			<p>请认真填写，一经填写<i>不可修改</i></p>
		</div>
		<mt-cell title="企业名称">
			<input type="text" placeholder="请输入企业名称" class="edit-inp1" />
		</mt-cell>
		<div @click="showTypePicker">
			<mt-cell title="企业类型" is-link>
				<span>请选择企业类型</span>
			</mt-cell>
		</div>
		<div @click="showAddressPicker">
			<mt-cell title="企业地址" is-link>
				<span>请选择企业地址</span>
			</mt-cell>
		</div>
		<!--选择企业类型弹框-->
		<mt-popup v-model="regionVisible" position="bottom" class="bottom-region" style="width:100%;">
			<mt-picker :slots="typeSlots" @change="onMyTypeChange" class="bottom-region" showToolbar>
				<div class="picker-toolbar-title">
					<div class="usi-btn-cancel" @click="regionVisible = !regionVisible">取消</div>
					<div class="title">请选择企业类型</div>
					<div class="usi-btn-sure" @click="regionVisible = !regionVisible">确定</div>
				</div>
			</mt-picker>
		</mt-popup>
		<!--选择企业地址弹框-->
		<mt-popup v-model="addressVisible" position="bottom" class="bottom-region" style="width:100%;">
			<mt-picker :slots="addressSlots" @change="onMyAddressChange" class="bottom-region" showToolbar>
				<div class="picker-toolbar-title">
					<div class="usi-btn-cancel" @click="regionVisible = !regionVisible">取消</div>
					<div class="title">请选择收货地址</div>
					<div class="usi-btn-sure" @click="regionVisible = !regionVisible">确定</div>
				</div>
			</mt-picker>
		</mt-popup>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Picker } from 'mint-ui';
	export default {
		name: "EditMyInfo",
		components: {
			'mt-picker': Picker
		},
		data() {
			return {
				regionVisible: false,
				addressVisible: false,
				typeSlots: [{
					flex: 1,
					values: ['单体药店', '个体诊所', '连锁总店', '公立医院', '私立医院', '批发企业'],
					className: 'slot1',
					textAlign: 'center'
				}]
			}
		},
		methods: {
			showTypePicker() {
				this.regionVisible = true;
			},
			showAddressPicker() {
				this.addressVisible = true;
			},
		},

	}
</script>

<style lang="scss" scoped>
	.hint {
		width: 100%;
		height: 24px;
		display: flex;
		align-items: center;
		background: rgb(245, 245, 245);
	}
	
	.hint p {
		margin-left: 15px;
		font-size: 12px;
		color: rgb(153, 153, 153);
	}
	
	.hint p i {
		color: rgb(255, 181, 64);
	}
	
	.mint-cell {
		border-bottom: 1px solid #f1f1f1;
		.mint-cell-value {
			span {
				color: #ccc;
			}
		}
	}
	
	.picker-toolbar-title {
		font-size: 14px;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		line-height: 30px;
		background: #fff;
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
	
	.edit-inp1 {
		text-align: right;
		font-size: 16px;
	}
</style>