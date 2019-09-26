<template>
    <div>
        <div class="extension-item">
            <div class="name">
                <img src="../../../images/default.png" class="img1">
            </div>
            <div class="datail-info">
                <div>
                    <b>张无忌</b>
                </div>
            </div>
            <p class="company-name">15965878548</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UnSureHehuoCell"
    }
</script>

<style lang="scss" scoped>
    .extension-item {
        background: #fff;
        margin: .2rem .2rem 0px;
        border-radius: 5px;
        padding: .34rem .2rem;
        height: 2rem;
        display: flex;
        position: relative;
        align-items: center;
        box-shadow: 0px 0px 4px #ccc;
        .name {
            font-size: .32rem;
            color: #0090ff;
            font-weight: bold;
            width: 26%;
            padding-left: 1%;
            .img1 {
                width: .96rem;
                height: .96rem;
                border-radius: 100%;
            }
            span {
                font-size: .4rem;
            }
        }
        .datail-info {
           font-size: .34rem;
            width: 59%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .company-name {
            font-size: .3rem;
            color: #666;
            margin-top: .1rem;
        }
    }
    .icon-tag {
        position: absolute;
        width: 1.14rem;
        height: 0.95rem;
        top:0rem;
        right: .15rem;
    }
</style>