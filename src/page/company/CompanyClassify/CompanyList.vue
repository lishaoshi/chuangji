<template>
    <div>
        <div class="search">
            <svg @click="closedMyFrame()">
                <use xlink:href="#icon-closed"></use>
            </svg>
            <SearchBar v-model="searchValue" :searchFn="searchFn"></SearchBar>
        </div>
        <div style="min-height: 5rem;" class="company-list">
            <!-- <ClxsdLoadMore key="factory-list" ref="loadmore" @onRefresh="onRefresh" @onLoadMore="onLoadMore"> -->
            <mt-loadmore :top-method="loadTop" ref="load" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded">
                <li :class="{'active':item.id == current_id}" class="company" :key="`en-${index}`" v-for="(item,index) in businesses">
                    <div @click="chooseBrands(item)">
                        {{item.display_name || item.name }}
                    </div>
                    <svg v-if="item.id == current_id">
                        <use xlink:href="#icon-pay-chosed"></use>
                    </svg>
                    <!--
                    <svg v-else>
                        <use xlink:href="#icon-enter"></use>
                    </svg>
                    -->
                </li>
            </mt-loadmore>
            <!-- </ClxsdLoadMore> -->
        </div>
    </div>
</template>

<script>
    import SearchBar from '@/components/common/SearchBar';
    import {mapState} from "vuex";
    import {supplierBusinessEntities} from '@/api/supplier.js'

    export default {
        name: "CompanyList",
        components: {
            SearchBar
        },
        props:["closedMyFrame","entryBusinessShop","item", "current_id"],
        data() {
            return {
                isActive: true,
                hasError: false,
                page: 1,
                businesses: [],
                swippers: [],
                areaList: null,
                active: 0,
                preActive: 0,
                itemId: '',
                searchValue: '',
                allLoaded: false,
                limit: 20
            }
        },
        created() {
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll, true)
        },
        computed: {
            ...mapState(['POSITION']),
            lat() {
                return this.POSITION.lat
            },
            lng() {
                return this.POSITION.lng
            },
            ...mapState({
                businessData: state => state.shop.CURRENT_BUSINESS_SHOP_DATA,
            }),
            id() {
                return this.businessData.id
            },
        },
        methods: {
            handleScroll() {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop > 50) {
                    this.hasError = 1
                } else {
                    this.hasError = 0;
                }
            },
            async getData(isUp, isDown) {
                let params = {
                    page: this.page,
                    limit: this.limit,
                    search: this.searchValue
                }
                const {
                    data
                } = await supplierBusinessEntities(params,this.id)
                // console.log(data)
                if (this.page!=1) {
                    this.businesses = [...this.businesses, ...data.data.brandList]
                } else {
                    this.businesses = data.data.brandList
                }
                if(!data.data.brandList.length) {
                    this.allLoaded = true
                }
                isUp&&this.$refs.load.onTopLoaded()
                isDown&&this.page!=1&&this.$refs.load.onBottomLoaded()
                this.page++
            },
            loadTop() {
                this.page = 1
                this.getData(true, false)
            },
            loadBottom() {
                // this.page++
                this.getData(false, true)
            },
            searchFn() {
                this.page = 1
                this.getData()
                console.log(this.searchValue)
            },
            /*
            entryBusinessShop(item) {
                this.$store.commit('SAVE_CURRENT_BUSINESS_SHOP', item.id)
                this.$store.commit('SAVE_CURRENT_BUSINESS_SHOP_DATA', item)
                this.$router.push('/company-product-list')
            },
            */
            // onRefresh(callback) {
            //     // debugger
            //     this.page = 1;
            //     const options = {
            //         limit: 6,
            //         callback: callback
            //     }
            //     this.getData(options)

            // },
            // onLoadMore() {
            //     debugger
            //     console.log('loadMore')
            //     const options = {
            //         limit: 6
            //     }
            //     this.getData(options, true)
            // },
            chooseBrands(item) {
                // console.log(item)
                this.itemId = item.id
                this.entryBusinessShop(item)
            }
        },
    }
</script>

<style lang="scss" scoped>
    .mint-cell {
        border-bottom: 1px solid #f1f1f1;
    }
    .active {
        color: #0090ff;
    }

    .search {
        background: #f5f5f5;
        top: 0px;
        padding: 10px;
        z-index: 999;
        display: flex;
        position: relative;
        z-index: 999;
        svg {
            width: .35rem;
            height: .35rem;
            margin-top: .1rem;
            margin-right: .1rem;
        }
    }

    .company-list {
        background: #fff;
        padding: 0 .2rem;

        li {
            line-height: .9rem;
            font-size: .3rem;
            padding: 0 .1rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            border-bottom: 1px solid #f1f1f1;
            position: relative;
            list-style: none;
            display: flex;
            justify-content: space-between;
            &:last-child() {
                border: 0px;
            }
            >div {
                width: 80%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            svg {
                width: .3rem;
                height: .3rem;
                float: right;
                margin-top: .3rem;
            }
        }
    }
</style>