<template>
    <div>
        <clxsd-head-top title='采购商'></clxsd-head-top>
        <customer-tuiguang-compoent></customer-tuiguang-compoent>
    </div>
</template>

<script>
    import CustomerTuiguangCompoent from "@/components/modules/Extension/CustomerTuiguang";
    export default {
        name: "PartnerCaiGouPage",
        components: {
            CustomerTuiguangCompoent
        },
    }
</script>