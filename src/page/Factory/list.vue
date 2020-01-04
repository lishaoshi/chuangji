<template>
    <div class="list">
        <div class="goods-info">
            <img :src="data.product.cover" alt="">
            <div class="goods-name">
                <p>{{data.generic_name}}</p>
                <p>规格: {{data.spec}}</p>
                <p>包装: {{data.tran}}{{data.unit}}/{{data.big_unit}}</p>
            </div>
        </div>

        <div class="progress-detail">
            
            <div class="progress">
                <div :style="{width: progressWidth + '%'}" class="progress-bg">
                </div>
                <div class="progress-margin" v-for="(item, index) of data.rules" :key="index" :style="{left: `${ Math.floor(item.num / maxNum*100)}%`, color: `${Math.floor(item.num / maxNum*100)<=progressWidth?'#fff':'#FF3B30'}`}">
                    <p>
                        {{item.num}}{{data.big_unit}}
                    </p>
                    <div class="bubble-box" :style="{top: `-6px`}">
                        {{item.profit}}%
                    </div>
                </div>
                
            </div>
            
        </div>
        <div class="num">
            <span>{{data.order_min_num}}件起</span>
            <span>已定{{data.total}}{{data.big_unit}}</span>
        </div>

        <div class="price-bottom">
            <div>
                <span>定制价(元/{{data.unit}})</span>
                <span>{{data.customized_price}}</span>
            </div>
            <div>
                <span>建议售价(元/{{data.unit}})</span>
                <span>{{data.market_price}}</span>
            </div>
            <div>
                <span>收益率</span>
                <span>{{data.profit}}%</span>
            </div>
            <p class="btn" @click="handleCustom">
                <span>定制</span>
            </p>
        </div>
         <template v-if="isShowModel">
            <chang-model :isShowModel.sync="isShowModel" :data="data" @confirmPrice="confirmPrice">
                <div class="input">
                    <input type="text" @input="handleInput" :placeholder="placeholder" v-model="input">
                    <div>
                    <span>{{data.big_unit}}</span>
                </div>
                </div>
                <p class="margin">
                    <span>
                    此次定制扣除{{data.base_margin | handleLianshu}}保证金
                    </span>
                </p>
            </chang-model>
            <bg />
      </template>
    </div>
</template>

<script>
import changModel from "@/components/collectParity/changModel"
import bg from "@/components/collectParity/bg";
import { buyCustomize, getNewCustomizeNum }   from "@/api/factory"
export default {
    props: {
        data: {
            type: Object,
            default: ()=>{}
        }
    },
    components: {
        bg,
        changModel
    },
    data() {
        return {
            proStyle: {
                position: 'absolute',
                left: 0,
                top: 0,
                'z-index': '1',
                "border-radius": "12px"
            },
            placeholder: "请输入定制数量",
            isShowModel: false,
            input: ""
        }
    },
    filters: {
        handleLianshu(val) {
        return val.toFixed(2)
        }
    },
    computed: {
        left() {
            return Math.floor(100 / this.data.rules.length)
        },
        maxNum() {
            return this.data.rules[this.data.rules.length-1].num
        },
        progressWidth() {
            return Math.floor((this.data.total / +this.data.rules[this.data.rules.length-1].num)*100)
        }
    },
    methods: {
        handleCustom() {
            getNewCustomizeNum(this.data.id).then(res=>{
                if(res.data.num) {
                    this.input = res.data.num
                }
                this.isShowModel = true
            })
            
        },
        confirmPrice() {
            const params = {
                num: this.input
            }
            buyCustomize(params, this.data.id).then(res=>{
                if(res.code==200) {
                    this.$toast("定制成功")
                    this.isShowModel = false
                    this.$emit("upDtaScess")
                } else {
                    this.$toast(res.message)
                }
            })
            // console.log(123)
        },
        handleInput(e) {
             this.input = e.target.value.replace(/[^0-9]/g, '')
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
            position: relative;
            z-index: 1;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            &-margin {
                position: absolute;
                z-index: 99;
                color: #FF3B30;
                white-space: nowrap;
                transform: translate(-50%, 0)
            }
            .progress-margin:last-child {
                transform: translate(-100%, 0)
            }
            .progress-bg {
                height: 100%;
                background: url("../../images/progress.png") no-repeat;
                background-size: 100% 100%;
                position: 'absolute';
                left: 0;
                top: 0;
                z-index: 1;
                border-radius: 12px;
                div:last-child {
                    transform: translate(-100%, 0)
                }
            }
            .bubble-box {
                background: url("../../images/bubble.png") no-repeat;
                background-size: 100% 100%;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding: 0 .04rem .08rem; 
                transform: translate(-50%, -100%);
                position: absolute;
                color: #fff;
                left: 50%;
            }
        }
    }
    .num {
        display: flex;
        justify-content: space-between;
        color: #FF3B30;
        line-height: .44rem;
        font-size: .24rem;
        font-weight: bold;
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
    .margin {
        color: #E6A23C;
        font-size: .24rem;
        padding: .2rem 0;
    }
}
</style>