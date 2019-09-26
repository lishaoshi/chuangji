<template>
	<div id="CompanyPromotion">
		<clxsd-head-top :title='`促销活动`'></clxsd-head-top>
		<router-link to="company-promotion-detail" class="activity">
			<img src="../../../images/company/1.png" class="activity-img" />
			<div class="activity-box">
				<p class="title">新品特价</p>
				<p class="time">04.12 12:00~.4.13 12:00</p>
				<p class="state over"><b>· </b>已经结束</p>
			</div>
		</router-link>
		<router-link to="" class="activity">
			<img src="../../../images/company/1.png" class="activity-img" />
			<div class="activity-box">
				<p class="title">新品特价</p>
				<p class="time">04.12 12:00~.4.13 12:00</p>
				<p class="state ing"><b>· </b>正在进行</p>
			</div>
		</router-link>


	</div>
</template>

<script>
	export default {
		name: "CompanyPromotion",
	}
</script>

<style lang="scss" scoped>

	.activity {
		display: flex;
		background: #fff;
		padding: .2rem;
		margin-bottom: .2rem;
		.activity-img {
			width: 46%;
			height: 2rem;
			border-radius: 5px;
		}
	.activity-box {
		padding-left: 3%;
		p {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			line-height: 160%;
		}
		.title {
			font-size: .3rem;
			color: #333;
			line-height: 200%;
			margin-top: .1rem;
		}
		.time {
			font-size: .22rem;
			color: #7C7C7C;
			margin-top: .3rem;
		}
		.state {
			font-size: .22rem;
		}
		.over {
			color: #666666;
		}
		.ing {
			color: #F30000;
		}
	}
	}
</style>