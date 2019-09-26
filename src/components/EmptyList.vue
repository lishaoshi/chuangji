<template>
    <div class="empty">
        <img src="../images/address_empty.png" width="45%">
        <p>{{message}}-</p>
    </div>
</template>

<script>
    export default {
        name: "emptyList",
        props:{
            message:{
                type: String,
                default:'没有数据哦-'
            },
        }
    }
</script>

<style lang="scss" scoped>
    .empty {
        text-align: center;
        color: #666666;
        font-size: .25rem;
        line-height: 300%;
        padding-top: 3rem;
    }
</style>