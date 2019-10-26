<template>
    <div>
        <div class="is-scroll">
            <mt-navbar v-model="selected">
                <mt-tab-item id="all">
                    <p class="p1">全部</p>
                </mt-tab-item>
                <mt-tab-item id="province">
                    <p class="p1">省公司</p>
                </mt-tab-item>
                <mt-tab-item id="city">
                    <p class="p1">市公司</p>
                </mt-tab-item>
                <mt-tab-item id="partner">
                    <p class="p1">合伙人</p>
                </mt-tab-item>
                <mt-tab-item id="promoter">
                    <p class="p1">推广人</p>
                </mt-tab-item>
            </mt-navbar>
        </div>
        <Search></Search>
        <mt-swipe :auto="4000" class="swiper"  :show-indicators="false">
            <mt-swipe-item><img src="../../../images/extension/banner.png" width="100%"></mt-swipe-item>
            <mt-swipe-item><img src="../../../images/extension/banner.png" width="100%"></mt-swipe-item>
            <mt-swipe-item><img src="../../../images/extension/banner.png" width="100%"></mt-swipe-item>
        </mt-swipe>
        <Notice></Notice>
        <mt-tab-container v-model="selected" style="min-height: 5rem;padding-bottom: .2rem">
            <mt-tab-container-item id="all">
                <UnSureNav type="all"></UnSureNav>
                <AllCustomerComponent></AllCustomerComponent>
            </mt-tab-container-item>
            <mt-tab-container-item id="province">
                <UnSureNav></UnSureNav>
                <CustomerCity></CustomerCity>
            </mt-tab-container-item>
            <mt-tab-container-item id="city">
                <UnSureNav></UnSureNav>
                <CustomerCity></CustomerCity>
            </mt-tab-container-item>
            <mt-tab-container-item id="partner">
                <UnSureNav></UnSureNav>
                <CustomerHehuo></CustomerHehuo>
            </mt-tab-container-item>
            <mt-tab-container-item id="promoter">
                <UnSureNav></UnSureNav>
                <TuiguangClxd></TuiguangClxd>
            </mt-tab-container-item>
        </mt-tab-container>
        <!--
        <Search></Search>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">推广数量</mt-tab-item>
            <mt-tab-item id="2">业绩金额</mt-tab-item>
        </mt-navbar>
        <span class="total">共{{tuiguanData.length}}人</span>
        <mt-tab-container v-model="selected" style="min-height: 9rem">
            <mt-tab-container-item id="1">
                <div v-if="tuiguanData.length>1">
                    <ClxsdShiCell :data="entity" v-for="(entity,key) in tuiguanData" :key="`shi-${key}`"></ClxsdShiCell>
                </div>
                <EmptyList v-else message="您还没有推广人！"/>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div v-if="tuiguanData.length>1">
                    <ClxsdShiCell :data="entity" v-for="(entity,key) in tuiguanData" :key="`shi-${key}`"></ClxsdShiCell>
                </div>
                <EmptyList v-else message="您还没有推广人！"/>
            </mt-tab-container-item>
        </mt-tab-container>
    -->
    </div>
</template>

<script>
    import { mapState, mapGetters } from "vuex";
    import ClxsdShiCell from "./ShiCell"
    import Search from "./ExtensionSeach2"
    import Notice from "./Notice"
    import EmptyList from "../../EmptyList";
    import UnSureNav from "@/page/Home/UnSureExtension/Components/UnSureNav";//导航
    import AllCustomerComponent from "@/page/Home/UnSureExtension/Components/AllCustomerComponent";//全部
    import CustomerCity from "./UnSureCityCell";//省公司
    import CustomerHehuo from "./UnSureHehuoCell";//合伙人
    import TuiguangClxd from "@/page/Home/UnSureExtension/CustomerTuiguangTab";//推广人
    export default {
        name: "CustomerShi",
        components: {
            EmptyList,
            ClxsdShiCell,
            Search,
            Notice,
            UnSureNav,
            AllCustomerComponent,
            CustomerCity,
            CustomerHehuo,
            TuiguangClxd
        },
        data(){
            return {
                tuiguanData:[],
                selected: 'all',
                code:null,
            }
        },
        methods:{
            async initData(){
                const { data } = await this.$http.get('area-user/city',{params:{code:this.code}});
                this.tuiguanData = data;
            }
        },
        created(){
            if(this.$route.params.code){
                this.code = this.$route.params.code;
            }
            this.initData();
        },

    }
</script>

<style lang="scss" scoped>
    .is-scroll {
        width: 6.4rem;
        height: .8rem;
        margin-top: -.9rem;
        margin-left: .9rem;
        overflow-y: hidden;
        overflow-x: scroll;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    .mint-navbar {
        border: 0px;
        background: #0090ff;
        position: relative;
        height: .88rem;
        width: 8.35rem;
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom:0px;
        color: #fff;
        .p1 {
            font-size: .47rem;

        }
    }
    .mint-navbar .mint-tab-item {
        padding:  0;
    }
    .mint-tab-item {
        color: rgb(153,211,255);
        font-size: .37rem;
    }
    .mint-tab-item-label .p1 {
        font-size: .37rem;
        line-height: .88rem;
    }
    .swiper {
        height: 2.75rem;
        padding: .15rem;
        padding-top: .1rem;
    }
    /*
    .mint-navbar {
        padding-right: 4.3rem;
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 0;
        color: #333;
        font-weight: bold;
    }
    .total {
        position: absolute;
        right: .2rem;
        margin-top: -32px;
    }
    .nav-small {
        background: #fff;
        height: .8rem;
        line-height: .8rem;
        font-size: .28rem;
        padding: 0 .2rem;
        span {
            margin-right: .5rem;
            color: #7C7C7C;
        }
        .active {
            color: #333;
        }
    }
     */
</style>