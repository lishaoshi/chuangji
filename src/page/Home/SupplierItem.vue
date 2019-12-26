<template>
    <div class="company" v-if="data!=null">
        <div class="brand">
            <router-link :to="`/factory/shop/${data.id}`">
                <img :src="data.logo || default_company_logo" alt="">
            </router-link>
        </div>
        <div class="message">
            <router-link :to="`/factory/shop/${data.id}`">
                <div class="message_title">
                    <p>{{data.display_name || data.name }}</p>
                </div>
                <div class="other">
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
            </router-link>
            <div class="discounts" v-if="data.actives.length > 0">
                <div class="same_module">
                    <div class="title up" @click="slide($event)" style="display: flex">
                        <div class="activity-box" v-for="(item,index) in data.actives"  v-if="index < 1" style="width: 60%">
                            <span>{{item.label}}</span>
                            <p>{{item.title}}</p>
                        </div>
                        <div class="fade-box">
                            <span>{{data.actives.length}}个活动</span>
                            <svg class="icon" :class="{icon_active:is_active}">
                                <use xlink:href="#icon-actity-down"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="detail" style="height:0">
                        <div class="inner">
                            <div class="activity-box" v-for="(item,index) in data.actives"  v-if="index >= 1">
                                <span>{{item.label}}</span>
                                <p>{{item.title}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="discounts">
                    <div class="activity-box"><span>无</span>
                        <p style="width: 3.7rem">店家没有推出活动，敬请期待</p>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import default_company_logo from "@/images/default_company_logo.png"
    export default {
        name: "SupplierItem",
        props: ['data'],
        data() {
            return {
                is_active: false,
                default_company_logo
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
        border-bottom: 1px solid rgb(230, 230, 230);
        background: #fff;
        display: flex;
        padding: 10px;

        .brand {
            width: 2rem;
            height: 2rem;
            border: 1px solid rgb(230, 230, 230);
            text-align: center;
            line-height: 2rem;
            border-radius: 3px;
            margin: 0.32rem 0.2rem;

            img {
                width: 1.6rem;
                height: 1.75rem;
                display: inline-block;
                vertical-align: middle;
            }
        }

        .message {
            margin-top: 0.44rem;
            box-sizing: border-box;
            padding-bottom: 0.3rem;
            width: 4.48rem;

            .message_title {
                font-size: 0.34rem;
                color: rgb(6, 11, 15);
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }

    .company .message .other ul {
        display: flex;
        border-bottom: 1px dashed rgb(230, 230, 230);
        padding: 0.22rem 0;
    }

    .company .message .other ul li {
        font-size: 0.22rem;
        color: rgb(45, 162, 255);
        border: 1px solid rgb(45, 162, 255);
        margin-right: 0.2rem;
        border-radius: 2px;
        line-height: 1.7;
    }

    .company .message .other ul li div,
    p {
        padding: 0 .05rem;
    }

    .company .message .other ul li:nth-child(1) div {
        display: flex;
        align-items: center;
    }

    .company .message .other ul li:nth-child(1) div svg {
        width: .28rem;
        height: .28rem;
    }

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