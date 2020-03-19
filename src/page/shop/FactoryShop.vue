<template>
    <div id="CompanyList" class="mainbox">
        <div class="top-box" >
            <img class="retreat" src="../../images/back.png" @click="goBack">
            <div class="inpSearch" v-bind:class="{ 'bg-from': hasError }">
                 <form class="input-wrap" onsubmit="return false" action="">
                    <svg class="icon-location" @click="searchFn">
                        <use xlink:href="#icon-search2"/>
                    </svg>
                    <input ref="searchBox" type="text" @keyup.enter="keyUp" v-model="searchValue" placeholder="请输入商品名称|拼音首字母">
                    <i></i>
                    
                    <svg class="icon-clearText" v-if="searchValue" @click="cleraText">
                        <use :xlink:href="`#icon-${!hasError?'empty1':'qingkong'}`"/>
                    </svg>
                 </form>
            </div>
            <div class="approve">
                <p @click="FollowFactory(shopDetailData.id)">{{follow_info}}</p>
            </div>
        </div>
        <div v-bind:class="{ search: isActive, 'bg-blue': hasError,bg2: isFullScreen }">
        </div>
        <transition name="fade">
            <div class="company" :class="{activebox2: isFullScreen}">
                <div class="brand" @click="queryCompanyDetail">
                    <img v-if="shopDetailData.img_cover" :src="shopDetailData.img_cover" alt="">
                    <default-logo v-if="!shopDetailData.img_cover&&shopDetailData.short_name" :name="shopDetailData.shortName || []" :bgColor=bgColor></default-logo>
                </div>
                <div class="message">
                    <div class="message_title" @click="queryCompanyDetail">
                        <p>{{ shopDetailData.display_name ||shopDetailData.name || ''}}</p>
                    </div>
                    <div class="other">
                        <ul>
                            <li v-show="shopDetailData.address != null">
                                <div>
                                    <svg class="icon-location">
                                        <use xlink:href="#icon-map1"/>
                                    </svg>
                                    <p>{{shopDetailData.city_name || shopDetailData.province_name || '中国'}}</p>
                                </div>
                            </li>
                            <!-- <li>
                                <p>调配时间<i>{{shopDetailData.send_duration || 14}}</i>天</p>
                            </li> -->
                            <li>
                                <p>已售<i>{{shopDetailData.sale_num || 0}}</i>件</p>
                            </li>
                        </ul>
                    </div>
                    <div class="discounts" v-if="shopDetailData.actives!=''">
                        <div class="fade-box"  @click="showRolePicker">
                            <span>{{actity_nums}}个活动</span>
                            <svg class="icon">
                                <use xlink:href="#icon-tuiguang-xialasanjiao"></use>
                            </svg>
                        </div>
                        <ul>
                            <li v-for="(item, index) in (shopDetailData.actives)" :key="index">
                                <span>{{item.promotion_type=="give"?'赠':'返'}}</span>
                                <p style="width: 3.4rem;overflow: hidden;text-overflow:ellipsis; white-space:nowrap;">每满{{item.enough_num}}件，获赠品{{item.give_name}}{{item.give_num}}个</p>
                            </li>
                        </ul>
                    </div>
                    <div class="discounts" v-else>
                        <ul>
                            <li>
                                <span>无</span>
                                <p style="width: 3.6rem;overflow: hidden">店家没有推出活动，敬请期待</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
        <div class="main-box">
            <mt-swipe :auto="4000" class="swiper">
                <mt-swipe-item :key="key" v-for="(swipe,key) in swipers">
                    <a ref="banner_a" v-if="swipe.target_from=='out'" style="width: 100%; height: 100%;" :href="swipe.link"> <img :src="swipe.img" width="100%" height="100%"></a>
                    <div v-else style="width: 100%; height: 100%;"  @click="handleJump(swipe)"><img :src="swipe.img" width="100%" height="100%"></div>
                </mt-swipe-item>
            </mt-swipe>
            <div style="background: #fff;">
                <!-- <Notice :notices="notices" v-if="notices.length" style="background: #f4f5f5;border-radius: 2px;"></Notice> -->
                <div class="left">
                    <Notice :notices="notices" v-if="notices.length"/> 
                    <div class="notice" v-else>
                        <svg>
                            <use xlink:href="#icon-notice"/>
                        </svg>
                        <span> &nbsp;没有消息</span>
                    </div>
                </div>
            </div>
            <div class="nav">
                <div>
                    <!-- <router-link to="/develop"> -->
                        <svg @click="showProm"><use xlink:href="#icon-quanqiucang-active" /></svg>
                        <p>{{isShowProm==0?'工厂活动':'全部商品'}}</p>
                    <!-- </router-link> -->
                </div>
                <div>
                    <router-link to="/develop">
                        <svg><use xlink:href="#icon-quanqiucang-active2" /></svg>
                        <p>快速补货</p>
                    </router-link>
                </div>
                <div @click="handleDZBtn">
                    <svg><use xlink:href="#icon-quanqiucang-active1" /></svg>
                    <p>定制生产</p>
                </div>
                <!-- <div>
                    <router-link :to="`/company-product-list?shopId=${shopId}`">
                        <svg><use xlink:href="#icon-quanqiucang-active3" /></svg>
                        <p>产品分类</p>
                    </router-link>
                </div> -->
            </div>
            <!-- <p >药品推荐</p> -->
            <div class="title">
                <img src="../../images/index/home-leftLine.png">
                <span> 工业商品</span>
                <img src="../../images/index/home-rightLine.png">
            </div>
            <good-list :factory-id="factoryId" :isShowProm.sync="isShowProm" :searchValue="searchValue" ref="list" :USER_TYPE = "USER_TYPE"/>
        </div>
        <!-- <transition name="fade"> -->
            <mt-popup v-model="popupVisible" position="bottom" style="width: 100%;height: 5.6rem;transition:1s">
                <p class="pop-title">更多活动<svg @click="popupVisible=false"><use xlink:href="#icon-promote-my-close"></use> </svg></p>
                <div class="discounts" style="height: 5rem;overflow:auto; background: #F5F5F5;padding: .3rem .5rem .8rem;margin-top: 0px;width: 100%">
                  
                    <ul style="position: relative;overflow: visible;height: auto">
                            <!-- <transition-group name="fade" tag="li"  
                            enter-active-class="animated bounceInDown"
                            leave-active-class="animated bounceOut"> -->
                            <li v-for="(item, index) in (shopDetailData.actives)" :key="index" style="padding: .2rem 0">
                                <span>{{item.promotion_type=="give"?'赠':'返'}}</span>
                                <p style="color: #333333">每满{{item.enough_num}}件，获赠品{{item.give_name}}{{item.give_num}}个</p>
                            </li>
                        <!-- </transition-group> -->
                    </ul>
                     
                </div>
            </mt-popup>
        <!-- </transition> -->
    </div>
