<template>
    <div>
        <div class="top-box" :class="{activebox: isFullScreen}">
            <img class="retreat" src="../../images/back.png" @click="goBack">
            <div class="inpSearch" v-bind:class="{ 'bg-from': hasError }">
                <input type="text" v-model="searchValue" placeholder="请输入关键词">
                <i></i>
                <svg class="icon-location" @click="searchFn">
                    <use xlink:href="#icon-search2"/>
                </svg>
            </div>
            <div class="approve">
                <p @click="FollowBusiness(shopDetailData.id)">{{follow_info}}</p>
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
                            <li>
                                <p>调配时间<i>{{shopDetailData.send_duration || 14}}</i>天</p>
                                <div></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="tel">
                    <a :href="`tel:${shopDetailData.tel}`">
                        <svg class="telSvg">
                            <use xlink:href="#icon-gloable-telephone"></use>
                        </svg>
                    </a>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

    import {mapState} from 'vuex';
    import Spread from "../Spread";
    import {isBusinessFollow, deleteBusinessFollow, SaveBusinessFollow} from "@/api/follow.js"
    export default {
        name: "CompanyShopHeader",
        components: {Spread},
        data() {
            return {
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                shopDetailData:'',
                is_active:true,
                isActive: true,
                hasError: false,
                follow_status: 0,
                follow_info: '关注',
                follow_list: [],
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                searchValue:''
            }
        },
        computed: {
            ...mapState({
                businessData: state => state.shop.CURRENT_BUSINESS_SHOP_DATA,
            }),
            title() {
                return this.businessData.display_name || this.businessData.name
            },
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true)
        },
        created(){
          this.shopDetailData = this.businessData
            this.initData()
        },
        methods:{
            //初始化时获取基本数据
            async initData() {
                //店铺是否关注信息
                isBusinessFollow(this.shopDetailData.id).then(res => {
                    console.log(res.data.data.hasrelation)
                    if(res.data.data.hasrelation){
                        this.follow_info = "已关注"
                        this.follow_status = 1
                    }else{
                        this.follow_info = "关注"
                        this.follow_status = 0
                    }
                }).catch(error => {
                    console.log(error)
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
            followFn(){
                if(this.is_follow === true) {
                    this.$messagebox.confirm("确定取消关注吗?").then(action => {
                        if(action === 'confirm'){
                            this.is_follow = false
                            return
                        }
                    }).catch(err => err);
                }
                this.is_follow = ! this.is_follow
            },
            FollowBusiness(id) {
                const params = {
                    supplier_id: id,
                }
                if (this.follow_status == 1) {//followed
                    this.$messagebox.confirm("确定要取消关注吗?").then(action => {
                        if (action === 'confirm') {
                            deleteBusinessFollow(id).then(res =>{
                                console.log(res.data)
                                if(res.data.message=="success"){
                                    this.$toast("取消成功")
                                }
                            }).catch( error => {
                                console.log(error)
                            })
                            this.follow_info = '关注'
                        }
                    });
                } else {
                    SaveBusinessFollow(params)
                    this.follow_info = '已关注'
                }
                this.follow_status = !this.follow_status
            },
            searchFn(){
                console.log(this.searchValue)
                let search = this.searchValue
                localStorage.setItem('search', JSON.stringify(search));
                this.$router.push('/company-product-list')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .telSvg {
        width: .6rem
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
            float: left;
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
            float: right;
            margin-top: .1rem;
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
        padding-top: 60px;
        padding-bottom: .5rem;
    }

    .company .brand {
        text-align: center;
        width: 1.3rem;
    }

    .company .brand img {
        width: .8rem;
        height: .8rem;
        display: inline-block;
        vertical-align: middle;
        border-radius: 3px;
    }

    .company .message {
        box-sizing: border-box;
        overflow: hidden;
        padding-bottom: 0.1rem;
        padding-left: .02rem;
        width: 5.18rem;
    }

    .company .message .message_title {
        font-size: .34rem;
        color: #fff;
        white-space: nowrap;
        text-overflow: ellipsis;
        p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: .3rem;
        }
    }

    .company .message .other ul {
        display: flex;
        padding: 0.05rem 0;
        li {
            font-size: 10px;
            color: #f1f1f1;
            margin-right: 0.2rem;
            border-radius: 2px;
            position: relative;
            p {
                padding: 1px .15rem;
                position: relative;
                z-index: 10;
            }
            div{
                position: absolute;
                width: 100%;
                height: 100%;
                background: #fff;
                top:0px;
                z-index: 9;
                opacity: .2;
                border-radius: .2rem;
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
    .tel {
        svg {
            width: .4rem;
            height: .35rem;
            margin-top: .3rem;
        }
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .activeTop {
            padding-top: .52rem;
            height: 1.4rem;
        }
        .box1 {
            height: .88rem;
        }
        .box2 {
            height: 1.4rem;
        }
    }
</style>