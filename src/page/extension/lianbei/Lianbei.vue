<template>
    <div>
        <clxsd-head-top title='我的联贝' style="border-bottom: 0px" append="1">
            <div slot="append">
                <span @click="toRouter('/lianbei-detail')" class="detail-go">明细</span>
            </div>
        </clxsd-head-top>
        <div class="top">
            <p class="title">当前持有（贝）</p>
            <p>{{ balance | display_price }}</p>
        </div>
        <div style="margin-top: .2rem">
            <clxsd-cell :title="'转账'" :to="'/transfer-accounts'" is-link icon="promote-cell-transferAccounts"/>
        </div>
    </div>
</template>

<script>
    import ClxsdCell from '@/components/common/Cell';
    export default {
        name: "Lianbei",
        components: {
            ClxsdCell
        },
        data(){
            return {
                balance:0.00
            }
        },
        created(){
            this.initData();
        },
        methods:{
            initData(){
                this.$http.get('lianbei/info')
                    .then(response => {
                    const { data } = response;
                    if(data){
                        this.balance = data.value;
                    }
                }).catch(err => {

                })
            },
            df(){
                console.log(12)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .top {
        background: #26a2ff;
        text-align: center;
        color: #fff;
        font-size: .64rem;
        padding-top: .6rem;
        padding-bottom: 1rem;
        .title {
            opacity: .6;
            font-size: .26rem;
            margin-bottom: .1rem;
        }
    }
    .detail-go {
        font-size: .28rem;
        color: #fff;

    }
</style>