<template>
  <div class="container">
       <clxsd-head-top title='合伙收益' style="border-bottom: 0px" append="1">
            <div slot="append">
                <span @click="toRouter('/earnings-detail')" class="detail-go">明细</span>
            </div>
        </clxsd-head-top>

        <div class="content-list">
            <div class="content-list-item">
                <div class="userInfo">
                    <img src="../../../images/add_shopping.png" alt="">
                    <span>张鑫鑫</span>
                </div>

                <div class="price">
                    <span>分佣元</span>
                    <span>750.00</span>
                </div>

            </div>
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
.content-list {
    
    .content-list-item {
        background: #fff;
        display: flex;
        align-items: center;
        height: 1.8rem;
        justify-content: space-between;
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