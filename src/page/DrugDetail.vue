<template>
    <div id="DrugDetail">
        <!-- <clxsd-head-top :title='`详情`'></clxsd-head-top> -->
        <!--
        <span class="collect" @click="CollectionFn()" :class="{activebtn: isFullScreen}">{{follow_info}}</span>
        -->
        <div class="headTop">
            <img class="retreat" src="../images/back.png" @click="goBack()">
            <div>
                <span :class="{active:tabIndex==0}" @click="tabIndex=0">详情</span>
                <span :class="{active:tabIndex==1}" @click="tabIndex=1">规格</span>
            </div>
        </div>
        <template v-if="tabIndex==0">
            <mt-swipe :auto="4000" style="height: 5.6rem;background: #fff;" v-if="data.imgs!=''">
                <mt-swipe-item v-for="(item,index) in data.imgs"><img :src="item.new" width="100%" height="100%"></mt-swipe-item>
            </mt-swipe>
            <mt-swipe :auto="4000" style="height: 5.6rem;background: #fff;" v-else>
                <mt-swipe-item><img :src="data.img_cover" width="100%" height="100%"></mt-swipe-item>
            </mt-swipe>
            <div class="contant">
                <div class="title">{{data.good_name}}</div>
                <p style="font-size: .2rem;color: #999;text-align: right">销量:{{data.sale_num}}</p>
            </div>
            <div class="contant">
                <div class="info">
                    <span>品 &nbsp;&nbsp;&nbsp;&nbsp; 牌</span>
                    <samp>{{name1}}</samp>
                </div>
                <div class="info">
                    <span>规 &nbsp;&nbsp;&nbsp;&nbsp; 格</span>
                    <samp>{{data.spec}}</samp>
                </div>
                <div class="info">
                    <span>效 &nbsp;&nbsp;&nbsp;&nbsp; 期</span>
                    <samp>{{time}}</samp>
                </div>
                <div class="info">
                    <span>批准文号</span>
                    <samp>{{data.approval_number}}</samp>
                </div>
            </div>
            <div class="price-flex">
                <div>
                    <p class="price"><span>￥{{data.price}}</span>
                        <small style="color: #999">/{{data.unit}}</small>
                    </p> 
                    
                    <p class="name" style="color: #999">订货价</p>
                </div>
                <div>
                    <p v-if="parseInt(data.market_price)" class="price"><span>￥{{data.market_price}}</span>
                        <small style="color: #999">/{{data.unit}}</small>
                    </p>
                    <p v-else class="price">
                        <small>暂无维护</small>
                    </p>
                    <p class="name" style="color: #999">市场价</p>
                </div>
            </div>
            <div class="trans-box">
                <div class="trans-box-box1">
                    <h2>{{data.big_unit}}</h2>
                    <p style="color: #999">大单位</p>
                </div>
                <div class="trans-box-box2">
                    <h2>{{data.tran}}</h2>
                    <p style="color: #999">转换系数</p>
                </div>
                <div class="trans-box-box1">
                    <h2>{{data.unit}}</h2>
                    <p style="color: #999">销售单位</p>
                </div>
            </div>
            <div class="price-flex">
                <div>
                    <p class="price" style="color: #333;font-size: .28rem">
                        {{parent_name?parent_name:'无'}}
                    </p>
                    <p class="name" style="color: #999">类别</p>
                </div>
                <div>
                    <p class="price" style="color: #333;font-size: .28rem">{{name2}}</p>
                    <p class="name" style="color: #999">分类</p>
                </div>
            </div>
            <div class="contant">
                <div class="info">
                    <span>添加时间</span>
                    <samp>{{creat_time}}</samp>
                </div>
                <div class="info">
                    <span>修改时间</span>
                    <samp>{{creat_time}}</samp>
                </div>
            </div>
            <div style="background: #fff;margin-top: .2rem;padding-top: .3rem">
                <p style="color:#0090FF;text-align: center;line-height: 2;font-size: .28rem">商品详情<br>|</p>
                <!-- <div class="edit-box" v-for=" (item, index) of data.imgs" :key="index">
                    <img :src="item.new" alt="">
                </div> -->
                <div class="infoDetail">
                    <div class="content" v-html="data.content"></div>
                </div>
            </div>
            <div class="bg-fade"></div>
            <div class="state" @click="changeSelf">{{info}}商品</div>
        </template>
        <div v-if="tabIndex==1">
            <specifications :data="data"/>
        </div>
        <CircleLoading v-if="loading"/>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import specifications from '@/components/common/specifications'
    import {isBusinessGoodsFollow, deleteBusinessGoodsFollow, SaveBusinessGoodsFollow} from "@/api/follow.js"

    export default {
        name: "DrugDetail",
        components: {
            specifications
        },
        data() {
            return {
                data: [],
                id: this.$route.params.id,
                time: '',
                follow_status: 0,
                follow_info: '收藏',
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
                status: 0,
                creat_time: '',
                info: '上架',
                loading: true,
                name1: '',
                name2: '',
                supplierId: 0,
                parent_name: '',
                tabIndex: 0
            }
        },
        computed: {
            ...mapState({
                USER_INFO: state => state.CURRENTUSER.data
            }),
            suppler_id() {
                return this.supplierId;
            },
        },
        created() {
            this.id = parseInt(this.$route.params.id);
            this.supplierId = parseInt(this.$route.params.supplierId);
            this._initData();
        },
        methods: {
            _handleData(data) {
                if (data.status === 1) {
                    this.info = "下架"
                } else {
                    this.info = "上架"
                }
                let defaultImgObj = {
                    new: data.cover
                }
                data.imgs.length==0?data.imgs.push(defaultImgObj):data.imgs
                // console.log(data.imgs)
                this.status = data.status
                this.name1 = data.brand.name
                this.name2 = data.category.name
                this.parent_name = data.category.parent_name
                if (data.valid_time != 0) {
                    let time = data.valid_time
                    this.time = this.$moment.unix(time).format("YYYY.MM.DD")
                }
                if (data.updated_at != 0) {
                    let time = data.updated_at
                    this.creat_time = this.$moment.unix(time).format("YYYY-MM-DD HH:MM")
                }
                this.loading = false
                return data
            },
            async _initData() {
                const {
                    data
                } = await this.$http.get(`hippo-shop/business/${this.suppler_id}/detail/${this.id}`)
                this.data = data.data
                this.data = this._handleData(this.data)
                //是否收藏
                isBusinessGoodsFollow(this.id).then(res => {
                    if (res.data.data.hasrelation) {
                        this.follow_info = "已收藏"
                        this.follow_status = 1
                    } else {
                        this.follow_info = "收藏"
                        this.follow_status = 0
                    }
                }).catch(error => {
                })
            },
            CollectionFn() {
                const params = {
                    entity_id: this.id
                }
                if (this.follow_status) {//followed
                    this.$messagebox.confirm("确定要取消收藏吗?").then(action => {
                        if (action === 'confirm') {
                            deleteBusinessGoodsFollow(this.id)
                            this.follow_info = '收藏'
                        }
                    });
                } else {
                    SaveBusinessGoodsFollow(params)
                    this.follow_info = '已收藏'
                }
                this.follow_status = !this.follow_status
            },
            changeSelf() {
                if (this.status === 1) {
                    this.$messagebox.confirm("确定要下架此商品吗?").then(action => {
                        if (action === 'confirm') {
                            this.$http.patch(`hippo-shop/business/changeStatus`, {good_id: this.id, status: 0}).then(res => {
                                this.status = 0
                                this.info = "上架"
                            }).catch(error => {
                                this.$toast("下架失败")
                            })
                        }
                    }).catch(err => err);
                } else if (this.status === 0)
                    this.$messagebox.confirm("确定要上架此商品吗?").then(action => {
                        this.$http.patch(`hippo-shop/business/changeStatus`, {good_id: this.id, status: 1}).then(res => {
                            this.status = 1
                            this.info = "下架"
                        }).catch(error => {
                            this.$toast("上架失败")
                        })
                    }).catch(err => err);

        },
    },
    }
