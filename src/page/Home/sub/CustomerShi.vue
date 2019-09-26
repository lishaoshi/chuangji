<template>
    <div style="min-height: 100%;background: #f4f5f5;padding-bottom: .2rem;padding-top: .2rem">
        <clxsd-head-top :title="title"></clxsd-head-top>
        <shi-compoent></shi-compoent>
    </div>
</template>

<script>
    import ShiCompoent from "@/components/modules/Extension/CustomerShi";
    export default {
        name: "CustomerShi",
        components:{
            ShiCompoent
        },
        data(){
            return {
                title:''
            }
        },
        created(){
            this.title = this.$route.query.title ? '市级代理--'+this.$route.query.title:'市级代理'
        }
    }
</script>