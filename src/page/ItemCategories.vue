<template>
    <div style="height: 100%;overflow: hidden;">
        <header v-bind:class="{ activeTop: isFullScreen }">{{title}}</header>
        <div v-if="isFullScreen" style="height: 35px"></div>
        <div class="entities-container" v-if="supplierId" style="margin-top: .88rem">
            <div class="search">
                <SearchBar></SearchBar>
            </div>
            <div class="product-list" v-if="menuList.length>0">
                <div class="choose">
                    <div>分类</div>
                </div>
                <div class="mint-navbar">
                    <div class="menu-list" :id="`menu_${index}`" :key="`menu-${index}`"
                         v-for="(menu,index) in menuList ">
                        <span @click="showGoods(menu.id)" class="sp1 up"
                              :class="`${is_active===menu.id?'active':''}`">{{menu.name}}</span>

                        <div class="down-menu" style="height: 0px">
                            <div>
                                <p v-for="(childrenMenu,index) in menu.child"
                                   :class="`${childrenMenu.id===is_child_id?'child-active':''}`"
                                   @click="showSlideGoods(childrenMenu.id,menu.id)"
                                >{{childrenMenu.name}}</p>
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
                            <div v-for="(entity,ikey) in goodList.list" v-if="goodList.list.length>0">
                                <div v-if="entity.status===1" class="item" id="list-item">
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
                                            <div class="gw_num" v-if="entity.status" @click="DownSelf(entity.id)">下架&nbsp;&darr;</div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="item" id="list-item2">
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
                                            <div class="gw_num" v-if="entity.status" @click="DownSelf(entity.id)">下架&nbsp;&darr;</div>
                                            <div class="gw_num up" v-else @click="UpSelf(entity.id)">上架&nbsp;&uarr;
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Empty v-if="goodList.list==''&&loading==false"/>
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

    export default {
        name: "ItemCategpries",
        components: {CircleLoading, SearchBar, Empty},
        data() {
            return {
                selected: 'menu_0',
                is_active: '',//一级菜单默认值
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
            async initData() {
                console.log("11")
                console.log(this.supplierId)
                if (this.supplierId) {
                    const {data} = await this.$http.get(`/hippo-shop/business/menuEntities`)
                    console.log(data.data.cates)
                    this.menuList = data.data.cates
                    this.$http.get(`/hippo-shop/business`).then(res => {
                        console.log(res.data.data.businessGoods)
                        this.goodList = res.data.data.businessGoods
                    })
                    this.loading = false
                } else {
                    this.$toast('当前用户未认证')
                    this.$router.go(-1)
                }
            },
            showGoods(id, ids, $event) {
                this.is_active = id //是否当前一级菜单
                //this.is_child_id = id

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
                let params = {
                    cat_id: id
                }
                this.$http.get(`/hippo-shop/business`, {params}).then(res => {
                    console.log(res.data.data.businessGoods)
                    this.goodList = res.data.data.businessGoods
                })
            },

            toggleSlide: function (dom, height, time) {
                dom.style.transition = 'height ' + time + 'ms';
                dom.style.height = height + 'px';
            },
            showSlideGoods(id, ids, $event) {
                this.is_child_id = id
                let params = {
                    cat_id: id
                }
                this.$http.get(`/hippo-shop/business`, {params}).then(res => {
                    console.log(res.data.data.businessGoods)
                    this.goodList = res.data.data.businessGoods
                })
            },
            //下架
            DownSelf(id) {
                this.$messagebox.confirm("确定要下架此商品吗?").then(action => {
                    if (action === 'confirm') {
                        var list = document.getElementById('list-item')
                        //var list2 = document.getElementById('list-item2')
                        list.remove()
                        //console.log( this.menu.unSale)
                        this.menuList.forEach(item => {
                            console.log(item)
                        })
                        this.menu.unSale++
                        this.menu.onSale--
                    }
                }).catch(err => err);
            },
            //上架
            UpSelf(id) {

            },
            onSaleGoods() {
                console.log("在售")
                this.state = 1
                this.isUp = true;
                this.isDown = false;
            },
            downSaleGoods() {
                console.log("下架")
                this.state = 0
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
                    padding-left: .3rem;
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
    }

    .active {
        display: flex;
    }

    .item-img {
        width: 1.3rem;
        height: 1.3rem;
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

        .active {
            color: #2da2ff;

            span {
                color: #ff3b30;
            }
        }
    }

    .activeTop {
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