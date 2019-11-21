<template>
  <div class="container">
       <clxsd-head-top title='合伙收益' style="border-bottom: 0px" append="1">
            <div slot="append">
                <span @click="toRouter('/earnings-detail')" class="detail-go">明细</span>
            </div>
        </clxsd-head-top>

        <div class="content-list" v-if="list.length">
            <div class="content-list-item" v-for="(item,index) of list" :key="index">
                <div class="userInfo">
                    <img src="../../../images/my/user_default.png"/>
                    <span>{{item.real_name}}</span>
                </div>

                <div class="price">
                    <span>分佣(元)</span>
                    <span>{{item.sum}}</span>
                </div>
            </div>
        </div>
         <EmptyList v-else/>
       
  </div>
</template>

<script>
import { heHuoList } from '@/api/ticketList'
import EmptyList from "@/components/EmptyList"
export default {
    components: {
        EmptyList
    },
    data() {
        return {
            list: []
        }
    },
    created() {
        this.initData()
    },
    methods: {
        /**
         * 获取合伙收益列表
         */
        initData() {
            heHuoList().then(res=>{
                if(res&&res.data) {
                    let data = res.data
                    this.list = data
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.content-list {
    padding: 0 .2rem;
    .content-list-item {
        background: #fff;
        display: flex;
        align-items: center;
        height: 1.8rem;
        justify-content: space-between;
        margin-top: .2rem;
        border-radius:8px;
        .userInfo {
            display: flex;
            align-items: center;
            margin-left: .2rem;
            font-size: .4rem;
        }
        .price {
            display: flex;
            flex-direction: column;
            margin-right: 1.14rem;
           align-items: center;
            span:first-child {
                font-size: .26rem;
                color: #999;
            }
            span:last-child {
                 font-size: .4rem;
                color: #03AD8F;
            }
        }
    }
    img {
        width: .96rem;
        height: .96rem;
        margin-right: .24rem;
    }
}
</style>