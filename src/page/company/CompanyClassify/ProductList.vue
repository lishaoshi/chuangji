<template>
    <div id="ProductList">
        <clxsd-head-top :title='`${title}`' style="border-bottom: 0px"></clxsd-head-top>
        <div class="search">
            <SearchBar v-model="value" :searchFn ="searchFn"></SearchBar>
        </div>
        <div class="product-list">
            <div style="width: 2rem;float: left;background: #E6e6e6">
                <span class="all-goods" @click="all_Goods()" :class="`${is_active == 0?'all-goods-active':''}`">全部</span>
                <div class="mint-navbar">
                    <div class="menu-list" :id="`menu_${index}`" :key="`menu-${index}`"
                         v-for="(menu,index) in menuList ">
                                <!-- 有二级菜单点击下拉 -->
                            <span v-if="menu.child" @click="slide($event,menu)" class="sp1 up" ref="slideMenu">{{menu.name}}</span>
                            <!-- 一级菜单没有下拉 -->
                            <span v-else @click="showGoods(menu.id)" class="sp1"
                                  :class="`${is_active===menu.id?'tabActive':''}`">{{menu.name}}</span>
                        <div class="down-menu" style="height: 0px" ref="slideChild">
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

              <div class="choose">
                <ul>
                    <li :class="`${is_active == 1?'active':''}`" @click="changeType(1)">销量</li>
                    <li :class="`${is_active == 2?'active':''}`" @click="changeType(2)">时间</li>
                    <li :class="`${is_active == 3?'active':''}`" @click="changeType(3)">
                        价格
                        <div class="iconBox">
                            <!-- <svg class="top">
                                icon-business-price-down
                                icon-business-price-up
                                <use xlink:href="#icon-actity-down"></use>
                            </svg> -->
                            <svg>
                                <use :xlink:href="`#icon-business-price-${!isPrice?'0':isUp?'up':'down'}`"></use>
                            </svg>
                        </div>
                       
                    </li>
                    <li @click="is_business_list = !is_business_list">品牌</li>
                </ul>
            </div>
            <!-- tab-container -->
            <div class="mt-tab-container">
                <div>
                    <mt-loadmore ref="list" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false">
                        <div style="height: 9rem;overflow-y: scroll;margin-top: .2rem;padding: 0 .2rem;">
                            <!--  -->
                                <div class="item" :id="`menu_${index}`" v-for="(entity,index) in goodList" :key="`product_shop_list_${index}`"
                                    v-if="goodList.length>0">
                                    <router-link :to="`/business/shop/${businessId}/${entity.id}`">
                                        <img :src="entity.cover" class="item-img">
                                    </router-link>
                                    <div class="item-box">
                                        <router-link :to="`/business/shop/${businessId}/${entity.id}`">
                                            <p class="title">{{entity.good_name}}</p>
                                            <p class="title2">{{entity.brand.name}}</p>
                                            <p class="title2">规格:{{entity.spec}}</p>
                                            <p class="title2">效期:{{entity.time}}</p>
                                        </router-link>
                                        <div class="selling">
                                            <div class="unit_price">
                                                <p class="font" v-if="canShow"><i>￥</i><i>{{entity.price}}</i><span>{{entity.market_price}}</span></p>
                                                <p class="font" v-else><span>价格- - - -</span></p>
                                            </div>
                                            <div class="gw_num" v-if="(!entity.is_multi_spec && canShow)">
                                                <em class="lose" @click="removeToMiniCart($event,entity, index)">-</em>
                                                <!-- <em class="error-num">-</em> -->
                                                <div class="num">
                                                    <span class="amount">{{entity.num || 0}}</span>
                                                </div>
                                                <em class="add" @click="addToMiniCart($event,entity, index)">+</em>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <!--  -->
                            <div v-if="goodList==''">
                                <div class="empty">
                                    <svg style="width: 2.4rem;height: 2.4rem">
                                        <use xlink:href="#icon-empty"></use>
                                    </svg>
                                    <p>抱歉，没有数据展示</p>
                                </div>
                            </div>
                        </div>
                    </mt-loadmore>
                </div>
            </div>
            <div style="height: 1rem"></div>
            <div style="position: fixed;bottom: 0px;width: 100%">
                <mini-company-cart ref="MiniCompanyCart" :shop-id="businessId" :count="cartNum" :total-price="totalPrice"></mini-company-cart>
            </div>
            <div style="position: fixed;right: 0px;width: 82%;z-index: 99;top:0px;height: 100%;background: #fff" v-if="is_business_list">
                
                    <BusinessList :closedMyFrame="closedMyFrame" :entryBusinessShop="entryBusinessShop" :brand_id="brand_id"></BusinessList>
                
            </div>
            <div class="fixed-bg" v-if="is_business_list" @click="is_business_list = !is_business_list"></div>
        </div>
        <CircleLoading v-if="loading"></CircleLoading>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import foot from "@/page/company/CompanyFooterNav.vue";
    import SearchBar from '@/components/common/SearchBar';
    import HeaderTop from "@/page/company/CompanyHeader.vue";
    import MiniCompanyCart from '@/page/company/CompanyClassify/MiniShopCart.vue'
    import BusinessList from './CompanyList'
    import EmptyList from "@/components/EmptyList"
    import {_servicBusinessGoodList} from "@/api/business"
    import { queryShopCarList, delShopCar, addShopCar, onlyDelShopCar } from '@/api/shopCar'

    export default {
        name: "ProductList",
        components: {
            foot,
            SearchBar,
            HeaderTop,
            MiniCompanyCart,
            BusinessList,
            EmptyList,
        },
        data() {
            return {
                selected: 'menu_0',
                menuList: [],
                shopId: '',
                nums: 0,
                is_business_list: false,
                loading: false,
                is_active: 0,
                is_child_id: 0,
                goodList: [],//产品列表
                value:'',
                current_id:'',
                isPrice: false,
                isUp: false,
                page: 1,
                limit: 20,
                cat_id: '',
                brand_id: '',
                price: '',
                type: '',
                allLoaded: false,
                shopCart: {}
            }
        },
        created() {
            // this.is_active = 1
            let id = this.businessId
            var data1 = JSON.parse(localStorage.getItem('search'));
            console.log(data1)
            this.value = data1
            this.initData(id)
            this.init_Goods(true)
            
            // this.searchFn()
            localStorage.removeItem('search');
        },
        computed: {
            ...mapState({
                businessData: state => state.shop.CURRENT_BUSINESS_SHOP_DATA,
                cartList: state => state.shop.BUSINESS_CART_LIST,
                canShow: state => state.CURRENTUSER.data.shop_supplier,
            }),
            businessId() {
                return this.businessData.id
            },
            title() {
                return this.businessData.display_name || this.businessData.name
            },
            // shopCart() {
            //     return {...this.cartList[this.businessId]}
            // },
            //当前商店购物信息
            cartNum() {
                let num = 0;
                Object.values(this.shopCart).forEach((entity, index) => {
                    num += parseInt(entity.num);
                })
                return num
            },
            totalPrice() {
                let total_price = 0.00
                Object.values(this.shopCart).forEach((entity, index) => {
                    total_price += entity.num * entity.price;
                })
                return total_price.toFixed(2)
            }
        },

        methods: {
            ...mapMutations([
                'BUSINESS_ADD_CART', 'BUSINESS_REMOVE_CART',
            ]),
            //产品显示
           async init_Goods(isFirst=false) {
                let params = {
                    page: this.page,
                    limit: this.limit,
                    cat_id: this.current_id,
                    brand_id: this.brand_id,
                    price: this.price,
                    type: this.type,
                    search: this.value
                }
               await _servicBusinessGoodList(params,this.businessId).then(res => {
                    
                    if(this.page==1) {
                        this.goodList = res.data.data.recommendList
                    } else {
                        this.goodList = [...this.goodList, ...res.data.data.recommendList]
                    }
                   
                    !isFirst&&this.$refs.list.onBottomLoaded()
                    this.goodList = this._handleData(this.goodList)
                     if(!res.data.data.recommendList.length) {
                        this.allLoaded = true
                        return false
                    }
                })
                queryShopCarList({}, this.businessId).then(res=>{
                    this.shopCart = res
                    this.goodList.forEach((item, index, arr)=>{
                        Object.keys(this.shopCart).forEach((items)=>{
                            if(item.id==items) {
                                arr[index].num = this.shopCart[items].num
                            }
                        })
                    })
                })
                // console.log("长度："+this.goodList.list.length())
            },
             //一级菜单点击商品
            showGoods(id, $event) {
                // console.log("当前id：" + id)
                this.is_active = id //是否当前一级菜单
                let parentNode = event.target.parentNode;
                let a = this.sibling(parentNode)
                for (var i = 0; i < a.length; i++) {
                    a[i].childNodes[0].classList.remove("tabActive");
                     a[i].childNodes[0].classList.remove("all-goods-active");
                    a[i].childNodes[0].classList.add("up");
                    let b = a[i].childNodes[1]
                    this.toggleSlide(b, 0, '500');
                }
                this.cat_id = id
                let params = {
                    cat_id: id
                }
                 this.current_id = id
                 this.page = 1
                 this.allLoaded = false
                this.init_Goods(params)
               
            },

              //点击下拉菜单
            slide: function (event,id) {
                this.is_active=id
                // this.current_id = id
                let targetNode = event.target
                targetNode.classList.add("tabActive"); //添加当前样式
                let parentNode = targetNode.parentNode;
                let a = this.sibling(parentNode)
                for (var i = 0; i < a.length; i++) {
                    a[i].childNodes[0].classList.remove("tabActive");
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

            // 加载更多
            loadBottom() {
                this.page++
                this.init_Goods()
                
            },
            topReft() {
                console.log('上啦')
            },
            canOption() {
                if (!this.canShow) {
                    this.$Message.error('当前用户还未审核通过');
                    return false;
                }
                return true
            },
            async initData(id) {
                let params = {
                    supplier_id : this.businessId
                }
                const {
                    data
                } = await this.$http.get(`/hippo-shop/business/menuEntities`, {params});
                //this.menuList = data
                this.menuList = data.data.cates
                console.log(this.menuList)
            },
            closedMyFrame() {
                this.is_business_list = false
            },

            // 点击tabel栏函数
            changeType(i) {
                this.is_active = i
                this.page = 1
                if(i==3) {
                    this.isPrice = true
                    this.isUp = !this.isUp
                } else {
                     this.isPrice = false
                     this.isUp = false
                }
                switch (i) {
                    case 1:
                        this.price = ""
                        this.type = i
                        break;
                    case 2:
                        this.type = i
                         this.price = ""
                        break;
                    case 3:
                        this.price==1?this.price=2:this.price=1
                        break;
                    default:
                        break;
                }
                this.init_Goods()
                // this.isUp?
            },
            entryBusinessShop(item) {
                // console.log(item)
                this.brand_id = item.id
                this.init_Goods()
                // this.$store.commit('SAVE_CURRENT_BUSINESS_SHOP', item.id)
                // this.$store.commit('SAVE_CURRENT_BUSINESS_SHOP_DATA', item)
                // this.$router.go(0)
            },
            _handleData(data) {
                data.forEach((entity, entityIndex, arr) => {
                    entity.shopId = this.businessId
                    entity.num = 0
                    entity.itemId = entity.id
                    arr[entityIndex].time = this.$moment(entity.valid_time*1000).format("YYYY-MM-DD")
                    Object.values(this.shopCart).forEach((cartItem, cartindex) => {
                        if (entity.id === cartItem.id) {
                            entity.num = cartItem.num
                        }
                    })
                })
                this.loading = false
                return data
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
                this.page = 1
                console.log('id',id, 'ids: ', ids)
                // this.is_active = id
                this.is_child_id = id
                this.current_id = id
                let params = {
                    cat_id: id
                }
                this.init_Goods(params)
                this.current_id = id
            },
            addToMiniCart(event, entity, index) {
                // debugger
                let params = {
                    supplier_id: entity.shopId,
                    good_id: entity.id
                }
               entity.num++
               if(this.shopCart[entity.id]) {
                   this.shopCart[entity.id].num++
               } else {
                //    debugger
                //    this.shopCart[entity.id] = JSON.parse(JSON.stringify(entity))
                let data = JSON.parse(JSON.stringify(entity))
                 this.$set(this.shopCart, `${entity.id}`, data)
               }
               
               addShopCar(params)
                // console.log(entity, 'entity')
                // if (this.canOption()) {
                //     this.BUSINESS_ADD_CART(entity)
                //     entity.num++
                //     this.$nextTick(() => {
                //         this.$refs.MiniCompanyCart.drop(event.target)
                //     })
                //     let params = {
                //         supplier_id: entity.shopId,
                //         good_id: entity.id
                //     }
                //     addShopCar(params)

                // }
                //  addShopCar(params)

            },
            removeToMiniCart(event, entity, index) {
                let params = {
                    supplier_id: entity.shopId,
                    good_id: entity.id
                }
                if(parseInt(entity.num) <= 0) {
                    this.$toast('不能再减啦~')
                    return false
                }
                entity.num--
                this.shopCart[entity.id].num--
                onlyDelShopCar(params)
                // if (this.canOption()) {
                //     this.BUSINESS_REMOVE_CART(entity)
                //     entity.num--
                //      let params = {
                //         supplier_id: entity.shopId,
                //         good_id: entity.id
                //     }
                //     onlyDelShopCar(params)
                // }
            },
            //搜索
            searchFn(){
                let params = {
                    cat_id:this.current_id,
                    search:this.value
                }

                this.init_Goods()
            },
            all_Goods() {
                this.page = 1
                this.current_id = ''
                this.brand_id = ''
                this.init_Goods()
                this.is_active = 0
                let nodes =this.$refs.slideMenu
                let childNode = this.$refs.slideChild
                // console.log(nodes)
                nodes.forEach(item => {
                    item.classList.remove("tabActive");
                    item.classList.add("up");
                })
                childNode.forEach(item => {
                    this.toggleSlide(item, 0, '500');
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .empty {
        text-align: center;
        color: #999;
        font-size: .25rem;
        padding-top: 1.2rem;

        p {
            padding-top: .6rem;
        }
    }

    #ProductList {
        max-height: 100%;
        overflow: hidden;
    }

    .m-style-svg {
        width: .3rem;
        height: .3rem;
    }

    .fixed-bg {
        position: fixed;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;
        left: 0px;
        background: #333;
        opacity: .3;
        z-index: 90;
    }

    .search {
        background: #f1f1f1;
        padding: 10px;
        z-index: 999;
    }

    .product-list {
        position: relative;
        height: 11.44rem;
        overflow: hidden;
    }

    .mint-navbar {
        background-color: #E6E6E6;
        display: block;
        text-align: left;
        width: 2rem;
        // height: 9.5rem;
        
        margin-bottom: 1rem;
        height: calc(100vh);
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
        position: relative;
        width: 71%;
        float: right;
        height: 9.8rem;
        overflow-x: hidden;
        overflow-y: scroll;
        padding-top: .2rem;
        padding-bottom: .2rem;
    }

    .item {
        display: flex;
        background: #fff;
        padding: .16rem .13rem;
        border-radius: .1rem;
        margin-top: .2rem;

        &:nth-child(1) {
            margin-top: 0px;
        }
    }

    .item-img {
        width: 1.3rem;
        height: 1.3rem;
        margin-top: .3rem;
    }

    .selling {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: .1rem;
    }

    .selling .unit_price {
        font-size: 10px;
        color: rgb(102, 102, 102);
        width: 2rem;
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
        width: 72%;
        padding-left: 3%;
        padding-top: .1rem;

        .title {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: .32rem;
            color: #333;
            margin-bottom: .05rem;
        }

        .title2 {
            font-size: .2rem;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
            line-height: 1.5;
        }
    }

    /*加减*/

    .gw_num {
        width: 60px;
        height: 20px;
        background: rgb(245, 245, 245);
        border-radius: 10px;
        display: flex;
        align-items: center;
        text-align: center;
    }

    .gw_num em {
        color: #7A7979;
        cursor: pointer;
        font-size: 16px;
        flex: 1;
        line-height: 20px;
        font-style: normal;
    }

    .gw_num .add {
        color: #26A2FF;
    }

    .shop_num em {
        color: rgb(45, 162, 255);
    }

    .gw_num .num {
        font-style: normal;
        font-size: 12px;
        color: #333;
    }

    .gw_num .num input {
        text-align: center;
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
            width: 100%;
            display: flex;
            justify-content: space-around;
            li {
                // display: inline-block;
                // width: 25%;
                text-align: center;
                &:nth-last-child(2) {
                    display: inline-flex;
                }
            }


            .active {
                color: #2da2ff;
            }
        }
        .iconBox {
            display: flex;
            flex-direction: column;
            justify-content: center;
            svg {
                width: .48rem;
                height: .24rem;
                // margin-left: px;
            }
        }
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
    }

    .all-goods-active {
        background: #eef6fb;
        border-left: 2px solid #26a2ff;
    }
    .tabActive {
        background: #eef6fb;
        border-left: 2px solid #26a2ff;
    }

    /*弹出购物车*/
    .shop-list {
        display: flex;
        height: 40px;
        padding: 0 .2rem;
        font-size: 14px;
        border-bottom: 1px solid #f1f1f1;
        justify-content: space-between;
        line-height: 40px;

        .title {
            width: 60%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 40px;
        }

        .price {
            color: #F30000;
            width: 20%;
            text-align: center;
        }

        .gw_num {
            margin-top: 10px;
        }
    }

    .shop_title {
        width: 100%;
        height: 0.88rem;
        background: rgb(245, 245, 245);
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 16;
        padding: 0 10px;
        background: #f1f1f1;

        p {
            &:nth-child(1) {
                font-size: 16px;
                font-weight: bold;
            }

            &:nth-child(2) {
                font-size: 14px;
                color: #26A2FF;
            }
        }
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
</style>