<template>
    <div id="CustomerAuthorization">
        <clxsd-head-top :title="'客户授权'"></clxsd-head-top>
        <SearchBar/>
        <CircleLoading v-if="loading"></CircleLoading>
        <pull-refresh class="content-container" @refresh="refresh">
            <div v-if="entities.length >0">
                <ShouItem v-for="(entity,ind) in entities"
                          :data="entity"
                          :key="ind"
                          :sureAuth="sureAuth" :delAuth="delAuth"
                />
            </div>
            <EmptyList v-else></EmptyList>
        </pull-refresh>
    </div>
</template>

<script>
    import SearchBar from "../../components/modules/Extension/ExtensionSeach";
    import ShouItem from "../../components/modules/Extension/AuthorizationCell"; //省授权
    import EmptyList from "../../components/EmptyList";
    import CircleLoading from "@/icons/CircleLoading";
    import PullRefresh from "../../components/PullRefresh";
    export default {
        name: "CustomerAuthorization",
        components: {
            PullRefresh,
            CircleLoading,
            SearchBar,
            EmptyList,
            ShouItem//市，合伙人授权
        },
        data(){
            return {
                loading: false,
                entities:[]
            }
        },
        methods:{
            getData(){
                this.loading = true;
                this.$http.get('user-empower',{
                    validate: state => state === 200
                }).then(response => {
                    this.loading = false;
                    this.entities = response.data;
                }).catch(error => {
                    this.entities = [];
                    this.loading = false;
                })
            },
            sureAuth(id) {
                this.$messagebox.confirm("确定开启权限吗?").then(action => {
                    if(action === 'confirm'){
                        this.$http.put(`user-empower/shou/${id}`)
                            .then(response =>{
                                this.loading = false;
                                this.$toast('成功授权！');
                                this.getData();
                            }).catch(error => {
                                this.loading = false;
                                this.$toast(error.response.data.message);
                            });
                    }
                }).catch(err => err);
            },
            delAuth(id) {
                this.$messagebox.confirm("确定要删除此用户吗?").then(action => {
                    if(action === 'confirm'){
                        this.$http.delete(`user-empower/shou/${id}`)
                        .then(response =>{
                            this.loading = false;
                            this.$toast('删除完成！');
                            this.getData();
                        }).catch(error => {
                            this.loading = false;
                            this.$toast(error.response.data.message);
                        });
                    }
                }).catch(err => err);
            },
            refresh(callback){
                this.getData();
                if(callback)callback();
            }
        },
        created(){
            this.getData();
        }

    }
</script>

<style lang="scss" scoped>

</style>