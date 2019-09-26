<template>
    <div>
        <router-link :to="{path:`/customer-tuiguang/${data.id}`,query:{title:data.display_name || data.real_name}}" class="extension-item">
            <img src="../../../images/hospital@2x.png" class="extension-item-img1" v-if="data.sub_type ===1">
            <img src="../../../images/multiple@2x.png" class="extension-item-img1" v-if="data.sub_type ===2">
            <img src="../../../images/monomer@2x.png" class="extension-item-img1" v-if="data.sub_type ===3">
            <img src="../../../images/clinic@2x.png" class="extension-item-img1" v-if="data.sub_type ===4">
            <p class="p-state">待获得</p>
            <img src="../../../images/default_company_logo.png" class="extension-item-img">
            <div class="extension-item-info">
                <p>河南省郑州市级分公司</p>
                <p><span>{{data.display_name || data.real_name}}（{{data.phone}}）</span><span>业绩金额90万</span></p>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "TuiguangCell",
        props:{
            data:{},
        }
    }
</script>

<style lang="scss" scoped>
    .extension-item {
        background: #fff;
        margin: .2rem .2rem 0px;
        border-radius: 5px;
        padding: .55rem .2rem .4rem;
        height: 2rem;
        display: flex;
        position: relative;
        &-img {
            width: .9rem;
            height: .9rem;
            border-radius: 100%;
        }
        &-img1 {
            position: absolute;
            width: .7rem;
            height: .7rem;
            top:0px;
            left: 0px;
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
                    font-size: .3rem;
                    margin-top: .04rem;
                    line-height: 1.5;
                }
                &:nth-child(2) {
                    font-size: .24rem;
                    margin-top: .1rem;
                    color: rgb(102,102,102);
                    span {
                        &:nth-child(2) {
                            font-size: .28rem;
                            color: rgb(51,51,51);
                            float: right;
                        }
                    }
                }
            }
        }
    }
    .p-state {
        position: absolute;
        font-size: .28rem;
        color: #f30000;
        line-height: 2;
        right: .2rem;
        top:.05rem
    }
</style>