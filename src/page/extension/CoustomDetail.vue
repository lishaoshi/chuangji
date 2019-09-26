<template>
    <div>
        <clxsd-head-top title='客户信息'></clxsd-head-top>
        <div class="extension-item">
            <img src="" class="extension-item-img">
            <div class="extension-item-info">
                <p>河南省郑州市级分公司</p>
                <p><span>张无忌（15878986589）</span></p>
            </div>
        </div>
        <ul class="info-ul">
            <li>
                <span>权限通过时间</span>
                <smap>2019.03.12</smap>
            </li>
            <li>
                <span>公司地址</span>
                <smap>河南省郑州市金水区农业路天明路河南省郑州市金水区农业路天明路</smap>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "CoustomDetail"
    }
</script>

<style lang="scss" scoped>
    .extension-item {
        background: #fff;
        border-radius: 5px;
        padding: .45rem .2rem;
        height: 2rem;
        display: flex;
        position: relative;
        &-img {
            width: .9rem;
            height: .9rem;
            border-radius: 5px;
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
                }
                &:nth-child(2) {
                    font-size: .24rem;
                    margin-top: .14rem;
                    color: rgb(102,102,102);
                }
            }
        }
    }
    .info-ul {
        background: #fff;
        margin-top: .2rem;
        padding: 0 .2rem;
        font-size: .26rem;
        li {
            display: flex;
            align-items: center;
            line-height: 1.3;
            padding: .23rem 0;
            border-bottom: 1px solid #f1f1f1;
            span {
                display: inline-block;
                width: 30%;
                color: #ccc;
            }
            smap {
                display: inline-block;
                width: 70%;
                text-align: right;
            }
        }
    }
</style>