<template>
    <div style="height: 100%;overflow: hidden;" class="goodsClassification">
        <div class="head">
            <header v-bind:class="{ activeTop: isFullScreen }">{{title}}</header>
        </div>
        <!-- <div v-if="isFullScreen" style="height: 35px"></div> -->
        <div class="entities-container" v-if="supplierId" style="flex:1;
        margin-bottom: 1rem;">
            <div class="search">
                <SearchBar v-model="value" :searchFn ="searchFn" @keyup="keyupEnter"></SearchBar>
            </div>
            <div class="product-list">
                <!--
                <div class="choose">
                    <div>分类</div>
                </div>
                -->
                <div style="width: 2rem;float: left;background: #E6e6e6;overflow:hidden" class="typeBox">
                    <span class="all-goods" @click="all_Goods()" :class="`${is_active == 0?'all-goods-active':''}`">全部</span>
                    <div class="mint-navbar">
                        <div class="menu-list" :id="`menu_${index}`" :key="`menu-${index}`"
                             v-for="(menu,index) in menuList ">
                            <!-- 有二级菜单点击下拉 -->
                            <span v-if="menu.child" @click="slide($event,menu.id)" class="sp1 up" ref="slideMenu">{{menu.name}}</span>
                            <!-- 一级菜单没有下拉 -->
                            <span v-else @click="showGoods(menu.id)" class="sp1"
                                  :class="`${is_active===menu.id?'active':''}`">{{menu.name}}</span>
                            <div class="down-menu" style="height: 0px"  ref="slideChild">
                                <div>
                                    <p v-for="(childrenMenu,index) in menu.child"
                                       :class="`${childrenMenu.id===is_child_id?'child-active':''}`"
                                       @click="showSlideGoods(childrenMenu.id,menu.id)"
                                       :key="index"
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
                </div>
                <div class="mint-tab-container" style="margin-top: 0px">
                    <div>
                        <div class="sale-nav">
                            <p @click="onSaleGoods(cat_id)" :class="{active,isUp}">在售<span>({{goodList.onSale}})</span></p>
                            <p @click="downSaleGoods(cat_id)" :class="{active,isDown}">下架<span>({{goodList.unSale}})</span>
                            </p>
                        </div>
                        <div>
                            <!--<ClxsdLoadMore key="orders-list" ref="loadmore" @onRefresh="onOrdersRefresh" @onLoadMore="onOrdersLoadMore">-->
                            <div v-for="(entity,ikey) in goodList.list" v-if="goodList.list!==''" :key="ikey">
                                <div>
                                    <div class="item" id="list-item">
                                        <router-link :to="`/drug-detail/${supplier_id}/${entity.id}`">
                                            <img :src="entity.cover" class="item-img">
                                        </router-link>
                                        <div class="item-box">
                                            <router-link :to="`/drug-detail/${entity.id}`">
                                                <p class="title">{{entity.good_name}}</p>
                                            </router-link>
                                            <p class="item-box-p1" v-if="entity.brand">{{entity.brand.name}}</p>
                                            <p class="item-box-p1">规格: {{entity.spec}}</p>
                                            <p class="item-box-p1">效期: {{entity.time}}</p>
                                            <div class="selling">
                                                <div class="unit_price">
                                                    <div class="font">
                                                        <div>
                                                            ￥{{entity.price}}
                                                            <span>{{entity.unit}}</span>
                                                        </div>
                                                        <span v-if="parseInt(entity.market_price)">{{entity.market_price}}</span>
                                                    </div>
                                                </div>
                                                <div class="gw_num" v-if="entity.status == 1" @click="DownSelf(entity.id,entity.status,ikey)">
                                                    下架&nbsp;&darr;
                                                </div>
                                                <div class="gw_num up" v-if="entity.status == 0" @click="UpSelf(entity.id, ikey)">上架&nbsp;&uarr;
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Empty v-if="goodList.list==''"/>
                            <!-- <div v-if="goodList.list==''">
                                <div class="empty">
                                    <svg style="width: 2.4rem;height: 2.4rem">
                                        <use xlink:href="#icon-empty"></use>
                                    </svg>
                                    <p>抱歉，没有数据展示</p>
                                </div>
                            </div> -->
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
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                cat_id: 0,
                length: 0,
                value:"",
                current_status:1, //当前状态上架或下架
                current_id:'', //当前id
                current_search:'', //搜索内容

                allLoaded: false, //是否自动触发上拉函数
                isAutoFill: false,
                wrapperHeight: 0,
                courrentPage: 1,//当前页面
                limit:15,
                time:'',

                OnSaleNum:0,//在售数量
                DownSaleNum:0,//下架数量
                supplier_id: 0
            }
        },
        computed: {
            ...mapState({
                USER_INFO: state => state.CURRENTUSER.data
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
            let params = {}
            this.cat_id = ''
            this.init_Goods(params)
            //this.loadFrist();
        },
        methods: {
             _handleData(data) {
                console.log(data, 'data')
                if (data.list) {
                    data.list.forEach((data,index, arr) => {
                        console.log(data)
                        let time = data.valid_time
                        arr[index].time = this.$moment.unix(time).format("YYYY.MM.DD")
                    })
                }
                console.log(data, 'isData')
                return data
            },
            all_Goods() {
                let params = {
                    cat_id: '',
                    status: this.current_status,
                    search: this.value
                }
                this.current_id = 0
                this.init_Goods(params)
                this.is_active = 0
                let nodes =this.$refs.slideMenu
                let childNode = this.$refs.slideChild
                console.log(nodes)
                nodes.forEach(item => {
                    item.classList.remove("active");
                    item.classList.add("up");
                })
                childNode.forEach(item => {
                    this.toggleSlide(item, 0, '500');
                })

            },
            keyupEnter(value) {
                // this.value = value
                 let params = {
                    cat_id:this.current_id,
                    status:this.current_status,
                    search:value
                }

                this.init_Goods(params)
                console.log(123, value)
            },
            async initData() {
                if (this.supplierId) {
                    const {data} = await this.$http.get(`/hippo-shop/business/menuEntities`)
                    console.log(data.data.cates)
                    this.menuList = data.data.cates
                    this.init_Goods()
                    this.loading = false
                } else {
                    this.$toast('当前用户未认证')
                    this.$router.go(-1)
                }
            },
            //一级菜单点击商品
            showGoods(id, $event) {
                console.log("当前id：" + id)
                this.is_active = id //是否当前一级菜单
                let parentNode = event.target.parentNode;
                let a = this.sibling(parentNode)
                for (var i = 0; i < a.length; i++) {
                    a[i].childNodes[0].classList.remove("active");
                    a[i].childNodes[0].classList.add("up");
                    let b = a[i].childNodes[1]
                    this.toggleSlide(b, 0, '500');
                }
                this.cat_id = id
                let params = {
                    cat_id: id
                }
                this.init_Goods(params)
                this.current_id = id
            },
            //点击下拉菜单
            slide: function (event,id) {
                // debugger
                if(this.current_id != id) {
                    this.current_id = id
                    let params = {
                        cat_id: this.current_id, 
                        status: this.current_status,
                        search: this.value
                    }
                    this.init_Goods(params)
                }
                this.is_active=id
                let targetNode = event.target
                targetNode.classList.add("active"); //添加当前样式
                let parentNode = targetNode.parentNode;
                let a = this.sibling(parentNode)
                for (var i = 0; i < a.length; i++) {
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
                console.log('id',id, 'ids: ', ids)
                this.is_active = id
                this.is_child_id = id
                this.cat_id = id
                let params = {
                    cat_id: id,
                    status: this.current_status,
                    search: this.value
                }
                this.init_Goods(params)
                this.current_id = id
            },

            //下架
            DownSelf(id, ids, index) {
                
                // console.log(index, 'index')
                // return
                this.$messagebox.confirm("确定要下架此商品吗?").then(action => {
                    if (action === 'confirm') {
                        this.$http.patch(`hippo-shop/business/changeStatus`, {good_id: id, status: 0}).then(res => {
                            this.goodList.list.splice(index, 1)
                            this.goodList.onSale--
                            this.goodList.unSale++
                        }).catch(error => {
                            this.$toast("下架失败")
                        })
                    }
                }).catch(err => err);
            },
            //上架
            UpSelf(id, index) {
                this.$messagebox.confirm("确定要上架此商品吗?").then(action => {
                    this.$http.patch(`hippo-shop/business/changeStatus`, {good_id: id, status: 1}).then(res => {
                        this.goodList.list.splice(index, 1)
                        this.goodList.onSale++
                        this.goodList.unSale--
                    }).catch(error => {
                        this.$toast("上架失败")
                    })
                }).catch(err => err);
            },

            onSaleGoods(cat_id) {
                this.isUp = true;
                this.isDown = false;
                let params = {
                    status: 1,
                    cat_id: this.current_id,
                    search: this.value
                }
                this.init_Goods(params)
                this.current_status = 1
            },
            downSaleGoods(cat_id) {
                this.isUp = false
                this.isDown = true
                let params = {
                    search: this.value,
                    status: 0,
                    cat_id: this.current_id
                }
                this.init_Goods(params)
                this.current_status = 0
            },
            //产品显示
            init_Goods(params) {
                console.log(params)
                servicBusinessGoodList(params).then(res => {
                    this.goodList = res.data.data.businessGoods
                    this.goodList = this._handleData(this.goodList)
                    this.DownSaleNum = this.goodList.unSale
                    this.OnSaleNum = this.goodList.onSale
                    this.supplier_id = this.goodList.supplier_id
                })
                // this.goodList = this._handleData(this.goodList)
            },

            //搜索
            searchFn(){
                let params = {
                    cat_id:this.current_id,
                    status:this.current_status,
                    search:this.value
                }

                this.init_Goods(params)
            },

            /*

            //加载更多
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
                    page: this.courrentPage,
                    limit:this.limit,
                    cat_id:this.current_id,
                    status:this.current_status,
                    search:this.value
                }
                servicBusinessGoodList(params).then(res => {
                    this.allLoaded = false; // 可以进行上拉
                    this.goodList = res.data.data.businessGoods
                    this._handleData(this.goodList)
                })
                //this.goodList = this._handleData(this.goodList)
            },
            // 加载更多
            loadMore() {
                this.courrentPage++;
                const params = {
                    page: this.courrentPage,
                    limit:this.limit
                }
                servicBusinessGoodList(params).then(response => {

                    // concat数组的追加
                    this.goodList = this.goodList.concat(response.data.data.businessGoods);
                    this._handleData(this.goodList)
                    if (this.courrentPage > 1) {
                        this.allLoaded = true; // 若数据已全部获取完毕
                    }
                    this.$refs.loadmore.onBottomLoaded();
                })
            },

             */
        }

    }
</script>

<style scoped lang="scss">
.goodsClassification {
    display: flex;
    flex-direction: column;
    .entities-container {
        display: flex;
        flex-direction: column;
    }
    .head {
        height: .88rem;
    }
}
    .empty {
        text-align: center;
        color: #999;
        font-size: .25rem;
        padding-top: 1.2rem;
        p {
            padding-top: .6rem;
        }
    }
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
        overflow: hidden;
        flex: 1;
        .typeBox {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
        }
    }

    .mint-navbar {
        background-color: #E6E6E6;
        display: block;
        text-align: left;
        width: 2rem;
        height: 100%;
        flex:1;
        overflow: scroll;

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
                border-left: 2px solid #E6E6E6;
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
                    font-size: .24rem;
                    padding-left: .2rem;
                    padding-right: .1rem;
                    height: .8rem;
                    line-height: .8rem;

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
                    }
                }

                .child-active {
                    color: #2da2ff;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }
        }
    }


    .mint-tab-container {
        overflow: hidden;
        margin-left: 2rem;
        height: 100%;
        & > div{
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            &>div:last-child {
                // height: auto;
                padding: 0 .2rem;
                position: absolute;
                left: 0;
                top: 1rem;
                right: 0;
                // flex: 1;
                overflow: auto;
                bottom: 0;
            }
        }
    }

    .item {
        background: #fff;
        padding: .16rem .13rem;
        border-radius: .1rem;
        margin-top: .2rem;
        display: flex;
        // height: 2.4rem;
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
        display: inline-block;
        flex-direction: column;
        font-size: 10px;
        color: rgb(102, 102, 102);
        width: 60%;
        overflow: hidden;
    }

    .selling .unit_price .font {
        color: rgb(255, 59, 48);
        font-size: 14px;
        &> div> span {
            color: #ccc;
            font-size: 10px;
            display: inline-block;
             margin-left: 4px;
             color: #999;
            &::before {
                content: '|';
               margin-right: 6px;
            }
        }

        & > span {
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
            white-space: nowrap;
            text-overflow:ellipsis;
            overflow: hidden;
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
        width: 100%;
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

        .isUp, .isDown {
            color: #2DA2FF;

            span {
                color: #ff3b30;
            }
        }
    }

    .activeTop {
        height: .88rem;
        line-height: .88rem
        // padding-top: .52rem;
    }

    .all-goods {
        display: block;
        height: 1rem;
        line-height: 1rem;
        padding-left: .15rem;
        overflow: hidden;
        width: 2rem;
        font-size: .3rem;
        z-index: 999;
        border-left: 2px solid #E6E6E6;
    }

    .all-goods-active {
        background: #eef6fb;
        border-left: 2px solid #26a2ff;
    }

    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .activeTop {
             height: .88rem;
            line-height: .88rem
            // padding-top: .52rem;
        }
    }
</style>