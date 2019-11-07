<template>
    <div class="roleExtension">
        <mt-loadmore
            :top-method="loadTop"
            :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded"
            ref="loadmore"
            :autoFill="isAutoFill"
            >
            <CircleLoading v-if="loading" />
            <Swiper space="tuiguang-all"></Swiper>
            <div v-if="notices&&notices.length"  class="noticesBox">
                <notice class="noticesBox-notices" :notices="notices"></notice>
            </div>
            <div class="notice" v-else>
                <svg>
                    <use xlink:href="#icon-notice"/>
                </svg>
                <span style="padding-left: 5px">暂时没有消息</span>
            </div>
            <UnSureNav></UnSureNav>
            <div v-if="entities&&entities.length" style="padding-bottom: .1rem;">
                <CustomerCell v-for="(entity, index) in entities" :key="`en-${index}`" :data="entity"></CustomerCell>
            </div>
            <EmptyList v-else></EmptyList>
        </mt-loadmore>
    </div>
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
        name: "ProvinceCustomerComponent",
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
            notice,
            Swiper,
            isAutoFill: false
        },
        data(){
            return {
                entities:[],
                loading: false,
                allLoaded: false,
                page: 1,
                limit: 20,
                isAutoFill: false
            }
        },
        created(){
            this._getData();
        },
        methods:{
            
            _getData(first, type){
                let params = {
                    apply_role: 'city_company',
                    apply_sub_role: '',
                    limit: this.limit,
                    page: this.page,
                    
                }
                this.loading = true;
                this.$http.get('users/list',{params:params,validate: state => state === 200})
                    .then(response => {
                        this.loading = false;
                        if(this.page>1) {
                            this.entities = [...this.entities, ...response.data.data]
                        } else {
                            this.entities = response.data.data;
                        }
                        if(!response.data.data||response.data.data.length<this.limit) {
                            this.allLoaded = true
                        }
                        if(!first&&type=="top") {
                            this.$refs.loadmore.onTopLoaded()
                        }
                        if(!first&&type=="bottom") {
                            this.$refs.loadmore.onBottomLoaded()
                        }
                        this.page++
                    }).catch(error => {
                        this.loading = false;
                    })
            },
            // 下拉刷新
            loadTop() {
                this.allLoaded = false
                this.page = 1
                this._getData(false, 'top')
            },
            //  // 上拉加载
            loadBottom() {
            this._getData(false, 'bottom')
            },

        }
    }
</script>


<style lang="scss" scoped>
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