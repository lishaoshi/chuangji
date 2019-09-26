<template>
    <div id="CustomerEmpty">
        <img src="../../../images/address_empty.png">
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
        padding-top: 3rem;
        color: #7C7C7C;
        font-size: .28rem;
        line-height: 2.5;
        img {
            width: 2.4rem;
        }
    }
</style>