<template>
    <div class="num">
        <div @click="showIntvi(0)">
            <div class="item">
                <span>{{findMedicine.num}}</span>
                <span>对接人(个)</span>
            </div>
            <div class="item">
                <span>{{findMedicine.client}}</span>
                <span>厂商(家)</span>
            </div>
            <div class="bottomBox"></div>
        </div>
        <div @click="showIntvi(1)">
             <div class="item">
                <span>{{promoter.num}}</span>
                <span>对接人(个)</span>
            </div>
            <div class="item">
                <span>{{promoter.client}}</span>
                <span>终端(家)</span>
            </div>
            <div class="bottomBox"></div>
        </div >
    </div>
</template>

<script>
import { getPromerteTotal } from "@/api/newPromerte.js";
export default {
    data() {
        return {
            promoter: {}, //推广人信息
            findMedicine: {} //找药人信息
        }
    },
    created() {
        this._getPromerteTotal();
    },
    methods: {
        showIntvi(index) {
            if(index==0) {
                this.$router.push({name: 'showInvitation', query:{type: 'factory'}});
            } else if(index==1) {
                this.$router.push({name: 'showInvitation', query:{type: 'business'}});
            }
        },
        async _getPromerteTotal() {
            var {data} = await getPromerteTotal();
            this.promoter = data.promoter;
            this.findMedicine = data.find_medicine;
        }
    }
}
</script>

<style lang="scss" scoped>
.num {
    display: flex;
    padding: .2rem;
    justify-content: space-between;
    & > div {
        background: #fff;
        display: flex;
        justify-content: space-around;
        height: 1.7rem;
        width: 48%;
        position: relative;
        box-shadow:0px 6px 12px 0px rgba(0, 0, 0, 0.2);
        border-radius:10px;
        .item {
            
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
           
            span:first-child {
                font-size: .34rem;
                font-weight: bold;
            }
            span:last-child {
                font-size: .24rem;
                color: #808080;
            }
        }
        .bottomBox {
            position: absolute;
            bottom: 0;
            left: 0;
            height: .1rem;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            width: 100%;
            background:linear-gradient(90deg,rgba(252,198,135,1),rgba(242,134,160,1));
        }
    }
}

</style>