<template>
    <div id="ChannelProfit">
        <clxsd-head-top title='通道收益'></clxsd-head-top>
        <!--省公司-->
        <div v-if="data &&  USER_INFO.sub_type === 1">
            <div class="profit-list" v-for="(entity,i) in data" :key="`s-${i}`">
                <div class="name">
                    <span>{{entity.name | filter_city_name}}</span>市
                </div>
                <div class="num">
                    <p>收益(贝)</p>
                    <p>{{entity.value | display_price }}</p>
                </div>
            </div>
        </div>
        <!--合伙人-->
        <div v-if="data && USER_INFO.sub_type === 3">
            <div class="detailed-item">
                <img src="../../images/extension/promote-promoter.png" class="item-icon" />
                <p class="title">推广人</p>
                <div class="num">
                    <p>收益(贝)</p>
                    <p>{{data.tuiguang | display_price }}</p>
                </div>
            </div>
            <div class="detailed-item">
                <img src="../../images/extension/promote-business.png" class="item-icon" />
                <p class="title">商业</p>
                <div class="num">
                    <p>收益(贝)</p>
                    <p>{{data.business | display_price }}</p>
                </div>
            </div>
            <div class="detailed-item">
                <img src="../../images/extension/promote-hospital.png" class="item-icon" />
                <p class="title">医院</p>
                <div class="num">
                    <p>收益(贝)</p>
                    <p>{{data.yiyuan | display_price }}</p>
                </div>
            </div>
            <div class="detailed-item">
                <img src="../../images/extension/promote-multiple-shop.png" class="item-icon" />
                <p class="title">连锁店</p>
                <div class="num">
                    <p>收益(贝)</p>
                    <p>{{data.lianshuo | display_price }}</p>
                </div>
            </div>
            <div class="detailed-item">
                <img src="../../images/extension/promote-monomer.png" class="item-icon" />
                <p class="title">单体</p>
                <div class="num">
                    <p>收益(贝)</p>
                    <p>{{data.dianti | display_price }}</p>
                </div>
            </div>
            <div class="detailed-item">
                <img src="../../images/extension/promote-clinic.png" class="item-icon" />
                <p class="title">诊所</p>
                <div class="num">
                    <p>收益(贝)</p>
                    <p>{{data.zhenshuo | display_price }}</p>
                </div>
            </div>
        </div>
        <!--推广人-->
        <div v-if="data && USER_INFO.sub_type === 4">
            <div class="detailed-item">
                <img src="../../images/extension/promote-business.png" class="item-icon" />
                <p class="title">商业</p>
                <div class="num">
                    <p>收益(贝)</p>
                    <p>{{data.business | display_price }}</p>
                </div>
            </div>
            <div class="detailed-item">
                <img src="../../images/extension/promote-hospital.png" class="item-icon" />
                <p class="title">医院</p>
                <div class="num">
                    <p>收益(贝)</p>
                    <p>{{data.yiyuan | display_price }}</p>
                </div>
            </div>
            <div class="detailed-item">
                <img src="../../images/extension/promote-multiple-shop.png" class="item-icon" />
                <p class="title">连锁店</p>
                <div class="num">
                    <p>收益(贝)</p>
                    <p>{{data.lianshuo | display_price }}</p>
                </div>
            </div>
            <div class="detailed-item">
                <img src="../../images/extension/promote-monomer.png" class="item-icon" />
                <p class="title">单体</p>
                <div class="num">
                    <p>收益(贝)</p>
                    <p>{{data.dianti | display_price }}</p>
                </div>
            </div>
            <div class="detailed-item">
                <img src="../../images/extension/promote-clinic.png" class="item-icon" />
                <p class="title">诊所</p>
                <div class="num">
                    <p>收益(贝)</p>
                    <p>{{data.zhenshuo | display_price }}</p>
                </div>
            </div>
        </div>
        <UnJurisdiction  v-if=" USER_INFO.sub_type === 0"></UnJurisdiction>
    </div>
</template>

<script>
    import areaData from "@/plugins/json/pca-code.json";
    import UnJurisdiction from "../../components/EmptyList";//推广人

    import { mapState } from "vuex";
    export default {
        name: "ChannelProfit",
        components:{
            UnJurisdiction
        },
        data(){
            return {
                role:'shengdaili',
                data:null,
                CityName:null
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
                if(this.USER_INFO.user_type ===4 && this.USER_INFO.sub_type === 1){
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
            //let str = this.data.entity.name
            //let name = str.slice(0,str.length-1);
           // this.CityName = name
            //console.log(this.CityName)
        }

    }
</script>

<style lang="scss" scoped>
    #ChannelProfit {
        padding-bottom: .2rem;
    }
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
                    color: #03ad8f;
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
        justify-content: space-between;
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
            p {
                &:nth-child(1) {
                    font-size: .26rem;
                    color: rgb(153,153,153);
                }
                &:nth-child(2) {
                    font-size: .36rem;
                    line-height: 1;
                    color: #03ad8f;
                    font-weight: bold;
                    margin-top: .15rem;
                }
            }
        }
    }
</style>