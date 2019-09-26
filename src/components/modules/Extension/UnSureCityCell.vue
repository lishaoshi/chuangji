<template>
    <div style="width: 100%">
        <div class="extension-item">
            <div class="name"><span>{{CityName}}</span>{{CityLast}}</div>
            <div class="detail">
                <div class="datail-info">
                    <img src="../../../images/default_company_logo.png" class="extension-item-img">
                    <div>
                        <p>张无忌</p>
                        <p>148589658987</p>
                    </div>
                </div>
                <p class="company-name">河南省郑州市级分公司</p>
            </div>
        </div>
        <div class="extension-item">
            <div class="name">
                <svg class="img1">
                    <use xlink:href="#icon-group-client-unstart"/>
                </svg>
            </div>
            <div class="detail">
                <div class="datail-info">
                    <div>
                        <b>陕西省</b>
                    </div>
                </div>
                <p class="company-name">该地区未启动，欢迎您来启动</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UnSureCityCell",
        props:{
            data:{},
        },
        data(){
            return{
                CityName:null,
                CityLast:null
            }
        },
        created(){
            let str = "河南省"
            this.CityName = str.slice(0,str.length-1);
            this.CityLast = str.slice(str.length-1,str.Length)
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
        box-shadow: 0px 0px 4px #ccc;
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