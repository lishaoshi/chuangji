<template>
        <div id="PaySuccess">
            <mt-header title="申请通知">
                <div slot="left"  @click="handleBack">
                    <mt-button icon="back"></mt-button>
                </div>
            </mt-header>
            <svg class="icon">
                <use xlink:href="#icon-IsCheckedShop-open"/>
            </svg>
            <p class="p1">申请成功</p>
            <p class="p2">我们已收到您的申请，请耐心等待哟</p>
            <!--
            <a href="tel:xxxx">
                {{name}} {{phone}}
            </a>
            -->
        </div>

</template>

<script>
import {mapState} from 'vuex'
    export default {
        name: "PaySuccess",
        data(){
            return {
                name:'',
                phone:''
            }
        },
        computed: {
            ...mapState({
                userType: state => state.CURRENTUSER.data.user_type
            })
        },
        methods:{
            async initData(){
                const {data} = await  this.$http.get('user-empower/info');
                if(data.id){
                    this.name = data.user.display_name || data.user.real_name;
                    this.phone = data.user.phone;
                }
            },
            // 点击返回按钮
            handleBack() {
                if(this.userType!=4) {
                    this.$router.push('/role-extension')
                } else {
                    this.$router.push('/UnautMy-us')
                }
            }
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