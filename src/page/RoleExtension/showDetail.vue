<!----查看详情---->
<template>
    <div class="balance">
        <clxsd-head-top :title="title" class="top"></clxsd-head-top>
        <template v-if="!intverLList.length">
            <div class="title">
                <div v-for="(item, index) of titleList" :key="index">
                    <span>{{item}}</span>
                </div>
            </div>

            <div class="intverLList">
                <show-detail-item v-for="(item, index) of intverLList" :item=item :key="index"/>
            </div>

            <div class="echartInfo">
                <echart-info :echartsData="echartsData" :title="title"/>
            </div>
        </template>
         <!-- <div class="nomore" > -->
             <becomePromote v-else class="becomePromote_box">
                <div slot="main" class="becomePromote">
                    <img src="../../images/becomePromote2.png" alt="">
                    <div>
                        <p>
                        您还没有成为邀请{{title}}，
                        </p>
                        现在去
                        <span @click="toRouter('/customer-choose-role?type=promoter')">邀请</span>，
                        吧
                    </div>
                </div>
            </becomePromote>
         <!-- </div> -->
      
      
        
        
        </div>
</template>

<script>
import ShowDetailItem from "./showDetailItem";
import EchartInfo from "./echartInfo.vue";
import { getPormerteInfo } from "@/api/newPromerte.js";
import becomePromote from "@/components/promote/becomePromotBg";

export default {
    data() {
        return {
            title: this.$route.query.type=="factory"?"厂商对接人":"终端对接人",
            titleList: [
                '对接人',
                '厂商',
                '收益'
            ],
            intverLList: [
            ],
            echartsData: {
                numData: [],
                priceData: [],
                userName: []
            }
        }
    },
    components: {
        becomePromote
    },
    created() {
        this._getPromerteInfo();
    },
    methods: {
        async _getPromerteInfo() {
            let params = {
                role_type: this.$route.query.type=="factory"?"find_medicine":"promoter",
            }
            var { data } = await getPormerteInfo(params);
            // console.log(data)
            this.intverLList = data&&data.length>0?data:[];
            this.echartsData.numData = [];
            this.echartsData.priceData = [];
            this.echartsData.userName = [];
            this.intverLList.map((item)=>{
                this.echartsData.userName.push(item.real_name);
                this.echartsData.numData.push(item.area_user.promoter);
                this.echartsData.priceData.push(item.wallet_tran);
            });
        }
    },
    components: {
        ShowDetailItem,
        becomePromote,
        EchartInfo
    }
}
</script>

<style lang="scss" scoped>
// .nomore {
//     height: 100%;
// }
 .becomePromote_box {
    flex: 1;
    background: #fff;
    // height: 100%;
}
.title {
    display: flex;
    justify-content: space-around;
    height: .78rem;
    color: #999;
    font-size: .28rem;
    align-items: center;
}
.echartInfo {
    height: 5rem;
}
.balance {
    height: 100%;
    display:flex;
    flex-direction: column;
}
</style>