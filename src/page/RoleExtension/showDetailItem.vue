<template>
    <div class="item">
        <div>
            <img src="../../images/default2.png" alt="" />
            <span>{{item.real_name}}</span>
        </div>

        <div>
            <span>{{item.area_user.promoter}}家</span>
        </div>

        <div>
            <span>{{item.wallet_tran | display_price}}元</span>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: ['item'],
    created() {

    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.item {
    display: flex;
    height: 1.4rem;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    div {
        font-size: .36rem;
         font-weight: bold;
        //  flex: 1 0 auto;
        width: 33.3%;
         text-align: center;
    }
    div:first-child {
        display: flex;
        align-items: center;
        font-size: .32rem;
        justify-content: start;
        // text-align: left;
        padding-left: .2rem;
       font-weight: normal;
        img {
            height: .8srem;
            width: .8rem;
            margin-right: .1rem;
        }
    }
    div:last-child {
        color: #03AD8F;
        max-width: 33%;
        text-align: right;
        padding-right: .2rem;
    }
}

</style>