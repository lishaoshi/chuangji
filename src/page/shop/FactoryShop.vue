<template>
    <div id="CompanyList">
        <div class="top-box" :class="{activebox: isFullScreen}">
            <img class="retreat" src="../../images/back.png" @click="goBack">
            <div class="inpSearch" v-bind:class="{ 'bg-from': hasError }">
                <svg class="icon-location" @click="searchFn">
                    <use xlink:href="#icon-search2"/>
                </svg>
                <input ref="searchBox" type="text" v-model="searchValue" placeholder="请输入关键词">
                <i></i>
                
                <svg class="icon-clearText" @click="cleraText">
                    <use xlink:href="#icon-empty1"/>
                </svg>
            </div>
            <div class="approve">
                <p @click="FollowFactory(shopDetailData.id)">{{follow_info}}</p>
            </div>
        </div>
        <div v-bind:class="{ search: isActive, 'bg-blue': hasError,bg2: isFullScreen }">
        </div>
        <transition name="fade">
            <div class="company" :class="{activebox2: isFullScreen}">
                <div class="brand">
                    <img :src="shopDetailData.logo" alt="">
                </div>
                <div class="message">
                    <div class="message_title">
                        <p>{{ shopDetailData.display_name ||shopDetailData.name || ''}}</p>
                    </div>
                    <div class="other">
                        <ul>
                            <li v-show="shopDetailData.address != null">
                                <div>
                                    <svg class="icon-location">
                                        <use xlink:href="#icon-map1"/>
                                    </svg>
                                    <p>{{shopDetailData.address || '中国'}}</p>
                                </div>
                            </li>
                            <li>
                                <p>调配时间<i>{{shopDetailData.send_duration || 14}}</i>天</p>
                            </li>
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
                            <li v-for="item in (shopDetailData.actives)">
                                <span>{{item.label}}</span>
                                <p style="width: 3.4rem;overflow: hidden">{{item.title}}</p>
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
        <good-list :factory-id="factoryId" ref="list" :USER_TYPE = "USER_TYPE"/>
        <!-- <transition name="fade"> -->
            <mt-popup v-model="popupVisible" position="bottom" style="width: 100%;height: 5.6rem;transition:1s">
                <p class="pop-title">更多活动券<svg @click="popupVisible=false"><use xlink:href="#icon-promote-my-close"></use> </svg></p>
                <div class="discounts" style="height: 5rem;background: #F5F5F5;padding: .3rem .5rem .8rem;margin-top: 0px;width: 100%">
                  
                        <ul style="position: relative;overflow: visible;height: auto">
                              <!-- <transition-group name="fade" tag="li"  
                              enter-active-class="animated bounceInDown"
                                leave-active-class="animated bounceOut"> -->
                                <li v-for="(item, index) in (shopDetailData.actives)" :key="index" style="padding: .2rem 0">
                                    <span>{{item.label}}</span>
                                    <p style="color: #333333">{{item.title}}</p>
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
    import {mapState} from 'vuex'
    import {supplierDetails} from "@/api/supplier"
    import {isFollow, deleteFollow, SaveFollow} from "@/api/follow.js"
    import { queryShopCarList, delShopCar, addShopCar, onlyDelShopCar } from '@/api/shopCar'
    export default {
        name: "FactoryShop",
        components: {
            GoodList
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
                searchValue: ''
            }
        },
        created() {
            this.factoryId = parseInt(this.$route.params.id);
            this._queryShopCarList()
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
        },
        methods: {
            showRolePicker() {
                this.popupVisible = true;
            },
            //初始化时获取基本数据
            async initData() {
                //获取商铺信息
                const {
                    data
                } = await supplierDetails(this.factoryId)
                this.shopDetailData = data;
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
            }

        }
    }
</script>

<style lang="scss" scoped>
    #CompanyList {

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
                    width: .32rem;
                    height: .32rem;
                    line-height: .32rem;
                    text-align: center;
                    overflow: visible;
                    border-radius: 2px;
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
        padding-top: 35px;
    }
    .activebox2 {
        padding-top: 85px;
    }
    .bg2 {
        height: 1.4rem;
    }
    .fade-enter-active, .fade-leave-active {
        // transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        // opacity: 0;
    }
</style>