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
                <section :class="{spending:data.type==2}"></section>
                <span>{{isIncome}}</span>
                <span>{{data.benefit_value}}</span>
            </div>
            <div>
                <span>余额</span>
                <span>{{data.benefit_old_value | display_price}}</span>
            </div>
            <div class="price-right-abstract">
                <span>摘要</span>
                <span class="notice">{{data.note}} {{incomeType}}</span>
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
    computed: {
        incomeType() {
            let text = ''
            if(this.data.type==1) {
                text = '通道收益'
            } else if(this.data.type==3) {
                text = '合伙收益'
            }
            return text
        },
        isIncome() {
            if(this.data.type!=2) {
                return '收入'
            } else {
                return '支出'
            }
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
        padding: .32rem 0;
        justify-content: space-between;
         & section {
            display: inline-block;
            width: .20rem;
            height: .20rem;;
            background: #E53C6F;
            border-radius: 50%;
            margin-right: .08rem;
            }
            .spending {
                background: #4DB266!important;
            }
            span {
                margin-right: .18rem;
            }
        &>div{
            span:first-child {
                font-size: .24rem;
                // 
            }
            span:last-child {
                font-size: .28rem;
            }
            .notice {
                font-size: .24rem!important;
            }
           
        }
        &>div:not(:first-child) {
            margin-left: .28rem;
        }
       
        &-abstract {
            font-size: .24rem;
            color: #999;
            span {
                font-weight: normal!important;
            }
        }
    }
}
</style>