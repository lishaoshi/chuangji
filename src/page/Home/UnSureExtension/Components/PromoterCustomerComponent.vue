<template>
    <!-- <PullRefresh @refresh="refresh"> -->
    <div class="roleExtension">
        <mt-loadmore
            :top-method="loadTop"
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            ref="loadmore"
            :autoFill="isAutoFill"
            >
        <CircleLoading v-if="loading" />
        <Swiper space="tuiguang-promoter"></Swiper>
        <!-- <notice :notices="notices"></notice> -->
        <div v-if="notices&&notices.length" class="noticesBox">
            <notice class="noticesBox-notices" :notices="notices"></notice>
        </div>
        <div class="notice" v-else>
            <svg>
                <use xlink:href="#icon-notice"/>
            </svg>
            <span style="padding-left: 5px">暂时没有消息</span>
        </div>
        <!-- <UnSureNav /> -->
        <div>
            <div class="container">
                <div v-if="allEntities&&allEntities.length > 0">
                    <CustomerCell v-for="(entity, index) in allEntities" :key="`en-${index}`" :data="entity"></CustomerCell>
                </div>
                <EmptyList v-else></EmptyList>
            </div>
        </div>
        </mt-loadmore>
    </div>
    <!-- </PullRefresh> -->
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
        props: {
            notices: {
                type: Array,
                default: ()=>{
                    return [] 
                }
            }
        },
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
                allLoaded: false,
                isAutoFill: false,
                limit: 10,
                page: 1
                // notices:this.$props.noticeList || []
            }
        },
        created(){
            this.getData();
        },
        watch: {
            Type(newValue) {
                // if(newVa)
                // debugger
                this.getData()
            }
        },
        computed: {
            ...mapState({
                USER_INFO: state => state.CURRENTUSER.data
            }),
        },
        methods:{
            changeType(value){
                this.page = 1
                this.Type = value
            },
            getData(first, type){
                let params = {
                    apply_role: 'promoter',
                    apply_sub_role: '',
                    limit: this.limit,
                    page: this.page,
                    // type: this.Type-1
                }
                this.loading = true;
                this.$http.get('users/list',{params:params,validate: state => state === 200})
                    .then(response => {
                        this.loading = false;
                        let list = response.data.data
                        if(!list || list.length<this.limit) {
                            this.allLoaded = true
                        }
                        if(this.page>1) {
                            this.allEntities = [... this.allEntities, ...list]
                        } else {
                            this.allEntities = list
                        }
                        this.page++
                        if(!first&&type=="top") {
                            this.$refs.loadmore.onTopLoaded()
                        }
                        if(!first&&type=="bottom") {
                            this.$refs.loadmore.onBottomLoaded()
                        }
                    }).catch(error => {
                    this.loading = false;
                })
            },
             // 下拉刷新
            loadTop() {
                this.allLoaded = false
                this.page = 1
                this.getData(false, 'top')
            },
            //  // 上拉加载
            loadBottom() {
            this.getData(false, 'bottom')
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
        margin-top: .5rem;
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
    .notice {
        margin:  .22rem auto 0;
        width:6.86rem;
        background: #f9f9f9;
        line-height: .56rem;
        display: flex;
        padding: 0 .24rem;
        align-items: center;
        height: .64rem;
        .notice-list {
          width: 6.2rem;
          height: .88rem;
          overflow-y: hidden;
          margin-left: .1rem;
          a {
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: .24rem;
            line-height: .64rem;
            color: #333;
          }
        } 
        svg {
          width: .38rem;
          height: .38rem;
        }
    }
</style>