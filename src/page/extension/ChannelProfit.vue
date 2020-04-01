<template>
    <div id="ChannelProfit">
        <clxsd-head-top title='通道收益' :append="true">
            <div slot="append">
                <section @click="to('/earnings-detail')">明细</section>
            </div>
        </clxsd-head-top>
        
        <template v-if="isApply">
            <div v-if="data && data.length && isApply">
                <div  class="detailed-item" v-for="(item, index) of list" :key="index">
                    <div>
                        <img src="../../images/default_company_logo.png" class="item-icon" />
                        <p class="title">{{item.name}}</p>
                    </div>
                    <div class="num">{{item.price}}
                        <div class="san"></div>
                    </div>
                </div>
            </div>
            <UnJurisdiction  v-else-if="data && data.length"></UnJurisdiction>
        </template>
        <!--推广人-->
       
        <become-promote class="becomePromote" v-else/>
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
    import becomePromote from "@/components/promote/becomePromotBg"
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
                    {
                        img: '',
                        name: '测试公司',
                        price: 8000.00
                    }
                ],
                CityName:null
            }
        },
        computed:{
            ...mapState({
                USER_INFO: state => state.CURRENTUSER.data,
                isApply: state => state.is_apply
            })
        },
        methods:{
            async initData(){
                _incomeDetails().then(res=>{
                    // debugger
                    let list = res.data?res.data: []

                    if(list){
                        list.forEach((item, index, arr) => {
                            let name = ''
                            let img = ""
                            if(item.type) {
                                switch (item.type) {
                                    case 'business':
                                        name = "商业"
                                        img = promoteBusiness
                                        break;
                                    case 'danti':
                                        name = "单体"
                                        img = promoteMonomer
                                        break;
                                    case 'yiyuan':
                                        name = "医院"
                                        img = promoteHospital
                                        break;
                                    case 'zhenshuo':
                                        name = "诊所"
                                        img = promoteClinic
                                        break;
                                    case 'lianshuo':
                                        name = "连锁"
                                        img = promoteMultipleShop
                                        break;
                                }
                            }
                            
                            arr[index].name = name
                            arr[index].value = parseFloat(item.value).toFixed(2)
                            arr[index].img = img
                        })
                    }
                    // debugger
                    this.data = list
                })
                // const { data } = await this.$http.get('user/profit/tongdao');
                // if(this.USER_INFO.user_type ===4 && this.USER_INFO.sub_type === 1){
                //     if(data.code){
                //         let areaEntities=null;
                //         areaData.forEach((area,key) => {
                //             if(area.code == parseInt(data.code)){
                //                 areaEntities = area;
                //             }
                //         });
                //         let entities = [];
                //         if(areaEntities !== null){
                //             areaEntities.children.forEach((entity,i) => {
                //                 if(entity.code !== (data.code+'01')) {
                //                     let value = 0;
                //                     if(data.items.length>0){
                //                         data.items.forEach((item,_i) => {
                //                             if(item.code === entity.code){
                //                                 value = item.value;
                //                             }
                //                         })
                //                     }
                //                     entities.push({
                //                         name:entity.name,
                //                         value:value,
                //                     });
                //                 }

                //             })
                //         }

                //         this.data = entities;
                //     }
                // }else{
                //     this.data = data;
                // }

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