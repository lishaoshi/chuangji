<template>
    <div style="height: 100%;overflow: hidden;">
        <header v-bind:class="{ activeTop: isFullScreen }">{{title}}</header>
        <div v-if="isFullScreen" style="height: 35px"></div>
        <div class="entities-container" v-if="supplierId" style="margin-top: .88rem">
            <div class="search">
                <SearchBar></SearchBar>
            </div>
            <div class="product-list">
                <div class="choose">
                    <div>分类</div>
                </div>
                <span class="all-goods" @click="all_Goods()" :class="`${is_active == 0?'all-goods-active':''}`">全部</span>
                <div class="mint-navbar">
                    <div class="menu-list" :id="`menu_${index}`" :key="`menu-${index}`"
                         v-for="(menu,index) in menuList ">
                        <span v-if="menu.child" @click="slide($event)" class="sp1 up"
                              :class="`${is_active===menu.id?'active':''}`">{{menu.name}}</span>
                        <span v-else @click="showGoods(menu.id,$event)" class="sp1"
                              :class="`${is_active===menu.id?'active':''}`">{{menu.name}}</span>
                        <div class="down-menu" style="height: 0px">
                            <div>
                                <p v-for="(childrenMenu,index) in menu.child"
                                   :class="`${childrenMenu.id===is_child_id?'child-active':''}`"
                                   @click="showSlideGoods(childrenMenu.id,menu.id)"
                                >
                                    <span>{{childrenMenu.name}}</span>
                                    <svg v-if="childrenMenu.id===is_child_id">
                                        <use xlink:href="#icon-peisongshang-caidananniu"></use>
                                    </svg>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mint-tab-container">
                    <div>
                        <div class="sale-nav">
                            <p @click="onSaleGoods()" :class="{active,isUp}">在售<span>({{goodList.onSale}})</span></p>
                            <p @click="downSaleGoods()" :class="{active,isDown}">下架<span>({{goodList.unSale}})</span>
                            </p>
                        </div>
                        <div style="height: 9.3rem;overflow: scroll">
                            <!--<ClxsdLoadMore key="orders-list" ref="loadmore" @onRefresh="onOrdersRefresh" @onLoadMore="onOrdersLoadMore">-->
                                <div v-for="(entity,ikey) in goodList.list">
                                    <div v-if="isUp&&entity.status===1">
                                        <div class="item" id="list-item">
                                            <router-link to="/drug-detail">
                                                <img :src="entity.cover" class="item-img">
                                            </router-link>
                                            <div class="item-box">
                                                <router-link to="">
                                                    <p class="title">{{entity.good_name}}</p>
                                                </router-link>
                                                <p class="item-box-p1" v-if="entity.brand">品牌：{{entity.brand.name}}</p>
                                                <p class="item-box-p1">规格：{{entity.spec}}</p>
                                                <p class="item-box-p1">有效期：{{data}}</p>
                                                <div class="selling">
                                                    <div class="unit_price">
                                                        <p class="font"><i>￥</i><i>{{entity.price}}</i><span>{{entity.market_price}}</span>
                                                        </p>
                                                    </div>
                                                    <div class="gw_num" v-if="entity.status" @click="DownSelf(entity.id,entity.status)">
                                                        下架&nbsp;&darr;
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="isDown&&entity.status===0">
                                        <div class="item" id="list-item2">
                                            <router-link to="/drug-detail">
                                                <img :src="entity.cover" class="item-img">
                                            </router-link>
                                            <div class="item-box">
                                                <router-link to="">
                                                    <p class="title">{{entity.good_name}}</p>
                                                </router-link>
                                                <div class="selling">
                                                    <div class="unit_price">
                                                        <p class="font"><i>￥</i><i>{{entity.price}}</i><span>{{entity.market_price}}</span>
                                                        </p>
                                                    </div>
                                                    <div class="gw_num up" @click="UpSelf(entity.id)">上架&nbsp;&uarr;
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <!--</ClxsdLoadMore>-->
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <CircleLoading v-if="loading"/>
        <clxsd-foot-guide :user-type="2"/>
    </div>

