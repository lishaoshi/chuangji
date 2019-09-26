<template>
    <div id="safeSetting">
        <clxsd-head-top :title='`安全设置`'></clxsd-head-top>
        <clxsd-cell :title="'修改支付密码'" :to="'/user/pay-password-change'" is-link/>
        <clxsd-cell :title="'修改登陆密码'" :to="'/user/login-password-change'" is-link/>
    </div>
</template>

<script>
    import ClxsdCell from '@/components/common/Cell';
    export default {
        name: "safeSetting",
        components:{
            ClxsdCell
        },
    }
</script>

<style scoped>

</style>