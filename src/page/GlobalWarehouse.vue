<template>
    <div id="GlobalWarehouse">
        <div class="top-box" :class="{ activeHome: isFullScreen }">
            <ul>
                <li :class="`${is_active===1?'active':''}`" @click="tab_change(1)">本市</li>
                <li :class="`${is_active===2?'active':''}`" @click="tab_change(2)">推荐</li>
                <li :class="`${is_active===3?'active':''}`" @click="tab_change(3)">关注</li>
            </ul>
            <div class="top-box-search">
                <input type="search" placeholder="请输入商业公司名称" v-model="searchValue">
                <svg class="search-btn" @click="searchFn">
                    <use xlink:href="#icon-search2"/>
                </svg>
            </div>
        </div>
        <div class="swiper-box">
            <mt-swipe :auto="4000" class="swiper" v-if="swippers.length > 0">
                <mt-swipe-item :key="index" v-for="(swipe,index) in swippers">
                    <a :href="swipe.link" target="_blank">
                        <img :src="swipe.picture" width="100%">
                    </a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="main-body" ref="wrapper" :style="{ height: (wrapperHeight-50) + 'px' }">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                <div class="company" :key="`en-${index}`" v-for="(item,index) in businesses">
                    <div class="company-name" @click="entryBusinessShop(item)">
                        <img :src="item.logo" alt=" ">
                        <p>{{item.display_name || item.name }}</p>
                        <span>{{item.config?item.config.delivery_time:'0'}}小时</span>
                    </div>
                    <div class="company-box">
                        <div class="left">
                            <div class="notice">
                                <svg>
                                    <use xlink:href="#icon-notice"/>
                                </svg>
                                <div class="scroll-wrap" v-if="item.infos!=''">
                                    <ul class="scroll-content" ref="con1" :class="{anim:animate==true}">
                                        <li v-for="(entity,index) in item.infos">
                                            {{entity.title}}
                                        </li>
                                    </ul>
                                </div>
                                <span v-else> &nbsp;没有消息</span>
                            </div>
                        </div>
                    </div>
                </div>
            </mt-loadmore>
        </div>
        <p v-if="allLoaded" class="loader-over">没有更多了</p>
        <clxsd-foot-guide :user-type="3"/>
    </div>
</template>

