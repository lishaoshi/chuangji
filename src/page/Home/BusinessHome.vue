<template>
    <div class="home" ref="home">
        <!-- <scroll> -->
        <div class="content">
           <div class="topBox">
                    <div class="opcityBox"></div>
                    <div class="classType">
                        <div @click="handleChooseTopClass(index)" v-for="(item, index) of topClassType" :key="index" class="setOpcity" :class="{isChoose:index==chooseTopClass}">{{item.name}}</div>
                    </div>
                    <div v-bind:class="{ search: isActive, 'bg-blue': hasError  }">
                        <SearchBar ref="searchBox" :business='business' v-model="searchValue" :searchFn="searchFn" @input="input" @keyup="keyup" @clearText='clearText'></SearchBar>
                        <div class="approve">
                            <img src="../../images/index/study1@2x.png"/>
                        </div>
                    </div>
                    
                </div>
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                
                <div class="">
                    <mt-swipe :auto="4000" style="height: 4rem;">
                        <mt-swipe-item :key="key" v-for="(swipe,key) in swipers"><a :href="swipe.link"> <img :src="swipe.img" width="100%"></a>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <div class="noticesBox"  v-if="notices!=null">
                    <Notice :notices="notices"></Notice>
                </div>
                
                <div class="noticeNomoer" v-else>
                    <svg>
                        <use xlink:href="#icon-notice"/>
                    </svg>
                    <span style="padding-left: 5px">暂时没有消息</span>
                </div>
            <!-- <div class="add">
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
            </div> -->
            <div class="select-box" v-if="chooseTopClass==0">
                <img src="../../images/index/home-leftLine.png">
                <span> 推荐厂家</span>
                <img src="../../images/index/home-rightLine.png">
            </div>
            <div class="main-body">
                <!--  :style="{ height: (wrapperHeight-50) + 'px' }" :bottom-method="loadBottom" -->
               <setTimeOutCom v-if="chooseTopClass==1"/>
                <template v-if="(suppliers.length>0&&chooseTopClass==0) || (modayList.length>0&&chooseTopClass==1)">
                    <div v-if="chooseTopClass==0">
                         <choost-type :configs="configs" @chooseType="chooseType"/>
                        <supplier-item :data="item" v-for="(item,index) in suppliers" :key="index" :index="index"/>
                        <p v-if="allLoaded" class="loader-over">加载完毕</p>
                    </div>
                    
                    <div v-if="chooseTopClass==1">
                        
                        <mo-day :list="modayList"/>
                    </div>
                </template>
            </div>
                
            </mt-loadmore>
            <EmptySupplier v-if="(suppliers.length<=0&&chooseTopClass==0) || (modayList.length<=0&&chooseTopClass==1)"/>
            <!--
            <div @click="authToRouter('/factory/cart')">
                <img src="../../images/index/shop.png" class="shopcar" />
            </div>
            -->
            <div>
                <img @click="goShopCart" src="../../images/index/shop.png" class="shopcar newClass"/>
                 <!-- <svg v-if="USERTYPE==2" class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-promote-promoter"/>
                </svg> -->
                <!-- <svg v-else class="icon shopcar newClass" aria-hidden="true"> 
                    <use xlink:href="#icon-shop-car-0"></use> 
                </svg> -->
            </div>
        </div>
        <!-- </scroll> -->
        <clxsd-foot-guide :user-type="2" class="foot"/>
    </div>
</template>

