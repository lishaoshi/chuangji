<template>
    <div>
        <!--省--->
        <div v-if="data.type === 'province'" class="province">
            <div v-if="data.userData" class="active">
                <div class="name"><span>{{ data.name | filter_city_name }}</span>{{data.name | filter_city_last}}</div>
                <div class="detail">
                    <div class="datail-info">
                        <img src="../../../images/default_company_logo.png" class="extension-item-img">
                        <div>
                            <p>{{data.userData.display_name}}</p>
                            <p>{{data.userData.phone | filter_mobile}}</p>
                        </div>
                    </div>
                    <p class="company-name">{{data.userData.company_name||'未设置'}}</p>
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
                            <b>{{ data.name }}</b>
                        </div>
                    </div>
                    <p class="company-name">该地区未启动，欢迎您来启动</p>
                </div>
            </div>
        </div>
        <!--市--->
        <div v-if="data.type === 'city'" class="city">
            <div v-if="data.userData">
                <div class="name"><span>{{ data.name | filter_city_name }}</span>市</div>
                <div class="detail">
                    <div class="datail-info">
                        <img src="../../../images/default_company_logo.png" class="extension-item-img">
                        <div>
                            <p>{{data.userData.display_name}}</p>
                            <p>{{data.userData.phone | filter_mobile}}</p>
                        </div>
                    </div>
                    <p class="company-name">{{data.userData.company_name || '未设置'}}</p>
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
                            <b>{{ data.name }}</b>
                        </div>
                    </div>
                    <p class="company-name">该地区未启动，欢迎您来启动</p>
                </div>
            </div>
        </div>
        <!--合伙人--->
        <div v-if="data.type === 'partner'"  class="partner">
            <div class="name">
                <img :src="data.avatar | display_avatar" v-if="data.avatar" class="img1">
                <img src="../../../images/default.png" class="img1" v-else>
            </div>
            <div class="detail-info">
                    <b>{{data.name}}</b>
            </div>
            <p class="company-name">{{data.phone | filter_mobile}}</p>
        </div>
        <div v-if="data.type === 'promoter'"  class="promoter">
            <div class="name">
                <img :src="data.avatar | display_avatar" v-if="data.avatar" class="img1">
                <img src="../../../images/default.png" class="img1" v-else>
            </div>
            <div class="detail-info">
                <b>{{data.name}}</b>
            </div>
            <p class="company-name">{{data.phone | filter_mobile}}</p>
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
        <!--商业--->
        <div v-if="data.type === 'business'" class="business">
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
        }
    }
</script>

<style lang="scss" scoped>
    .province,.city,.factory,.business,.chain,.hospital,.monomer,.clinic,.partner,.promoter {
        background: #fff;
        margin: .2rem .2rem 0px;
        border-radius: 5px;
        padding: .34rem .2rem;
        height: 2rem;
        position: relative;
        box-shadow: 0px 0px 4px #ccc;
    }
    //省市样式
    .province,.city{
        >div{
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
                    width: 1.25rem;
                    height: 1.25rem;
                    border-radius: 100%;
                }
                span {
                    font-size: .4rem;
                }
            }
            .detail {
                width: 70%;
                .datail-info {
                    display: flex;
                    img {
                        width: .8rem;
                        height: .8rem;
                        border-radius: 100%;
                    }
                    b {
                        font-size: .34rem;
                        color: #333;
                    }
                    p {
                        color: #333;
                        font-size: .32rem;
                        padding-left: .2rem;
                        &:nth-child(2) {
                            font-size: .24rem;
                            color: #666;
                            margin-top: .2rem;
                        }
                    }
                }
                .company-name {
                    font-size: .3rem;
                    color: #666;
                    margin-top: .1rem;
                }
            }
        }
    }
    .factory,.business,.chain,.hospital,.monomer,.clinic{
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