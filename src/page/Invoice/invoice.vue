<template>
    <div class="invoice">
        <div class="header">
           <div @click="goback()">
                <svg class="m-style-svg m-svg-def">
                <use xlink:href="#icon-back"/>
                </svg>
           </div>
           <div class="value_incoice">
               <span>增值税发票</span>
           </div>
           <div class="save">
               <span>保存</span>
           </div>
        </div>

        <main>
            <ul v-if="invoice_type">
                <li class="header_type">
                    <div>
                        <span>抬头类型</span> 
                        <svg v-if="invoice_type" class="list_type" @click="tabSvg1()">
                            <use xlink:href="#icon-promote-pay-chose-1"/>
                        </svg>
                        <svg v-else class="list_type" @click="tabSvg1()">
                            <use xlink:href="#icon-IsCheckedShop-close"/>
                        </svg>
                        <span>
                            普通发票
                        </span>
                        <svg v-if="invoice_type" class="list_type" @click="tabSvg2()">
                            <use xlink:href="#icon-IsCheckedShop-close"/>
                        </svg>
                        <svg v-else class="list_type" @click="tabSvg2()">
                            <use xlink:href="#icon-promote-pay-chose-1"/>
                        </svg>
                        <span>
                            专用发票
                        </span>
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>发票抬头</span> 
                        <input type="text" placeholder="填写发票抬头">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>发票内容</span> 
                        <input type="text" v-model="invoice_content">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>纳税人号</span> 
                        <input type="text" placeholder="填写纳税人号">
                    </div>
                </li>
            </ul>
            <ul v-else>
                <li class="header_type">
                    <div>
                        <span>抬头类型</span> 
                        <svg v-if="invoice_type" class="list_type" @click="tabSvg1()">
                            <use xlink:href="#icon-promote-pay-chose-1"/>
                        </svg>
                        <svg v-else class="list_type" @click="tabSvg1()">
                            <use xlink:href="#icon-IsCheckedShop-close"/>
                        </svg>
                        <span>
                            普通发票
                        </span>
                        <svg v-if="invoice_type" class="list_type" @click="tabSvg2()">
                            <use xlink:href="#icon-IsCheckedShop-close"/>
                        </svg>
                        <svg v-else class="list_type" @click="tabSvg2()">
                            <use xlink:href="#icon-promote-pay-chose-1"/>
                        </svg>
                        <span>
                            专用发票
                        </span>
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>发票抬头</span> 
                        <input type="text" placeholder="填写发票抬头">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>发票内容</span> 
                        <input type="text" v-model="invoice_content2">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>纳税人号</span> 
                        <input type="text" placeholder="填写纳税人号">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>
                            <i class="text2">地
                            </i>址</span> 
                        <input type="text" placeholder="填写地址">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>
                            <i class="text2">电
                            </i>话</span> 
                        <input type="text" placeholder="填写电话">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>开户银行</span> 
                        <input type="text" placeholder="填写开户银行">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>银行账号</span> 
                        <input type="text" placeholder="填写银行账号">
                    </div>
                </li>
            </ul>
        </main>
    </div>
</template>


<script>
export default {
    name:'invoice',
    data(){
        return{
            invoice_type:true,
            invoice_content:'商品明细',
            invoice_content2:'商品明细'
        }
    },
    methods:{
        // 返回
        goback(){
            history.go(-1)
        },
        tabSvg1(){
            this.invoice_type = true
        },
        tabSvg2(){
            this.invoice_type = false
        }
    }
}
</script>


<style lang="scss" scoped>
.invoice {
    font-size: .3rem;
    .header {
        padding: 0 .2rem;
        height: .88rem;
        display: flex;
        color:rgba(255,255,255,1);
        background:rgba(45,162,255,1);
        align-items: center;
        justify-content: space-between;
        .value_incoice {
            font-size: .36rem;
        }
        .save {
            font-size: .28rem;
        }
        svg {
            width: .4rem;
            height: .4rem;
           
        }
    }

    // main 部分

    main {
        ul {
            .header_type {
                span {
                    margin-right: .57rem;
                    color: #666666;
                    font-size: .28rem;
                }
                svg {
                    width:.36rem;
                    height:.36rem;
                    margin-right: .19rem;
                }
            }
            li {
                padding:  0 .24rem;
                // align-items: center;
                height:1.20rem;
                background:rgba(255,255,255,1);     
                div {
                    flex-grow: 1;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    border-bottom: .01rem solid rgba(230,230,230,1);
                }
            }
            .list {
                div {
                    display: flex;
                    span {
                        display: inline-block;
                    }
                    span:first-child {
                        margin-right: .49rem
                    }
                    .text2 {
                        display: inline-block;
                        letter-spacing: 2em;
                    }
                }
            }
        }
    }
}
</style>