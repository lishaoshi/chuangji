<template>
    <div>
    <PullRefresh @refresh="refresh" class="myInfoPage">
        <header :class="{ activeFull: isFullScreen }">{{userInfo.companyName || '未认证'}}</header>
        <div class="user-information">
            <div class="user-main-info">
                <div class="avatar">
                    <img src="../../images/my/user_default.png" v-if="userInfo.userLogo==''">
                    <img :src="userInfo.userLogo" v-else>
                </div>
                <div class="name">
                    <p>{{userInfo.userName}}</p>
                    <p id='U_phone'>{{userInfo.userTel}}</p>
                </div>
                <div class="code">
                    <router-link to="/develop">
                        <svg>
                            <use xlink:href="#icon-my-promotion" />
                        </svg>
                        <p>业务推广</p>
                    </router-link>
                </div>
            </div>
            <div class="info-bottom">
                <div class="account">
                    <p>价值(RMB)</p>
                    <p id="U_gold_value">{{currentValue | display_price(3)}}</p>
                </div>
                <div class="line">
                </div>
                <div class="lianbei">
                    <router-link to="/lianbei">
                        <p>联贝(CLB)</p>
                        <p id='U_gold'>{{lianBeiValue | display_price}}</p>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- 列表 -->
        <ul class="my-list">
            <clxsd-cell :title="'业务推广'" :to="'/role-extension'" is-link icon="my-businessPromotion"/>
        	<clxsd-cell :title="'应收货款'" :to="'/develop'" is-link icon="my-ayment" />
        </ul>
        <ul class="my-list">
            <div @click="authToRouter('/factory-service-order')">
                <clxsd-cell title="当日订单"  icon="my-ordering" />
            </div>
            <div @click="authToRouter('/platform-index')">
                <clxsd-cell title="平台管理" icon="my-manage" />
            </div>
            <div @click="authToRouter('/product-spread')">
                <clxsd-cell title="产品推广" icon="my-popularize" />
            </div>
        </ul>
        <ul class="my-list">
        	<clxsd-cell :title="'增值理财'" :to="'/develop'" is-link icon="global-my-financing" />
			<clxsd-cell :title="'授信借贷'" :to="'/develop'" is-link icon="my-loan" />
        </ul>
        <ul class="my-list">
        	<clxsd-cell :title="'我的员工'" :to="'/develop'" is-link icon="my-employee" />
			<clxsd-cell :title="'消息记录'" :to="'/develop'" is-link icon="my-message" />
			<clxsd-cell :title="'下载记录'" :to="'/develop'" is-link icon="my-downloadRecord" />
			<clxsd-cell :title="'客服服务'" :to="'/develop'" is-link icon="my-customService" />
        </ul>
        <ul class="my-list" style="margin-bottom: .2rem">
            <clxsd-cell :title="'公司信息'" :to="'/company-info'" is-link icon="my-companyMessage" :value="userInfo.infoText"/>
			<clxsd-cell :title="'地址管理'" :to="'/address'" is-link icon="my-address" />
			<clxsd-cell :title="'设置'" :to="'/setting'" is-link icon="my-setting" />
        </ul>

    </PullRefresh>
        <clxsd-foot-guide :user-type="1"/>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    import ClxsdCell from '@/components/common/Cell';

    export default {
        name: "page-factory-my",
        components: {
			ClxsdCell
		},
        data(){
            return {
                currentValue:0.00,
                lianBeiValue:0.00,
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
            }
        },
        computed:{
            ...mapState({
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER.data
                    const configInfo = state.CONFIG
                    let companyName = '未认证'
                    let infoText = '未上传资质'
                    let userLogo = ''
                    if(currentInfo['certification']){
                        if(0 === currentInfo['certification']['status']){
                            infoText = '正在审核中...'
                        }else if(2 === currentInfo['certification']['status']){
                            infoText = '审核失败...'
                        }
                    }
                    if(currentInfo['shop_supplier']){
                        infoText=''
                        companyName = currentInfo['shop_supplier']['display_name'] || currentInfo['shop_supplier']['name']
                    }
                    if(currentInfo.avatar!=null){
                        userLogo = currentInfo.avatar
                    }
                    return {
                        userName: currentInfo.display_name || currentInfo.real_name || currentInfo.phone || '丢失信息',
                        userTel: 　currentInfo.phone || '丢失信息',
                        companyName,
                        infoText,
                        userLogo
                    }
                },
            })
        },
        created(){
            this.initData()
        },
        methods:{
            initData(callback){
                this.$http.get('lianbei/info')
                    .then(response => {
                        const { data } = response;
                        if(data){
                            this.lianBeiValue = data.value;
                            this.currentValue = data.currentValue
                        }
                        if(callback){callback()}
                    }).catch(err => {

                })
            },
            refresh(callback){
               this.$store.dispatch("fetchUserInfo");
                this.initData(callback);
            }
        }
    }
</script>


<style lang="scss" scoped>
    .activeFull {
        padding-top: 32px;
    }
    .myInfoPage {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        height: 100%;
    }
	header {
		background: rgb(45, 162, 255);
		color: #fff;
		text-align: center;
		font-size: .37rem;
		line-height: .76rem;
        font-weight: bold;
	}

	.user-information {
		background: rgb(45, 162, 255);
		padding-top: .12rem;
	}

	.user-information {
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		flex-direction: column;
	}

	.user-information .user-main-info,
	.user-information .info-bottom {
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.user-main-info .code {
		position: absolute;
		right: .2rem;
		top: .15rem;
		text-align: center;
        width: 1rem;
	}

	.user-main-info .code svg {
		width: .55rem;
		height: .55rem;
	}

	.code p {
		font-size: .22rem;
		color: #fff;
		line-height: 90%;

	}

	.user-main-info .avatar {
		margin-left: .2rem;
		margin-right: .28rem;
		border: .08rem solid rgb(150, 209, 255);
		height: 1.36rem;
		border-radius: 3px;
        background:rgb(150, 209, 255) ;
	}

	.user-main-info .avatar img {
		border-radius: 3px;
		width: 1.2rem;
		height: 1.2rem;

	}

	.user-main-info .name {
		width: 56%;
	}

	.user-main-info .name p {
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 60%;
	}

	.user-main-info .name p:nth-child(1) {
		font-size: .34rem;
		margin-top: .23rem;
		line-height: 180%;
	}

	.user-main-info .name p:nth-child(2) {
		font-size: 12px;
	}

	.info-bottom {
		text-align: center;
		padding:.35rem 0px
	}

	.info-bottom .account,
	.info-bottom .lianbei {
		width: 48%;
	}

	.info-bottom .line {
		width: 1px;
		height: 0.5rem;
		background: #9ccbf0;
		margin: auto 0;
	}

	.info-bottom .account p:nth-child(1),
	.info-bottom .lianbei p:nth-child(1) {
		font-size: .24rem;
		color: rgba(255, 255, 255, 0.6);
		margin-bottom: .12rem;
	}

	.info-bottom .account p:nth-child(2),
	.info-bottom .lianbei p:nth-child(2) {
		font-size: .42rem;
		color: rgb(255, 255, 255);
	}

	.my-list {
		margin-top: .2rem;

	}
</style>
