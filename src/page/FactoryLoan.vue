<template>
	<div>
		<clxsd-head-top :title='`应收货款`'></clxsd-head-top>
		<mt-navbar v-model="selected">
			<mt-tab-item id="1">云工厂</mt-tab-item>
			<mt-tab-item id="2">定量生产</mt-tab-item>
			<mt-tab-item id="3">终端采集</mt-tab-item>
		</mt-navbar>
		<div class="container">
			<p class="title">未入账(元)</p>
			<p class="price">50000</p>
		</div>
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="1">
				<p class="title-p">未入账明细</p>
				<div class="container">
					<p class="time">19年12月</p>
					<ul>
						<li>
							<div class="des">
								<p>张仲景大药房张仲景大药房张仲景大药房张仲景大药房</p>
								<p>张无忌</p>
							</div>
							<div class="num">
								1000
							</div>
						</li>
						<li>
							<div class="des">
								<p>张仲景大药房张仲景大药房张仲景大药房张仲景大药房</p>
								<p>张无忌</p>
							</div>
							<div class="num">
								1000
							</div>
						</li>
						<li>
							<div class="des">
								<p>张仲景大药房张仲景大药房张仲景大药房张仲景大药房</p>
								<p>张无忌</p>
							</div>
							<div class="num">
								1000
							</div>
						</li>
					</ul>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
                <p class="title-p">未入账明细</p>
                <div class="container">
                    <p class="time">19年12月</p>
                    <ul>
                        <li>
                            <div class="des">
                                <p>张仲景大药房张仲景大药房张仲景大药房张仲景大药房</p>
                                <p>9人未付款</p>
                            </div>
                            <div class="num">
                                1000
                            </div>
                        </li>
                        <li>
                            <div class="des">
                                <p>张仲景大药房张仲景大药房张仲景大药房张仲景大药房</p>
                                <p>张无忌</p>
                            </div>
                            <div class="num">
                                1000
                            </div>
                        </li>
                        <li>
                            <div class="des">
                                <p>张仲景大药房张仲景大药房张仲景大药房张仲景大药房</p>
                                <p>2人未付款</p>
                            </div>
                            <div class="num">
                                1000
                            </div>
                        </li>
                    </ul>
                </div>
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
                <p class="title-p">未入账明细</p>
                <div class="container">
                    <p class="time">19年12月</p>
                    <ul>
                        <li>
                            <div class="des">
                                <p>张仲景大药房张仲景大药房张仲景大药房张仲景大药房</p>
                                <p>9人未付款</p>
                            </div>
                            <div class="num">
                                100
                            </div>
                        </li>
                        <li>
                            <div class="des">
                                <p>张仲景大药房张仲景大药房张仲景大药房张仲景大药房</p>
                                <p>张无忌</p>
                            </div>
                            <div class="num">
                                1000
                            </div>
                        </li>
                        <li>
                            <div class="des">
                                <p>张仲景大药房张仲景大药房张仲景大药房张仲景大药房</p>
                                <p>2人未付款</p>
                            </div>
                            <div class="num">
                                1500
                            </div>
                        </li>
                    </ul>
                </div>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	export default {
		name: "FactoryLoan",
		data() {
			return {
				selected: '1'
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.title-p {
		padding-left: 5%;
		font-size: .34rem;
		margin-top: .4rem;
		line-height: 2;
	}
    .container {
    	width: 90%;
    	background: #fff;
    	padding: .2rem 0;
    	padding-bottom: 3px;
    	border-radius:5px;
    	margin: .3rem auto;
    	margin-bottom: .2rem;
    	box-shadow: 0px 0px 5px #ccc;
    	.title {
    			margin-top: .4rem;
    			font-size: .3rem;
    			padding-left: .2rem;
    		}
    	.price {
    			margin-top: .25rem;
    			font-size: .75rem;
    			font-family: arial;
    			padding-left: .2rem;
    			padding-bottom: .2rem;
    		}
    	.time {
    		line-height: .7rem;
    		color: #666;
    		font-size: .3rem;
    		border-bottom: 1px solid #f1f1f1;
    		padding: 0 .2rem;
    	}
    	ul {
    		
    		li{
    			height: 1.3rem;
    			border-bottom: 1px solid #f1f1f1;
    			padding: 0 .2rem;
    			display: flex;
    			justify-content: space-between;
    			&:last-child {
    				border:0px
    			}
    			.des {
    				width: 70%;
    				padding: .2rem 0;
    				p {
    					white-space: nowrap;
    					overflow: hidden;
    					text-overflow: ellipsis;
    					&:nth-child(1) {
    						font-size: .34rem;
    						font-weight: bold;
    						line-height: 1.5;
    					}
    					&:nth-child(2) {
    						font-size: .24rem;
    						line-height: 1.5;
                            color: #999;
    					}
    				}
    			}
    			.num {
    				font-size: .4rem;
    				line-height: 1.5rem;
    			}
    		}
    	}
    }
</style>
<style lang="scss">

.mint-navbar .mint-tab-item {
	color: #666;
}
</style>