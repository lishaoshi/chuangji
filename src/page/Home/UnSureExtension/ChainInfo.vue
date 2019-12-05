<template>
    <div style="min-height: 100%;background: #fff" class="info">
        <clxsd-head-top title='连锁'></clxsd-head-top>
        <SearchBar v-model="search" @searchEnter="searchEnter"/>
        <div class="container" v-if="data&&data.length">
            <mt-loadmore
                :top-method="loadTop"
                :bottom-method="loadBottom"
                :bottom-all-loaded="allLoaded"
                ref="loadmore"
                :autoFill="isAutoFill"
                >
            <div style="padding-bottom: .1rem;">
                <CustomerCell v-for="(entity,index) in data" :key="`ent-${index}`" :data="entity"></CustomerCell>
            </div>
            </mt-loadmore>
        </div>
        <EmptyList v-else></EmptyList>
        <CircleLoading v-if="loading"></CircleLoading>
    </div>
</template>

<script>
    import SearchBar from "@/components/modules/Extension/ExtensionSeach";
    import CustomerCell from "@/components/modules/Extension/userList";
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
                loading: false,
                page: 1,
                limit: 10,
                allLoaded: false,
                isAutoFill: false,
                search: ''
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
           _handleAll(type){
                this.loading = true
                let params = {
                    page: this.page, 
                    limit: this.limit,
                    type: 4,
                    search: this.search
                }
                this.$http.get('users/list',{params,validate: state => state === 200})
                    .then(response => {
                        this.loading = false;
                        let data = response.data.data
                        if(this.page>1) {
                            this.data = this.data.concat(data)
                        } else {
                            this.data = response.data.data;
                        }
                        if(data.length < this.limit) {
                            this.allLoaded = true
                        }
                        switch (type) {
                            case 'bottom':
                                this.$refs.loadmore.onBottomLoaded()
                                break;
                            case 'top':
                                this.$refs.loadmore.onTopLoaded()
                                break;
                            default:
                                break;
                        }
                        this.page++
                    }).catch(error => {
                    this.loading = false
                    this.$toast(error.response.data.message)
                })
            },
            searchEnter() {
                // console.log(this.search)
                this.page = 1;
                this.allLoaded = false;
                this._handleAll();
            },
             // 上拉加载
            loadBottom() {
                this._handleAll('bottom')
            },
            loadTop() {
                this.allLoaded = false
                this.page = 1
                this._handleAll('top')
            },
        }
    }
</script>
<style lang="scss" scoped>
.info {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.container {
    overflow: auto;
    flex: 1;
    padding-bottom: .4rem;
}
</style>