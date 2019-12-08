<template>
    <div class="collect-parity-list">
        <div class="goods-info">
            <img src="@/images/default.png" alt="">
            <div class="goods-name">
                <p>伊可新 维生素AD滴剂</p>
                <p>
                    品牌: 山东达因制药股份有限公司
                </p>
                <p>
                    规格: 10粒*3板/盒  300盒/件
                </p>
            </div>
        </div>

        <div class="price-bottom">
            <div class="shops-price-list">
                <div>
                    <span>****集采商</span>
                    <span>
                        采购价(元): 
                        <span class="price">
                            3.415
                        </span>
                    </span>
                </div>
               
            </div>
            <div class="price-btn-group">
                <div class="price-group">
                     <div class="min-price">
                        <span>最低价(元)</span>
                        <span>3.254</span>
                    </div>
                    <div>
                        <span>已集采(件)  </span>
                        <span>1000</span>
                    </div>
                </div>
                <div class="button-group">
                    <div @click="changePrice('请输入价格')">
                        变价
                    </div>
                    <div @click="changePrice('请输入集采数量')">
                        集采
                    </div>
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
export default {
    methods: {
        changePrice(flag) {
            this.$emit('changePrice',flag)
        }
    }

}
</script>

<style lang="scss" scoped>
.collect-parity-list {
    display: flex;
    flex-direction: column;
    padding:.32rem;
    background: #fff;
    .goods-info {
        display: flex;
        img {
            width: 1.8rem;
            height: 1.8rem;
            border-radius: 10px;
            margin-right: .3rem;
        }
        .goods-name {
            display: flex;
            flex-direction: column;
            p {
                font-weight: bold;
            }
            p:first-child {
                font-size: .4rem;
               line-height: .8rem;
            }
            p:not(:first-child) {
                font-size: .28rem;
                color: #666;
                line-height: .4rem;
            }
        }
    }
    .price-bottom {
        display: flex;
        justify-content: space-between;
        margin-top: .24rem;
        .shops-price-list {
            height: .64rem;
            background: #F9F9F9;
            border-radius: 8px;
            display: inline-flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .1rem;
            font-size: .22rem;
            span:first-child {
                margin-right: .1rem;
            }
            & > span {
                flex: 0 1 auto;
            }
            .price {
                color: #0090FF;
            }
        }
        .price-btn-group {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            .price-group {
                display: flex;
                justify-content: flex-end;
                div{
                    display: flex;
                    flex-direction: column;
                    &:first-child {
                        margin-right: .7rem;
                    }
                    span {
                        text-align: center;
                        &:first-child {
                            font-size: .2rem;
                            color: #999999;
                        }
                        &:last-child {
                            font-size: .36rem;
                            color: #0090FF;
                        }
                    }
                }
            }
            .button-group {
                display: flex;
                justify-content: flex-end;
                margin-top: .32rem;
                div {
                    width:1.6rem;
                    height:.8rem;
                    line-height: .8rem;
                    text-align: center;
                    color: #fff;
                    font-size: .28rem;
                    &:first-child {
                        background:linear-gradient(90deg,rgba(255,202,0,1),rgba(255,148,2,1));
                        border-radius:40px 0px 0px 40px;
                    }
                    &:last-child {
                        background:linear-gradient(90deg,rgba(254,118,0,1),rgba(255,73,0,1));
                        border-radius:0px 40px 40px 0px;
                    }
                }
            }
        }
    }
}
</style>