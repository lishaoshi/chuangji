<template>
    <PullRefresh @refresh="refresh">
        <Swiper space="tuiguang-all"/>
        <Notice :entities="notices"></Notice>
        <UnSureNav type="all"></UnSureNav>
        <CircleLoading v-if="loading"/>
        <div class="main-body" ref="wrapper" style="height: auto">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                <CustomerCell v-for="(entity, index) in entities" :key="`en-${index}`" :data="entity"></CustomerCell>
            </mt-loadmore>
        </div>
        <p v-if="allLoaded" class="loader-over">加载完毕</p>
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
        data() {
            return {
                entities: [],
                loading: false,
                notices: [
                    '2019年医药行业政策梳理，方法明确教我们如何在用药',
                    '重磅！国家重点监控药品目录公布',
                ],
                allLoaded: false, //是否自动触发上拉函数
                isAutoFill: false,
                wrapperHeight: 0,
                courrentPage: 1,
                limit: 15
            }
        },
        mounted() {
            // 父控件要加上高度，否则会出现上拉不动的情况
            this.wrapperHeight =
                document.documentElement.clientHeight -
                this.$refs.wrapper.getBoundingClientRect().top;
        },
        created() {
            this.getData();
            this.loadFrist();
        },
        methods: {
            getData(callback) {
                this.loading = true;
                this.$http.get('users/list', {params: {'user-type': 'all'}, validate: state => state === 200})
                    .then(response => {
                        this.loading = false;
                        this.entities = response.data.data.allEntities
                        if (callback) callback();
                    }).catch(error => {
                    this.loading = false;
                    if (callback) callback();
                })
            },
            refresh(callback) {
                this.getData(callback);
            },
            loadTop() {
                this.courrentPage = 1
                this.loadFrist();
            },
            // 上拉加载
            loadBottom() {
                this.loadMore();
            },
            // 下来刷新加载
            loadFrist() {
                const params = {
                    page: this.courrentPage,
                    limit: this.limit
                }
                this.$http.get('users/list', {params: {'user-type': 'all'}, validate: state => state === 200}).then(response => {
                    console.log(response.data.data)
                    this.allLoaded = true; // 可以进行上拉
                    this.entities = response.data.data.allEntities
                    this.$refs.loadmore.onTopLoaded();
                })
            },
            // 加载更多
            loadMore() {
                this.courrentPage++;
                const params = {
                    page: this.courrentPage,
                    limit: this.limit
                }
                this.$http.get('users/list', {params: {'user-type': 'all'}, validate: state => state === 200}).then(response => {

                    // concat数组的追加
                    this.entities = this.entities.concat(response.data.data.allEntities);
                    if (this.courrentPage > 1) {
                        this.allLoaded = true; // 若数据已全部获取完毕
                    }

                    this.$refs.loadmore.onBottomLoaded();
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .main-body {
        /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
        overflow: scroll;
    }
</style>