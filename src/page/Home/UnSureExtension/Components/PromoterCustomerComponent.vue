<template>
    <PullRefresh @refresh="refresh">
        <CircleLoading v-if="loading" />
        <Swiper space="tuiguang-promoter"></Swiper>
        <!-- <notice :notices="notices"></notice> -->
        <div v-if="notices.length" class="noticesBox">
            <notice class="noticesBox-notices" :notices="notices"></notice>
        </div>
        <UnSureNav />
        <div v-if="isTabPartner">
            <ul class="mint-navbar" >
                <li @click="changeType(1)">
                    <p class="p1">
                        <svg>
                            <use :xlink:href="Type==1 ? '#icon-group-client-allCountry-1': '#icon-group-client-allCountry-0'"/>
                        </svg>
                        <span :class="Type==1 ? 'active':''">全国</span>
                    </p>
                </li>
                <li @click="changeType(2)">
                    <p class="p1">
                        <svg>
                            <use :xlink:href="Type==2 ? '#icon-group-client-my-1': '#icon-group-client-my-0'"/>
                        </svg>
                        <span :class="Type==2 ? 'active':''">我的</span>
                    </p>
                </li>
            </ul>
            <div class="container">
                <div v-show="Type == 1">
                    <div v-if="allEntities&&allEntities.length > 0">
                        <CustomerCell v-for="(entity, index) in allEntities" :key="`en-${index}`" :data="entity"></CustomerCell>
                    </div>
                    <EmptyList v-else></EmptyList>
                </div>
                <div v-show="Type == 2">
                    <div v-if="myEntities&&myEntities.length > 0">
                        <CustomerCell v-for="(entity, index) in myEntities" :key="`en-${index}`" :data="entity"></CustomerCell>
                    </div>
                    <EmptyList v-else></EmptyList>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="allEntities&&allEntities.length > 0">
                <CustomerCell v-for="(entity, index) in allEntities" :key="`en-${index}`" :data="entity"></CustomerCell>
            </div>
            <EmptyList v-else></EmptyList>
        </div>
    </PullRefresh>
</template>

<script>
    import CustomerCell from "@/components/modules/Extension/CustomerCell";
    import EmptyList from "@/components/EmptyList";
    import CircleLoading from "@/icons/CircleLoading";
    import UnSureNav from "./UnSureNav";
    import { mapState } from "vuex";
    // import Notice from "@/components/modules/Extension/Notice"
    import notice from '@/components/common/notice';

    import Swiper from "@/components/common/Swiper"

    export default {
        name: "PromoterCustomerComponent",
        components: {
            CircleLoading,
            EmptyList,
            CustomerCell,
            UnSureNav,
            // Notice,
            notice,
            Swiper
        },
        data(){
            return {
                allEntities:[],
                myEntities:[],
                loading: false,
                Type:1,
                notices:[
                   {title:'发改委要求加强药企信用监管力度'},
                    {title:'国家食药监局：购药实名制是“无奈的决定”'},
                    {title:'新一轮药品降价潮倒逼药企转型升级'}
                ]
            }
        },
        created(){
            this.getData();
        },
        computed: {
            ...mapState({
                USER_INFO: state => state.CURRENTUSER.data
            }),
            isTabPartner() {
                return this.USER_INFO.status === 1 && (
                    this.USER_INFO.sub_type === 1 ||
                    this.USER_INFO.sub_type === 2 ||
                    this.USER_INFO.sub_type === 3);
            },
        },
        methods:{
            changeType(value){
                this.Type = value
            },
            getData(callback){
                this.loading = true;
                this.$http.get('users/list',{params:{'user-type':'promoter'},validate: state => state === 200})
                    .then(response => {
                        this.loading = false;
                        // this.allEntities = response.data.data.allEntities;
                        // this.myEntities = response.data.data.myEntities;
                        this.allEntities = response.data.data;
                        this.myEntities = response.data.data;
                        if(callback)callback();
                    }).catch(error => {
                    this.loading = false;
                    if(callback)callback();
                })
            },
            refresh(callback){
                this.getData(callback);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        padding-bottom: .5rem;
    }
    .mint-navbar {
        width: 50%;
        margin-left: .2rem;
        margin-top: .1rem;
        margin-bottom: .05rem;
        li {
            margin-right: .6rem;
        }
    }
    .p1 {
        display: flex;
        height: .5rem;
        align-items: center;
        svg {
            width: .38rem;
            height: .38rem;
        }
        span {
            margin-left: .15rem;
            font-size: .32rem;
            color: #999999;
        }
        .active {
            color: #333;
        }
    }
    .empty {
        padding-top: 1rem;
    }
    .noticesBox {
        margin:  .22rem auto 0;
        width:6.86rem;
        .noticesBox-notices {
            height: .64rem;
            line-height: .64rem;
        }
    }
</style>