</template>

<script>
    import {mapState} from "vuex";
    import CircleLoading from "../icons/CircleLoading";
    import SearchBar from '@/components/common/SearchBar';
    import Empty from '@/components/EmptyList';
    import {servicBusinessGoodList} from "@/api/business"

    export default {
        name: "ItemCategpries",
        components: {CircleLoading, SearchBar, Empty},
        data() {
            return {
                selected: '1',
                is_active: 0,//一级菜单默认值
                menuList: [],//菜单列表
                goodList: [],//产品列表
                message: null,
                loading: true,
                isUp: true,
                active: false,
                isDown: false,
                is_child_id: 0,
                is_child: false,
                data:'',
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                page: 1,
            }
        },
        computed: {
            ...mapState({
                USER_INFO: state => state.CURRENTUSER
            }),
            title() {
                const shopSupplier = this.USER_INFO.shop_supplier
                return shopSupplier ? shopSupplier.display_name || shopSupplier.name : '未知'
            },
            supplierId() {
                const shopSupplier = this.USER_INFO.shop_supplier
                return shopSupplier ? shopSupplier.id : 0
            }
        },
        created() {
            this.initData()
        },
        methods: {
            async  _handleData(data){
                data.list.forEach(data => {
                    let time = data.valid_time
                    this.data = this.$moment(time).format("YYYY-MM-DD")
                })
            },
            all_Goods(){
                servicBusinessGoodList().then(res => {
                    this.is_active = 0
                    this.goodList = res.data.data.businessGoods
                    console.log(this.goodList)
                    this._handleData(this.goodList)
                })
            },
            async initData() {
                console.log(this.$moment().format("MMM Do YY"))
                console.log(this.supplierId)
                if (this.supplierId) {
                    const {data} = await this.$http.get(`/hippo-shop/business/menuEntities`)
                    console.log(data.data.cates)
                    this.menuList = data.data.cates
                    servicBusinessGoodList().then(res => {
                        this.goodList = res.data.data.businessGoods
                        console.log(this.goodList)
                        this._handleData(this.goodList)
                    })
                    this.loading = false
                } else {
                    this.$toast('当前用户未认证')
                    this.$router.go(-1)
                }
            },
            //一级菜单点击商品
            showGoods(id, $event) {
                this.is_active = id //是否当前一级菜单
                //this.is_child_id = id
                let parentNode = event.target.parentNode;
                let a = this.sibling(parentNode)
                for (var i = 0; i < a.length; i++) {
                    a[i].childNodes[0].classList.remove("active");
                    a[i].childNodes[0].classList.add("up");
                    let b = a[i].childNodes[1]
                    this.toggleSlide(b, 0, '500');
                }
                let params = {
                    cat_id: id
                }
                servicBusinessGoodList(params).then(res => {
                    this.goodList = res.data.data.businessGoods
                })
                this.goodList = this._handleData(this.goodList)
            },
            //点击下拉菜单
            slide: function (event) {
                let targetNode = event.target
                targetNode.classList.add("active"); //添加当前样式
                let parentNode = targetNode.parentNode;
                let a = this.sibling(parentNode)
                for (var i = 0; i < a.length; i++) {
                    console.log(a[i].childNodes)
                    a[i].childNodes[0].classList.remove("active");
                    a[i].childNodes[0].classList.add("up");
                    let b = a[i].childNodes[1]
                    this.toggleSlide(b, 0, '500');
                }
                //targetNode.classList.remove("active");
                let curTarget = event.currentTarget,
                    containsCurClass = curTarget.classList.contains("up"),
                    nextSibling = curTarget.nextSibling;
                while (nextSibling.nodeType == 3 && /\s/.test(nextSibling.nodeValue)) {
                    nextSibling = nextSibling.nextSibling;
                }
                ;
                let detailScrollHeight = nextSibling.scrollHeight;
                if (containsCurClass) {
                    curTarget.classList.remove("up");
                    this.toggleSlide(nextSibling, detailScrollHeight, '500');
                } else {
                    curTarget.classList.add("up");
                    this.toggleSlide(nextSibling, 0, '500');
                }
            },
            //toggle动画
            toggleSlide: function (dom, height, time) {
                dom.style.transition = 'height ' + time + 'ms';
                dom.style.height = height + 'px';
            },
            //同胞节点
            sibling: function (elem) {
                var r = [];
                var n = elem.parentNode.firstChild;
                for (; n; n = n.nextSibling) {
                    if (n.nodeType === 1 && n !== elem) {
                        r.push(n);
                    }
                }
                return r;
            },
            //二级菜单商品
            showSlideGoods(id, ids, $event) {
                this.is_child_id = id
                let params = {
                    cat_id: id
                }
                servicBusinessGoodList(params).then(res => {
                    this.goodList = res.data.data.businessGoods
                })
                this.goodList = this._handleData(this.goodList)
            },
            /*
            //加载全部订单
            getOrderData(options, loadMore = false) {
                let params = {
                    page: this.page,
                    limit: options.limit,

                }
                servicBusinessGoodList(params, loadMore)
                    .then(({data = []}) => {
                        if (loadMore) {
                            this.goodList = [...this.goodList, ...data.data.businessGoods]
                        } else {
                            this.goodList = data.data.businessGoods
                        }
                        this.page = this.page + 1
                        console.log(data.data.businessGoods.list.length < options.limit)
                        this.$refs.loadmore.afterLoadMore(data.data.businessGoods.list.length < options.limit)
                        if (options.callback) {
                            options.callback()
                        }
                    })
            },
            onOrdersRefresh(callback) {
                console.log("加载")
                this.page = 1
                let options = {
                    limit: 10,
                }
                this.getOrderData(options)
            },
            onOrdersLoadMore() {
                let options = {
                    limit: 10,
                }
                this.getOrderData(options, true)
            },
            */
            //下架
            DownSelf(id, ids) {
                this.$messagebox.confirm("确定要下架此商品吗?").then(action => {
                    if (action === 'confirm') {
                        this.$http.patch(`hippo-shop/business/changeStatus`, {good_id: id, status: 0}).then(res => {
                            console.log(res)
                            this.$toast(res.data.data)
                            var list = document.getElementById('list-item')
                            list.remove()
                            this.$router.go(0)
                        }).catch(error => {
                            this.$toast("下架失败")
                        })
                    }
                }).catch(err => err);
            },
            //上架
            UpSelf(id) {
                var list = document.getElementById('list-item2')
                list.remove()

                this.$http.patch(`hippo-shop/business/changeStatus`, {good_id: id, status: 1}).then(res => {
                    console.log(res)
                    this.$toast(res.data.data)
                }).catch(error => {
                    this.$toast("下架失败")
                })
            },
            onSaleGoods() {
                this.isUp = true;
                this.isDown = false;
            },
            downSaleGoods() {
                this.isUp = false
                this.isDown = true
            }

        }

    }
