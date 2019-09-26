<template>
    <div v-if="state===1">
        <ul class="mint-navbar" >
            <li @click="changeType(1)">
                <p class="p1">
                    <svg>
                        <use :xlink:href="Type==1 ? '#icon-group-client-allCountry-1': '#icon-group-client-allCountry-0'"/>
                    </svg>
                    <span :class="Type==1 ? 'active':''">全国</span>
                </p>
            </li>
            <li @click="changeType(2)">
                <p class="p1">
                    <svg>
                        <use :xlink:href="Type==2 ? '#icon-group-client-my-1': '#icon-group-client-my-0'"/>
                    </svg>
                    <span :class="Type==2 ? 'active':''">我的</span>
                </p>
            </li>
        </ul>
        <div class="container">
            <div v-show="Type == 1">
                <CustomerCity></CustomerCity>
            </div>
            <div v-show="Type == 2">

            </div>
        </div>
    </div>
    <div v-else>
        <ul class="mint-navbar" >
            <li>
                <p class="p1">
                    <svg>
                        <use :xlink:href="Type==1 ? '#icon-group-client-allCountry-1': '#icon-group-client-allCountry-0'"/>
                    </svg>
                    <span class="active">全国</span>
                </p>
            </li>
        </ul>
        <div class="container">
            <div>
                <CustomerCity></CustomerCity>
            </div>
        </div>
    </div>
</template>

<script>
    import CustomerCity from "../../../components/modules/Extension/UnSureCityCell";//省市公司
    export default {
        name: "CustomerShiTab",
        components:{
            CustomerCity
        },
        data(){
            return {
                Type:1
            }
        },
        computed:{
            state(){
                return this.$store.state.CURRENTUSER.state
            }
        },
        methods:{
            changeType(value){
                this.Type = value
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        padding-bottom: .5rem;
    }
    .mint-navbar {
        width: 50%;
        margin-left: .2rem;
        margin-top: .1rem;
        margin-bottom: .05rem;
        li {
            margin-right: .6rem;
        }
    }
    .p1 {
        display: flex;
        height: .5rem;
        align-items: center;
        svg {
            width: .38rem;
            height: .38rem;
        }
        span {
            margin-left: .15rem;
            font-size: .32rem;
            color: #999999;
        }
        .active {
            color: #333;
        }
    }
</style>