</template>

<script>
    import GoodList from "@/page/shop/shopList.vue";
    import {mapState} from 'vuex';
    import {supplierDetails} from "@/api/supplier";
    import {isFollow, deleteFollow, SaveFollow} from "@/api/follow.js";
    import { queryShopCarList, delShopCar, addShopCar, onlyDelShopCar } from '@/api/shopCar';
    import default_company_logo from "@/images/default_company_logo.png";
    import {adList, getNewInformmationList} from "@/api/ad";
    import Notice from '@/components/common/notice3';
    import defaultLogo from "@/components/common/defaultLogo"
    export default {
        name: "FactoryShop",
        components: {
            GoodList,
            Notice,
            defaultLogo
        },
        data() {
            return {
                factoryId: null, //工厂ID
                shopDetailData: {},
                isActive: true,
                hasError: false,
                follow_status: 0,
                follow_info: '关注',
                follow_list: [],
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                is_active:false,
                actity_nums:0,
                popupVisible:false,
                goodsList: {},
                searchValue: '',
                default_company_logo,
                swipers: [],
                notices: [],
                bgColor: 5,
                isShowProm: 0
            }
        },
        created() {
            this.factoryId = parseInt(this.$route.params.id);
            // this._queryShopCarList()
        },
        computed: {
            ...mapState({
                USER_TYPE: state => state.CURRENTUSER.data.user_type,
            })
        },
        mounted() {
            // debugger
            window.addEventListener('scroll', this.handleScroll, true)
            this.initData()
            this._initData()
        },
        methods: {

            
            // 初始化banner、公告数据
            _initData() {
                // banner参数
                let bannerParams = {
                    channel: 'app',
                    space:　"tuiguang-all："
                }
                
                // 公告参数
                let infoParams = {
                    from: "factory",
                    supplier_id:  this.factoryId,
                    space: "factory-top-information",
                    limit: this.limit
                }
                getNewInformmationList(infoParams).then(res=>{
                    this.notices = res.data || []
                })
            },
            /**
             * 处理点击banner
             */
            handleJump(item) {
                if(item.target_from=="out") {
                    this.$refs.banner_a.href = item.link
                    return true
                }
                if(item.target_type == "product_detail") {
                    this.$router.push({path:`/factory/shop/${this.factoryId}/${item.target_id}`,query: {id:item.id}})
                    return true
                } else if(item.target_type == 'target_none') {
                    return false
                } else if(item.target_type == "information_detail") {
                    this.$router.push({path:'/bannerDetail',query: {id:item.id,isBanner:true}})
                }
            },
            handleDZBtn() {
                if(this.USER_TYPE!==2) {
                    this.$toast("仅商业公司可参与")
                    return false
                }
                this.$router.push({path: `/customization/${this.factoryId}`})
            },
            showRolePicker() {
                this.popupVisible = true;
            },
            //初始化时获取基本数据
            async initData() {
                //获取商铺信息
                const {
                    data
                } = await supplierDetails(this.factoryId)
                let nameArr = []
                // debugger
                for(let i=0; i < data.data.short_name.length; i++ ) {
                        nameArr.push(data.data.short_name.charAt(i))
                }
                data.data.shortName = nameArr
                this.shopDetailData = data.data;
                this.actity_nums = this.shopDetailData.actives.length
                //店铺是否关注信息
                isFollow(this.factoryId).then(res => {
                    // console.log(res.data.data.hasrelation)
                    if(res.data.data.hasrelation){
                        this.follow_info = "已关注"
                        this.follow_status = 1
                    }else{
                        this.follow_info = "关注"
                        this.follow_status = 0
                    }
                }).catch(error => {
                    // console.log(error)
                })
                adList({channel: 'app',from:"factory",supplier_id:this.factoryId, space: 'factory-top-ads'}).then( data => {
					this.swipers = data.data.data
				})
            },
            // 点击软键盘搜索按钮
            keyUp() {
                this.searchFn()
            },
            // 前往公司详情
            queryCompanyDetail() {
                this.$router.push({path: `/company/companyDetail/${this.factoryId}`})
            },
            searchFn() {
                this.$refs.searchBox.blur()
                console.log(this.$refs.searchBox.blur);
                
                this.$refs.list._supplierEntities(this.searchValue)
            },

            _queryShopCarList() {
                queryShopCarList({}, this.factoryId).then(res=>{
                    // console.log(res, 'text res')
                    this.goodsList = res
                })
            },
            handleScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > 90) {
                    this.hasError = 1
                } else {
                    this.hasError = 0;
                }
            },
            FollowFactory(id) {
                const params = {
                    supplier_id: this.factoryId,
                }
                if (this.follow_status == 1) {//followed
                    this.$messagebox.confirm("确定要取消关注吗?").then(action => {
                        if (action === 'confirm') {
                           // deleteFollow(this.factoryId)
                            deleteFollow(this.factoryId).then(res =>{
                                // console.log(res.data)
                                if(res.data.message=="success"){
                                    this.$toast("取消成功")
                                }
                            }).catch( error => {
                                // console.log(error)
                            })
                            this.follow_info = '关注'
                        }
                    });
                } else {
                    SaveFollow(params)
                    this.follow_info = '已关注'
                }
                this.follow_status = !this.follow_status
            },
            cleraText(){
                this.searchValue = ''
            },
            //查询有促销活动列表
            showProm() {
                 this.isShowProm = this.isShowProm == 1?0:1;
                // console.log( this.isShowProm);
            }

        }
    }
