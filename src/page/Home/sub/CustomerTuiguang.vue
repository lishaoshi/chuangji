<template>
    <div>
        <clxsd-head-top :title="title"></clxsd-head-top>
        <customer-tuiguang-compoent></customer-tuiguang-compoent>
    </div>
</template>

<script>
    import CustomerTuiguangCompoent from "@/components/modules/Extension/CustomerTuiguang";
    export default {
        name: "CustomerTuiguang",
        components:{
            CustomerTuiguangCompoent
        },
        data(){
            return {
                title:'推广人'
            }
        },
        created(){
            this.title = this.$route.query.title ? '推广人--' + this.$route.query.title:'推广人';
        }
    }
</script>