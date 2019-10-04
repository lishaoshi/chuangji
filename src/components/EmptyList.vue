<template>
    <div class="empty">
        <svg style="width: 3rem;height: 3rem">
            <use xlink:href="#icon-empty"></use>
        </svg>
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