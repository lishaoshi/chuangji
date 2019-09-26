<template>
    <div class="empty">
        <img src="../images/shopping/empty.png" width="50%">
        <p>购物车空空如也~<a @click="goBack">&nbsp;&nbsp;去购物</a></p>
    </div>
</template>

<script>
    export default {
        name: "emptyList",
    }
</script>

<style lang="scss" scoped>
    .empty {
        text-align: center;
        color: #666666;
        font-size: .25rem;
        line-height: 200%;
        padding-top: 3rem;
    }
</style>