<template>
   
        <div class="content">
            <div class="search" :class="{activeTop: isFullScreen}">
                <div v-if="is_search == true" class="search-form">
                    <form class="input-wrap" onsubmit="return false" action="">
                        <svg @click="handleSearch">
                            <use xlink:href="#icon-sousuo" />
                        </svg>
                        <input type="search" ref="input" v-model="searchValue" placeholder="请输入搜索内容" @keyup.enter="keyUp">
                        <svg @click="clearText" v-if="searchValue">
                            <use xlink:href="#icon-qingkong" />
                        </svg>
                    </form>
                </div>
                <ul class="nav-list"  v-if="is_search==false">
                    <li :class="`${selected == 2 ? 'active':''}`" @click="selected = 2">商业订单</li>
                    <li :class="`${selected == 1 ? 'active':''}`" @click="selected =1">工业订单</li>
                </ul>
                <div class="approve">
                    <svg @click="is_search = !is_search" v-if="is_search == false">
                        <use xlink:href="#icon-ordering-search" />
                    </svg>
                    <p @click="shutDown" v-if="is_search == true">取消</p>
                </div>
            </div>
            <businessPage ref="list" :searchValue="searchValue" v-if="selected === 2"/>
            <!--订量生产结束-->
            <clxsd-foot-guide :user-type="USER_TYPE"  v-if="selected === 1"/>
            <div class="detail"  v-if="selected==1">
                <img src="../../images/developing.png" width="50%">
                <p>
                    <span>功能开发中, 敬请期待...</span>
                </p>
            </div>
         <clxsd-foot-guide :user-type="USER_TYPE" />
        </div>
    
</template>

<script>
    import { mapState } from "vuex";
    import SearchBar from '@/components/common/SearchBar';
    import factoryPage from '@/page/order/FactoryOrder'
    import businessPage from '@/page/order/BusinessOrder'
    export default {
        name: "PurchasingPortOrder",
        components: {
            SearchBar,
            factoryPage,
            businessPage
        },
        data() {
            return {
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                is_search:false,
                selected:2,
                searchValue: ''
            }
        },
        computed: {
            ...mapState({
                USER_TYPE: state => state.CURRENTUSER.data.user_type,
            })
        },
        methods: {
            handleSearch() {
                this.$refs.list._handleSearch()
                this.$refs.input.blur()
            },
            
            // 点击软键盘搜索按钮
            keyUp() {
                this.$refs.list._handleSearch()
                this.$refs.input.blur()
            },
            shutDown() {
                this.is_search = !this.is_search
                this.searchValue = ""
            },
            clearText(){
                this.searchValue = ''
            }
        }
    }
</script>

<style lang="scss" scoped>
.wrapper {
    height: 600px;
}
    .detail {
        font-size: .3rem;
        text-align: center;
        padding-top: 2rem;
        line-height: 3;
        color: #575757;
    }
    .search-form{
        width: 90%;
        background: #0081e5;
        height: .6rem;
        line-height: .6rem;
        border-radius: .6rem;
        display: flex;
        padding: 0 .3rem;

        // align-items: center;
        // display: flex;
        .input-wrap {
            display: flex;
            align-items: center;
            flex: 1;
            // justify-content: space-around;
            input {
                margin-left: .3rem;
                // width: 84%;
                flex-grow: 2;
                // height: .5rem;
                // line-height: .52rem;
                height: 100%;
                background: #0081e5;
                color: #fff;
                &::placeholder {
                    color: #fff;
                    opacity: .6;
                }
            }
            svg {
                width: .3rem;
                height: .3rem;
            }
        }
        
    }
    .nav-list {
        width: 80%;
        padding-left: 15%;
        color: #fff;
        text-align: center;
        // height: .6rem;
        li {
            display: inline-block;
            padding-left: .3rem;
            font-size: .37rem;
            opacity: .6;
        }
        .active {
            opacity: 1;
            font-size: .47rem;
        }
    }
    .search {
        position: relative;
        z-index: 5;
        background: #26A2FF;
        display: flex;
        width: 100%;
        top: 0px;
        height: .88rem;
        // line-height: .88rem;
        // padding: 12px;
        z-index: 999;
        align-items: center;
        justify-content: space-between;
        padding: 0 .24rem;
        .retreat {
            width: 30px;
            height: 30px;
        }
        .approve {
            text-align: center;
            margin-left: .1rem;
            width: .7rem;
            svg {
                width: .4rem;
                height: .4rem;
                color: #fff;
                margin-top: .1rem;
            }
            p {
                color: #fff;
                line-height: .6rem;
                font-size: .28rem;
            }
        }
    }
    .activeTop {
        // padding-top: 38px;
    }

</style>