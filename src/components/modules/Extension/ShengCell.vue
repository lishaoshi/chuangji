<template>
    <router-link :to="{path:`customer-city/${data.code}`,query:{ title: data.name }}" v-if="data.active">
        <div class="extension-item" >
            <svg class="icon-tag">
                <use xlink:href="#icon-promote-development-1"/>
            </svg>
            <div class="name"><span>{{CityName}}</span>市</div>
            <div class="detail">
                <div class="datail-info">
                    <img src="../../../images/default_company_logo.png" class="extension-item-img">
                    <div>
                        <p>{{data.user.display_name || data.user.real_name}}</p>
                        <p>{{data.user.phone}}</p>
                    </div>
                </div>
                <p class="company-name">河南省郑州市级分公司</p>
            </div>
        </div>
    </router-link>
    <div class="extension-item" v-else>
        <div class="name">
            <svg class="img1">
                <use xlink:href="#icon-promote-development-0"/>
            </svg>
        </div>
        <div class="detail">
            <div class="datail-info">
                <div>
                    <b>{{data.name}}</b>
                </div>
            </div>
            <p class="company-name">您还没有推广此地区，请尽快推广</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShengCell",
        props:{
            data:{},
        },
        data(){
            return {
                CityName:null
            }

        },
        created(){
            let str = this.data.name
            let name = str.slice(0,str.length-1);
            this.CityName = name
        }
    }
</script>


<style lang="scss" scoped>
    .extension-item {
        background: #fff;
        margin: .2rem .2rem 0px;
        border-radius: 5px;
        padding: .4rem .2rem;
        height: 2rem;
        display: flex;
        position: relative;
        align-items: center;
        .name {
            font-size: .32rem;
            color: #0090ff;
            font-weight: bold;
            width: 26%;
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
    .icon-tag {
        position: absolute;
        width: 1.14rem;
        height: 0.95rem;
        top:0rem;
        right: .15rem;
    }
</style>