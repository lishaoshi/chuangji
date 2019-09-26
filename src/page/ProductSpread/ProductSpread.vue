<template>
	<div id="ProductSpread">
		<clxsd-head-top :title='`产品推广`'></clxsd-head-top>
		<router-link to="/product-spread-detail" class="item">
			<div class="item-img">
				<img src="../../images/index/img.png">
			</div>
			<div class="item-box">
				<p class="title">
					<span class="name">维生素</span>
					<span class="time">2018.3.21</span>
				</p>
				<div class="item-flex">
					<div>
						<p class="name">总展现量</p>
						<p class="num">0</p>
					</div>
					<div>
						<p class="name">总点击量</p>
						<p class="num">0.00</p>
					</div>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script>
	 export default {
        name: "ProductSpread",
       }
</script>

<style lang="scss" scoped>
.item {
	display: flex;
	background: #fff;
	margin-top: .2rem;
	padding: .2rem;
	justify-content: space-between;
	.item-img {
		padding: .1rem;
		height: 1.6rem;
		border:1px solid #f1f1f1;
		img {
			width: 1.8rem;
			height: 1.4rem;
		}
	}
	.item-box {
		width: 67%;
		.title {
			display: flex;
			justify-content: space-between;
			line-height:1.5;
			.name {
				display: inline-block;
				width: 60%;
				color: #26A2FF;
				white-space:nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: .32rem;
			}
			.time {
				color: #666;
				font-size: .24rem;
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
		padding: .2rem 0 .25rem;
		padding-bottom: 0px;
		>div {
			width: 50%;
			&:nth-child(1) {
				border-right: 1px solid #f1f1f1;
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
</style>