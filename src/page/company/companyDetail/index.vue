<template>
    <div class="companyDetailPage">
        <headTop title="公司详情"></headTop>
        <div class="conpanyName">
            <div>
                <img :src="supplierInfo.img_cover" alt="">
            </div>
            <div>
                <span>{{supplierInfo.display_name}}</span>
            </div>
        </div>
        <div class="introduction">
            <p>公司简介</p>
            <div class="content" :class="{textCenter:!supplierInfo.intro}">
                {{supplierInfo.intro?supplierInfo.intro:'暂无维护'}}
            </div>
        </div>
        <div class="line"></div>
        <!-- 配送信息 -->
        <div class="distributionInfo">
            <p>配送信息</p>
            <div class="content">
                <ul>
                    <li>
                        <div>起送价(元)</div>
                        <div>{{starting_price}}</div>
                    </li>
                     <li>
                        <div>配送费(元)</div>
                        <div>{{shipping_fee}}</div>
                    </li>
                     <li>
                        <div>调配时间(天)</div>
                        <div>{{allocate_time}}</div>
                    </li>
                     <li>
                        <div>配送时间(小时)</div>
                        <div>{{delivery_time}}</div>
                    </li>
                </ul>
                <div :class="{textCenter:!delivery_intro}">
                   {{delivery_intro?delivery_intro:'暂无维护'}}
                </div>
            </div>
        </div>
         <div class="line"></div>

         <!-- 基础信息 -->
         <div class="basicInformation">
             <p>基础信息</p>
             <ul>
                 <li>
                    <div>联系电话</div>
                    <div class="telBox">
                        <a :href="`tel:${tel}`">
                            <svg class="telSvg" aria-hidden="true">
                                <use xlink:href="#icon-studioCamera"></use>
                            </svg>
                            {{tel}}
                        </a>
                        
                    </div>          
                 </li>
                 <li>
                    <div class="text2">网址</div>
                    <div>{{website}}</div>          
                 </li>
                 <li>
                    <div>主营业务</div>
                    <div>{{supplierInfo.main_business||'无'}}</div>          
                 </li>
                 <li>
                    <div>经营地址</div>
                    <div>{{supplierInfo.address}}</div>          
                 </li>
             </ul>
         </div>
    </div>
</template>

<script>
import headTop from '@/components/HeadTop'
import { queryCompanyDetail } from '@/api/company'
export default {
    data() {
        return {
            list: [
                {
                    name:　'起送价',
                    price: '40000'
                },
                {
                    name:　'配送费',
                    price: '40000'
                },
                {
                    name:　'调配时间',
                    price: '40000'
                },
                {
                    name:　'配送时间',
                    price: '40000'
                },
            ],
            shopId: '',
            supplierInfo: {}
        }
    },
    created() {
        if(this.$route.params.shopId) {
            this.shopId = this.$route.params.shopId
        }
        this._queryCompanyDetail()
    },
    computed: {
        // 配送信息
        delivery_intro() {
            return this.supplierInfo.business_config&&this.supplierInfo.business_config.delivery_intro
        },

        // 起送价
        starting_price() {
            return this.supplierInfo.business_config&&this.supplierInfo.business_config.starting_price
        },
        // 配送费
        shipping_fee() {
            return this.supplierInfo.business_config&&this.supplierInfo.business_config.shipping_fee
        },
        // 调配时间
        allocate_time() {
             return this.supplierInfo.business_config&&this.supplierInfo.business_config.allocate_time
        },
        //配送时间
        delivery_time() {
            return this.supplierInfo.business_config&&this.supplierInfo.business_config.delivery_time
        },
        // 联系电弧
        tel() {
            return this.supplierInfo.tel?this.supplierInfo.tel:this.supplierInfo.user&&this.supplierInfo.user.phone
        },
        // 网址
        website() {
            return this.supplierInfo.website ||　'暂无数据'
        }
    },
    methods: {
        /**
         * 获取公司详细内容
         * 
         */
        _queryCompanyDetail() {
            queryCompanyDetail(this.shopId).then(res=>{
                // console.log(res)
                this.supplierInfo = res.data.supplierInfo
            })
        }
    },
    components: {
        headTop
    }
}
</script>

<style lang="scss" scoped>
.companyDetailPage {
    background: #fff;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .textCenter {
        text-align: center;
    }
    // padding: 0 .24rem;
    .conpanyName {
        display: flex;
        align-items: center;
        font-size: .32rem;
        font-weight: bold;
        height: 1.8rem;
        padding: 0 .24rem;
        img {
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
        }
        div:first-child {
            background: url("../../../images/company/chuanglianLogo.png") no-repeat;
            background-size: 100% 100%;
            border-radius: 50%;
            width: 1.2rem;
            height: 1.2rem;
        }
        div:last-child {
            margin-left: .24rem;
        }
        
    }
    .line {
        background: #f5f5f5;
        height: .2rem;
    }
    .introduction {
        padding: .34rem .24rem;
        font-size: .24rem;
        border-top: 1px solid #f5f5f5;
        // padding: 0 .24rem;
        // opacity: .2;
        p {
            color: #2DA2FF;
            margin-bottom: .24rem;
        }
        div {
            color: #999;
        }
    }
    .distributionInfo {
        padding: 0 .24rem .24rem;;
        p {
            height: .76rem;
            line-height: .76rem;
            font-size: .28rem;
            color: #999;
            
        }
        .content {
            background: #f5f5f5;
            & > div:last-child {
                 padding: .24rem .24rem;
                 font-size: .24rem;
                 color: #999;
                 padding-bottom: .34rem;
            }
        }
        ul {
            display: flex;
            // padding: 0 .24rem;
            
            li {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex:1;
                height: 1rem;
                justify-content: center;
                font-size: .28rem;
                color: #999;
                div:first-child {
                    font-size: .2rem;
                    // margin-bottom: .2rem;
                   
                }
                div:last-child {
                    color: #333;
                    margin-top: .07rem;
                }
            }
        }
    }
    .basicInformation {
        padding: 0 .24rem .24rem;;
        p {
            height: .76rem;
            line-height: .76rem;
            font-size: .28rem;
            color: #999;
        }
        .text2 {
            letter-spacing: 2em;
            margin-right: 2em;
        }
        ul {
            display: flex;
            flex-direction: column;
            li {
                display: flex;
                justify-content: space-between;
                margin-top: .48rem;
                align-items: center;
                .telBox {
                    a {
                        color: #0090FF;
                        align-items: center;
                        display: flex;
                        align-items: center;
                    }
                    
                }
                 .telSvg {
                        width: .3rem;
                        height: .3rem;
                        margin-right: .1rem;
                    }
                div:first-child {
                    min-width: 20%;
                }
            }
        }
    }
}
</style>