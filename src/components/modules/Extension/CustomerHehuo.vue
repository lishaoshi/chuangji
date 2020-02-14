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
                    <p class="p1">推广商</p>
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
                <CustomerCity/>
            </mt-tab-container-item>
            <mt-tab-container-item id="city">
                <UnSureNav></UnSureNav>
                <CustomerCity/>
            </mt-tab-container-item>
            <mt-tab-container-item id="partner">
                <UnSureNav></UnSureNav>
                <CustomerHehuoCell></CustomerHehuoCell>
            </mt-tab-container-item>
            <mt-tab-container-item id="promoter">
                <UnSureNav></UnSureNav>
                <TuiguangClxd></TuiguangClxd>
            </mt-tab-container-item>
        </mt-tab-container>
        <!--
        <Search></Search>
        <ul class="nav-ul">
            <li>
                <router-link to="/partner-tuiguang">
                    <svg>
                        <use xlink:href="#icon-promote-promoter"/>
                    </svg>
                    <p>推广人（{{tuiSize}}）</p>
                </router-link>
            </li>
            <li>
                <router-link to="/partner-caigou">
                    <svg>
                        <use xlink:href="#icon-promote-city"/>
                    </svg>
                    <p>采购商（{{caiSize}}）</p>
                </router-link>
            </li>
        </ul>
        <div v-if="entities.length>0">
            <div class="entity" v-for="(entity,index) in entities" :key="`entity_${index}`">
                <ClxsdShiCell v-if="entity.user_type === 4" :data="entity"></ClxsdShiCell>
                <ClxsdTuiguangCell v-if="entity.user_type === 3" :data="entity"></ClxsdTuiguangCell>
            </div>
        </div>
        <EmptyList v-esle message="数据暂无！"/>
        -->
    </div>
</template>

<script>
    import ClxsdShiCell from "./ShiCell"
    import ClxsdTuiguangCell from "./TuiguangCell"
    import Search from "./ExtensionSeach2"
    import EmptyList from "../../EmptyList";
    import UnSureNav from "@/page/Home/UnSureExtension/Components/UnSureNav";//导航
    import Notice from "./Notice"
    import AllCustomerComponent from "@/page/Home/UnSureExtension/Components/AllCustomerComponent";//全部
    import CustomerCity from "./UnSureCityCell";//省公司
    import CustomerHehuoCell from "./UnSureHehuoCell";//推广商
    import TuiguangClxd from "@/page/Home/UnSureExtension/CustomerTuiguangTab";//推广人
    export default {
        name: "CustomerHehuo",
        components: {
            EmptyList,
            ClxsdShiCell,
            ClxsdTuiguangCell,
            Search,
            UnSureNav,
            Notice,
            AllCustomerComponent,
            CustomerHehuoCell,
            CustomerCity,
            TuiguangClxd
        },
        data(){
            return {
                entities:[],
                tuiSize:0,
                caiSize:0,
                selected:"all"
            }
        },
        methods:{
            async initData(){
                const { data } = await  this.$http.get('/area-user/hehuo');
                let tuiSize =0;
                data.forEach((item,index) => {
                    if(item.user_type === 4){
                        tuiSize++;
                    }
                });
                this.tuiSize = tuiSize;
                this.caiSize = data.length - tuiSize;
                this.entities = data;
            }
        },
        created(){
            this.initData();
        }
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
    .nav-ul {
        margin: .2rem;
        margin-top: 0px;
        background: #fff;
        border:1px solid #f1f1f1;
        border-radius: 5px;
        text-align: center;
        li {
            text-align: center;
            display: inline-block;
            padding: .3rem 0;
            width: 40%;
            svg {
                width: .8rem;
                height: .8rem;
                border-radius: 100%;
            }
            p {
                font-size: .22rem;
                color: #333;
            }
        }
    }
     */
</style>