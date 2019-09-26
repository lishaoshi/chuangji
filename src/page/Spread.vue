<template>
    <transition name="spread" mode="out-in">
    	<div id="Spread">
            <header v-bind:class="{ activeTop: isFullScreen }">某某药厂有限公司</header>
		<div class="home-top">
			<div class="scroll">
				<ul class="area-ul">
					<li v-bind:class="{ active:1 == current}" @click="addClass(1)">药店</li>
					<li v-bind:class="{ active:2 == current}" @click="addClass(2)">连锁</li>
					<li v-bind:class="{ active:3 == current}" @click="addClass(3)">诊所</li>
					<li v-bind:class="{ active:4 == current}" @click="addClass(4)">医院</li>
					<li v-bind:class="{ active:5 == current}" @click="addClass(5)">卫生所</li>
					<li v-bind:class="{ active:6 == current}" @click="addClass(6)">养老院</li>
				</ul>
			</div>
			<div v-bind:class="{ search: isActive, 'bg-blue': hasError }">
				<span class="retreat">郑州市</span>
				<div class="inpSearch">
					<input type="text" placeholder="请输入要搜索的内容">
					<i></i>
					<img src="../images/coupon/loupe.png" alt="">
				</div>
				<div class="approve">
					<svg>
						<use xlink:href="#icon-gongchang-yuncangku"/>
					</svg>
				</div>
			</div>
		</div>
		<mt-swipe :auto="4000" class="swiper">
			<mt-swipe-item><img src="../images/spread/banner@2x.png" width="100%"></mt-swipe-item>
			<mt-swipe-item><img src="../images/spread/banner@2x.png" width="100%"></mt-swipe-item>
			<mt-swipe-item><img src="../images/spread/banner@2x.png" width="100%"></mt-swipe-item>
		</mt-swipe>
		<router-link to="">
			<div class="title">
				<span>活动板块</span>
				<samp>更多 &gt; </samp>
			</div>
		</router-link>
		<div class="adv">
			<div class="adv-list">
				<h3>医保直配</h3>
				<p>为医保驾护航</p>
			</div>
			<div class="adv-list">
				<h3>学术推广</h3>
				<p>学习真正的知识</p>
			</div>
			<div class="adv-list">
				<h3>产业园入驻</h3>
				<p>入住产业园</p>
			</div>
			<div class="adv-list">
				<h3>资产互助</h3>
				<p>互帮互助</p>
			</div>
			<div class="clearfloat"></div>
		</div>
		<div class="scroll scroll-area">
			<ul class="area-ul">
                <li v-for="(area,_arIndex) in areaData" :key="`_area_${_arIndex}`" @click="areaSelect(area,_arIndex)"
                    :class='_arIndex == selected?"active":""' style="min-width: 1.6rem;overflow: hidden">{{area.name}}</li>
			</ul>
		</div>
		<div class="img-list">
			<img src="../images/spread/pic1@2x.png">
			<img src="../images/spread/pic2@2x.png">
			<img src="../images/spread/pic3@2x.png">
			<img src="../images/spread/pic4@2x.png">
		</div>
		<clxsd-foot-guide :user-type="1" />
    	</div>
    </transition>
</template>

<script>
    import areaData from "@/plugins/json/pca-code.json";
    export default {
        name: "Spread",
        data() {
			return {
				isActive: true,
				hasError: false,
                current:1,
                selected:0,
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                areaData: areaData,
			}
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll, true)
		},
		methods: {
            addClass:function(index){
                this.current=index;
            },
            areaSelect(area,_arIndex){
                this.selected =_arIndex;
            },
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if(scrollTop > 50) {
					this.hasError = 1
				} else {
					this.hasError = 0;
				}
			}
		}
    }
