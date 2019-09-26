<template>
	<div id="Detail">
		<mt-header title="联贝明细">
			<router-link to="/my/lianbei/Otc" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="header-top">
			<mt-cell title="2018.02" label="支出： 收入：">
				<span @click="showTimePicker"><img src="../../images/my/data.png" width="22"></span>
			</mt-cell>
		</div>

		<mt-popup v-model="regionVisible" position="bottom" class="bottom-region" style="width:100%;">
			<mt-datetime-picker v-model="dateValue" type="date" ref="datePicker" year-format="{value} 年" month-format="{value} 月"  :endDate="new Date()" @confirm="handleConfirm">
			</mt-datetime-picker>
		</mt-popup>
		<mt-cell title="向张无忌转账" label="09.25 13：00">
			<span>-300</span>
		</mt-cell>
		<p v-if="!isClicked">年</p>
        <p v-if="isClicked">{{DetailTime}}</p>
        <p>{{DetailTime}}</p>
	</div>
</template>
<script>
	import Vue from 'vue';
	import { DatetimePicker } from 'mint-ui';
	export default {
		name: "Detail",
		components: {
			'mt-datetime-picker': DatetimePicker
		},

		data() {
			return {
				regionVisible: false,
				pickerValue: "",
				isClicked: false,
				DetailTime:new Date(),
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
			formatDate(date) {
		    const y = date.getFullYear();
		    let m = date.getMonth() + 1
		    m = m < 10 ? '0' + m : m;
		    let d = date.getDate();
		    d = d < 10 ? ('0' + d) : d;
		    return y + ' ' + m + ' ' + d;
		  },
			
		},
	}
</script>

<style lang="scss" scoped>
	.header-top {
		.mint-cell {
			background: #f1f1f1
		}
	}
</style>