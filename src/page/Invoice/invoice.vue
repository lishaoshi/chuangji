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
           <div class="save" @click="handleSaveInvoice">
               <span>保存</span>
           </div>
        </div>

        <main>
            <ul>
                <li class="header_type">
                    <div class="topType">
                        <span>抬头类型</span> 
                        <div>
                            <div class="iconItem" @click="tabSvg1()">
                                <div v-if="invoice_type" class="svgBox">
                                    <svg  class="list_type svg1" >
                                        <use xlink:href="#icon-promote-pay-chose-1"/>
                                    </svg>
                                </div>
                                
                                <div v-else class="svgBox">
                                    <svg  class="list_type svg2">
                                        <use xlink:href="#icon-IsCheckedShop-close"/>
                                    </svg>
                                </div>
                                
                                <div class="textBox">
                                    增值税普通发票
                                </div>
                            </div>
                           <div class="iconItem"  @click="tabSvg2()">
                               <div v-if="invoice_type" class="svgBox">
                                    <svg class="list_type svg2">
                                        <use xlink:href="#icon-IsCheckedShop-close"/>
                                    </svg>
                                </div>
                                <div v-else class="svgBox">
                                    <svg class="list_type svg1">
                                        <use xlink:href="#icon-promote-pay-chose-1"/>
                                    </svg>
                                </div>
                                <div class="textBox">
                                    增值税专用发票
                                </div>
                           </div>
                            
                        </div>
                       
                    </div>
                </li>
            </ul>
            <ul v-if="invoice_type">
                
                <li class="list">
                    <div>
                        <span>发票抬头</span> 
                        <input type="text" v-model="params.title" placeholder="填写发票抬头">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>发票内容</span> 
                        <input type="text" v-model="params.contents"  placeholder="填写发票内容">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>纳税人号</span> 
                        <input type="text" v-model="params.taxpayer_no" placeholder="填写纳税人号">
                    </div>
                </li>
            </ul>
            <ul v-else>
                <li class="list">
                    <div>
                        <span>发票抬头</span> 
                        <input type="text" v-model="params.title" placeholder="填写发票抬头">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>发票内容</span> 
                        <input type="text" placeholder="填写发票内容" v-model="params.contents">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>纳税人号</span> 
                        <input type="text" v-model="params.taxpayer_no" placeholder="填写纳税人号">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>
                            <i class="text2">地
                            </i>址</span> 
                        <input type="text" v-model="params.address" placeholder="填写地址">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>
                            <i class="text2">电
                            </i>话</span> 
                        <input type="number" v-model="params.telephone" placeholder="填写电话">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>开户银行</span> 
                        <input type="text" v-model="params.bank_name" placeholder="填写开户银行">
                    </div>
                </li>
                <li class="list">
                    <div>
                        <span>银行账号</span> 
                        <input type="number" v-model="params.bank_no" placeholder="填写银行账号">
                    </div>
                </li>
            </ul>
        </main>
    </div>
</template>


