<template>
    <PullRefresh  @refresh="refresh">
        <CircleLoading v-if="loading" />
        <Swiper space="tuiguang-province"></Swiper>
        <div class="noticesBox">
            <notice class="noticesBox-notices" :notices="notices"></notice>
        </div>
        <UnSureNav></UnSureNav>
        <div v-if="entities.length > 0">
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
                entities:[],
                loading: false,
                 notices:[
                    {title:'卫生部拟放开药品招标“二次议价'},
                    {title:'发改委发布加强药品安全信用体系建设指导意见ssssssss'},
                    {title:'发改委要求加强药企信用监管力度'},
                ]
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
</style>