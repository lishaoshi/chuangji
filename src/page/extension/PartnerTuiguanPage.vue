<template>
    <div>
        <clxsd-head-top title='推广人'></clxsd-head-top>
        <div v-if="entities.length>0">
            <ClxsdShiCell :data="entity" v-for="(entity,index) in entities" :key="`entity_${index}`"/>
        </div>
        <empty-list v-else></empty-list>
    </div>
</template>

<script>
    import EmptyList from "@/components/EmptyList";
    import ClxsdShiCell from "@/components/modules/Extension/ShiCell"
    export default {
        name: "PartnerTuiguanPage",
        components: {
            EmptyList,
            ClxsdShiCell
        },
        data(){
            return {
                entities:[]
            }
        },
        methods:{
            async initData(){
                const { data } = await  this.$http.get('/area-user/hehuo');
                let tuiSize =0;
                data.forEach((item,index) => {
                    if(item.user_type === 4){
                        tuiSize++;
                    }
                });
                this.tuiSize = tuiSize;
                this.caiSize = data.length - tuiSize;
                this.entities = data;
            }
        }
    }
</script>