<template>
	<div>
		<clxsd-head-top :title='`产品推广详情`'></clxsd-head-top>
		<div class="item">
			<div class="item-img">
				<img src="../../images/index/img.png">
			</div>
			<div class="item-box">
				<p class="title">
					<span class="name">维生素</span>
					<span class="time">2018.3.21</span>
				</p>
				<p class="norms"><span>规格：</span>100mg*10片</p>
			</div>
		</div>
		<p class="detail-p1"><span>药厂：</span>华北医药</p>
		<div class="detail-p2">
			<p>价格：<span>12</span></p>
			<p>零售价：<span>12</span></p>
			<p>有效期：<span>两年</span></p>
		</div>
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
		<div class="scroll">
			<ul class="area-ul">
				<li class="active">河南省</li>
				<li>江苏省</li>
				<li>江苏省</li>
				<li>江苏省</li>
				<li>江苏省</li>
				<li>江苏省</li>
				<li>江苏省</li>
				<li>江苏省</li>
				<li>江苏省</li>
				<li>江苏省</li>
			</ul>
		</div>
		<div>
			<div class="item-flex area-child">
				<p class="area-name">全省</p>
				<div>
					<p class="name">总展现量</p>
					<p class="num">0</p>
				</div>
				<div>
					<p class="name">总点击量</p>
					<p class="num">0.00</p>
				</div>
			</div>
			<div class="item-flex area-child">
				<p class="area-name">全省</p>
				<div>
					<p class="name">总展现量</p>
					<p class="num">0</p>
				</div>
				<div>
					<p class="name">总点击量</p>
					<p class="num">0.00</p>
				</div>
			</div>
			<div class="item-flex area-child">
				<p class="area-name">全省</p>
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
	</div>
</template>

<script>
	export default {
		name: "ProductSpreadDetail",
	}
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		background: #fff;
		padding: .2rem;
		padding-bottom: .1rem;
		justify-content: space-between;
		.item-img {
			padding: .1rem;
			height: 1.6rem;
			border: 1px solid #f1f1f1;
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
				line-height: 2;
				.name {
					display: inline-block;
					width: 60%;
					color: #000;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: .34rem;
				}
				.time {
					color: #666;
					font-size: .24rem;
				}
			}
			.norms {
				font-size: .34rem;
				margin-top: .3rem;
				span {
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
		padding: .3rem 0;
		margin-top: .2rem;
		>div {
			width: 50%;
			&:nth-child(1) {
				border-right: 1px solid #f1f1f1;
			}
		}
		.num {
			font-size: .36rem;
			margin-top: .05rem;
			color: #000;
		}
		.name {
			font-size: .24rem;
			color: #999999;
		}
	}
	.detail-p1 {
		background: #fff;
		padding: 0 .2rem;
		line-height: 2;
		font-size: .3rem;
		span {
				color: #666;
				font-size: .24rem;
			}
	}
	.detail-p2 {
		justify-content:space-between;
		display: flex;
		padding: 0 .2rem;
		padding-bottom: .25rem;
		background: #fff;
		p {
			font-size: .28rem;
			color: #666;
			span {
				color: #333;
				font-size: .24rem;
			}
			
		}
	}
	.scroll {
		overflow-x:scroll;
		position: relative;
		height: .9rem;
		letter-spacing: 1px;
		overflow-y: hidden;
		border-top: 1px solid #f1f1f1;
		background: #fff;
		.area-ul {
			display: -webkit-flex; /* Safari */
  			display: flex;
  			flex-wrap:nowrap;
  			position:absolute;
  			width: auto;
  			padding:0 10px;
  			height:35px;
			li{
				display: inline-block;
				color: #666;
				opacity: .7;
				font-size: 12px;
				line-height: .9rem;
				min-width: 1.3rem;
			}
			.active {
				font-size: 16px;
				opacity: 1;
				font-weight: bold;
				color: #26A2FF;
			}
			.active-county {
				font-size: 16px;
				opacity: 1;
			}
		}
	}
	.area-child {
		background: none;
		border-bottom: 1px solid #E6E6E6;
		margin-top: 0px;
		padding: .2rem 0px;
		.area-name {
			width: 30%;
			font-size: .32rem;
			line-height: .7rem;
		}
	}
</style>