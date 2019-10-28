<template>
    <div class="home">
    	<header v-bind:class="{ activeTop: isFullScreen }">药通</header>
    	<div class="home-top">
    		<form method="" id="" class="top-search">
				<button type="submit">
    				<svg @click="searchFn">
		                <use xlink:href="#icon-search"/>
		            </svg>
    			</button>
    			<input ref="searchBox" type="text" @input="input" v-model="sear_value" placeholder="请输入药品名称" />
    				<div style="padding-top:.15rem">
						<svg class="clear" ref="clear">
		                <use xlink:href="#icon-empty1" @click="clearText"/>
		            	</svg>
					</div>
    		</form>
    		<div class="scroll">
    			<ul class="area-ul">
    				<li v-for="(area,_arIndex) in areaData" :key="`_area_${_arIndex}`" @click="areaSelect(area,_arIndex)"
                        :class='_arIndex == selected?"active":""'>{{area.name}}</li>
    			</ul>
    		</div>
    		<div class="scroll" v-if="cityData.length>1">
    			<ul class="area-ul">
    				<li v-for="(area,_cityIndex) in cityData"  :key="`_area_${_cityIndex}`"
                        :class='_cityIndex == selectedcity?"active":""'
                        @click="selectedcity =_cityIndex;"
                    >{{area.name}}</li>
    			</ul>
    		</div>
    	</div>
		<mt-swipe :auto="4000" class="swiper">
			<mt-swipe-item :key="key" v-for="(swipe,key) in swipers"><a href="swipe.link" target="_blank"> <img :src="swipe.picture" width="100%"></a></mt-swipe-item>
		</mt-swipe>
		<div class="white-fade"></div>
        <Notice :notices = "notices"></Notice>
		<div class="shop-list">
			<div class="list-left">
				<router-link to="">
					<img src="../../images/index/img.png" />
				</router-link>
			</div>
			<div class="list-right">
				<router-link to="">
					<h3 class="title">维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素</h3>
				</router-link>
				<div class="desc">
					<div class="desc-box">
						<p class="small-title">库存量</p>
						<p>1587</p>
					</div>
					<div class="line"></div>
					<div class="desc-box">
						<p class="small-title">销售量</p>
						<p>1587</p>
					</div>
					<div class="line"></div>
					<div class="desc-box">
						<p class="small-title">销售额</p>
						<p>1587</p>
					</div>
				</div>
			</div>
		</div>
		<div class="shop-list">
			<div class="list-left">
				<router-link to="">
					<img src="../../images/index/img.png" />
				</router-link>
			</div>
			<div class="list-right">
				<h3 class="title color-black">维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素</h3>
				<p class="no-identi" @click="buyLooking">100贝买一个月查看权</p>
			</div>
		</div>
		<div class="shop-list">
			<div class="list-left">
				<router-link to="">
					<img src="../../images/index/img.png" />
				</router-link>
			</div>
			<div class="list-right">
				<h3 class="title color-black">维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素</h3>
				<p class="no-identi" @click="goRecharge">100贝买一个月查看权</p>
			</div>
		</div>
		<div class="shop-list">
			<div class="list-left">
				<router-link to="">
					<img src="../../images/index/img.png" />
				</router-link>
			</div>
			<div class="list-right">
				<h3 class="title color-black">维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素维生素</h3>
				<p class="no-identi" @click="editInformation">100贝买一个月查看权</p>
			</div>
		</div>
        <clxsd-foot-guide :user-type="1"/>
    </div>
</template>