<script>
import { mapState } from 'vuex'
import { saveUpdateInvoices, getInvoices } from '@/api/invoices'
export default {
    name:'invoice',
    data(){
        return{
            invoice_type:true,
            params: {
                title: '',
                contents: '商品明细',
                taxpayer_no: '',
                address: '',
                telephone: '',
                bank_name: '',
                bank_no: ''
            }
        }
    },
    computed: {
        ...mapState({
            userId: state=>state.CURRENTUSER.data.id
        })
    },
    created() {
        this._getInvoices()
    },
    methods:{
        // 返回
        goback(){
            history.go(-1)
        },
        tabSvg1(){
            this.invoice_type = true
            this.backData()
            this._getInvoices()
        },
        tabSvg2(){
            this.invoice_type = false
            this.backData()
            this._getInvoices()
        },

        /**
         * params恢复默认值函数
         */
        backData() {
            Object.keys(this.params).forEach((item, index)=>{
                if(item==='contents') {
                    this.params[item] = '商品明细'
                } else {
                    this.params[item] = ''
                }
            })
        },
        /**
         * 获取发票详情
         */
        _getInvoices() {
            let params = {
                type: this.invoice_type?'normal':'dedicated',
            }
            getInvoices(params).then(res=>{
                // debugger
                if(res.data&&res.data.length) {
                    let data = res.data
                    this.params.title = data[0].title
                    this.params.contents = data[0].contents
                    this.params.taxpayer_no = data[0].taxpayer_no
                    this.params.telephone = data[0].telephone?data[0].telephone:''
                    this.params.bank_name = data[0].bank_name?data[0].bank_name:''
                    this.params.address = data[0].address?data[0].address:''
                    this.params.bank_no = data[0].bank_no?data[0].bank_no:''
                }
                
            })
        },
        /**
         * 点击保存发票信息
         */
        async handleSaveInvoice() {
            
           
            if(this.invoice_type) {
                let message = {
                    title: '请填写发票抬头',
                    contents: '请填写发票内容',
                    taxpayer_no: '请填写纳税人号',
                }
                let keysList = Object.keys(message)
                for(let i=0;i< keysList.length; i++) {
                    let item = keysList[i]
                    if(!this.params[item]) {
                        this.$toast(message[item])
                        return false
                    }
                }
            } else {
                let message = {
                    title: '请填写发票抬头',
                    contents: '请填写发票内容',
                    taxpayer_no: '请填写纳税人号',
                    address: '请填写地址',
                    telephone: '请填写手机号',
                    bank_name: '请填写开户银行',
                    bank_no: '请填写银行卡号',
                }
              let keysList = Object.keys(message)
                for(let i=0;i< keysList.length; i++) {
                    let item = keysList[i]
                    if(!this.params[item]) {
                        this.$toast(message[item])
                        return false
                    }
                }
            }
          
            let params = {
                type: this.invoice_type?'normal':'dedicated',
                user_id: this.userId,
                title: this.params.title,
                contents: this.params.contents,
                taxpayer_no: this.params.taxpayer_no,
                address: this.params.address,
                telephone: this.params.telephone,
                bank_name: this.params.bank_name,
                bank_no: this.params.bank_no
            }
            
           await saveUpdateInvoices(params).then(res=>{
               this.$toast('保存成功')
           }).catch(err=>{
               let title = err.response.data.message
               this.$toast(title)
           })

            // console.log(params)
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
                .svg1 {
                    width:.32rem;
                    height:.32rem;
                    // margin-right: .2rem;
                    // margin-right: .19rem;
                }
                .svg2 {
                    width:.36rem;
                    height:.36rem;
                    // margin-right: .2rem;
                    
                }
            }
            li {
                display: flex;
                align-items: center;
                padding:  0 .24rem;
                // align-items: center;
                height:1.20rem;
                background:rgba(255,255,255,1);     
                // div {
                //     flex-grow: 1;
                //     height: 100%;
                //     display: flex;
                //     align-items: center;
                //     border-bottom: .01rem solid rgba(230,230,230,1);
                // }
                .topType {
                    display: flex;
                    align-items: flex-start;
                    
                    .svgBox {
                        width: .36rem;
                        height: .36rem;
                        margin-right: .12rem;
                        text-align: center;
                    }
                    & > div {
                        display: flex;
                        flex-direction: column;
                        // align-items: flex-start;
                        
                        &> .iconItem:nth-of-type(2) {
                            margin-top: .1rem;
                        }
                        .iconItem {
                            display: flex;
                            align-items: center;
                            // flex-direction: column;
                            // // &
                            // margin-right: .6rem;
                        }
                    }
                }
            }
            .list {
                display: flex;
                align-items: center;
                div {
                    display: flex;
                    align-items: center;
                    width: 100%;
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
                    input {
                        flex: 1;
                    }
                }
            }
        }
    }
}
</style>