<template>
    <div id="ChannelProfit">

    </div>
</template>

<script>
    import areaData from "@/plugins/json/pca-code.json";

    import { mapState } from "vuex";
    export default {
        name: "ChannelProfit",
        components:{
            ProfitComponent
        },
        data(){
            return {
                role:'shengdaili',
                data:null,
            }
        },
        computed:{
            ...mapState({
                USER_INFO: state => state.CURRENTUSER
            })
        },
        methods:{
            async initData(){
                const { data } = await this.$http.get('user/profit/tongdao');
                if(this.USER_INFO.sub_type === 1){
                    if(data.code){
                        let areaEntities=null;
                        areaData.forEach((area,key) => {
                            if(area.code == parseInt(data.code)){
                                areaEntities = area;
                            }
                        });
                        let entities = [];
                        if(areaEntities !== null){
                            areaEntities.children.forEach((entity,i) => {
                                if(entity.code !== (data.code+'01')) {
                                    let value = 0;
                                    if(data.items.length>0){
                                        data.items.forEach((item,_i) => {
                                            if(item.code === entity.code){
                                                value = item.value;
                                            }
                                        })
                                    }
                                    entities.push({
                                        name:entity.name,
                                        value:value,
                                    });
                                }

                            })
                        }

                        this.data = entities;
                    }
                }else{
                    this.data = data;
                }

            }
        },
        created(){
            this.initData();
        }

    }
</script>

<style lang="scss" scoped>
    .detailed-item {
        margin: .1rem .2rem;
        background: #fff;
        border-radius: 5px;
        border:1px solid #f1f1f1;
        display: flex;
        padding: .35rem .2rem;
        align-items: center;
        justify-content: space-around;
        .item-icon {
            width: 1.1rem;
            height: 1.1rem;
        }
        .title {
            font-size: .4rem;
            color: #333;
        }
        .num {
            text-align: center;
            margin-left: 30%;
            width: 30%;
            p {
                &:nth-child(1) {
                    font-size: .26rem;
                    color: rgb(153,153,153);
                }
                &:nth-child(2) {
                    font-size: .36rem;
                    line-height: 1;
                    color: rgb(250,84,82);
                    font-weight: bold;
                    margin-top: .15rem;
                }
            }
        }
    }
    .profit-list {
        margin: .2rem .2rem 0;
        background: #fff;
        border-radius: 5px;
        border:1px solid #f1f1f1;
        display: flex;
        padding: .4rem .2rem;
        align-items: center;
        .name {
            font-size: .24rem;
            color: #333;
            span {
                font-size:  .4rem;
                font-weight: bold;
            }
        }
        .num {
            text-align: center;
            margin-left: 54%;
            width: 30%;
            p {
                &:nth-child(1) {
                    font-size: .26rem;
                    color: rgb(153,153,153);
                }
                &:nth-child(2) {
                    font-size: .36rem;
                    line-height: 1;
                    color: rgb(250,84,82);
                    font-weight: bold;
                    margin-top: .15rem;
                }
            }
        }
    }
</style>