<template>
    <div id="ExtensionPay">
        <CircleLoading v-if="loading" />
        <clxsd-head-top title='开启权限'></clxsd-head-top>
        <div class="info">
            <img :src="imgSrc" width="20%" v-if="imgSrc"/>
            <img src="../../images/extension/logo.png" width="20%" v-else>
            <p>{{name}}</p>
        </div>
        <ul class="choice-list">
            <li v-if="role ==='promoter' || role === 'partner'" @click="handleClickPayType('wechat')">
                <svg class="icon1">
                    <use xlink:href="#icon-promote-pay-WeChat"/>
                </svg>
                <span>微信支付</span>
                <svg class="icon-choice">
                    <use :xlink:href="payType ==='wechat' ? '#icon-IsCheckedShop-open':'#icon-IsCheckedShop-close'"/>
                </svg>
            </li>
            <li @click="handleClickPayType('lianbei')">
                <svg class="icon1">
                    <use xlink:href="#icon-promote-pay-cell"/>
                </svg>
                <span>联贝支付</span>
                <svg class="icon-choice">
                    <use :xlink:href="payType ==='lianbei' ? '#icon-IsCheckedShop-open':'#icon-IsCheckedShop-close'"/>
                </svg>
            </li>
            <li @click="handleClickPayType('xianjin')">
                <svg class="icon1">
                    <use xlink:href="#icon-promote-pay-cash"/>
                </svg>
                <span>现金支付</span>
                <svg class="icon-choice">
                    <use :xlink:href="payType ==='xianjin' ? '#icon-IsCheckedShop-open':'#icon-IsCheckedShop-close'"/>
                </svg>
            </li>
        </ul>
        <p class="error-info">* 请核实收款人信息，再进行支付</p>
        <div class="fade"></div>
        <div class="foot">
        	<button class="btn" :disabled="!payType" :class="payType ? 'active':''" @click="toPay">{{buttonTitle}}</button>
        </div>
        <PayPassword v-if="showPay" ref="payPassword"
                     @backFnc="showPay=false"
                     @keyUpHandle="payPasswordComputed"/>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import CircleLoading from "@/icons/CircleLoading";
    import PayPassword from "@/components/common/PayPassword";
    export default {
        name: "ExtensionPay",
        components: {CircleLoading,PayPassword},
        data(){
            return {
                payType:null,
                buttonTitle:'去支付',
                loading: false,
                name:'重庆云健通科技有限公司',
                imgSrc:null,
                promoterTypeData:null,
                showPay:false,
            }
        },
        computed:{
            ...mapState({
                USER_CHOOSED_DATA: state => state.USER_CHOOSED_DATA
            }),
            role(){
                return this.USER_CHOOSED_DATA.selected_role;
            },
            selectedSaveData(){
                return this.USER_CHOOSED_DATA.selected_save_data
            }
        },
        created(){
            if(!this.role){
                this.$router.push('/home');
                return;
            }
            this.initData();

        },
        methods:{
            initData(){
                this.loading = true;
                this.$http.get('user-permission/promoter-data',{params:{
                        role:this.role,
                        data:JSON.stringify(this.USER_CHOOSED_DATA.selected_save_data),
                    }})
                    .then(response => {
                        if(response.data.name){
                            this.name = response.data.name;
                        }
                        if(response.data.imgSrc){
                            this.imgSrc = response.data.imgSrc;
                        }

                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                })

            },
            toPay(){
                if(this.loading) return;
                let params = {
                    role:this.role,
                    data:JSON.stringify(this.USER_CHOOSED_DATA.selected_save_data),
                    payType:this.payType,
                };
                if(this.payType === 'xianjin'){
                    this.$messagebox.confirm('确定使用现金已支付！').then(action => {
                        if(action === 'confirm'){
                            this._toPayXianjin(params);
                        }
                    });
                }else if(this.payType === 'lianbei'){
                    this._toPayLianBei(params);
                }
            },
            _toPayXianjin(params){
                this.loading = true;

                this.$http.get('user-permission/make-sure',{
                    params,
                    validate: state => state === 200
                }).then(response => {
                    this.loading = false;
                    this.$store.dispatch('fetchUserInfo');
                    this.$router.push('/customer-choose-role');
                }).catch(error => {
                    this.loading = false;
                    this.$toast(error.response.data.message);
                })
            },
            _toPayLianBei(params){
                this.loading = true;
                this.$http.get('user-permission/make-sure',{
                    params,
                }).then(response => {
                    this.loading = false;
                    if(response.data.can){
                        this.showPay = true;
                    }

                }).catch(error => {
                    this.loading = false;
                    this.$toast(error.response.data.message);
                })
            },
            payPasswordComputed(data){
                if(data.length === 6){
                    let params = {
                        role:this.role,
                        data:JSON.stringify(this.USER_CHOOSED_DATA.selected_save_data),
                        payType:this.payType,
                        password:data.join('')
                    };
                    this.showPay = false;
                    this.loading = true;
                    this.$http.post("user-permission/lianbei-pay",params,{
                        validate: status => status === 204
                        })
                        .then(response => {
                            this.loading = false;
                            this.$store.dispatch("fetchUserInfo");
                            this.$router.push('/pay-success');
                        }).catch(error => {
                            this.$toast(error.response.data.message);
                            this.loading = false;
                            this.password = [];
                            this.showPay = true;

                        });

                }
            },
            handleClickPayType(value){
                if(this.loading) return;
                this.loading = true;
                this.$http.get('user-permission/uncheck',{
                    params:{
                        role:this.role,
                        data:JSON.stringify(this.USER_CHOOSED_DATA.selected_save_data),
                        payType:value,
                    },
                }).then(response => {
                    if('xianjin' === value){
                        this._handleXianJin(response)
                    }
                    if('lianbei' ===value){
                        this._handleLianBei(response)
                    }
                    if('wechat' === value){
                        this._handleWechat(response)
                    }
                    this.loading = false;
                    this.payType = value;

                }).catch(error => {
                    this.loading = false;
                    this.$toast(error.response.data.message);
                });


            },
            _handleXianJin(response){
                this.buttonTitle = '我已支付'+ parseFloat(response.data.value).toFixed(2) +'元';
            },
            _handleLianBei(response){
                this.buttonTitle = '确认支付'+ parseFloat(response.data.value).toFixed(2) +'贝';
            },
            _handleWechat(response){
                this.buttonTitle = '确认支付'+ parseFloat(response.data.value).toFixed(2) +'元';
            }
        },

    }
