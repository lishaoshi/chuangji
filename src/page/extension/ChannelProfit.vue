<template>
    <div id="ChannelProfit">
        <clxsd-head-top :title='title' :append="true">
            <div slot="append">
                <section @click="to('/earnings-detail')">明细</section>
            </div>
        </clxsd-head-top>
        
        <template>
            <div v-if="data && data.length">
                <div  class="detailed-item" v-for="(item, index) of list" :key="index">
                    <div>
                        <img :src="item.from_user.supplier.img_cover" class="item-icon" />
                        <p class="title">{{item.from_user.supplier.name}}</p>
                    </div>
                    <div class="num">{{item.total_sum}}
                        <div class="san"></div>
                    </div>
                </div>
            </div>
            <UnJurisdiction  v-else></UnJurisdiction>
        </template>
        <!--推广人-->
       
        <!-- <become-promote class="becomePromote" v-else/> -->
    </div>
</template>

<script>
    import areaData from "@/plugins/json/pca-code.json";
    import UnJurisdiction from "../../components/EmptyList";//推广人
    import { _incomeDetails } from "@/api/promotes"
    import { mapState } from "vuex";
    import promoteBusiness from "../../images/extension/promote-business.png"
    import promoteMonomer from "../../images/extension/promote-monomer.png"
    import promoteHospital from "../../images/extension/promote-hospital.png"
    import promoteClinic from "../../images/extension/promote-clinic.png"
    import promoteMultipleShop from "../../images/extension/promote-multiple-shop.png"
    import becomePromote from "@/components/promote/becomePromotBg";
    import { getClientDetail } from "@/api/newPromerte.js";
    export default {
        name: "ChannelProfit",
        components:{
            UnJurisdiction,
            becomePromote
        },
        data(){
            return {
                role:'shengdaili',
                data:null,
                list: [
                ],
                CityName:null,
            }
        },
        computed:{
            ...mapState({
                USER_INFO: state => state.CURRENTUSER.data,
                // isApply: state => state.is_apply,
                title: state=>state.CURRENTUSER.data.area_user&&state.CURRENTUSER.data.area_user.apply_role=="find_medicine"?"厂商分润":"终端分润",
            }),
            
        },
        methods:{
            async initData(){
                getClientDetail().then(res=>{
                    let list = res.data?res.data: [];
                    this.data = list
                })

            },
             to(path) {
                if (path) {
                    this.$router.push({path})
                }
            },
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
        display: flex;
        flex-direction: column;
        height: 100%;;
    }
    .becomePromote {
        flex: 1;
        background: #fff;
    }
    .detailed-item {
        background: #fff;
        border-radius: 5px;
        border:1px solid #f1f1f1;
        display: flex;
        padding: .2rem .2rem;
        align-items: center;
        justify-content: space-between;
        div:first-of-type {
            display: flex;
            align-items: center;
        }
        .item-icon {
            width: 1.1rem;
            height: 1.1rem;
            margin-right: .2rem;
        }
        .title {
            font-size: .4rem;
            color: #333;
        }
          .num{
                 font-size: .36rem;
                line-height: 1;
                color: #03ad8f;
                font-weight: bold;
                display: flex;
                align-items: center;
               
            }
             .san {
                    display: block;
                    width: 10px;
                    height: 10px;
                    border-top: 2px solid #C7C7CC;
                    border-right: 2px solid #C7C7CC;
                    transform:rotate(45deg);
                    margin-left: .2rem;
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