</script>
<style lang="scss" scoped>
	.bg-blue {
		background: #26a2ff;
		position: fixed;
	}
	
	.mint-searchbar-cancel {
		font-size: 12px;
	}
	
	.home-top {
		background: #26A2FF;
		padding-bottom: .05rem;
	}
	
	.scroll {
		overflow-x: scroll;
		position: relative;
		height: 28px;
		letter-spacing: 1px;
		overflow-y: hidden;
        &::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
        }
		.area-ul {
			display: -webkit-flex;
			/* Safari */
			display: flex;
			flex-wrap: nowrap;
			position: absolute;
			width: auto;
			padding: 0 10px;
			height: .5rem;
			li {
				display: inline-block;
				color: #fff;
				opacity: .8;
				font-size: .28rem;
				line-height: .5rem;
				min-width: 1.36rem;
			}
			.active {
				font-size: .42rem;
				opacity: 1;
				font-weight: bold;
			}
			.active-county {
				font-size: 16px;
				opacity: 1;
			}
		}
	}
	
	.scroll-area {
		background: #fff;
		border-bottom: 1px solid #f1f1f1;
		height: 40px;
		margin-top: .15rem;
		padding-top: 3px;
		.area-ul {
			li {
				color: #7C7C7C
			}
			.active {
				color: #26A2FF;
			}
		}
	}
	
	.search {
		display: flex;
		position: relative;
		width: 100%;
		top: 0px;
		padding: 10px 10px 6px;
		z-index: 999;
		justify-content: space-between;
		.retreat {
			width: 40px;
			font-size: 12px;
			color: #fff;
			line-height: .6rem;
		}
		.inpSearch {
			width: 5.17rem;
			height: .6rem;
			background: rgba(255, 255, 255, 0.4);
			-moz-border-radius: 25px;
			border-radius: 25px;
			position: relative;
			padding: 0 10px;
			input {
				background: none;
				display: inline-block;
				float: left;
				height: .6rem;
				padding-left: 6px;
				width: 80%;
				&::-webkit-input-placeholder {
					color: rgba(255, 255, 255, 0.6);
				}
			}
			img {
				width: .5rem;
				height: auto;
				float: right;
				margin-top: .15rem;
				display: inline-block;
				padding-left: 10px;
			}
		}
		.approve {
			svg {
				width: 30px;
				height: 30px;
			}
		}
	}
	
	.swiper {
		height: 3.5rem;
		margin: .15rem;
		border-radius: .1rem;
	}
	
	.title {
		display: flex;
		justify-content: space-between;
		height: .7rem;
		line-height: .7rem;
		border-bottom: 1px solid #f1f1f1;
		background: #fff;
		padding: 0 .15rem;
		font-size: .3rem;
		span {
			color: #333;
			font-size: 14px;
		}
		samp {
			color: #7C7C7C;
			font-size: 12px;
		}
	}
	
	.adv {
		background: #fff;
		padding: 0px .15rem;
		.adv-list {
			width: 49%;
			float: left;
			background: url(../images/spread/active1@2x.png) no-repeat right;
			background-size: 1.1rem 1.1rem;
			padding-right: 1.2rem;
			height: 1.7rem;
			background-position-x: 89%;
			border-right: 1px solid #f1f1f1;
			border-bottom: 1px solid #f1f1f1;
			padding-left: 3%;
			&:nth-child(even) {
				border-right: 0px;
				background-position-x:94% ;
			}
			&:nth-child(odd) {
				padding-left:0px
			}
			&:nth-child(2) {
				background-image: url(../images/spread/active2@2x.png);
			}
			&:nth-child(3) {
				background-image: url(../images/spread/active3@2x.png);
			}
			&:nth-child(4) {
				background-image: url(../images/spread/active4@2x.png);
			}
			h3 {
				font-size: .34rem;
				color: #000;
				margin-top: .38rem;
			}
			p {
				color: #ccc;
				font-size: .26rem;
				line-height: 150%;
			}
		}
	}
	
	.clearfloat {
		clear: both;
	}
	.img-list {
		background: #fff;
		padding: .15rem;
		img {
			width: 100%;
			height: auto;
			display: block;
			margin-bottom: .15rem;
		}
	}
    header {
        height: .88rem;
        line-height: .88rem;
        background: #26a2ff;
        color: #fff;
        text-align: center;
        font-size: .36rem;
        font-weight: bold;
        letter-spacing: 1px;
    }
    .activeTop{
        height: 1.6rem;
        padding-top: .5rem;
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .activeTop {
            height: 1.6rem;
            padding-top: 35px;
        }
    }
</style>
