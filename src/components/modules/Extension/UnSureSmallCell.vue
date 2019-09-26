<template>
    <div class="extension-item">
        <div class="name">
            <img src="../../../images/default.png" class="img1">
        </div>
        <div class="datail-info">
            <div>
                <b>{{data.real_name || data.name}}</b>
            </div>
        </div>
        <p class="company-name">{{data.location || '中国'}}</p>
    </div>
</template>

<script>
    export default {
        name: "UnSureSmallCell",
        props:{
            data:Object,
        },

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
        width: 21%;
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
            width: 60%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .company-name {
            width: 27%;
            font-size: .3rem;
            text-align: right;
            color: #666;
            margin-top: 1rem;
        }
    }

</style>