<script>
    import {adList, infoList} from "@/api/ad";
    import {mapState} from "vuex";
    import SearchBar from '@/components/common/SearchBar';
    import {findNearBySuppliers} from '@/api/supplier.js';
    import SupplierItem from './SupplierItem';
    import EmptySupplier from '@/components/EmptyList'
    import Notice from '@/components/common/notice';
    import BScroll from 'better-scroll'
    import choostType from "./UnSureExtension/factoryChooseType";
    import MoDay from "./BusinessTopClass/Moday";
    import setTimeOutCom from "./BusinessTopClass/SetTimeoutDay";
    import { getFactoryGooodsList } from "@/api/homeFactory.js";
    export default {
        name: "page-business-home",
        components: {
            SupplierItem,
            SearchBar,
            EmptySupplier,
            Notice,
            choostType,
            MoDay,
            setTimeOutCom
        },
        data() {
            return {
                showLoading: true, //显示加载动画
                isActive: true,
                hasError: false,
                swipers: [],
                suppliers: [],
                page: 1,
                // isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                notices: [],
                allLoaded: false, //是否自动触发上拉函数
                isAutoFill: false,
                wrapperHeight: 0,
                courrentPage: 1,
                limit: 20,
                searchValue: '',
                isFirst: true,
                business:true,
                currentChooseType: 0,
                configs: [],
                configValue: "",
                topClassType: [
                    {
                        name: '定制生产',
                        type: 0
                    },
                    {

                        name: '周一促销',
                        type: 1
                    },
                    {
                        name: '12号集采节',
                        type: 2
                    }, 
                    {
                        name: '集采大会',
                        type: 3
                    }
                ],
                chooseTopClass: 0,
                modayList: [
                ]
            }
        },
        computed: {
            // ...mapState(['POSITION']),
            ...mapState({
                POSITION:(state)=>{state.POSITION},
                USERTYPE:state=>{
                    return state.CURRENTUSER.data.user_type
                    }
            }),
            // ...mapState({
			// 	USER_TYPE: state => state.CURRENTUSER.data.user_type,
			// })
            lat() {
                return this.POSITION.lat
            },
            lng() {
                return this.POSITION.lng
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true)
        },
       
        created() {
            this.initData()
            this.loadFrist();
            this.$nextTick().then(res => {
                // console.log(res,'res')
                // let scroll = new BScroll(this.$refs.home)
                // console.log(scroll,'scroll')
            })
        },
        methods: {
            loadTop() {
                this.courrentPage = 1
                this.loadFrist();
            },
            chooseType(vlaue) {
                this.configValue = vlaue
                const params = {
                    page: 1,
                    limit: this.limit,
                    search: this.searchValue,
                    type: vlaue
                }
                findNearBySuppliers(params).then(res=>{
                    this.allLoaded = false; // 可以进行上拉
                    this.suppliers = res.data.data.items;
                    if(this.suppliers.length == 0) {
						this.allLoaded = true
					}
                })
            },
            // 前往购物车
            goShopCart() {
                this.$router.push({path:'/factory/cart'})
            },
            // 上拉加载
            loadBottom() {
                this.loadMore();
            },
             // 点击搜索
            searchFn() {
                const params = {
                    page: 1,
                    limit: this.limit,
                    search: this.searchValue
                }
                this.allLoaded = false;
                if(this.chooseTopClass == 0) {
                      findNearBySuppliers(params).then(response => {
                     // 可以进行上拉
                        this.suppliers = response.data.data.items;
                        // this.$refs.loadmore.onTopLoaded();
                    })
                } else if(this.chooseTopClass ==1) {
                    this.modayList = [];
                    this._getFactoryGooodsList();
                }
            },
            // 软键盘弹出时，点击搜索按钮执行
			keyup() {
				const params = {
                    page: 1,
                    limit: this.limit,
                    search: this.searchValue
                }
                this.allLoaded = false;
                this.$refs.searchBox.$refs.input.blur();
                if(this.chooseTopClass == 0) {
                      findNearBySuppliers(params).then(response => {
                     // 可以进行上拉
                        this.suppliers = response.data.data.items;
                        // this.$refs.loadmore.onTopLoaded();
                    })
                } else if(this.chooseTopClass ==1) {
                    this.modayList = [];
                    this._getFactoryGooodsList();
                }
              
                
            },
            input(vlaue){
                this.searchValue = vlaue
            },
            // 下来刷新加载
            loadFrist() {
                const params = {
                    page: this.courrentPage,
                    limit: this.limit,
                }
                findNearBySuppliers(params).then(response => {
                    let data = response.data.data
                    this.allLoaded = false; // 可以进行上拉
                    this.suppliers = data.items;
                    this.configs = data.configs;
                    this.configs.unshift({name: "全部", vlaue: ""})
                })
            },
            // 加载更多
            loadMore() {
                this.courrentPage++;
                const params = {
                    page: this.courrentPage,
                    limit: this.limit,
                    search: this.searchValue
                }
                if(this.chooseTopClass == 0) {
                    findNearBySuppliers(params).then(response => {
                        let data = response.data.data
                        data && (this.suppliers = this.suppliers.concat(data.items))
                        if (!data || data.items.length < this.limit) {
                            this.allLoaded = true; // 若数据已全部获取完毕
                        }
                        this.$refs.loadmore.onBottomLoaded();
                    })
                } else {
                    this._getFactoryGooodsList();
                }
               
            },
            async initData() {
                //console.log(44)
                const {data} = await adList({channel: 'app', space: 'home-top'})
                this.swipers = data.data
                infoList({from: 'platform',space:"global-top"}).then(data => {
                    this.notices = data.data.data
                })
            },
            handleScroll() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > 150) {
                    this.hasError = 1;
                } else {
                    this.hasError = 0;
                }
            },
            clearText(){
                this.searchValue = ''
            },

            //获取周一促销列表
            _getFactoryGooodsList() {
                let params = {
                    page: this.courrentPage,
                    limit: this.limit,
                    search: this.searchValue
                }
                getFactoryGooodsList(params).then(res=>{
                    let list = res.data.data.list || [];
                    list.forEach((item, index, targetArr)=>{
                        targetArr[index].isSelfChoose = false;
                    });
                    this.modayList = this.modayList.concat(list);
                    if(this.courrentPage > 0) {
                        this.$refs.loadmore.onBottomLoaded();
                    }
                    if (!list || list.length <= 0) {
                            this.allLoaded = true; // 若数据已全部获取完毕
                        }
                });
            },
            //选择头部营销类型
            handleChooseTopClass(index) {
                this.chooseTopClass = index;
                this.suppliers = [];
                this.modayList = [];
                this.courrentPage = 1;
                this.allLoaded = false;
                if(index > 1) {
                    this.$router.push('/develop');
                } else if(index == 1) {
                    this._getFactoryGooodsList();
                } else if(index == 0) {
                    this.loadFrist();
                } 
            }
        }
    }
