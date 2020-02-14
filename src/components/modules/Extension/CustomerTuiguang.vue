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
                <CustomerHehuoCell></CustomerHehuoCell>
            </mt-tab-container-item>
        </mt-tab-container>
        <!--
        <Search></Search>
        <div class="scroll">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">
                    <svg class="tag-icon">
                        <use xlink:href="#icon-promote-client-all" />
                    </svg>
                    <p>全部<span class="icon-tag">({{entities.length}})</span></p>
                </mt-tab-item>
                <mt-tab-item id="2">
                    <svg class="tag-icon">
                        <use xlink:href="#icon-promote-client-business" />
                    </svg>
                    <p>商业<span class="icon-tag">({{business.length}})</span></p>
                </mt-tab-item>
                <mt-tab-item id="3">
                    <svg class="tag-icon">
                        <use xlink:href="#icon-promote-client-hospital" />
                    </svg>
                    <p>医院<span class="icon-tag">({{yiyuans.length}})</span></p>
                </mt-tab-item>
                <mt-tab-item id="4">
                    <svg class="tag-icon">
                        <use xlink:href="#icon-promote-client-multipleShop" />
                    </svg>
                    <p>连锁店<span class="icon-tag">({{lianshuos.length}})</span></p>
                </mt-tab-item>
                <mt-tab-item id="5">
                    <svg class="tag-icon">
                        <use xlink:href="#icon-promote-client-drugstores" />
                    </svg>
                    <p style="margin-top: .03rem">单体<span class="icon-tag" >({{diantis.length}})</span></p>
                </mt-tab-item>
                <mt-tab-item id="6">
                    <svg class="tag-icon">
                        <use xlink:href="#icon-promote-client-clinic" />
                    </svg>
                    <p style="margin-top: .03rem">诊所<span class="icon-tag">({{zhenshuos.length}})</span></p>
                </mt-tab-item>
            </mt-navbar>
        </div>

        <mt-tab-container v-model="selected" style="min-height: 8.42rem;">
            <mt-tab-container-item id="1">
                <div v-if="entities.length>0">
                    <TuiguangCell :key="`all-${index}`" :data="entity" v-for="(entity,index) in entities"></TuiguangCell>
                </div>
               <Empty v-else message="没有任何数据，请去推广"></Empty>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div v-if="business.length>0">
                <TuiguangCell :key="`business-${index}`" :data="entity" v-for="(entity,index) in business"></TuiguangCell>
                </div>
                <Empty v-else message="商业数据为空，请去推广！"></Empty>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <div v-if="yiyuans.length>0">
                <TuiguangCell :key="`yiyuan-${index}`" :data="entity" v-for="(entity,index) in yiyuans"></TuiguangCell>
                </div>
                <Empty v-else message="医院数据为空，请去推广！"></Empty>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <div v-if="lianshuos.length>0">
                <TuiguangCell :key="`liansuo-${index}`" :data="entity" v-for="(entity,index) in lianshuos"></TuiguangCell>
                </div>
                <Empty v-else message="连锁数据为空，请去推广！"></Empty>
            </mt-tab-container-item>
            <mt-tab-container-item id="5">
                <div v-if="diantis.length>0">
                <TuiguangCell :key="`dianti-${index}`" :data="entity" v-for="(entity,index) in diantis"></TuiguangCell>
                </div>
                <Empty v-else message="单体数据为空，请去推广！"></Empty>
            </mt-tab-container-item>
            <mt-tab-container-item id="6">
                <div v-if="zhenshuos.length>0">
                <TuiguangCell :key="`zhenshuo-${index}`" :data="entity" v-for="(entity,index) in zhenshuos"></TuiguangCell>
                </div>
                <Empty v-else message="诊所数据为空，请去推广！"></Empty>
            </mt-tab-container-item>
        </mt-tab-container>
        -->
    </div>
</template>

<script>
    import TuiguangCell from "./TuiguangCell";//推广人
    import Empty from "./CustomerEmpty";//空
    import Search from "./ExtensionSeach2"
    import UnSureNav from "@/page/Home/UnSureExtension/Components/UnSureNav";//导航
    import Notice from "./Notice"
    import AllCustomerComponent from "@/page/Home/UnSureExtension/Components/AllCustomerComponent";//全部
    import CustomerCity from "./UnSureCityCell";//省公司
    import CustomerHehuoCell from "./UnSureHehuoCell";//推广商
    export default {
        name: "CustomerTuiguang",
        components:{
           TuiguangCell,
            Empty,
            Search,
            UnSureNav,
            Notice,
            AllCustomerComponent,
            CustomerCity,
            CustomerHehuoCell
        },
         data(){
            return {
                selected: '1',
                entities:[],
                business:[],
                lianshuos:[],
                yiyuans:[],
                diantis:[],
                zhenshuos:[],
                selected:"all"

            }
        },
        methods:{
            async initData(){
                 const { data } = await this.$http.get('/area-user/tuiguang');
                 data.forEach((entity,index) => {
                     if(entity.user_type === 2) this.business.push(entity);
                     if(entity.user_type ===3 && entity.sub_type === 1) this.yiyuans.push(entity);
                     if(entity.user_type ===3 && entity.sub_type === 2) this.lianshuos.push(entity);
                     if(entity.user_type ===3 && entity.sub_type === 3) this.diantis.push(entity);
                     if(entity.user_type ===3 && entity.sub_type === 4) this.zhenshuos.push(entity);
                 })
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
    .extension-item {
        background: #fff;
        margin: .2rem .2rem 0px;
        border-radius: 5px;
        padding: .5rem .2rem;
        height: 2rem;
        display: flex;
        position: relative;
        &-img {
            width: .9rem;
            height: .9rem;
            border-radius: 100%;
        }
        &-info {
            width: 80%;
            margin-left:.24rem;
            p {
                color: #333;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &:nth-child(1) {
                    font-size: .3rem;
                }
                &:nth-child(2) {
                    font-size: .24rem;
                    margin-top: .14rem;
                    color: rgb(102,102,102);
                    span {
                        &:nth-child(2) {
                            font-size: .28rem;
                            color: rgb(51,51,51);
                            float: right;
                        }
                    }
                }
            }
        }
    }
    .p-state {
        position: absolute;
        font-size: .28rem;
        color: #f30000;
        line-height: 2;
        right: .2rem;
        top:.05rem
    }
    .scroll {
        background-color: #fff;
        margin: .2rem .2rem 0px;
        border-radius: 5px;
        margin-top: 0px;
        height: 1.7rem;
        overflow-x: scroll;
        overflow-y: hidden;
        box-shadow: 0px 0px 3px #ccc;
        &::-webkit-scrollbar
        {
            height: 0px;
            background-color: #fff;
        }

    }
    .mint-navbar {
        width: 9.3rem;
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 0px;
        color: #333;
        margin-bottom: 0;
    }
    .tag-icon {
        width: .62rem;
        height: .62rem;
        margin-bottom: .07rem;
    }
    .mint-tab-item {
        color: #7C7C7C;
    }
    */
</style>