<template>
    <PullRefresh @refresh="refresh">
        <Swiper space="tuiguang-all"/>
        <Notice :entities="notices"></Notice>
        <UnSureNav type="all"></UnSureNav>
        <CircleLoading v-if="loading" />
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
    import Notice from "@/components/modules/Extension/Notice"
    import Swiper from "@/components/common/Swiper"

    export default {
        name: "AllCustomerComponent",
        components: {
            CircleLoading,
            EmptyList,
            CustomerCell,
            UnSureNav,
            Notice,
            Swiper
        },
        data(){
            return {
                entities:[],
                loading: false,
                notices:[
                    '2019年医药行业政策梳理，方法明确教我们如何在用药',
                    '重磅！国家重点监控药品目录公布',
                ]
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData(callback){
                this.loading = true;
                this.$http.get('users/list',{params:{'user-type':'all'},validate: state => state === 200})
                    .then(response => {
                        this.loading = false;
                        this.entities = response.data;
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

<style scoped>

</style>