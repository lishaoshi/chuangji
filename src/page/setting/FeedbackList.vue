<template>
    <div>
        <clxsd-head-top title='反馈记录' :goBackFnc="goBackFnc" :goBackNum="-3"></clxsd-head-top>
        <div style="padding-top: .2rem" v-if="feedList.length>0">
            <div class="main-body" ref="wrapper" style="height: 12rem">
                <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
                <div class="feed-item" v-for="(item,index) in feedList" :key="`${index}_feeditem`">
                    <p>{{item.date}}</p>
                    <div class="feed-item-user-text">
                        <img v-if="userInfo.userLogo" :src="userInfo.userLogo">
                        <img class="userImg" src="data:image/png;base64,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" v-else/>
                        <div>
                            {{item.body}}
                        </div>
                    </div>

                    <div class="feed-item-system-text" v-if="item.replied_at" >
                        <div>
                            {{item.reply_contents}}
                        </div>
                      
                        <img :src="admin_logo">
                        
                    </div>
                </div>
                </mt-loadmore>
            </div>
            <p v-if="allLoaded" class="loader-over">加载完毕</p>
        </div>
        <div v-else><Empty/></div>
    </div>
</template>

<script>
    import Empty from "@/components/EmptyList"
    import { mapState } from "vuex";
    export default {
        name: "FeedbackList",
        components:{
            Empty
        },
        data(){
            return{
                feedList:[],
                allLoaded: false, //是否自动触发上拉函数
                isAutoFill: false,
                wrapperHeight: 0,
                courrentPage: 1,
                limit:15,
                time:'',
                admin_logo:''
            }
        },
        created(){
            this.loadFrist(true);
        },
        computed:{
            ...mapState({
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER.data
                    const configInfo = state.CONFIG
                    let userLogo = ''

                    if(currentInfo.avatar!=null){
                        userLogo = currentInfo.avatar
                    }
                    return {
                        userLogo,
                    }

                },
            })
        },
        methods:{
            async _handleData(data, flag) {
                if (data) {
                    data.forEach((item, index, arr) => {
                        let time = item.created_at
                        arr[index].date = this.$moment.unix(time).format("YYYY-MM-DD")
                    })
                   !flag &&this.$refs.loadmore.onTopLoaded()
                }
            },
            goBackFnc() {},
            loadTop() {
                this.loadFrist();
            },
            // 上拉加载
            loadBottom() {
                this.loadMore();
            },
            // 下来刷新加载
            loadFrist(flag) {
                const params = {
                    page: 1,
                    limit:this.limit
                }
                this.$http.get("comments/list",{params}).then(response => {
                    // console.log(response.data.data.data)
                    this.allLoaded = false; // 可以进行上拉
                    this.feedList = response.data.data.list.data;
                    console.log(response.data.data);
                    
                    this.admin_logo = response.data.data.admin_logo
                    this._handleData(this.feedList, flag)
                    //this.$refs.loadmore.onTopLoaded();
                })
            },
            // 加载更多
            loadMore() {
                this.courrentPage++;
                const params = {
                    page: this.courrentPage,
                    limit:this.limit
                }
                this.$http.get("comments/list",{params}).then(response => {

                    // concat数组的追加
                    this.feedList = this.feedList.concat(response.data.data.data);
                    this._handleData(this.feedList)
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
    .feed-item {
        width:6.9rem;
        background:rgba(255,255,255,1);
        border-radius:.24rem;
        padding: .2rem;
        margin: 0 auto;
        margin-bottom: .2rem;
        padding-bottom: .35rem;
        p {
            font-size:.22rem;
            font-weight:400;
            color:rgba(153,153,153,1);
        }
        // div {
        //     background:rgba(245,245,245,1);
        //     font-size:.28rem;
        //     line-height: .46rem;
        //     padding: .1rem;
        //     margin-top: .2rem;
        //     span {
        //         width:.32rem;
        //         height:.32rem;
        //         line-height: .32rem;
        //         // background:rgba(45,162,255,1);
        //         border-radius:2px;
        //         color: #333;
        //         display: inline-block;
        //         text-align: center;
        //         margin-right: .1rem;
        //     }
        //     .userImg {
        //         width: .64rem;
        //         height: .64rem;
        //     }
        // }
        .feed-item-user-text,.feed-item-system-text {
            font-size: .28rem;
            // display: flex;
            img {
                display: inline-block;
                width: .64rem;
                height: .64rem; 
                border-radius: .1rem;
                vertical-align:top;
                align-self: flex-start;
            }
            div {
                display: inline-block;
                align-self: flex-start;
                padding: .15rem .19rem .16rem .17rem;
                max-width:4.86rem;
                color: #333;
                background:rgba(245,245,245,1);
                border-radius:6px;
            }
        }
        .feed-item-user-text {
            margin-top: .2rem;
            div {
                position: relative;
                text-align: justify;
                text-justify: newspaper;
                word-break: break-all;
                margin: 0  0 0 .18rem;
            &::before{
                    position: absolute;
                    display: block;
                    content: '';
                    left: -.14rem;
                    width:0;
                    height:0;
                    border-right:.15rem solid rgba(245,245,245,1);
                    border-top:.15rem solid transparent;
                    border-bottom:.15rem solid transparent;
                    
                }
            }
        }
        .feed-item-system-text {
            margin-top: .1rem;
            display: flex;
            justify-content: flex-end;
            // text-align: right;            
            div {
                position: relative;
                // text-align: right;
                text-justify: newspaper;
                word-break: break-all;
                margin: 0 .18rem 0 0;
                &::before{
                    position: absolute;
                    display: block;
                    content: '';
                    right: -.14rem;
                    width:0;
                    height:0;
                    border-left:.15rem solid  rgba(245,245,245,1);
                    border-top:.15rem solid transparent;
                    border-bottom:.15rem solid transparent;
                    
                }
            }
            img {
                display: block;
            }
        }
    }
</style>