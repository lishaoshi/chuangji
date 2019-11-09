<template>
	<div id="OtherOrderCard">
		<div class="item">
			<div class="item-box">
				<router-link :to="`/my-order/detail/${data.id}`">
                    <p class="state">
						<span v-if="data.order_status==2">待发货</span>
						<span v-if="data.order_status==3">待收款</span>
						<span v-if="data.order_status==4">已收货</span>
					</p>
					<p v-if="data.supplier">{{data.client_supplierName}}</p>
					<p v-if="data.consignee">{{data.consignee}}</p>
					
					<p class="color-gray">下单日期：{{data.time}}</p>
					<p class="color-gray">订单编号：{{data.order_sn}}</p>
				</router-link>
			</div>
			<div class="item-box2">
				<p>实付金额</p>
				<!-- <p>￥{{data.money_paid}}</p>
				 -->
				  <p>￥{{+data.money_paid+(+data.freight) | filterFixed}}</p>
				<!-- <p>使用活动卷</p>
				<p v-if="data.is_coupon == null">无</p>
				<p v-else>{{data.is_coupon}}</p>
				<p v-else>{{data.coupon}}</p> -->
                <div>
                    <!-- <p class="btn" v-if="data.order_status==2" @click="sureSendOrder(data.id)">确认发货</p> -->
                    <!-- <p class="btn" v-if="status==3" @click="delectOrder(data.id)">删除订单</p> -->
                </div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "OtherOrderCard",
		props: [
			"sureSendOrder", "data", "delectOrder","status"
		],
		 filters: {
			filterFixed(value) {
				value = Number(value)
				return value.toFixed(2)
			}
		},
	}
</script>

<style scoped lang="scss">
.item {
		display: flex;
		background: #fff;
		padding: .35rem .2rem;
		margin-top: .2rem;
		p{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			&:nth-child(3) {
				margin-bottom: .2rem;
			}
		}
		.item-box {
			width: 64%;
			font-size: .28rem;
			color: #333;
			line-height: 160%;
			a {
				color: #333;
			}
			.state {
				color: #FA5452;
				margin-bottom: .15rem;
				line-height: 180%;
			}
			.color-gray {
				color: #999999;
				font-size: .24rem;
				line-height: 190%;
			}
		}
		.item-box2 {
			border-left: 1px solid #f1f1f1;
			text-align: center;
			width: 36%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			p{
				&:nth-child(1){
					margin-top: .25rem;
					font-size: .24rem;
				}
				&:nth-child(2){
					font-size: .32rem;
					color: #F2385A;
					font-weight: bold;
					line-height: 180%;
				}
				&:nth-child(3){
					margin-top: .15rem;
					font-size: .24rem;
					color: #5C5C5C;
					margin-bottom: 0px;
				}
				&:nth-child(4){
					font-size: .22rem;
					color: #F2385A;
					transform: rotate(.8);
					margin-bottom: .25rem;
				}
				
			}
            .btn {
                font-size: .28rem;
                color: #fff;
                background: #26A2FF;
                width: 80%;
                margin: 0 auto;
                height: .6rem;
                border-radius: .6rem;
                line-height: .6rem;
            }
		}
	}
	.mint-tab-item {
		color: #666;
	}
</style>