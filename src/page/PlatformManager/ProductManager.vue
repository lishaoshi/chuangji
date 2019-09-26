<template>
	<div id="ProductManager">
        <clxsd-head-top ></clxsd-head-top>
		<div class="search">
			<div class="inpSearch">
				<input type="text" placeholder="请输入关键词">
				<i></i>
				<img src="../../images/index/search@2x.png" alt="">
			</div>
		</div>
		<mt-navbar v-model="selected">
			<mt-tab-item id="1">全部</mt-tab-item>
			<mt-tab-item id="2">审核</mt-tab-item>
			<mt-tab-item id="3">出售</mt-tab-item>
			<mt-tab-item id="4">下架</mt-tab-item>
		</mt-navbar>
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<div class="item">
					<div>
						<router-link to="/product-detail">
							<img src="../../images/index/img2.png" class="item-img">
						</router-link>
					</div>
					<div class="item-box">
						<router-link to="/product-detail">
							<p class="title">维生素片</p>
							<p class="info">华南药业</p>
							<p class="info">100mg*100片*1盒&nbsp;&nbsp; 100片/盒</p>
							<p class="price"><span>采购价：<small>￥111</small></span><span>零售价：111</span></p>
						</router-link>
					</div>
					<p class="state">审核中</p>
				</div>
				<div class="item">
					<div>
						<router-link to="">
							<img src="../../images/index/img2.png" class="item-img">
						</router-link>
					</div>
					<div class="item-box">
						<p class="title">维生素片</p>
						<p class="info">华南药业</p>
						<p class="info">100mg*100片*1盒&nbsp;&nbsp; 100片/盒</p>
						<p class="price"><span>采购价：<small>￥111</small></span><span>零售价：111</span></p>
					</div>
					<p class="state">未通过</p>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				222
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<!--<mt-cell v-for="n in 6" :title="'content ' + n"  />-->
			</mt-tab-container-item>
			<mt-tab-container-item id="4">
				<div class="item">
					<div>
						<router-link to="">
							<img src="../../images/index/img2.png" class="item-img">
						</router-link>
					</div>
					<div class="item-box">
						<p class="title">维生素片</p>
						<p class="info">华南药业</p>
						<p class="info">100mg*100片*1盒&nbsp;&nbsp; 100片/盒</p>
						<p class="price"><span>采购价：<small>￥111</small></span><span>零售价：111</span></p>
					</div>
					<p class="state lower">下架&darr;</p>
				</div>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	export default {
		name: "ProductManager",
		data() {
			return {
				selected: '1'
			}
		}
	}
</script>

<style scoped lang="scss">
.search {
		background: #26A2FF;
		display: flex;
		width: 100%;
		top: 0px;
		padding: 10px 10px 6px;
		z-index: 999;
		justify-content: space-between;
    position: absolute;
    margin-left: .4rem;
		.retreat {
			width: 30px;
			height: 30px;
		}
		.inpSearch {
			width: 6.65rem;
			height: 25px;
			background: #fff;
			-moz-border-radius: 25px;
			border-radius: 25px;
			position: relative;
			padding: 0 10px;
			input {
				background: none;
				display: inline-block;
				float: left;
				height: 25px;
				padding-left: 6px;
				width: 80%;
				&::-webkit-input-placeholder {
					text-align: center;
				}
			}
			img {
				width: 25px;
				height: 15px;
				float: right;
				margin-top: 5px;
				display: inline-block;
				border-left: 1px solid #f1f1f1;
				padding-left: 10px;
			}
		}
		.approve {
			img {
				width: 9px;
				height: 15px;
				margin-top: .1rem;
			}
		}
	}
	.item {
		display: flex;
		background: #fff;
		margin:.2rem .2rem 0;
		position: relative;
		border-radius: 3px;
		box-shadow: 0px 0px 3px #B3B3B3;
		height: 2rem;
		overflow: hidden;
		.item-img {
			width: 2rem;
			height: 2rem;
		}
		.item-box {
			width: 70%;
			padding-left: 3%;
			p {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.title {
				color: #333;
				font-size: .32rem;
				line-height: 200%;
				padding-top: .1rem;
			}
			.info,.price {
				color: #666;
				font-size: .24rem;
				line-height: 120%;
			}
			.price {
				margin-top: .2rem;
				span {
					display: inline-block;
					width: 50%;
				}
			}
			
		}
		
	}
	.state {
		position: absolute;
		top:.2rem;
		right: .2rem;
		color: #F2385A;
		font-size: .32rem;
		width: 1.3rem;
		height: .6rem;
		line-height: .6rem;
		text-align: right;
	}
	.lower {
		background: #26A2FF;
		color: #fff;
		border-radius: .5rem;
		text-align: center;
		
	}
</style>