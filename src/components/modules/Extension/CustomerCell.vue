<template>
    <div>
        <!--省--->
        <div v-if="data.apply_role === 'province_company'" class="province">
            <div v-if="data.user_id" class="active">
                <div class="name isProvince">
                    <span>{{ data.province_name }}</span>
                </div>
                <div class="detail isProvinceDetail">
                    <div class="datail-info">
                        <div>
                            <img v-if="!avatar && !img_cover" src="../../../images/default_company_logo.png" class="extension-item-img">
                            <img v-else :src="avatar?avatar:img_cover" class="extension-item-img">
                            <span class="textInfo userName">{{data.user.real_name}}</span>
                        </div>

                        <div>
                            <div class="svg">
                                <svg>
                                    <use xlink:href="#icon-telephone" fill="#666"/>
                                </svg>
                            </div>
                            <span class="textInfo comMobile">
                                {{data.mobile_desensite}}
                            </span>
                        </div>
                        <div v-if="display_name">
                            <div class="svg">
                               <svg>
                                    <use xlink:href="#icon-company" fill="#666"/>
                                </svg>
                            </div>
                            
                            <span class="textInfo comName">
                                {{ display_name }}
                            </span>
                        </div>
                    </div>
                    <!-- <p class="company-name">{{data.user.supplier.name||'未设置'}}</p> -->
                </div>
            </div>
            <div v-else>
                <div class="name">
                    <svg class="img1">
                        <use xlink:href="#icon-group-client-unstart"/>
                    </svg>
                </div>
                <div class="detail">
                    <div class="datail-info">
                        <div>
                            <b>{{ data.province_name }}</b>
                        </div>
                    </div>
                    <p class="company-name">该地区未启动，欢迎您来启动</p>
                </div>
            </div>
        </div>
        <!--市--->
        <div v-if="data.apply_role === 'city_company'" class="city">
            <div v-if="data.user_id">
                <!-- <div class="name"><span>{{ data.city_name | filter_city_name }}</span>市</div> -->
                 <div class="name isProvince">
                    <span>{{ data.city_name }}</span>
                </div>
                <div class="detail isProvinceDetail">
                    <div class="datail-info">
                        <!-- <img src="../../../images/default_company_logo.png" class="extension-item-img"> -->
                        <!-- <img v-if="!avatar && !img_cover" src="../../../images/default_company_logo.png" class="extension-item-img">
                        <img v-else :src="avatar?avatar:img_cover" class="extension-item-img">
                        <div>
                            <p>{{data.user.real_name}}</p>
                            <p>{{data.mobile_desensite}}</p>
                        </div> -->
                        <div>
                            <img v-if="!avatar && !img_cover" src="../../../images/default_company_logo.png" class="extension-item-img">
                            <img v-else :src="avatar?avatar:img_cover" class="extension-item-img">
                            <span class="textInfo userName">{{data.user.real_name}}</span>
                        </div>

                        <div>
                            <div class="svg">
                                <svg>
                                    <use xlink:href="#icon-telephone" fill="#666"/>
                                </svg>
                            </div>
                            <span class="textInfo comMobile">
                                {{data.mobile_desensite}}
                            </span>
                        </div>
                        <div v-if="display_name">
                            <div class="svg">
                               <svg>
                                    <use xlink:href="#icon-company" fill="#666"/>
                                </svg>
                            </div>
                            
                            <span class="textInfo comName">
                                {{ display_name }}
                            </span>
                        </div>
                    </div>
                    <!-- <p class="company-name">{{data.user.company_name || ''}}</p> -->
                </div>
            </div>
            <div v-else>
                <div class="name">
                    <svg class="img1">
                        <use xlink:href="#icon-group-client-unstart"/>
                    </svg>
                </div>
                <div class="detail">
                    <div class="datail-info">
                        <div>
                            <b>{{ data.city_name }}</b>
                        </div>
                    </div>
                    <p class="company-name">该地区未启动，欢迎您来启动</p>
                </div>
            </div>
        </div>

        <!--工业--->
        <div v-if="data.type === 'factory'"  class="factory">
            <div>
                <div class="name">
                    <img :src="data.logo" class="img1" v-if="data.logo">
                    <img src="../../../images/default.png" class="img1" v-else>
                </div>
                <div class="datail-info">
                    <div>
                        <b>{{data.company_name}}</b>
                    </div>
                </div>
                <p class="company-name">{{data.province}}·{{data.city}}</p>
            </div>
        </div>
        <!-- 推广人 -->
        <div v-if="data.apply_role === 'promoter'" class="clinic">
            <div>
                <div class="name">
                    <!-- <img :src="data.logo" class="img1" v-if="data.logo">
                    <img src="../../../images/default.png" class="img1" v-else> -->
                    <img v-if="!avatar && !img_cover" src="../../../images/my/user_default.png" class="img1">
                    <img v-else :src="avatar?avatar:img_cover" class="img1">
                </div>
                <div class="datail-info">
                    <div>
                        <b>{{data.user.real_name}}</b>
                    </div>
                </div>
                <!-- <p class="company-name">{{data.province}}·{{data.city}}</p> -->
                <div class="mobile">
                    {{data.mobile_desensite}}
                </div>
            </div>
        </div>
        <!--商业--->
        <div v-if="data.type === 'business'" class="business">
            <div>
                <div class="name">
                    <img :src="data.logo" class="img1" v-if="data.logo">
                    <img src="../../../images/default.png" class="img1" v-else>
                </div>
                <div class="datail-info">
                    <div>
                        <b>{{data.user.real_name}}</b>
                    </div>
                </div>
                <p class="company-name">{{data.province}}·{{data.city}}</p>
            </div>
        </div>
        <!--连锁--->
        <div v-if="data.type === 'chain'" class="chain">
             <div>
                <div class="name">
                    <img :src="data.logo" class="img1" v-if="data.logo">
                    <img src="../../../images/default.png" class="img1" v-else>
                </div>
                <div class="datail-info">
                    <div>
                        <b>{{data.company_name}}</b>
                    </div>
                </div>
                <p class="company-name">{{data.province}}·{{data.city}}</p>
            </div>
        </div>
        <!--医院--->
        <div v-if="data.type === 'hospital'" class="hospital">
            <div>
            <div class="name">
                <img :src="data.logo" class="img1" v-if="data.logo">
                <img src="../../../images/default.png" class="img1" v-else>
            </div>
            <div class="datail-info">
                <div>
                    <b>{{data.company_name}}</b>
                </div>
            </div>
            <p class="company-name">{{data.province}}·{{data.city}}</p>
            </div>
        </div>
        <!--单体--->
        <div v-if="data.type === 'monomer'" class="monomer">
            <div>
            <div class="name">
                <img :src="data.logo" class="img1" v-if="data.logo">
                <img src="../../../images/default.png" class="img1" v-else>
            </div>
            <div class="datail-info">
                <div>
                    <b>{{data.company_name}}</b>
                </div>
            </div>
            <p class="company-name">{{data.province}}·{{data.city}}</p>
        </div>
        </div>
        <!--诊所--->
        <div v-if="data.type === 'clinic'" class="clinic">
            <div>
            <div class="name">
                <img :src="data.logo" class="img1" v-if="data.logo">
                <img src="../../../images/default.png" class="img1" v-else>
            </div>
            <div class="datail-info">
                <div>
                    <b>{{data.company_name}}</b>
                </div>
            </div>
            <p class="company-name">{{data.province}}·{{data.city}}</p>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CustomerCell",
        props:{
            data:Object
        },
        computed: {
            avatar() {
                return this.data.user.avatar&&this.data.user.avatar
            },
            img_cover() {
                return this.data.user.supplier&&this.data.user.supplier.img_cover
            },
            display_name() {
                return this.data.user.supplier&&this.data.user.supplier.display_name
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .province,.city,.factory,.business,.chain,.hospital,.monomer,.clinic,.partner,.promoter {
        background: #fff;
        margin: .2rem .2rem 0px;
        border-radius: 5px;
        padding: .34rem .32rem;
        height: 2.2rem;
        position: relative;
        box-shadow: 0px 0px 3px rgba(0, 144, 255, 0.2);
    }
    //省市样式
    .province,.city{
         padding: 0;
        &>div{
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
           
            .name {
                font-size: .32rem;
                color: #0090ff;
                font-weight: bold;
                width: 21%;
                padding-left: 1%;
                .img1 {
                    width: 1.25rem;
                    height: 1.25rem;
                    border-radius: 100%;
                }
                span {
                    font-size: .4rem;
                }
            }
            .isProvince {
                background: #ebf6ff;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2.2rem;
                margin-right: .32rem;
                overflow: hidden;//超出隐藏
                span {
                    display: inline-block;
                    white-space:nowrap;//不换行
                    overflow: hidden;//超出隐藏
                    text-overflow: ellipsis;//变成...
                }
            }
            .detail {
                width: 70%;
                // height: 100%;
                // display: flex;
                // align-items: center;
                .datail-info {
                    display: flex;
                    align-items: center;
                    img {
                        width: .56rem;
                        height: .56rem;
                        border-radius: 100%;
                        margin-right: .2rem;
                        text-align: center;
                    }
                    svg {
                        height: .4rem;
                        width: .4rem;
                        // margin-right: .36rem;
                    }
                    b {
                        font-size: .34rem;
                        color: #333;
                    }
                    p {
                        color: #333;
                        font-size: .28rem;
                        padding-left: .2rem;
                        &:nth-child(2) {
                            font-size: .24rem;
                            color: #666;
                            margin-top: .1rem;
                        }
                    }
                }
                .company-name {
                    font-size: .3rem;
                    color: #666;
                    margin-top: .1rem;
                }
            }
            .isProvinceDetail {
                display: flex;
                align-items: center;
                height: 100%;
               
                .datail-info {
                    flex-direction: column;
                    width: 100%;
                    span:nth-child(1) {
                        font-size: .36rem;
                    }
                    &>div {
                        display: inline-flex;
                        align-items: center;
                        width: 100%;
                      
                        &>div {
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                        }
                        margin-top: .09rem;
                    }
                    .textInfo {
                        font-weight: bold;
                    }
                    .userName {
                        font-size: .36rem;
                    }
                    .comMobile {
                        font-size: .32rem;
                        color: #666;
                    }
                    .comName {
                        font-size: .3rem;
                        color: #666;
                    }
                }
                .svg {
                    width: .56rem;
                    border-radius: 100%;
                    margin-right: .2rem;
                    text-align: center;
                }
            }
        }
    }
    .factory,.business,.chain,.hospital,.monomer,.clinic{
        display: flex;
        align-items: center;
        >div {
            display: flex;
            align-items: center;
            width: 100%;
            .name {
                font-size: .32rem;
                color: #0090ff;
                font-weight: bold;
                width: 21%;
                padding-left: 1%;
                .img1 {
                    width: .96rem;
                    height: .96rem;
                    border-radius: 100%;
                }
                span {
                    font-size: .4rem;
                }
            }
            .datail-info {
                font-size: .34rem;
                width: 60%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .company-name {
                width: 27%;
                font-size: .3rem;
                text-align: right;
                color: #666;
                margin-top: 1rem;
            }
        }
        .mobile {
            color: #999;
            font-weight: bold;
            font-size: .28rem;
        }
    }
    .partner,.promoter {
        display: flex;
        align-items: center;
        .name {
            width: 21%;
           
            .img1 {
                width: .96rem;
                height: .96rem;
                border-radius: 100%;
            }
        }
        .detail-info {
            font-size: .34rem;
            width: 59%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .company-name {
            font-size: .3rem;
            color: #666;
            margin-top: .1rem;
        }
    }
</style>