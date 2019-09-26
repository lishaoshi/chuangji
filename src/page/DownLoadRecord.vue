<template>
	<div>
		<clxsd-head-top :title='`下载记录`'></clxsd-head-top>
		<mt-navbar v-model="selected">
				<mt-tab-item id="1">产品报表</mt-tab-item>
				<mt-tab-item id="2">电子发票</mt-tab-item>
			</mt-navbar>
			<!-- tab-container -->
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="1">
					<div class="container">
						<div class="item">
							<p class="title">
								<span class="name">维生素</span>
								<span class="time">2018.3.21</span>
							</p>
							<p class="info">
								<span>2018年7月</span>
								<span>河南新乡</span>
								<span class="share">转发</span>
							</p>
						</div>
						<div class="item">
							<p class="title">
								<span class="name">维生素</span>
								<span class="time">2018.3.21</span>
							</p>
							<p class="info">
								<span>2018年7月</span>
								<span>河南新乡</span>
								<span class="share">转发</span>
							</p>
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<div class="item2">
						<div class="title"><span>2018.03.02</span><span>电子发票</span></div>
						<div class="info"><span>企业单位</span><span>100<small>元</small></span></div>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
	</div>
</template>

<script>
	 export default {
        name: "DownLoadRecord",
        data() {
			return {
				selected: '1'
			}
		}
       }
</script>

<style lang="scss" scoped>
.container {
	background: #fff;
	padding: 0 .2rem;
	margin-top: .25rem;
	.item {
		border-bottom: 1px solid #f1f1f1;
		padding: .2rem 0;
		.title {
			display: flex;
			justify-content: space-between;
			line-height:1.5;
			.name {
				display: inline-block;
				width: 60%;
				color: #2DA2FF;
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
		.info {
			display: flex;
			justify-content: space-between;
			margin-top: .1rem;
			line-height: 1.5;
			span {
				width: 30%;
				display: inline-block;
			}
			.share {
				color: #2DA2FF;
				text-align: right;
			}
		}
	}
}
.item2 {
	background: #fff;
	margin-left: .2rem;
	margin-right: .2rem;
	border-radius: 5px;
	margin-top: .25rem;
	box-shadow: 0px 0px 4px #ccc;
	padding: .25rem;
	.title {
		background: url(../images/my/right.png) no-repeat right;
		line-height: 1.8;
		background-size:.1rem .2rem ;
		span {
			display: inline-block;
			padding-right: 10px;
			font-size: .24rem;
		}
	}
	.info {
		font-size: .3rem;
		display: flex;
		justify-content: space-between;
		color: #999;
		font-size: .26rem;
		margin-top: .28rem;
		span{
			&:nth-child(2) {
				font-size: .36rem;
				color: #333;
				small {
					font-size: .24rem;
					color: #666;
					padding-left: 4px;
				}
			}
		}
	}
}
</style>