<script>
    import SearchBar from '@/components/common/SearchBar';
    import {mapState} from "vuex";
    import {businessList} from '@/api/supplier.js'
    import regionAddress from "@/plugins/json/pca-code.json"
    import Notice from "@/components/modules/Extension/Notice"
    import {adList} from "@/api/ad";
    import GlobalItem from "@/page/GlobalItem"

    export default {
        name: "GlobalWarehouse",
        components: {
            SearchBar,
            Notice,
            GlobalItem
        },
        data() {
            return {
                is_active: 2,
                isActive: true,
                hasError: false,
                businesses: [],
                swippers: [],
                animate: false,
                areaList: null,
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                active: 0,
                preActive: 0,

                prizeList: [],
                searchValue: '',

                allLoaded: false, //是否自动触发上拉函数
                isAutoFill: false,
                wrapperHeight: 0,
                courrentPage: 1,
                limit: 15
            }
        },
        created() {
            this.initData()
            setInterval(this.scroll, 2500)
            this.loadFrist();
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true)
            // 父控件要加上高度，否则会出现上拉不动的情况
            this.wrapperHeight =
                document.documentElement.clientHeight -
                this.$refs.wrapper.getBoundingClientRect().top;
        },
        computed: {
            ...mapState(['POSITION']),
            lat() {
                return this.POSITION.lat
            },
            lng() {
                return this.POSITION.lng
            }
        },
        methods: {
            async initData() {
                const {data} = await adList({channel: 'app', space: 'global-top'})
                this.swippers = data.data
            },
            handleScroll() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > 50) {
                    this.hasError = 1
                } else {
                    this.hasError = 0;
                }
            },
            tab_change(type) {
                console.log(type)
                this.is_active = type
                this.courrentPage = 1
                this.loadFrist();
            },
            entryBusinessShop(item) {
                // console.log(item)
                this.$store.commit('SAVE_CURRENT_BUSINESS_SHOP', item.id)
                this.$store.commit('SAVE_CURRENT_BUSINESS_SHOP_DATA', item)
                this.$router.push({path:"/business-shop", query:{id:item.id}})
            },
            scroll() {
                let con1 = this.$refs.con1;
                this.animate = !this.animate;
                var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                setTimeout(function () {
                    that.prizeList.push(that.prizeList[0]);
                    that.prizeList.shift();
                    that.animate = !that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了

                }, 700)
            },
            searchFn() {
                console.log(this.searchValue)
                this.courrentPage = 1
                this.getData()
            },



            loadTop() {
                this.loadFrist();
            },
            // 上拉加载
            loadBottom() {
                this.loadMore();
            },
            // 下来刷新加载
            loadFrist() {
                const params = {
                    page: 1,
                    limit: this.limit,
                    type: this.is_active,
                    search:this.searchValue
                }
                businessList(params).then(response => {
                   
                    this.allLoaded = false; // 可以进行上拉
                    this.businesses = response.data.data.businessList;
                    this.$refs.loadmore.onTopLoaded();
                })
            },
            // 加载更多
            loadMore() {
                this.courrentPage++;
                const params = {
                    page: this.courrentPage,
                    limit: this.limit,
                    type: this.is_active,
                    search:this.searchValue
                }
                businessList(params).then(response => {
                    response.data.data.businessList && ( this.businesses = this.businesses.concat(response.data.data.businessList))
                    if (!response.data.data.businessList || response.data.data.businessList.length < this.limit) {
                        this.allLoaded = true; // 若数据已全部获取完毕
                    }
                    this.$refs.loadmore.onBottomLoaded();
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .main-body {
        /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
        overflow: scroll;
    }

    .shopcar {
        position: fixed;
        width: 1.2rem;
        height: 1.2rem;
        right: 0px;
        bottom: 1.3rem;
    }

    .search-btn {
        position: absolute;
        float: right;
        width: .4rem;
        height: .4rem;
        right: .4rem;
        z-index: 99;
        margin-top: .08rem;
    }

    .top-box {
        background: #0090FF;

        ul {
            height: .88rem;
            line-height: .88rem;
            text-align: center;

            li {
                display: inline-block;
                width: 28%;
                color: rgba(153, 211, 255, 1);
                font-size: .37rem;
            }

            .active {
                color: #fff;
                font-size: .47rem;
            }
        }

        &-search {
            padding: .2rem;

            input {
                width: 100%;
                height: .54rem;
                background: rgba(51, 166, 255, 1);
                border-radius: .27rem;
                color: #D6EDFF;
                text-align: center;

                &::placeholder {
                    color: #D6EDFF;
                }
            }
        }
    }

    .swiper-box {
        background: #fff;
        height: 2.9rem;
        padding-top: .22rem;

        .swiper {
            width: 7.2rem;
            height: 2.4rem;
            margin: 0 auto;
            padding: 0px;

            img {
                width: 7.2rem;
                height: 2.4rem;
            }
        }
    }

    .business-list {
        height: 100%;
    }

    .bg-blue {
        background: #26a2ff;
    }

    .mint-searchbar-cancel {
        font-size: 12px;
    }

    .home-top {
        background: #26A2FF;
        padding-top: .8rem;
        padding-bottom: .15rem;
    }

    .activeHome {
        padding-top: 0.58rem;
    }

    .is_scroll {
        overflow-x: scroll;
        position: relative;
        height: .8rem;
        letter-spacing: 1px;
        overflow-y: hidden;
        margin-top: .18rem;
        z-index: 99;

        &::-webkit-scrollbar {
            height: 0px;
            background: #26A2FF;
        }

        .area-ul {
            width: 50rem;
            height: 1rem;
            line-height: 1rem;
            padding-left: .2rem;

            li {
                display: block;
                float: left;
                color: #fff;
                opacity: .7;
                font-size: .28rem;
                line-height: .8rem;
                padding-right: .3rem;
                font-weight: bold;
            }

            .active {
                font-size: .42rem;
                opacity: 1;
                font-weight: 600;
            }

            .active-county {
                font-size: .28rem;
                opacity: 1;
                font-weight: bold;
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
        position: fixed;
        display: flex;
        position: relative;
        width: 100%;
        top: 0px;
        padding: 10px .2rem 6px;
        z-index: 999;
        justify-content: space-between;

        .retreat {
            width: 1.4rem;
            font-size: .26rem;
            vertical-align: middle;
            color: #fff;
            padding-top: .1rem;

            svg {
                width: .3rem;
                height: .3rem;
                margin-right: 2px;
                margin-top: 2px;
            }
        }

        .approve {
            margin-left: .2rem;

            svg {
                width: .65rem;
                height: .65rem;
            }
        }
    }

    .swiper {
        height: 2.8rem;
        background: #fff;
        padding: .15rem;
    }

    .company {
        width: 100%;
        background: #fff;
        margin-top: 0.2rem;
        border-radius: .1rem;
    }

    .company .company-name {
        width: 7.02rem;
        height: 1.45rem;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -moz-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin: auto;
        border-bottom: 1px solid rgb(230, 230, 230);

        img {
            width: .64rem;
            height: .64rem;
            border-radius: .64rem;
            margin: 0.2rem 0.2rem 0.24rem 0;
        }

        p {
            width: 5.2rem;
            font-size: 0.32rem;
            color: rgb(51, 51, 51);
            font-weight: bold;
        }

        a {
            svg {
                width: .45rem;
                height: .45rem;
            }
        }

        span {
            font-size: .24rem;
            font-weight: bold;
            color: rgba(153, 153, 153, 1);
        }
    }

    .company .company-box {
        display: flex;
        justify-content: space-between;

        .left {
            width: 100%;
        }

        .right {
            padding-top: .15rem;
            text-align: center;
            position: relative;

            svg {
                width: .75rem;
                height: .75rem;
            }

            p {
                position: absolute;
                font-size: .24rem;
                color: #fff;
                top: .3rem;
                left: .3rem;
            }
        }
    }

    .company .tel {
        position: relative;
        height: 0.79rem;
        width: 7.02rem;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        line-height: 0.79rem;
        margin: auto;

        .chunk {
            width: 50%;
            text-align: center;
            color: rgb(45, 162, 255);
            font-size: 0.28rem;

            a {
                color: rgb(45, 162, 255);
            }
        }

        i {
            width: 1px;
            height: 0.35rem;
            background: rgb(230, 230, 230);
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            margin: auto;
        }
    }

    .activeTop {
        height: 1.7rem;
        padding-top: .9rem;
    }

    .notice {
        margin: .2rem;
        background: #f1f4f5;
        height: .64rem;
        line-height: .64rem;
        display: flex;
        padding: 0 .24rem;
        align-items: center;

        .notice-list {
            width: 6.2rem;
            height: .64rem;
            overflow-y: hidden;
            margin-right: .1rem;

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

    .scroll-wrap {
        height: .6rem;
        overflow: hidden;
    }

    .scroll-content {
        position: relative;

        li {
            height: .62rem;
            line-height: .62rem;
            font-size: 14px;
            padding: 0 .2rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            span {
                display: inline-block;
                width: 60%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            small {
                float: right;
                font-size: 14px;
            }

            &:hover {
                color: #26a2ff;
            }
        }
    }

    .anim {
        transition: all .9s;
        margin-top: -.6rem;
    }

    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .activeTop {
            height: 1.7rem;
            padding-top: .9rem;
        }
    }
</style>