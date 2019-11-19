<template>
    <div class="container">
        <div class="date-left">
            <div>星期一</div>
            <div>2019/11/11</div>
        </div>
        <!-- <div class="round">
            <i ></i>
        </div> -->
        <div class="price-right">
            <div>
                <section></section>
                <span>提现: </span>
                <span>10000</span>
            </div>
            <div>
                <span>余额: </span>
                <span>10000</span>
            </div>
            <div class="price-right-abstract">
                <span>摘要: </span>
                <span>体现</span>
            </div>
        </div>

  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        data : {
            type: Object,
            default: ()=>{}
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    height: 2rem;
    background: #fff;
    padding: 0 .24rem;
    border-bottom: 1px solid #E6E6E6;
    &:last-child {
        border-bottom: 0;
    }
    .date-left {
        // width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: .24rem;
        margin-right: .8rem;
        color: #999;
        div:last-child {
            margin-top: 8px;
        }
    }
    //  .round {
    //         // display: inline-block;
    //          margin-top: .32rem;
    //         i {
    //             display: block;
    //             width: .14rem;
    //             height: .14rem;
    //             background: #E53C6F;
    //             border-radius: 50%;
    //             font-size: .24rem;
    //         }
          
           
    //         // margin-right: 4px;
    //         // position: absolute;
    //         // left: -20px;
    //     }
    .price-right {
        display: inline-flex;
        flex-direction: column;
        flex:1;
        margin-top: .32rem;
         & section {
            display: inline-block;
            width: .14rem;
            height: .14rem;;
            background: #E53C6F;
            border-radius: 50%;
            margin-right: .08rem;
                // position: absolute;
                // left: -20px;
            }
        &>div{
            span:first-child {
                font-size: .24rem;
            }
            span:last-child {
                font-size: .28rem;
                margin-top: 8px;
                font-weight: bold;
            }
           
        }
        &>div:not(:first-child) {
            margin-left: .22rem;
        }
       
        &-abstract {
            margin-top: 12px;
            font-size: .24rem;
            color: #999;
            span {
                font-weight: normal!important;
            }
        }
    }
}
</style>