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
                    <p class="p1">集采商</p>
                </mt-tab-item>
                <mt-tab-item id="promoter">
                    <p class="p1">推广人</p>
                </mt-tab-item>
            </mt-navbar>
        </div>
        <Seach></Seach>
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
                <ShiClxd></ShiClxd>
            </mt-tab-container-item>
            <mt-tab-container-item id="partner">
                <UnSureNav></UnSureNav>
                <HehuoClxd></HehuoClxd>
            </mt-tab-container-item>
            <mt-tab-container-item id="promoter">
                <UnSureNav></UnSureNav>
                <TuiguangClxd></TuiguangClxd>
            </mt-tab-container-item>
        </mt-tab-container>
        <!--
        <div class="" v-if="allData.length > 0">
            <mt-navbar v-model="selected">
                <mt-tab-item id="all">
                    <svg class="tag-icon">
                        <use xlink:href="#icon-promote-client-all" />
                    </svg>
                    <p>全部({{ allData.length }})</p>
                </mt-tab-item>
                <mt-tab-item id="has-kaifai">
                    <svg class="tag-icon">
                        <use xlink:href="#icon-promote-client-develop-1" />
                    </svg>
                    <p>已开发({{ kaiData.length}})</p>
                </mt-tab-item>
                <mt-tab-item id="wei-kaifai">
                    <svg class="tag-icon">
                        <use xlink:href="#icon-promote-client-develop-0" />
                    </svg>
                    <p>未开发({{weiData.length}})</p>
                </mt-tab-item>
            </mt-navbar>

            <mt-tab-container v-model="selected" style="min-height: 9.4rem;">
                <mt-tab-container-item id="all">
                    <div v-if="allData.length>0">
                        <ClxsdShengCell v-for="(area,index) in allData" :key="`all-${index}`" :data="area"></ClxsdShengCell>
                    </div>
                    <ClxsdEmpty v-else message="数据为空"></ClxsdEmpty>
                </mt-tab-container-item>
                <mt-tab-container-item id="has-kaifai">
                    <div v-if="kaiData.length>0">
                         <ClxsdShengCell v-for="(area,index) in kaiData" :key="`kaifai-${index}`" :data="area"></ClxsdShengCell>
                    </div>
                    <ClxsdEmpty v-else message="已开发数据为空"></ClxsdEmpty>
                </mt-tab-container-item>
                <mt-tab-container-item id="wei-kaifai">
                    <div v-if="weiData.length>0">
                    <ClxsdShengCell v-for="(area,index) in weiData" :key="`wei-${index}`" :data="area"></ClxsdShengCell>
                    </div>
                    <ClxsdEmpty v-else message="未开发数据为空"></ClxsdEmpty>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <div v-else>
            <ClxsdEmpty></ClxsdEmpty>
        </div>
         -->
    </div>
</template>

<script>
    import ClxsdShengCell from "./ShengCell"
    import ClxsdEmpty from "./CustomerEmpty"
    import Seach from './ExtensionSeach2'
    import UnSureNav from "@/page/Home/UnSureExtension/Components/UnSureNav";//导航
    import AllCustomerComponent from "@/page/Home/UnSureExtension/Components/AllCustomerComponent";//全部
    import CustomerCity from "./UnSureCityCell";//省公司
    import ShiClxd from "@/page/Home/UnSureExtension/CustomerShiTab";//市公司
    import HehuoClxd from "@/page/Home/UnSureExtension/CustomerHehuoTab";//集采商
    import TuiguangClxd from "@/page/Home/UnSureExtension/CustomerTuiguangTab";//推广人
    import Notice from "./Notice"
    export default {
        name: "CustomerSheng",
        components: {
            ClxsdShengCell,
            ClxsdEmpty,
            Seach,
            UnSureNav,
            AllCustomerComponent,
            CustomerCity,
            ShiClxd,
            HehuoClxd,
            TuiguangClxd,
            Notice
        },
        data(){
            return {
                selected: 'all',
                allData:[],
                kaiData:[],
                weiData:[]
            }
        },

        mounted(){
            this.initData();
        },
        methods:{
            async initData(){
                const { data } = await this.$http.get('area-user');
                if(data.children.length>0){
                    data.children.forEach((child,index) => {
                        if((data.code+'01') !==child.code){
                            child.active = child.user_id > 0 ? true : false;
                            if(child.active){
                                this.kaiData.push(child)
                            }else{
                                this.weiData.push(child)
                            }
                            this.allData.push(child);
                        }
                    })
                }
            },
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
        background-color: #fff;
        margin: .2rem;
        border-radius: 5px;
        margin-top: 0px;
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 0px;
        color: #333;
        margin-bottom: 0;
        font-weight: bold;
    }
    .tag-icon {
        width: .4rem;
        height: .4rem;
        margin-bottom: .07rem;
    }
 */

</style>