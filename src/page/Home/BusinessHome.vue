<template>
	<div class="home">
		<div v-bind:class="{ search: isActive, 'bg-blue': hasError ,activeTop: isFullScreen }">
			<SearchBar></SearchBar>
            <router-link to="/develop">
                <div class="approve">
                    <img src="../../images/index/study1@2x.png" />
                </div>
            </router-link>
		</div>
		<div class="">
            <mt-swipe :auto="4000" style="height: 4rem;">
                <mt-swipe-item :key="key" v-for="(swipe,key) in swipers"><a :href="swipe.link"> <img :src="swipe.picture" width="100%"></a></mt-swipe-item>
            </mt-swipe>
		</div>
        <Notice :notices = "notices"></Notice>

		<div class="add">
			<a href="javascript:void(0)">
				<img src="../../images/index/activityA.png">
			</a>
			<a href="javascript:void(0)">
				<img src="../../images/index/activityB.png">
			</a>
			<a href="javascript:void(0)">
				<img src="../../images/index/activityC.png">
			</a>
			<a href="javascript:void(0)">
				<img src="../../images/index/activityD.png">
			</a>
		</div>
        <div class="select-box">
            <img src="../../images/index/home-leftLine.png">
            <span>推荐厂家</span>
            <img src="../../images/index/home-rightLine.png">
        </div>
		<div>
			<ClxsdLoadMore key="factory-list"
				ref="loadmore"
                       @onRefresh="onRefresh"
                       @onLoadMore="onLoadMore">
				<supplier-item  :data="item" v-for="(item,index) in suppliers"/>
        	</ClxsdLoadMore>
		</div>
        <!--
		<div @click="authToRouter('/factory/cart')">
			<img src="../../images/index/shop.png" class="shopcar" />
		</div>
		-->
        <img src="../../images/index/shop.png" class="shopcar" />
		<clxsd-foot-guide :user-type="2" />
	</div>
</template>

<script>
    import { adList,infoList} from "@/api/ad";
    import { mapState } from "vuex";
    import SearchBar from '@/components/common/SearchBar';
    import { findNearBySuppliers } from '@/api/supplier.js';
	import SupplierItem from './SupplierItem';
	import EmptySupplier from '@/components/EmptyList'
    import Notice from '@/components/common/notice';
	export default {
		name: "page-business-home",
		components:{
		  	SupplierItem,
		  	SearchBar,
		  	EmptySupplier,
            Notice
		},
		data() {
			return {
                showLoading: true, //显示加载动画
				isActive: true,
				hasError: false,
                swipers:[],
                suppliers:[],
                page:1,
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                notices:[
                    '重磅！国家重点监控药品目录公布',
                    '国家药监局开会，4+7集采又迎来一“战队”?',
                    '最高领导人讲话，中医药机会来了',
                ]
			}
		},
        computed:{
            ...mapState(['POSITION']),
            lat(){
                return this.POSITION.lat
            },
            lng(){
                return this.POSITION.lng
            }
        },
        activated(){
		    //console.log(this.$refs.loadmore);
		    //.beforeRefresh();
        },
		mounted() {
			window.addEventListener('scroll', this.handleScroll, true)
		},
		created(){
           this.initData()
		},
		methods: {
            async initData(){
                //console.log(44)
                const { data } =await  adList({channel:'app',space:'home-top'})
                this.swipers = data.data
                infoList({from:'business'}).then( data => {
                    this.notices = data.data.data
					console.log(this.notices)
                })
            },
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if(scrollTop > 150) {
					this.hasError = 1;
				} else {
					this.hasError = 0;
				}
			},
            async getFactoryData(options,loadMore = false){
            	const params = {
                    page: this.page,
                    type:'factory',
                    limit:options.limit
                }

            	findNearBySuppliers(params)
                    .then(({ data = []}) => {
                        console.log(data.data)
                    	if(loadMore){
		                    this.suppliers = [...this.suppliers,...data.data]

		                }else{
		                    this.suppliers = data.data
		                }
                        this.page = this.page + 1
		                this.$refs.loadmore.afterLoadMore(data.data.length < options.limit)
						if(options.callback){
					        options.callback()
						}
                    })
            },

            onRefresh(callback){
            	this.page = 1
				const options = {

                    limit:6,
					callback:callback
                }
				this.getFactoryData(options)



            },
            onLoadMore(){
				const options = {

                    limit:6,
                }
				this.getFactoryData(options,true)

            }

		}
	}
</script>

<style lang="scss" scoped>
    .select-box {
        display: flex;
        justify-content: center;
        font-size:.24rem;
        height: .78rem;
        line-height: .78rem;
        text-align: center;
        color: #ccc;
		align-items: center;
        img {
            width: .82rem;
            height: .002rem;
        }
    }
	.bg-blue {
		background: #26A2FF;
	}

	.search {
		display: flex;
		position: fixed;
		width: 100%;
		top: 0px;
		padding: 10px 10px 6px;
		z-index: 999;
		align-items: center;
		justify-content: space-between;
		.retreat {
			width: 30px;
			height: 30px;
		}
		.approve {
			margin-left: .2rem;
			img {
				width: .65rem;
				height: .65rem;
			}
		}
	}

	.shopcar {
		position: fixed;
		width: 1.3rem;
		height: 1.3rem;
		height: auto;
		right: 0px;
		bottom: 1.3rem;
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
	@keyframes anis {
		0% {
			transform:translateY(0);
		}

		100% {
		transform:translateY(-.88rem);
		}
	}
	.add {
		text-align: center;
		background: #fff;
		padding: .2rem 0px .06rem;
		margin-top: 5px;
		margin-bottom: 5px;
		a {
			display: inline-block;
			width: 46.5%;
			margin: 0 1%;
			margin-bottom: .07rem;
			img {
				width: 100%;
			}
		}
	}

	.empty {
		padding-top: 1rem;
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