</script>

<style lang="scss" scoped>
.infoDetail {
        background: #fff;
        padding: 0 .1rem;
        padding-bottom: 20px;
        margin-bottom: 1.1rem;
    }
    .collect {
        color: #fff;
        padding: 3px 8px;
        border-radius: 10px;
        border: 1px solid #56D9CD;
        font-size: 12px;

    }

    .contant {
        background: #fff;
        padding: 10px;
        margin-top: .2rem;
    }

    .title {
        font-size: .34rem;
        line-height: 150%;
        margin-bottom: 3px;
        margin-top: .2rem;
    }

    .info {
        font-size: .24rem;
        line-height: 180%;
        color: #666;

        span {
            color: #333;
            width: 60px;
            display: inline-block;
        }
    }
    .headTop {
        display: inline-flex;
        width: 100%;
        height: .88rem;
        align-items: center;
        background: #2DA2FF;
        padding: .2rem;
        color: #fff;
        font-size: .3rem;
        
        img {
            width: 10px;
            height: 20px;
        }
        div {
            flex:1;
            text-align: center;
            span {
                display: inline-block;
                margin-right: .32rem;
                padding-bottom: .06rem;
                &.active {
                    border-bottom: 2px solid #fff;
                    font-weight: bold;
                }
            }
        }
    }

    .price-flex {
        display: flex;
        justify-content: space-between;
        margin-top: .2rem;
        padding: .4rem 0px;
        background: #fff;

        > div {
            width: 50%;
            text-align: center;

            &:nth-child(1) {
                border-right: 1px solid #f1f1f1;
            }


            p {
                &:nth-child(1) {
                    color: #F2385A;
                    font-size: .28rem;
                    line-height: 160%;

                    small {
                        color: #666;
                        font-size: .2rem;
                    }
                }

                &:nth-child(2) {
                    color: #ccc;
                    font-size: .22rem;
                }
            }
        }
    }

    .trans-box {
        background: #fff;
        margin-top: .2rem;
        height: 1.6rem;
        justify-content: space-around;
        display: flex;
        align-items: center;

        &-box1 {
            text-align: center;

            h2 {
                font-size: .28rem;
                line-height: 2;
            }

            p {
                font-size: .20rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);
            }
        }

        &-box2 {
            text-align: center;
            width: 3rem;

            h2 {
                font-size: .28rem;
                line-height: 2;
                border-bottom: 1px solid #ccc;
            }

            p {
                font-size: .20rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);
            }
        }
    }

    .bg-fade {
        height: 1.5rem;
    }

    .state {
        background: #fff;
        border-top: 1px solid #f1f1f1;
        line-height: 1rem;
        text-align: center;
        color: #26A2FF;
        font-size: .34rem;
        position: fixed;
        width: 100%;
        bottom: 0px;
    }

    .edit-box {
        padding: .4rem .2rem;
        color: #333;
        font-size: .24rem;
        letter-spacing: 1px;
        line-height: 1.5;

        img {
            max-width: 100%;
        }
    }

    .collect {
        position: fixed;
        right: .2rem;
        line-height: .55rem;
        color: #fff;
        top: .15rem;
        background: #2891e5;
        display: inline-block;
        padding: 0 .25rem;
        border-radius: .55rem;
        border: 1px solid #42abff;
        opacity: .9;
        z-index: 9;
    }

    .activebtn {
        top: .7rem
    }
</style>

<style lang="scss">
.infoDetail {
   
    .content {
         overflow: hidden!important;
        img {
            width: 100%!important;
        }
    }
  
}
</style>