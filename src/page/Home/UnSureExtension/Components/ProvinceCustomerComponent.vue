<template>
    <PullRefresh  @refresh="refresh">
        <CircleLoading v-if="loading" />
        <Swiper space="tuiguang-all"></Swiper>
        <div v-if="notices.length"  class="noticesBox">
            <notice class="noticesBox-notices" :notices="notices"></notice>
        </div>
        <div class="notice" v-else>
            <svg>
                <use xlink:href="#icon-notice"/>
            </svg>
            <span style="padding-left: 5px">暂时没有消息</span>
        </div>
        <UnSureNav></UnSureNav>
        <div v-if="entities&&entities.length">
            <CustomerCell v-for="(entity, index) in entities" :key="`en-${index}`" :data="entity"></CustomerCell>
        </div>
        <EmptyList v-else></EmptyList>
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
            Swiper
        },
        data(){
            return {
                entities:[],
                loading: false,
                // notices:this.$props.noticeList || []
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData(callback){
                this.loading = true;
                this.$http.get('users/list',{params:{'user-type':'province'},validate: state => state === 200})
                    .then(response => {
                        this.loading = false;
                        console.log(response);
                        
                        this.entities = response.data.data;
                        
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