<template>
    <div class="company" v-if="data!=null">
        <div class="brand">
            <router-link :to="`/factory/shop/${data.id}`">
                <div class="factoryInfo">
                    <img v-if="data.img_cover" :src="data.img_cover" alt="">
                    <default-logo  v-else :name="name" :bgColor="bgColorIndx"/>
                    <!-- <div v-else>
                        <span v-for=""></span>
                    </div> -->
                    <div>
                        <p>{{data.display_name || data.name }}</p>
                        <ul>
                            <li v-show="data.address != null">
                                <div>
                                    <svg class="icon-location">
                                        <use xlink:href="#icon-map2"/>
                                    </svg>
                                    <p>{{data.city_name || data.province_name}}</p>
                                </div>
                            </li>
                            <!-- <li>
                                <p>调配时间<i>{{data.diaopei || 3}}</i>天</p>
                            </li> -->
                            <li>
                                <p>已售<i>{{data.sale_num || 0}}</i>件</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </router-link>
            <div class="img_list_box" v-if="USERTYPE==2">
                <div class="img_box" v-for="(item, index) of data.groups" :key="index" v-if="item.product">
                    <img :src="`${item.product.cover }?x-oss-process=image/resize,w_300,m_fixed,h_300,limit_0`" alt="">
                    <p>已采{{item.total}}{{item.product.big_unit}}</p>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import default_company_logo from "@/images/default_company_logo.png"
