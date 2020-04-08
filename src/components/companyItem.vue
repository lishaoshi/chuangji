<template>
    <div class="itemBox">
        <div class="item" v-for="(item, index) of list" :key="index">
            <img :src="item.supplier.img_cover" alt=""/>
            <span>{{item.supplier.name}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: ['list']
}

</script>

<style lang="scss" scoped>
.itemBox {
    .item {
        display: flex;
        // justify-content: center;
        align-items: center;
        font-size: .32rem;
        background: #fff;
        height: 1.4rem;
        border-bottom: 1px solid #E6E6E6;
        padding: 0 .24rem;
        img {
            width: .8rem;
            height: .8rem;
            margin-right: .2rem;
        }
    }
}
</style>