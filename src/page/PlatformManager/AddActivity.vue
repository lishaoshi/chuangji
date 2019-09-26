<template>
	<div>
        <clxsd-head-top title='添加优惠活动'></clxsd-head-top>
		<div class="contant">
			<select name="cars" class="inp1">
				<option value="">满减</option>
				<option value="">打折</option>
				<option value="">送礼</option>
			</select>
			<div class="inp-flex">
				<div>
					<label>满</label><input type="number" /><label>元</label>
				</div>
				<div>
					<label>减</label><input type="number" /><label>元</label>
				</div>
			</div>
			<div class="inp2-flex">
				<label>有效期</label>
				<div @click="openPicker">{{startday}}</div>
				<label>至</label>
				<div @click="openPicker">{{endday}}</div>
			</div>
		</div>
		<div class="contant">
			<select name="cars" class="inp1">
				<option value="">满减</option>
				<option value="" selected>打折</option>
				<option value="">送礼</option>
			</select>
			<div class="inp-flex">
				<div>
					<label>满</label><input type="number" /><label>元</label>
				</div>
				<div>
					<label>减</label><input type="number" /><label>折</label>
				</div>
			</div>
			<div class="inp2-flex">
				<label>有效期</label>
				<div @click="openPicker">{{startday}}</div>
				<label>至</label>
				<div @click="openPicker">{{endday}}</div>
			</div>
		</div>
		<div class="bg-fade"></div>
		<div class="state">添加优惠活动</div>
		<div class="datePicker">
			<mt-datetime-picker type="date" ref="picker" year-format="{value}" month-format="{value}" date-format="{value}" @confirm="handleConfirm" :startDate="startDate">
			</mt-datetime-picker>
		</div>
	</div>
</template>

<script>
	import { DatetimePicker,Toast,Popup,Picker  } from 'mint-ui';
	export default {
		name: 'AddActivity',
		data() {
			return {
				startday: "2018-03-05",
				endday: "2022-03-05",
				startDate: new Date('2008-01-01'),
			}
		},
		methods:{
			openPicker () {
			     this.$refs.picker.open()
			},
			handleConfirm (data) {
			     this.birthday = getDate(data);   //获取的时间为时间戳，getdata是自己写的一个转换时间的方法
			},
		}
	}
</script>

<style lang="scss" scoped>
	.contant {
		background: #fff;
		padding: .2rem;
		border-radius: 5px;
		margin: .2rem;
		.inp1 {
			width: 100%;
			line-height: .6rem;
			border: 1px solid #f1f1f1;
			border-radius: .1rem;
			height: .6rem;
		}
	}
	
	.inp-flex {
		display: flex;
		justify-content: space-between;
		margin-top: .2rem;
		div {
			width: 40%;
			border-bottom: 1px solid #f1f1f1;
			height: .6rem;
			line-height: .6rem;
			font-size: .3rem;
			display: flex;
			justify-content: space-around;
			input {
				width: 70%;
			}
		}
	}
	.inp2-flex {
		display: flex;
		height: .8rem;
		line-height: .8rem;
		font-size: .3rem;
		border-bottom: 1px solid #f1f1f1;
		justify-content: space-between;
		div {
			background: url(../../images/down.png) no-repeat right;
			background-size:6px 6px ;
			padding-right: 12px;
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
		color: #26A2FF;
		font-size: .34rem;
		position: fixed;
		width: 100%;
		bottom: 0px;
	}
</style>