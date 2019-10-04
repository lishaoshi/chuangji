<template>
    <div>
        <clxsd-head-top title='更新列表'></clxsd-head-top>
        <h3 class="p1">版本更新列表</h3>
        <ul class="ul">
            <li>1.版本一更新于2019.06.12</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "UpdateList"
    }
</script>

<style lang="scss" scoped>
    .p1 {
        font-size: .38rem;
        text-align: center;
        line-height: 2;
        padding-top: .4rem;
    }
    .ul {
        background: #fff;
        line-height: .88rem;
        font-size: .32rem;
        padding: 0 .2rem;
        margin-top: .3rem;
        li {
            border-bottom:1px solid #f1f1f1;
            padding-left: .1rem;
        }
    }
</style>