</script>

<style lang="scss" scoped>
    #ExtensionPay {
        min-height: 100%;
        background: #fff;
    }
    .error-info {
        color: #fa5452;
        font-size: .28rem;
        padding-left: .4rem;
        margin-top: .2rem;
    }
    .info {
        text-align: center;
        padding-top: .6rem;
        font-size: .32rem;
        line-height: 2
    }
    .choice-list {
        margin-top: 1rem;
        li {
            height: 1.2rem;
            border-bottom: 1px solid #f1f1f1;
            display: flex;
            padding: 0 .2rem;
            align-items: center;
            .icon1 {
                width: .45rem;
                height: .45rem;
            }
            svg {
                width: .3rem;
                height: .3rem;
            }
            span {
                padding-left: 3%;
                width: 87%;
            }
        }
    }
    .fade {
    	height: 1.4rem;
    }
    .foot {
    	padding: .1rem .24rem;
    	position: absolute;
    	width: 100%;
    	background: #fff;
    	border-top: 1px solid #f1f1f1;
    	bottom: 0px;
    	text-align: center;
    	
    }
    .btn {
        color: #fff;
        width: 100%;
        font-size: .3rem;
        text-align: center;
        height: .76rem;
        border-radius: .76rem;
        &:disabled {
            background: #ccc;
        }
    }
    .btn.active{
        background: #26a2ff;
    }
    .tui-list {
    	margin-top: 1rem;
    	padding-left: .24rem;
    	li {
    		display: inline-block;
    		width: 2.1rem;
    		height: 2.6rem;
    		background: rgb(241,248,251);
    		text-align: center;
    		margin-right: .24rem;
    		border-radius: 5px;
    		margin-bottom: .24rem;
            position: relative;
    		img {
    			width: .68rem;
    			height: .68rem;
    			margin-top: .4rem;
    		}
    		.title {
    			font-size: .3rem;
    			color: rgb(51,51,51);
    			line-height: 2;
    		}
    		.gray {
    			color: #ccc;
    			font-size: .2rem;
    		}
            svg {
                display: none;
            }
            .active {
                position: absolute;
                width: .45rem;
                height: .28rem;
                top:0px;
                right: 0px;
                display: block;
            }
    	}
    }
</style>