</script>

<style scoped lang="scss">

    .search {
        background: #f1f1f1;
        top: 0px;
        padding: 10px;
        z-index: 999;
    }

    header {
        position: fixed;
        width: 100%;
        height: .88rem;
        line-height: .88rem;
        background: #26a2ff;
        color: #fff;
        text-align: center;
        font-size: .34rem;
        top: 0px;
        font-weight: bold;
        z-index: 99;
    }

    .product-list {
        position: relative;
        height: 10.5rem;
        overflow: hidden;
    }

    .mint-navbar {
        background-color: #E6E6E6;
        display: block;
        text-align: left;
        width: 2rem;
        height: 100%;
        overflow: scroll;
        float: left;
        padding-top: 1rem;
        .menu-list {
            width: 100%;
            font-size: .3rem;
            color: #333;

            .sp1 {
                display: block;
                height: 1rem;
                line-height: 1rem;
                padding-left: .15rem;
                overflow: hidden;
            }

            .active {
                background: #eef6fb;
                border-left: 2px solid #26a2ff;
            }

            .down-menu {
                background: #fff;
                overflow: hidden;

                p {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    line-height: 2.5;
                    font-size: .24rem;
                    padding-left: .2rem;
                    padding-right: .1rem;

                    span {
                        display: inline-block;
                        width: 1.3rem;
                        white-space: normal;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    svg {
                        width: .18rem;
                        height: .18rem;
                        float: right;
                        margin-top: .2rem;
                    }
                }

                .child-active {
                    color: #2da2ff;
                }
            }
        }
    }


    .mint-tab-container {
        overflow: hidden;
        position: relative;
        width: 71%;
        float: right;
        margin-top: -1rem;
    }

    .item {
        background: #fff;
        padding: .16rem .13rem;
        border-radius: .1rem;
        margin-right: .2rem;
        margin-top: .2rem;
        height: 2.4rem;
    }

    .active {
        display: flex;
    }

    .item-img {
        width: 1.3rem;
        height: 1.3rem;
        margin-top: .35rem;
    }

    .selling {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: .2rem;
    }

    .selling .unit_price {
        font-size: 10px;
        color: rgb(102, 102, 102);
        width: 60%;
        overflow: hidden;
    }

    .selling .unit_price .font {
        color: rgb(255, 59, 48);
        font-size: 14px;

        span {
            color: #ccc;
            font-size: 10px;
            text-decoration: line-through;
            margin-left: 5px;
        }
    }

    .item-box {
        width: 70%;
        padding-left: 3%;
        padding-top: .1rem;
        float: right;
        &-p1 {
            font-size: .2rem;
            color: #666;
        }
        .title {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: .32rem;
            color: #333;
            width: 100%;
        }
    }

    .gw_num {
        width: 50px;
        height: 22px;
        background: #fff;
        text-align: center;
        border: 1px solid #5c5c5c;
        color: #5C5C5C;
        border-radius: 22px;
        font-size: 12px;
        line-height: 20px;
    }


    .clearfloat {
        clear: both;
    }

    .choose {
        background: #fff;
        line-height: 1rem;
        font-size: .32rem;
        display: flex;

        > div {
            width: 2rem;
            background-color: #E6E6E6;
            padding-left: .2rem;
        }

        ul {
            width: 72%;

            li {
                display: inline-block;
                width: 50%;
                text-align: center;

                &:nth-child(1) {
                    span {
                        color: #26A2FF;
                    }

                    samp {
                        color: #FA5452;
                    }
                }
            }
        }
    }

    .sale-nav {
        position: relative;
        width: 96%;
        height: 1rem;
        background: #fff;
        line-height: 1rem;

        p {
            width: 50%;
            display: inline-block;
            text-align: center;
            font-size: .28rem;

            span {
                padding-left: 1px;
            }

            &:nth-child(1) {
                span {
                    color: #ff3b30;
                }
            }
        }
        .isUp,.isDown {
            color: #2DA2FF;
            span {
                color: #ff3b30;
            }
        }
    }

    .activeTop {
        height: 1.6rem;
        padding-top: .5rem;
    }
    .all-goods {
        display: block;
        height: 1rem;
        line-height: 1rem;
        padding-left: .15rem;
        overflow: hidden;
        position: absolute;
        width: 2rem;
    }
    .all-goods-active {
        background: #eef6fb;
        border-left: 2px solid #26a2ff;
    }
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .activeTop {
            height: 1.6rem;
            padding-top: 35px;
        }
    }
</style>