<template>
    <div>
        <clxsd-head-top title='订单'></clxsd-head-top>
        <my-order-page/>
    </div>
</template>

<script>
    import myOrderPage from '@/page/order/FactoryAllServiceOrder'
    export default {
        name: "FactoryServiceOrderManage",
        components: {
            myOrderPage
        },
    }
</script>

<style scoped>

</style>