<template>
    <div id="CustomerEmpty">
        <svg style="width: 3rem;height: 3rem">
            <use xlink:href="#icon-empty"></use>
        </svg>
        <p>{{message}}</p>
    </div>
</template>

<script>
    export default {
        name: "CustomerEmpty",
        props:{
            message:{
                type: String,
                default:'空空如也，快去推广！',
            }
        }
    }
</script>

<style lang="scss" scoped>
    #CustomerEmpty {
        text-align: center;
        padding-top: 2rem;
        color: #7C7C7C;
        font-size: .28rem;
        line-height: 2.5;
        img {
            width: 2.4rem;
        }
    }
</style>