</script>

<style lang="scss" scoped>
    .main-body {
        /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
        overflow: scroll;
        &>.company:not(:nth-of-type(2)) {
            border-radius: 16px 16px 16px 16px;
            margin-top: .2rem;
        }
    }
    .home {
        display: flex;
        flex-direction: column;
        height: 100%;
        .foot {
            height: 1rem;
        }
    }
    .content {
        flex: 1;
        overflow: auto;
        margin-bottom: 1rem;
        .topBox {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            z-index: 100;
            width: 100%;
            /* background:linear-gradient(to bottom, #666 0%, #b5b3b3 20%); */
            .classType {
                display: flex;
                height: .8rem;
                font-size: .34rem;
                align-items: center;
                justify-content: space-around;
                color: #fff;
                position: relative;
                z-index: 99;
                .setOpcity {
                    opacity: 0.6;
                }
                .isChoose {
                    opacity: 1!important;
                    color: #fff;;
                }
            }
            .opcityBox {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(to bottom, #000 0%, transparent 100%);;
                opacity: 0.4;
                /* z-index: 2; */
                /* box-shadow: 2px 2px 2px #666; */
            }
        }
        
    }
    .noticesBox {
       padding: 0.16rem 0;
        background: #fff;
    }

    .select-box {
        display: flex;
        justify-content: center;
        font-size: .24rem;
        height: .78rem;
        line-height: .78rem;
        text-align: center;
        color: #ccc;
        align-items: center;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(204, 204, 204, 1);

        img {
            width: .82rem;
            // height: .002rem;
        }
        span {
            padding: 0 .2rem;
        }
    }

    .bg-blue {
        background: #26A2FF;
    }

    .search {
        display: flex;
        /* position: fixed; */
        width: 100%;
        /* top: 0px; */
        padding: 0px 10px 6px;
        z-index: 999;
        align-items: center;
        justify-content: space-between;
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        -webkit-overflow-scroll:touch;
        .approve {
            margin-left: .25rem;

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
        z-index: 99;
        &.newClass {
            width: 1rem;
            height: 1rem;
            right: 20px;
            bottom: 60px;
        }
    }

    .notice {
        // margin: .2rem 0;
        margin-top: 0px;
        background: #fff;
        width: 100%;
        line-height: .56rem;
        display: flex;
        padding: 0 .24rem;
        align-items: center;
        height: .56rem;
        .notice-list {
            width: 6.2rem;
            height: .88rem;
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
    .noticeNomoer {
		margin-top: 0px;
		background: #fff;
		width: 100%;
		height: .88rem;
		line-height: .88rem;
		display: flex;
		padding: 0 .24rem;
		align-items: center;
		.notice-list {
			width: 6.2rem;
			height: .88rem;
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
            transform: translateY(0);
        }

        100% {
            transform: translateY(-.88rem);
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

    .activeTop {
        // height: 1.6rem;
        // padding-top: .5rem;
    }

    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .activeTop {
            // height: 1.6rem;
            // padding-top: 35px;
        }
    }
    
</style>

<style lang="scss">
.home {
    .scroll-content  {
        li {
            height: .56rem!important;
            line-height: .56rem!important;
        }
        &.anim {
            margin-top: -.56rem!important;
        }
    }
}
</style>
