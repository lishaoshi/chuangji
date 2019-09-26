<template>
	<div id="DrugDetail">
		<clxsd-head-top :title='`药链通集采平台`'></clxsd-head-top>
		<mt-swipe :auto="4000" style="height: 5.6rem;">
			<mt-swipe-item><img src="../images/index/img3.png" width="100%"></mt-swipe-item>
			<mt-swipe-item><img src="../images/index/img3.png" width="100%"></mt-swipe-item>
			<mt-swipe-item><img src="../images/index/img3.png" width="100%"></mt-swipe-item>
		</mt-swipe>
		<div class="contant">
			<div class="title">维生素</div>
			<div class="info">
				<span>药&nbsp;&nbsp;&nbsp;&nbsp;厂</span>
				<samp>华夏制药集团股份有限责任公司</samp>
			</div>
			<div class="info">
				<span>规&nbsp;&nbsp;&nbsp;&nbsp;格</span>
				<samp>1000mg*20</samp>
			</div>
			<div class="info">
				<span>有效期</span>
				<samp>2018.10.10</samp>
			</div>
		</div>
		<div class="price-flex">
			<div>
				<p class="price"><span>￥600</span><small>/盒</small></p>
				<p class="name">订货价</p>
			</div>
			<div>
				<p class="price"><span>￥600</span><small>/盒</small></p>
				<p class="name">原价</p>
			</div>
		</div>
		<div class="contant">
			<div class="info">
				<span>添加时间</span>
				<samp>2018.02.02</samp>
			</div>
			<div class="info">
				<span>修改时间</span>
				<samp>2018.03.03</samp>
			</div>
		</div>
		<div class="bg-fade"></div>
		<div class="state">下架商品</div>
	</div>
</template>

<script>
	export default {
		name: "DrugDetail",
	}
</script>

<style lang="scss" scoped>
	.collect {
		color: #fff;
		padding: 3px 8px;
		border-radius: 10px;
		border: 1px solid #56D9CD;
		font-size: 12px;
		
	}
	
	.contant {
		background: #fff;
		padding: 10px;
		margin-top: .2rem;
	}
	
	.title {
		font-size: .34rem;
		line-height: 150%;
		margin-bottom: 3px;
		margin-top: .2rem;
	}
	
	.info {
		font-size: .24rem;
		line-height: 180%;
		span {
			color: #7C7C7C;
			width: 60px;
			display: inline-block;
		}
	}
	
	.price-flex {
		display: flex;
		justify-content: space-between;
		margin-top: .2rem;
		padding: .4rem 0px;
		background: #fff;
		>div {
			width: 50%;
			text-align: center;
			&:nth-child(1) {
				border-right:1px solid #f1f1f1;
			}
			p{
				&:nth-child(1){
					color: #F2385A;
					font-size: .28rem;
					line-height: 160%;
					small{
						color: #ccc;
						font-size: .2rem;
					}
				}
				&:nth-child(2){
					color: #ccc;
					font-size: .22rem;
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
		text-align: center;
		color: #26A2FF;
		font-size: .34rem;
		position: fixed;
		width: 100%;
		bottom: 0px;
	}
</style>