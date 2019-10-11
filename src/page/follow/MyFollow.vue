<template>
    <div id="Myfollow">
        <clxsd-head-top title='关注收藏'></clxsd-head-top>

        <mt-navbar v-model="selected">
            <mt-tab-item id="1"><span>工业关注</span class="title"></mt-tab-item>
            <mt-tab-item id="2"><span class="title">产品收藏</span></mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" style="margin-top: .2rem">
            <mt-tab-container-item id="1">
                <div class="container">
                    <ul>
                        <ClxsdLoadMore
                                key="follow-list"
                                ref="loadmore"
                                @onRefresh="onFactoryRefresh"
                                @onLoadMore="onLoadMoreFactory">
                            <li class="list-item " v-for="(item,index) in followList" data-type="0" id="list-item">
                                <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd">
                                    <div class="list-img">
                                        <router-link :to="`/factory/shop/${item.id}`">
                                            <img :src="item.logo" alt="">
                                        </router-link>
                                    </div>
                                    <div class="list-content">
                                        <router-link :to="`/factory/shop/${item.id}`">
                                            <p class="title">{{item.display_name||item.name}}</p>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="delete" @click="deleteFollowFn(index,item)" :data-index="index">
                                    <div class="delete_Img"></div>
                                    <span>取消收藏</span>
                                </div>
                            </li>
                        </ClxsdLoadMore>
                    </ul>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">

                <div class="container">
                    <ul>
                        <ClxsdLoadMore
                                key="goods-list"
                                ref="loadmoreGoods"
                                @onRefresh="onGoodsRefresh"
                                @onLoadMore="onLoadMoreGoods">
                            <li class="list-item " v-for="(enItem,enIndex) in collectList" data-type="0" id="list-item2">
                                <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd">
                                    <div class="list-img">
                                        <router-link :to="`/factory/shop/${enItem.id}`">
                                            <img :src="enItem.cover" alt="">
                                        </router-link>
                                    </div>
                                    <div class="list-content">
                                        <router-link :to="`/factory/shopdetail/${enItem.id}`">
                                            <p class="shop-name">{{enItem.good_name}}</p>
                                            <p class="shop-unit">￥{{enItem.price}}/{{enItem.unit}}</p>
                                        </router-link>
                                    </div>
                                </div>
                                <div class="delete" @click="deleteGoodsFn(enIndex,enItem)" :data-index="enIndex">
                                    <div class="delete_Img"></div>
                                    <span>取消收藏</span>
                                </div>
                            </li>
                        </ClxsdLoadMore>
                    </ul>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <EmptyOrder v-if="!collectList.length && !followList.length" />

    </div>
</template>

<script>
    import {getFollowList, deleteFollow} from "@/api/follow.js"
    import {getCollectionList, deleteCollection} from "@/api/follow.js"
    import EmptyOrder from '@/components/EmptyList'
    import {mapState} from "vuex";

    export default {
        name: "MyFollow",
        data() {
            return {
                selected: '1',
                followList: [],//关注工厂数组
                collectList: [],//收藏商品数组

                showLoading: true, //显示加载动画

                factoryPage: 1,//关注工厂默认页
                goodsPage: 1,//关注商品默认页

                clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
                candelete: {},

            }
        },
        components: {
            EmptyOrder
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
            //取消工厂关注
            async deleteFollowFn(index, item) {
                this.$messagebox.confirm("确定要取消关注吗?").then(action => {
                    if (action === 'confirm') {
                        deleteFollow(item.id)
                        var list = document.getElementById('list-item')
                       list.remove()
                        //this.$router.go(0)
                    }
                }).catch(err => err);
            },
            //取消商品收藏
            async deleteGoodsFn(enIndex, enItem) {
                this.$messagebox.confirm("确定要取消收藏吗?").then(action => {
                    if (action === 'confirm') {
                        deleteCollection(enItem.id)
                        var list2 = document.getElementById('list-item2')
                        list2.remove()
                        //this.$router.go(0)
                        this.selected='2'
                    }
                }).catch(err => err);
            },


            //加载工厂数据
            async getFollowData(options, loadMore = false) {
                let params = {
                    page: this.factoryPage,
                    type: 'Follow',
                    limit: options.limit
                }
                getFollowList(params, loadMore)
                .then(({data = []}) => {
                    console.log(data.data.factoryFollows)
                    if (loadMore) {
                        this.followList = [...this.followList, ...data.data.factoryFollows]
                    } else {
                        this.followList = data.data.factoryFollows
                    }
                    this.factoryPage = this.factoryPage + 1
                    this.$refs.loadmore.afterLoadMore(data.data.factoryFollows.length < options.limit)
                    if (options.callback) {
                        options.callback()
                    }
                })
            },
            onFactoryRefresh(callback) {
                this.factoryPage = 1
                let options = {
                    limit: 17,
                    callback: callback
                }
                this.getFollowData(options)
            },
            onLoadMoreFactory() {
                console.log('more')
                let options = {
                    limit: 17,
                }
                this.getFollowData(options, true)
            },
            
            
            //加载商品收藏数据
            async getGoodsData(options, loadMore = false) {
                let params = {
                    page: this.goodsPage,
                    type: 'Goods',
                    limit: options.limit
                }
                getCollectionList(params, loadMore)
                .then(({data = []}) => {
                    console.log(data.data.entityFollows)
                    if (loadMore) {
                        this.collectList = [...this.collectList, ...data.data.entityFollows]
                        console.log(typeof(this.collectList))
                    } else {
                        this.collectList = data.data.entityFollows
                        console.log(this.collectList)
                    }
                    this.goodsPage = this.goodsPage + 1
                    this.$refs.loadmoreGoods.afterLoadMore(data.data.entityFollows.length < options.limit)
                    if (options.callback) {
                        options.callback()
                    }
                })
            },
            onGoodsRefresh(callback) {
                //console.log(22)
                this.goodsPage = 1
                let options = {
                    limit: 17,
                    callback: callback
                }
                this.getGoodsData(options)
            },
            onLoadMoreGoods() {
                //console.log('more')
                let options = {
                    limit: 17,
                }
                this.getGoodsData(options, true)
            },


            touchStart(e) {
                this.startX = e.touches[0].clientX;
            },
            //滑动结束
            touchEnd(e) {
                let parentElement = e.currentTarget.parentElement;
                // console.log(parentElement)
                this.endX = e.changedTouches[0].clientX;
                // console.log(this.endX )
                if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
                    console.log()
                    this.restSlide();
                    parentElement.dataset.type = 1;
                }
                if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
                    this.restSlide();
                    parentElement.dataset.type = 0;
                }
                this.startX = 0;
                this.endX = 0;

            },
            //判断当前是否有滑块处于滑动状态
            checkSlide() {
                let listItems = document.querySelectorAll('.list-item');
                for (let i = 0; i < listItems.length; i++) {
                    if (listItems[i].dataset.type == 1) {
                        return true;
                    }
                }
                return false;
            },
            //一次只能滑动一个
            restSlide() {
                let listItems = document.querySelectorAll('.list-item');
                for (let i = 0; i < listItems.length; i++) {
                    listItems[i].dataset.type = 0;
                }
            },


        }

    }
