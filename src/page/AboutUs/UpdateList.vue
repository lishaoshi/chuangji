<template>
    <div style="min-height: 100%;background: #fff">
        <clxsd-head-top title='更新列表'></clxsd-head-top>
        <h3 class="p1">V1.0.0本次更新内容</h3>
        <p class="p2">2019.10.04</p>
        <ol class="ul">
            <li>本次更新修改了多处bug</li>
            <li>本次更新修改了多处bug</li>
            <li>本次更新将首页的内容进行了重新的规划，添加了用   户更想了解的内容</li>
            <li>本次更新将首页的内容进行了重新的规划，添加了用   户更想了解的内容</li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: "UpdateList"
    }
</script>

<style lang="scss" scoped>
    .p1 {
        text-align: center;
        font-size:.36rem;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
        padding-top: .5rem;
    }
    .p2 {
        margin-top: .2rem;
        font-size:.24rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(153,153,153,1);
        text-align: center;
    }
    .ul {
        background: #fff;
        font-size: .28rem;
        padding: 0 .5rem;
        margin-top: .3rem;
        li {
            padding-left: .1rem;
            line-height: 1.5;
            padding-top: .1rem;
            padding-bottom: .1rem;
            list-style-type: decimal ;
        }
    }
</style>