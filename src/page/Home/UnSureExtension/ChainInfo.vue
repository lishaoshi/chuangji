<template>
    <div style="min-height: 100%;background: #fff">
        <clxsd-head-top title='连锁'></clxsd-head-top>
        <SearchBar/>
        <div class="container">
            <div v-if="data.length">
                <CustomerCell v-for="(entity,index) in data" :key="ent-`${index}`" :data="entity"></CustomerCell>
            </div>
            <EmptyList v-else></EmptyList>
        </div>
        <CircleLoading v-if="loading"></CircleLoading>
    </div>
</template>

<script>
    import SearchBar from "@/components/modules/Extension/ExtensionSeach";
    import CustomerCell from "@/components/modules/Extension/CustomerCell";
    import CircleLoading from "@/icons/CircleLoading";
    import EmptyList from "@/components/EmptyList";

    export default {
        name: "ChainInfo",
        components: {
            SearchBar,
            CustomerCell,
            CircleLoading,
            EmptyList
        },
        data(){
            return {
                type: null,
                data:[],
                loading: false
            }
        },
        created(){
            this.type = this.$route.params.type;
        },
        mounted(){
            this.initData();
        },
        methods:{
            initData(){
                switch(this.type){
                    case "all":
                        return this._handleAll()
                        break
                    default:
                        return;

                }
            },
            _handleAll(){
                this.loading = true
                this.$http.get('users/list',{params:{'user-type':'chain'},validate: state => state === 200})
                    .then(response => {
                        this.loading = false;
                        this.data = response.data;
                    }).catch(error => {
                    this.loading = false
                    this.$toast(error.response.data.message)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>