</script>

<style lang="scss" scoped>
   .title {
        font-size: .28rem!important;
    }
    #Myfollow {
        min-height: 5rem;
    }

    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 0px;
        margin-bottom: 0px;
        color: #333;
    }

    .mint-navbar .mint-tab-item {
        color: #ccc;
        font-size: .28rem;
    }

    .mint-tab-item-label {
        font-size: .28rem;
    }

    .company {
        overflow-x: hidden;
    }

    .company-item {
        width: 100%;
        background: #fff;
        margin-top: 0.2rem;
        transform: translateX(0);
        transition: all .3s;
        /*滑动效果更生动*/
        .company-name {
            padding-left: .2rem;
            height: 1.56rem;
            padding: 0 .2rem;
            position: relative;
            border-bottom: 1px solid rgb(230, 230, 230);

            img {
                width: 1rem;
                height: 1rem;
                border: 1px solid rgb(230, 230, 230);
                border-radius: 4px;
                margin-right: .2rem;
                float: left;
                margin-top: .28rem;
            }

            .name {
                width: 50%;
                text-align: left;
                overflow: hidden;
                white-space: nowrap;
                float: left;
                text-overflow: ellipsis;
                font-size: .32rem;
                line-height: 1.56rem;
                color: #333;

                .shop-name {
                    font-size: .28rem;
                    line-height: 2.2;
                    display: block;
                    padding-top: .25rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    color: #333;
                }

                .shop-unit {
                    font-size: .24rem;
                    color: rgb(250, 84, 82);
                    display: block;
                    line-height: 1.5;
                }
            }
        }

        .cancel {
            position: absolute;
            top: 0;
            right: -1rem;
            z-index: 3;
            width: 3.5rem;
            height: 100%;
            text-align: center;
            color: #fff;
            line-height: 1.56rem;
            background-color: rgb(250, 84, 82);
            transform: translateX(2.5rem);
            font-size: .36rem;
        }
    }

    .company-item.move {
        transform: translateX(-3.5rem);
        /*滑动后x轴位移-60px,使其可见*/
    }

    .company-item.remove {
        transform: translateX(0);
    }
</style>

<style lang="scss" scoped>
    .container ul {
        overflow: hidden;
        width: 100%;
        list-style-type: none;
        -webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        -webkit-padding-start: 0px;
    }

    .list-item {
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        font-size: 20px;
        height: 1.56rem;
        padding: .2rem;
        position: relative;
    }

    .list-item[data-type="0"] {
        transform: translate3d(0, 0, 0);
    }

    .list-item[data-type="1"] {
        transform: translate3d(-2.8rem, 0, 0);
    }

    .list-item:after {
        content: " ";
        position: absolute;
        left: 0px;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #ccc;
        color: #ccc;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        z-index: 2;
    }

    .list-box {
        padding: 11px 15px;
        background: #fff;
        display: flex;
        align-items: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        justify-content: flex-end;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        font-size: 0;
    }

    .list-item .list-content {
        position: relative;
        flex: 1;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        overflow: hidden;
        margin-left: 15px;
        height: 100%;
        .shop-name {
            font-size: .28rem;
            line-height: 2.2;
            display: block;
            padding-top: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #333;
        }
        .shop-unit {
            font-size: .24rem;
            color: rgb(250, 84, 82);
            display: block;
            line-height: 1.5;
        }
    }

    .list-item .title {
        display: block;
        color: #333;
        overflow: hidden;
        font-size: .32rem;
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 6px 0;
        margin-top: .3rem;
    }

    .list-item .time {
        display: block;
        font-size: 12px;
        position: absolute;
        right: 0;
        top: 0.1rem;
        color: #666;
    }

    .list-item .delete {
        width: 2.8rem;
        height: 1.56rem;
        background: #ff3b30;
        font-size: .36rem;
        color: #fff;
        text-align: center;
        line-height: 80px;
        position: fixed;
        top: 0;
        right: -2.8rem;
    }

    .list-img {
        width: 1rem;
        height: 1rem;
        border: 1px solid rgb(230, 230, 230);
        border-radius: 4px;
    }

    .list-img img {
        width: 100%;
        display: block;
        height: 100%;
    }
</style>