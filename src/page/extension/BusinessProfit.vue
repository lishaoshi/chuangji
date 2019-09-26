<template>
    <div>
        <clxsd-head-top title='业务收益'></clxsd-head-top>
        <SearchBar></SearchBar>

        <div class="content-container" style="overflow-y:scroll;">
        <ClxsdLoadMore key="profit-tongdao-list"
                       ref="loadmore"
                       @onRefresh="onRefresh"
                       @onLoadMore="onLoadMore">
            <div class="profit-tongdao-list" v-if="entities.length >0">
                <div class="business-item" v-for="(entity,index) in entities" :key="`bus-${index}`">
                    <div class="left">
                        <div class="detail">
                            <img :src="entity.avatar" v-if="entity.avatar">
                            <img src="../../images/my/user_default.png" />
                            <div>
                                <p>{{entity.to_user.display_name || entity.to_user.real_name }}</p>
                                <p>{{entity.to_user.phone}}</p>
                            </div>
                        </div>
                        <p class="gray">授权时间：2018.03.12</p>
                    </div>
                    <div class="right">
                        <p class="title">推广收益</p>
                        <p class="red">{{entity.value | display_price}}</p>
                        <p class="title" style="margin-top: .1rem">推广类型</p>
                        <p class="red" style="font-size: .22rem" v-if="entity.to_user.user_type===4 && entity.to_user.sub_type ===1">省公司</p>
                        <p class="red" style="font-size: .22rem" v-if="entity.to_user.user_type===4 && entity.to_user.sub_type ===2">市公司</p>
                        <p class="red" style="font-size: .22rem" v-if="entity.to_user.user_type===4 && entity.to_user.sub_type ===3">合伙人</p>
                        <p class="red" style="font-size: .22rem" v-if="entity.to_user.user_type===4 && entity.to_user.sub_type ===4">推广人</p>
                        <p class="red" style="font-size: .22rem" v-if="entity.to_user.user_type===2">商业公司</p>
                        <p class="red" style="font-size: .22rem" v-if="entity.to_user.user_type===3 && entity.to_user.sub_type ===1">医院</p>
                        <p class="red" style="font-size: .22rem" v-if="entity.to_user.user_type===3 && entity.to_user.sub_type ===2">连锁</p>
                        <p class="red" style="font-size: .22rem" v-if="entity.to_user.user_type===3 && entity.to_user.sub_type ===3">单体药店</p>
                        <p class="red" style="font-size: .22rem" v-if="entity.to_user.user_type===3 && entity.to_user.sub_type ===4">诊所</p>
                    </div>
                </div>
            </div>
            <empty-list v-else message="您还没有业务收益!"></empty-list>
        </ClxsdLoadMore>
        </div>
    </div>
</template>

<script>
    import SearchBar from "../../components/modules/Extension/ExtensionSeach";
    import EmptyList from "../../components/EmptyList";
    export default {
        name: "BusinessProfit",
        components: {
            SearchBar,
            EmptyList,
        },
        data(){
            return {
                selected: '1',
                page:1,
                entities:[],
            }
        },
        methods:{
            onRefresh(){
                this.page = 1
                this.getData();
            },
            getData(loadMore=false){
                const options = {
                    page: this.page,
                    limit: 15,
                };
                this.$http.get('user/profit/yewu',{
                    params:options,
                    validateStatus: s => s === 200
                }).then(response=> {
                    if(loadMore){
                        this.entities = [...this.entities,...response.data]
                    }else{
                        this.entities = response.data
                    }
                    this.page = this.page + 1
                    this.$refs.loadmore.afterLoadMore(response.data.length < options.limit)
                    if(options.callback){
                        options.callback()
                    }

                }).catch(error =>{

                });

            },
            onLoadMore(){
                this.getData(true)
            }
        }

    }
</script>

<style lang="scss" scoped>
    .business-item {
        display: flex;
        background: #fff;
        margin: .2rem .2rem 0;
        border-radius: 5px;
        padding: .3rem .2rem;
        .left {
            width: 70%;
            .detail {
                display: flex;
                padding-top: .05rem;
                img {
                    width: .8rem;
                    height: .8rem;
                    border-radius: 100%;
                }
                div {
                    margin-left: .2rem;
                    width: 3.4rem;
                    p {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: hidden;
                        font-size: .28rem;
                    }
                }
            }
            .gray {
                color: #ccc;
                margin-top: .25rem;
            }
        }
        .right {
            width: 28%;
            border-left: 1px solid #f1f1f1;
            text-align: center;
            .title {
                color: #333;
                font-size: .26rem;
            }
            .red {
                color: rgb(250,84,82);
                font-size: .22rem;
            }
        }
    }
    .un-business-item {
        display: flex;
        background: #fff;
        margin: .2rem .2rem 0;
        border-radius: 5px;
        padding: .3rem .2rem;
        .img {
            width: 1rem;
            height: 1rem;
            border-radius: 100%;
        }
        div {
            margin-left: .2rem;
            width: 75%;
            p {
                &:nth-child(1) {
                    font-size: .28rem;
                    line-height: 2;
                    span {
                        font-size: .24rem;
                    }
                }
                &:nth-child(2) {
                    line-height: 1.5;
                    color: #7C7C7C;
                    font-size: .26rem;
                }
            }
        }
    }
</style>