<template>
    <div>
        <router-link :to="{path:`/customer-tuiguang/${data.id}`,query:{title:data.display_name || data.real_name}}" class="extension-item">
            <img src="../../../images/default_company_logo.png" class="extension-item-img">
            <div class="extension-item-info">
                <p><span>{{data.display_name || data.real_name}}</span>（{{data.phone}}）</p>
                <p><span>推广数量 {{data.tuiguan_num}}</span><span>业绩金额 0</span></p>
                <p>
                    <span v-if="data.can_shangye" style="background: #ffc300">商业</span>
                    <span v-if="data.can_yiyan" style="background: #ff7612">医院</span>
                    <span v-if="data.can_lianshuo" style="background: #fa5452">连锁</span>
                    <span v-if="data.can_dianti" style="background: #2da2ff">单体药店</span>
                    <span v-if="data.can_zhenshuo" style="background: #b540ff">诊所</span>
                </p>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "ShiCell",
        props:{
            data:{},
        },
        created(){
           // console.log(this.data)
        }
    }
</script>

<style lang="scss" scoped>
    .extension-item {
        background: #fff;
        margin: .2rem .2rem 0px;
        border-radius: 5px;
        padding: .25rem .2rem;
        display: flex;
        position: relative;
        &-img {
            width: .9rem;
            height: .9rem;
            border-radius: 100%;
        }
        &-info {
            width: 80%;
            margin-left:.24rem;
            p {
                color: #333;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &:nth-child(1) {
                    font-size: .26rem;
                    color: #666;
                    span {
                        font-size: .34rem;
                        color: #333;
                        margin-right: .15rem;
                    }
                }
                &:nth-child(2) {
                    padding: .1rem 0;
                    span {
                        color: #fa5452;
                        border: 1px solid #fa5452;
                        padding: 0 .1rem;
                        font-size: .24rem;
                        border-radius: 4px;
                        margin-right: .15rem;
                        display: inline-block;
                    }
                }
                &:nth-child(3) {
                    font-size: .22rem;
                    color: rgb(102,102,102);
                    margin-top: .15rem;
                    span {
                        color: #fff;
                        border-radius: 8px;
                        line-height: 1.7;
                        min-width: .9rem;
                        padding: 0 .1rem;
                        text-align: center;
                        display: inline-block;
                        margin-right: .08rem;
                    }
                }
            }
        }
    }
    .nav-small {
        background: #fff;
        height: .8rem;
        line-height: .8rem;
        font-size: .28rem;
        padding: 0 .2rem;
        span {
            margin-right: .2rem;
        }
    }
</style>