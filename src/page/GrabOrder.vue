<template>
	
    <transition name="graborder" mode="out-in">
    	<div>
    		<mt-header title="某某药厂有限公司"></mt-header>
    		<mt-search v-model="value" style="height: auto;" placeholder="药家，厂家"></mt-search>
    		<div class="order-list">
    			<div class="order-img">
    				<router-link to="">
    					<img src="../images/index/img2.png" alt="">
    				</router-link>
    			</div>
    			<div class="order-box">
    				<router-link to="">
    					<p class="title">维生素</p>
	    				<p class="info">规格：100mg</p>
	    				<p class="info">厂家：华夏制药</p>
    				</router-link>
    				<div class="go-grab">
    					<div class="left">
    						<span>9.00</span><small>已集<i>2000</i>盒</small>
    					</div>
    					<div class="right">
    						<router-link to="">
    							<span class="go-grab-sp">抢单</span>
    						</router-link>
    					</div>
    				</div>
    			</div>
    			<div class="time"><svg><use xlink:href="#icon-shijian"/></svg><span>12天12时12分12秒</span></div>
    		</div>
    		<div class="order-list">
    			<div class="order-img">
    				<router-link to="">
    					<img src="../images/index/img2.png" alt="">
    				</router-link>
    			</div>
    			<div class="order-box">
    				<router-link to="">
    					<p class="title">维生素</p>
	    				<p class="info">规格：100mg</p>
	    				<p class="info">厂家：华夏制药</p>
    				</router-link>
    				<div class="go-grab">
    					<div class="left">
    						<span>9.00</span><small>已集<i>2000</i>盒</small>
    					</div>
    					<div class="right">
    						<router-link to="">
    							<span class="go-grab-sp">抢单</span>
    						</router-link>
    					</div>
    				</div>
    			</div>
    			<div class="time"><svg><use xlink:href="#icon-shijian"/></svg><span>12天12时12分12秒</span></div>
    		</div>
    		<div class="order-list">
    			<div class="order-img">
    				<router-link to="">
    					<img src="../images/index/img2.png" alt="">
    				</router-link>
    			</div>
    			<div class="order-box">
    				<router-link to="">
    					<p class="title">维生素</p>
	    				<p class="info">规格：100mg</p>
	    				<p class="info">厂家：华夏制药</p>
    				</router-link>
    				<div class="go-grab">
    					<div class="left">
    						<span>9.00</span><small>已集<i>2000</i>盒</small>
    					</div>
    					<div class="right">
    						<router-link to="">
    							<span class="go-grab-sp">抢单</span>
    						</router-link>
    					</div>
    				</div>
    			</div>
    			<div class="time"><svg><use xlink:href="#icon-shijian"/></svg><span>12天12时12分12秒</span></div>
    		</div>
    		<clxsd-foot-guide :user-type="1" />
    	</div>
    </transition>
</template>

<script>
    export default {
        name: "GrabOrder"
    }
</script>

<style lang="scss" scoped>
	.order-list {
		padding: .3rem .15rem;
		padding-top: .45rem;
		border-bottom: 1px solid #f1f1f1;
		background: #fff;
		display: flex;
		justify-content: space-between;
		position: relative;
		.order-img {
			width: 24%;
			img {
				width: 100%;
				height: 1.75rem;
			}
		}
		.time {
			position: absolute;
			right: .05rem;
			top:.1rem;
			font-size: .2rem;
			transform: scale(.85);
			height: .3rem;
			line-height: .3rem;
			color: #F5A503;
			svg {
				width: .4rem;
				height: .4rem;
				padding-top: .1rem;
			}
		}
		.order-box {
			width: 70%;
			p {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: #333;
			}
			.title {
				font-size: .35rem;
				line-height: 150%;
			}
			.info {
				font-size: .24rem;
			}
		}
	}
	.go-grab {
		display: flex;
		justify-content: space-between;
		margin-top: .2rem;
		.left {
			width: 60%;
			span {
				font-size: .3rem;
				color: #F30000;
				padding-right: .1rem;
			}
			small {
				font-size: .21rem;
				color: #666;
				i {
					font-size: .27rem;
					color: #333;
					padding: 0 1px;
				}
			}
		}
		.right {
			right: 40%;
			.go-grab-sp {
				background: #26A2FF;
				color: #fff;
				font-size: .24rem;
				padding: .1rem .3rem;
				border-radius: .1rem;
			}
		}
	}
	
</style>