<template>
    <PullRefresh @refresh="refresh">
        <CircleLoading v-if="loading" />
        <Swiper space="tuiguang-city"></Swiper>
        <notice :notices="notices"></notice>
        <UnSureNav></UnSureNav>
        <div v-if="myEntities.length>0">
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
                    <div v-if="allEntities.length > 0">
                        <CustomerCell v-for="(entity, index) in allEntities" :key="`en-${index}`" :data="entity"></CustomerCell>
                    </div>
                    <EmptyList v-else></EmptyList>
                </div>
                <div v-show="Type == 2">
                    <div v-if="myEntities.length > 0">
                        <CustomerCell v-for="(entity, index) in myEntities" :key="`en-${index}`" :data="entity"></CustomerCell>
                    </div>
                    <EmptyList v-else></EmptyList>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="allEntities.length > 0">
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
    // import Notice from "@/components/modules/Extension/Notice"
    import notice from '@/components/common/notice';

    import Swiper from "@/components/common/Swiper"

    export default {
        name: "CityCustomerComponent",
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
                loading: false,
                allEntities:[],
                myEntities:[],
                Type:1,
                notices:[
                    {title:'国家食药监局：购药实名制是“无奈的决定”'},
                    {title:'药价调控针对外企 "超国民待遇"将终止？'},
                    {title:'三部委：试点县医院取消药品15%加成'},
                ]
            }
        },
        created(){
            this.getData();
        },
        methods:{
            changeType(value){
                this.Type = value
            },
            getData(callback){
                this.loading = true;
                this.$http.get('users/list',{params:{'user-type':'city'},validate: state => state === 200})
                    .then(response => {
                        console.log(response.data.data)
                        this.loading = false;
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
</style>