</script>

<style lang="scss" scoped>
    #CompanyList {

    }
    .left {
		padding: .2rem; 
		background: #fff;
        // background: #f1f4f5;
	}
    .pop-title {
        text-align: center;
        font-size: .36rem;
        line-height: 3;
        border-bottom: 1px solid #f1f1f1;
        svg {
            position: absolute;
            width: .3rem;
            height: .3rem;
            float: right;
            display: block;
            right: .32rem;
            top:.35rem
        }
    }
    .swiper {
		padding: .15rem;
		background: #fff;
		height: 2.6rem;
		padding-bottom: 0px;
        border-radius: 5px;
        // margin-top: -10px;
	}
    .inpSearch {
        z-index: 10;
        width: 5.17rem;
        height: .56rem;
        background: rgba(255, 255, 255, 0.4);
        -moz-border-radius: 0.08rem;
        border-radius: 0.08rem;
        position: relative;
        margin-left: 0.24rem;
        padding: 0 .2rem;
       
        input {
            background: none;
            display: inline-block;
            // float: left;
            vertical-align: middle;
            height: .56rem;
            padding-left: 6px;
            width: 80%;
             color: #fff;
            &::-webkit-input-placeholder {
                color: rgba(255, 255, 255);
            }
        }

        svg {
            width: .38rem;
            height: .38rem;
            // float: right;
            // margin-top: .1rem;
            vertical-align: middle;
            display: inline-block;
        }
    }
    .bg-from {
        background: #2891e5;
        input {
            &::placeholder {
                color: #fff;
            }
        }

    }
    .top-box {
        display: flex;
        position: fixed;
        width: 100%;
        top: 0px;
        padding: 10px;
        z-index: 10;
        .retreat {
            width: 10px;
            height: 20px;
            padding-top: 4px;
        }

        .approve {
            width: 1.2rem;
            height: .5rem;
            border: 1px solid rgba(255, 255, 255, 0.6);
            border-radius: 0.3rem;
            text-align: center;
            line-height: .5rem;
            margin-left: 0.3rem;
            background: rgba(0, 0, 0, 0.2);
            margin-top: .05rem;
            p {
                color: #fff;
                font-size: 12px;
            }
        }
    }
    .search {
        display: flex;
        position: fixed;
        width: 100%;
        top: 0px;
        height: .88rem;
        z-index: 9;
    }
    .bg-blue {
        background: #26a2ff;
        height: .88rem;
    }
    .company {
        width: 100%;
        border-bottom: 1px solid rgb(230, 230, 230);
        background: url(../../images/shopping/company_bg.jpg) no-repeat;
        background-size: 100% 100%;
        display: flex;
        padding: 10px;
        color: #fff;
        padding-top: 50px;
        min-height: 3.99rem;
    }

    .company .brand {
        width: 11vh;
        height: 10.5vh;
        text-align: center;
    }
    .main-box {
        margin-top: -10px;
    }
    .company .brand img {
        width: 1.3rem;
        height: 1.3rem;
        display: inline-block;
        vertical-align: middle;
        border-radius: 3px;
    }

    .company .message {
        box-sizing: border-box;
        padding-bottom: 0.1rem;
        padding-left: 2vh;
    }

    .company .message .message_title {
        font-size: .34rem;
        color: #fff;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding-top: .1rem;
    }

    .company .message .other ul {
        display: flex;
        padding: 0.12rem 0;
        margin-top: .1rem;
        li{
            font-size: 10px;
            color: #f1f1f1;
            border: 1px solid #f1f1f1;
            margin-right: 0.2rem;
            border-radius: 2px;
            padding: 0 .1rem;
        }
    }

    .company .message .other ul li div,
    p {
        padding: 0 1px;
    }

    .company .message .other ul li:nth-child(1) div {
        display: flex;
        align-items: center;
    }

    .company .message .other ul li:nth-child(1) div svg {
        width: .26rem;
        height: .26rem;
    }

     .discounts {
        margin-top: .35rem;
        position: relative;
        height: .35rem;
         width: 5rem;

        .fade-box {
            height: .35rem;
            display: flex;
            align-items: center;
            float: right;
            span {
                color: #ccc;
                font-size: .2rem;
            }
            .icon {
                position: relative;
                width: .23rem;
                height: .23rem;
                margin-left: .1rem;
            }
        }
        ul {
            height: .35rem;
            overflow: hidden;
            position: absolute;
            top:0px;
            li {
                display: flex;
                align-items: center;
                margin-bottom: 0.12rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                height: .35rem;
                &:nth-child(even) {
                    span {
                        background: #ff7612;
                    }
                }
                span {
                    font-size: .22rem;
                    color: #fff;
                    background: rgb(250, 84, 82);
                    width: .36rem;
                    height: .36rem;
                    line-height: .36rem;
                    text-align: center;
                    overflow: visible;
                    border-radius: 4px;
                }
                p {
                    font-size: 0.24rem;
                    color: #f1f1f1;
                    padding-left: 0.12rem;
                }
            }
        }
    }
    .activebox {
        // padding-top: 35px;
    }
    .activebox2 {
        padding-top: 85px;
    }
    .bg2 {
        height: .92rem;
    }
    .fade-enter-active, .fade-leave-active {
        // transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        // opacity: 0;
    }
    .notice {
			// margin: .2rem;
        background: #f1f4f5;
        height: .64rem;
        line-height: .64rem;
        display: flex;
        padding: 0 .24rem;
        align-items: center;
		div {
			background: #F9F9F9;
			width: 100%;
			height: .64rem;
			line-height: .64rem;
			display: flex;
			border-radius: 4px;
			align-items: center;
			svg {
				margin-left: .24rem;
			}
			
		}
      

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
    .nav {
		text-align: center;
		background: #fff;
		display: flex;
		border-radius: 7px;
		padding: .35rem .5rem;
		padding-bottom: .2rem;
		justify-content: space-around;
		>div{
			svg {
				width: 1rem;
				height: 1rem;
			}
			p {
				color: #666666;
				line-height: 200%;
				
			}
		}
	}
    .title {
		line-height: .88rem;
        display: flex;
        align-items: center;
        justify-content: center;
		border-bottom: 1px solid #f1f1f1;
        color: #666;
        span {
            padding: 0 .2rem;
        }
    }
</style>