<script>
    import { adList,infoList} from "@/api/ad";
    import areaData from "@/plugins/json/pca-code.json";
    import Notice from '@/components/common/notice';
    export default {
        name: "page-factory-home",
        components:{
            Notice        },
		data(){
          return {
              swipers:[],
              notices:[
                  '重磅！国家重点监控药品目录公布',
                  '国家药监局开会，4+7集采又迎来一“战队”?',
                  '最高领导人讲话，中医药机会来了',
			  ],
			  sear_value:'',
              areaData: areaData,
              cityData:'',
              isActive: false,
              selected:0,
              isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
              selectedcity:0,
		  }
		},
		created(){
        	this.initData()
		},
        methods:{
            areaSelect(area,_arIndex){
                this.selected =_arIndex;

                this.cityData = area.children
            },
            async initData(){
                //console.log(44)
                const { data } =await  adList({channel:'app',space:'global-top'})
                this.swipers = data.data
                infoList({from:'factory'}).then( data => {
                    this.notices = data.data.data
                })
            },
        	buyLooking:function(){
        		this.$messagebox.confirm("确定要购买吗?").then(action => {
				    if('confirm' === action){
                        
					}
				}).catch(err => err);
        	},
        	goRecharge:function(){
        		this.$messagebox.confirm("当前账户剩余50药通币，此次消费要100药通币，去充值?").then(action => {
				    if('confirm' === action){
                        
					}
				}).catch(err => err);
        	},
        	editInformation:function(){
        		this.$messagebox.confirm("您还未完善认证信息，去完善?").then(action => {
				    if('confirm' === action){
                        this.$router.push('')
					}
				}).catch(err => err);
			},
			clearText(){
				this.sear_value = ''
				this.$refs.clear.style.display = 'none'

			},
			searchFn(){

			},
			input(){
				console.log('wer');
				console.log(this.sear_value);
				
				console.log(this.$refs.clear);
				if(this.sear_value){
					this.$refs.clear.style.display = 'block'
				}else {
					this.$refs.clear.style.display = 'none'
				}
				// this.$refs.clear
			}
        }
    }
</script>

<style lang="scss" scoped>
	.home {
		padding-bottom: 80px;
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
	.home-top {
		background: #26A2FF;
		padding-bottom: 1.3rem;
	}
	.top-search {
		margin-left: 10px;
		margin-right: 10px;
		background: #fff;
		height: .6rem;
		line-height: .6rem;
		display: flex;
		position: relative;
		background: #fff;
		border-radius: .6rem;
		overflow: hidden;
		padding: 0 15px;
		justify-content: space-between;
		margin-bottom: .15rem;
		input {
			width: 90%;
			&::placeholder {
				text-align: center;
			}
		}
		button {
			background: none;
		}
		svg {
			width: .3rem;
			height: .3rem;
			background: #fff;
			color: #666;
		}
	}
	.scroll {
		overflow-x:scroll;
		position: relative;
		height: 28px;
		letter-spacing: 1px;
		overflow-y: hidden;
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
				color: #fff;
				opacity: .7;
				font-size: .28rem;
				line-height: 35px;
				min-width: 1.3rem;
			}
			.active {
				font-size: .42rem;
				opacity: 1;
				font-weight: bold;
			}
		}
	}
	.swiper {
		position: relative;
		margin: 0 auto;
		margin-top: -1.1rem;
		height: 2.5rem;
		margin-left: 10px;
		margin-right: 10px;
		z-index: 9;
		img {
			border-radius: 4px;
		}
	}
	.white-fade {
		height: 1.3rem;
		background: #fff;
		position: relative;
		margin-top: -1.4rem;
		z-index: 2;
	}
    .notice {
        margin: .2rem 0;
        margin-top: 0px;
        background: #fff;
        width: 100%;
        height: .64rem;
        line-height: .64rem;
        display: flex;
        padding: 0 .24rem;
        align-items: center;

        .notice-list {
            width: 6.2rem;
            height: .64rem;
            overflow-y: hidden;
            margin-left: .1rem;

            a {
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: .24rem;
                line-height: .64rem;
                color: #333;
            }
        }

        svg {
            width: .38rem;
            height: .38rem;
        }
    }
	.shop-list {
		display: flex;
		background: #fff;
		padding: .15rem .2rem;
		margin-top: .15rem;
		.list-left {
			width: 30%;
			border:1px solid #f1f1f1;
			height: 1.8rem;
			padding:.05rem 0;
			border-radius:2px;
			img {
				width: 100%;
				height: 1.58rem;
			}
		}
		.list-right {
			width: 70%;
			padding-left: 3%;
			.title {
				font-size: .33rem;
				line-height: 250%;
				white-space:nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: #26A2FF;
				
			}
			.color-black {
				color: #333;
			}
			.desc {
				display: flex;
				justify-content: space-between;
				padding: 0 .2rem;
				.line {
					width: 1px;
					height: .5rem;
					background: #f1f1f1;
					margin-top: .1rem;
				}
				.desc-box {
					text-align: center;
					font-size: .3rem;
					color: #000;
					.small-title {
						color: #666;
						font-size: .22rem;
						margin-bottom: .1rem;
					}
					p:nth-child(2) {
						font-family: arial;
					}
				}
			}
			.no-identi {
				text-align: right;
				color: #26A2FF;
				font-size: .28rem;
				margin-top: .4rem;
			}
		}
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
	.clear {
		display: none;
	}
</style>