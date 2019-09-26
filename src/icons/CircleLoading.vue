<template>
    <div>
    <div class="c-loading">
        <svg  class="cell-icon">
            <use :xlink:href="'#icon-' + icon"/>
        </svg>
        <p>努力加载中...</p>
    </div>
    </div>
</template>

<script>
export default {
    name: 'CircleLoading',
    props: {
        icon: {
        	type:String,
        	default:()=>'loading2'
        },
    },
}
</script>

<style lang="scss" scoped>
    @-webkit-keyframes rotation{
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
    }
    .bg {
        background: #fff;
        position: fixed;
        width: 100%;
        height: 100%;
        top:0px;
        left: 0px;
        z-index: 99;

    }
.c-loading {
    display: block;
    height: 30px;
    position: fixed;
    width: 100px;
    text-align: center;
    border-radius: 100%;
    left: 50%;
    margin-left: -50px;
    top:50%;
    margin-top: -15px;
    z-index: 101;
    .cell-icon {
        width: 31px;
        height: 31px;
        -webkit-transform: rotate(360deg);
        animation: rotation 1.6s linear infinite;
        -moz-animation: rotation 1.6s linear infinite;
        -webkit-animation: rotation 1.6s linear infinite;
        -o-animation: rotation 1.6s linear infinite;
    }
    p {
        font-size: 12px;
        color: #999999;
        line-height: 2;
    }
}
</style>
