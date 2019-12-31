<template>
    <div class="list">
        <div class="goods-info">
            <img src="@/images/logo.png" alt="">
            <div class="goods-name">
                <p>伊可新 维生素AD滴剂</p>
                <p>规格: 10粒*3板/盒</p>
                <p>包装: 300盒/件</p>
            </div>
        </div>

        <div class="progress-detail">
            <span>100件起</span>
            <div class="progress">
                <div :style="proStyle" class="progress-bg">
                </div>
                <p v-for="(item, index) of buyUnit" :key="index" :style="{left: `${(index+1)*33}%`, color: `${(index+1)*33<60?'#fff':'#FF3B30'}`}">{{item}}件</p>
            </div>
            <span>已定250件</span>
        </div>

        <div class="price-bottom">
            <div>
                <span>定制价格(元/盒)</span>
                <span>100</span>
            </div>
            <div>
                <span>建议销售价(元/盒)</span>
                <span>100</span>
            </div>
            <div>
                <span>收益率</span>
                <span>100%</span>
            </div>
            <p class="btn">
                <span>定制</span>
                
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            proStyle: {
                width: '60%',
                position: 'absolute',
                left: 0,
                top: 0,
                'z-index': '1',
                "border-radius": "12px"
            },
            buyUnit: [
                "100",
                "200",
                "300"
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: .2rem;
    border-radius: 10px;
    .goods-info {
        display: flex;
        img {
            height: 1.8rem;
            width: 1.8rem;
            border-radius: 10px;
            margin-right: .2rem;
        }
        p {
            line-height: .4rem;
            font-size: .28rem;
            font-weight: bold;
            color: #666;
        }
        p:first-child {
            font-size: .34rem;
            color: #333;
            margin: .1rem 0;
        }
        
    }
    .progress-detail {
        display: flex;
        justify-content: space-between;
        color: #FF3B30;
        margin-top: .5rem;
        align-items: center;
        .progress {
            background: #FBEEEF;
            flex: 1;
            border-radius: 12px;
            height: .24rem;
            font-size: .2rem;
            color: #BB5F01;
            margin: 0 .4rem;
            position: relative;
            z-index: 1;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            p {
                position: absolute;
                z-index: 99;
                color: #FF3B30;
                white-space: nowrap;
                transform: translate(-50%, 0)
            }
            .progress-bg {
                height: 100%;
                background: url("../../images/progress.png") no-repeat;
                background-size: 100% 100%;
            }
        }
    }
    .price-bottom {
        height: 1.2rem;
        background: #ECF5FF;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: .24rem;
        border-radius: 10px;
        div:not(:last-child) {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            span:first-child {
                color: #666;
                font-size: .2rem;
            }
            span:last-child {
                color: #0090FF;
                font-size: .36rem;
                font-weight: bold;
            }
        }
        .btn {
            background:linear-gradient(90deg,rgba(254,118,0,1),rgba(255,73,0,1));
            border-radius:40px;
            font-size: .28rem;
            font-weight: bold;
            width: 1.6rem;
            height: .8rem;
            color: #fff;
            line-height: .8rem;
            text-align: center;
        }
    }
}
</style>