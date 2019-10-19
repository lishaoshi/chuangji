<template>
        <div id="PaySuccess">
            <mt-header title="支付成功">
                <router-link to="/UnautMy-us" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <svg class="icon">
                <use xlink:href="#icon-IsCheckedShop-open"/>
            </svg>
            <p class="p1">支付成功</p>
            <p class="p2">您已经支付成功，请联系您的收款者开通权限<br>请耐心等待</p>
            <!--
            <a href="tel:xxxx">
                {{name}} {{phone}}
            </a>
            -->
        </div>

</template>

<script>
    export default {
        name: "PaySuccess",
        data(){
            return {
                name:'',
                phone:''
            }
        },
        methods:{
            async initData(){
                const {data} = await  this.$http.get('user-empower/info');
                if(data.id){
                    this.name = data.user.display_name || data.user.real_name;
                    this.phone = data.user.phone;
                }
            },
        },
        created(){
            this.initData();
        }
    }
</script>

<style lang="scss" scoped>
    #PaySuccess {
        text-align: center;
        svg {
            width: 1.5rem;
            height: 1.5rem;
            margin-top: 2.4rem;
        }
        .p1 {
            font-size: .3rem;
            line-height: 2.6;
        }
        .p2 {
            font-size: .24rem;
            color: rgb(153,153,153);
            line-height: 1.8;
        }
        /*
        a {
            background: #f1f1f1;
            width: 6rem;
            height: .72rem;
            line-height: .72rem;
            display: inline-block;
            font-size: .28rem;
            color: rgb(45,162,255);
            text-align: center;
            margin-top: 1rem;
        }

         */
    }
</style>