import defaultLogo from "@/components/common/defaultLogo";
import { mapState } from "vuex"
    export default {
        name: "SupplierItem",
        props: ['data', 'index'],
        components: {
            defaultLogo
        },
        data() {
            return {
                is_active: false,
                default_company_logo
            }
        },
        computed: {
            ...mapState({
                POSITION:(state)=>{state.POSITION},
                USERTYPE:state=>{
                    return state.CURRENTUSER.data.user_type
                    }
            }),
            //企业简称
            name() {
                const nameArr = []
                for(let i=0; i < this.data.short_name.length; i++ ) {
                    nameArr.push(this.data.short_name.charAt(i))
                }
                return nameArr
            },
            bgColorIndx() {
                const index = this.index % 10
                // return this.colorList[index]
                return index
            }
        },
        created() {
        },
        methods: {
            slide: function (event) {
                this.is_active = !this.is_active
                let curTarget = event.currentTarget,
                    containsCurClass = curTarget.classList.contains("up"),
                    nextSibling = curTarget.nextSibling;
                while (nextSibling.nodeType == 3 && /\s/.test(nextSibling.nodeValue)) {
                    nextSibling = nextSibling.nextSibling;
                }
                ;
                let detailScrollHeight = nextSibling.scrollHeight;
                if (containsCurClass) {
                    curTarget.classList.remove("up");
                    this.toggleSlide(nextSibling, detailScrollHeight, '500');
                } else {
                    curTarget.classList.add("up");
                    this.toggleSlide(nextSibling, 0, '500');
                }
            },
            toggleSlide: function (dom, height, time) {
                dom.style.transition = 'height ' + time + 'ms';
                dom.style.height = height + 'px';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .company {
        width: 100%;
        background: #fff;
        // display: flex;
            border-radius: 0 0 10px 10px;
       
        padding: 10px;
         &:not(:nth-of-type(2)) {
             border-radius:10px;
            margin-top: .2rem;
        }
        section {
            width: 1.2rem;
            height: 1.2rem;
            margin-right: .28rem;
            display: flex;
            justify-content: center;
            & >>> .extension-item-img  {
                margin-right: 0!important;
            }
        }
        

        .brand {
            // height: 1.2rem;
            text-align: center;
            border-radius: 3px;
            margin-top: .3rem;
            .factoryInfo {
                display: flex;
                height: 100%;
                align-items: center;
                & > div {
                    display: inline-flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    height: 100%;
                    flex: 1;
                    & > p {
                        color: #060B0F;
                        font-size: .34rem;
                        font-weight: bold;
                    }
                }
                ul {
                    display: flex;
                    padding: 0.22rem 0;
                    li {
                        font-size: 0.22rem;
                        color: rgb(45, 162, 255);
                        border: 1px solid rgb(45, 162, 255);
                        margin-right: 0.2rem;
                        border-radius: 2px;
                        line-height: 1.7;
                        p {
                                padding: 0 3px;
                            }
                        div {
                            p {
                                padding: 0 .05rem;
                            }
                        }
                        &:first-child {
                            div {
                                display: flex;
                                align-items: center;
                            }
                            svg {
                                width: .28rem;
                                height: .28rem;
                            }
                        }
                    }
                }
                img {
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 10px;
                    margin-right: .28rem;
                }
            }
            
            .img_list_box {
                display: flex;
                justify-content: flex-start;
                margin-top: .3rem;
               .img_box {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 25%;
                    p {
                        font-size: .24rem;
                        color: #0090FF;
                        margin-top: .18rem;
                    }
                    img {
                        width: 1.3rem;
                        height: 1.3rem;
                    }
               }
               &:not(:first-child) {
                   margin-top: .2rem;
               }
                
            }
        }

        // .message {
        //     margin-top: 0.44rem;
        //     box-sizing: border-box;
        //     padding-bottom: 0.3rem;
        //     width: 4.48rem;

        //     .message_title {
        //         font-size: 0.34rem;
        //         color: rgb(6, 11, 15);
        //         white-space: nowrap;
        //         text-overflow: ellipsis;
        //     }
        // }
    }

    // .company .message .other ul {
    //     display: flex;
    //     border-bottom: 1px dashed rgb(230, 230, 230);
    //     padding: 0.22rem 0;
    // }

    // .company .message .other ul li {
    //     font-size: 0.22rem;
    //     color: rgb(45, 162, 255);
    //     border: 1px solid rgb(45, 162, 255);
    //     margin-right: 0.2rem;
    //     border-radius: 2px;
    //     line-height: 1.7;
    // }

    // .company .message .other ul li div,
    // p {
    //     padding: 0 .05rem;
    // }

    // .company .message .other ul li:nth-child(1) div {
        
    // }

    // .company .message .other ul li:nth-child(1) div svg {
    //     width: .28rem;
    //     height: .28rem;
    // }

    .company .message .discounts {
        margin-top: 0.16rem;
        position: relative;

        .fade-box {
            height: .35rem;
            display: flex;
            align-items: center;
            float: right;
            position: absolute;
            right: 0px;
            z-index: 10;

            span {
                color: #ccc;
                font-size: .2rem;
            }

            .icon {
                position: relative;
                width: .23rem;
                height: .23rem;
                margin-left: .1rem;
                transition: .4s;
            }

            .icon_active {
                transform: rotate(180deg);
                transition: .4s;
            }
        }

        .ul2 {
            transition: all .4s ease-in;

            li {
                &:nth-child(odd) {
                    span {
                        background: #ff7612;
                    }
                }
            }

        }

    }
    .activity-box {
        display: flex;
        align-items: center;
        margin-bottom: 0.12rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: .35rem;

        span {
            font-size: .24rem;
            color: #fff;
            background: rgb(250, 84, 82);
            overflow: visible;
            border-radius: 2px;
            display: inline-block;
            width: .28rem;
            height: .28rem;
            text-align: center;
            line-height: .28rem;
        }

        p {
            font-size: 0.24rem;
            color: rgb(51, 51, 51);
            padding-left: 0.12rem;
            line-height: .35rem;
            width: 2.8rem;
            height: .35rem;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: all 8s ease;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
    }


    .detail {
        overflow: hidden;
    }

    .arrow {
        display: inline-block;
        border-top: 2px solid;
        border-right: 2px solid;
        width: 8px;
        height: 8px;
        border-color: #EA6000;
        transform: rotate(315deg);
        position: relative;
        transition: all 0.5s ease-in;
        transform-origin: center center;
        top: 50%;
        margin-top: -10px;
    }

    .up .arrow {
        transform: rotate(135deg);
    }
    .inner {
        .activity-box {
            &:nth-child(odd) {
                span{
                    background: #ff7612;
                }

            }
        }
    }
</style>