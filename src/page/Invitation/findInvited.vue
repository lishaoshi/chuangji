<template>
    <div class="container">
        <clxsd-head-top title='邀请记录'/>
        <template v-if="list.length">
            <mt-loadmore  ref="loadmore"  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="autoFill">
                <CompanyItem :list="list"/>
            </mt-loadmore>
            <div style="text-align: center;color: #999;margin:10px 0;" v-if="allLoaded">—— 没有更多啦 ——</div>

        </template>
       
        <UnJurisdiction  v-else></UnJurisdiction>
    </div>
</template>

<script>
import CompanyItem from "@/components/companyItem.vue";
import UnJurisdiction from "../../components/EmptyList";//推广人
    export default {
        data() {
            return {
                limit: 15,
                page: 1,
                allLoaded: false,
                autoFill: false,
                list: []
            }
        },
        components: {
            CompanyItem,
            UnJurisdiction
        },
        created() {
            this.initData();
        },
        methods: {
            initData(flag) {
                let params = {
                    limit: this.limit,
                    page: this.page,
                }
                this.$http.get(`users/self/`,
                {params},
                {
                validate: state => state === 200
                }).then(response => {
                    
                    let data = response.data.data;
                    let list = data.users.length>0?data.users : []
                    flag&&this.$refs.loadmore.onBottomLoaded()
                    list.forEach((item, index , target)=>{
                        target[index].name = item.supplier.short_name.split('');
                    });
                    this.list = this.list.concat(list)
                    if(list.length<=0) {
                        this.allLoaded = true
                    }
                    this.page++
                })
                .catch(error => {
                });
            },
            loadBottom() {
                this.initData(true);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
