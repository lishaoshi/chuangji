<template>
    <div class="businessPage">
		<div style="height:.32rem;background: #2da2ff;"></div>
		<header :class="{ activeFull: isFullScreen }">{{userInfo.companyName || '未认证'}}</header>
		<div class="user-information">
			<div class="user-main-info">
				<div>
					<div class="avatar">
						<img src="../../images/my/user_default.png" v-if="userInfo.userLogo == ''">
						<img :src="userInfo.userLogo" v-else>
					</div>
					<div class="name">
						<p>{{userInfo.userName}}</p>
						<p id='U_phone'>{{userInfo.userTel}}</p>
					</div>
				</div>
				<div class="code" @click="to('/role-extension', true)">
					<svg>
						<use xlink:href="#icon-my-promotion" />
					</svg>
					<p>业务推广</p>
				</div>
			</div>
			<router-link to="/lianshu">  
				<div style="margin-top: .3rem;">
					<div class="line"></div>
					<div class="account">
						<p>联数(包)</p>
						
						<p id="U_gold_value" class="lianshuNum">{{lianBeiValue | display_price(2)}}</p>
					
					</div>
				</div>
			 </router-link>
		</div>
		<div class="contentBottom">
			<PullRefresh @refresh="refresh" class="myInfoPage">
				<div class="my-list">
					<!-- <clxsd-cell :title="'我的资产'" :to="'/my-assets'" is-link icon="business-myAsset" :value="userInfo.lianPiaoVaule" /> -->
					<clxsd-cell title="关注收藏" :to="'/my-follow'" is-link icon="my-attention" />
					<div @click="authToRouter('/develop')">
						<clxsd-cell title="工业订单" icon="my-ordering" />
					</div>
				</div>
				<ul class="my-list">
					<clxsd-cell :title="'集采返利'" :to="'/ticket-list'" is-link icon="my-banknote" :value="userInfo.lianPiaoVaule" />
					<clxsd-cell :title="'增值理财'" :to="'/develop'" is-link icon="global-my-financing" />
					<clxsd-cell :title="'授信借贷'" :to="'/develop'" is-link icon="my-loan" />
				</ul>
				<ul class="my-list" style="margin-bottom: .2rem">
					<clxsd-cell title="公司信息" :to="'/company-info'" is-link icon="my-companyMessage" :value="userInfo.infoText"/>
					<clxsd-cell :title="'地址管理'" :to="'/address'" is-link icon="my-address" />
					<clxsd-cell :title="'设置'" :to="'/setting'" is-link icon="my-setting" />
				</ul>
			</PullRefresh>
        	<br>
		</div>
		

        <clxsd-foot-guide :user-type="2" />
    </div>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	import ClxsdCell from '@/components/common/Cell';
	export default {
		name: "page-business-my",
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
		computed: {
			...mapState({
				userInfo: state => {
                    const currentInfo = state.CURRENTUSER.data
                    const configInfo = state.CONFIG
                    let companyName = '未认证'
                    let infoText = '未上传资质'
					let userLogo = ''
					let shop_supplier = {}	
                    if(currentInfo['certification']){
                        console.log(111)
                        if(0 === currentInfo['certification']['status']){
                            infoText = '正在审核中...'
                        }else if(2 === currentInfo['certification']['status']){
                            infoText = '审核失败...'
                        }
                    }
                    if(currentInfo['shop_supplier']){
                        infoText=''
						companyName = currentInfo['shop_supplier']['display_name'] || currentInfo['shop_supplier']['name']
						shop_supplier = currentInfo.shop_supplier
                    }
                    if(currentInfo.avatar!=null){
                        userLogo = currentInfo.avatar
                    }
                    return {
                        userName: currentInfo.display_name || currentInfo.real_name || currentInfo.phone || '丢失信息',
                        userTel: 　currentInfo.phone || '丢失信息',
                        companyName,
                        infoText,
						userLogo,
                        shop_supplier
                    }

				},
			})
		},
        created(){
            this.initData()
        },
        methods:{
            initData(callback){
                this.$http.get('lianbei/list')
                    .then(response => {
                        const { data } = response;
                        if(data){
                            this.lianBeiValue = data.income-data.expenditure;
                            this.currentValue = data.currentValue
                        }
                        if(callback){
                            callback();
						}
                    }).catch(err => {

                })
            },
            refresh(callback){
				//this.$store.dispatch("fetchUserInfo");
				this.fetchUserInfo()
                this.initData(callback);
			},
			...mapActions([
				'fetchUserInfo'
			]),
			async to(path, flag=false) {
                if(flag) {
                    if(!this.userInfo.shop_supplier) {
                        //  debugger
                        await this.$messagebox.confirm('',{
                            title: '提示',
                            message:'没有操作权限,请先完成认证',
                            confirmButtonText: '去认证'
                        }).then(action => {
                            if (action === 'confirm') {
                                this.$router.push('/company-info')
                            }
                        }).catch(err => err);
                    } else {
                        this.$router.push({path})
                    }
                } else {
                     this.$router.push({path})
                }
            },
        }
	}
</script>

<style lang="scss" scoped>
.myInfoPage {
	display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    height: 100%;
}
.businessPage {
	display: flex;
	flex-direction: column;
	.contentBottom {
		flex:1;
	}
}
	header {
		background: rgb(45, 162, 255);
		color: #fff;
		text-align: center;
		font-size: .34rem;
		line-height: .76rem;
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
	.user-main-info {
		display: flex;
		padding: 0 .3rem;
		align-items: center;
		& > div:first-child {
			display: flex;
			flex:1;
			align-items: center;
		}
		& > div:last-child {
			// a {
				display: inline-flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			// }
			
		}
	}

	.user-main-info .code svg {
		width: .55rem;
		height: .55rem;
		// margin-bottom: .12rem;
	}

	.code p {
		font-size: .22rem;
		color: #fff;
		margin-top: .1rem;
        // line-height: 1;
	}

	.user-main-info .avatar {
		// margin-left: .3rem;
		margin-right: .28rem;
		border: .08rem solid rgb(150, 209, 255);
		height: 1.36rem;
		border-radius: 3px;
        background:rgb(150, 209, 255) ;
	}
	.user-main-info .name {
		flex: 1;
	}

	.user-main-info .avatar img {
		border-radius: 3px;
		width: 1.2rem;
		height: 1.2rem;

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
	}

	.user-main-info .name p:nth-child(2) {
		font-size: .28rem;
        margin-top: .28rem;;
	}
	.line {
		height: 1px;
		width: 100%;
		background: #fff;
		opacity: 0.2;
	}
	.account {
		display: flex;
		height: 1rem;
		padding: 0 .3rem;
		align-items: center;
		justify-content: space-between;
		color: #fff;
		font-size: .24rem;
		
		.lianshuNum {
			font-size: .44rem;
		}
	}

	// .info-bottom {
	// 	text-align: center;
	// 	padding:.35rem 0px
	// }

	// .info-bottom .account,
	// .info-bottom .lianbei {
	// 	width: 48%;
	// }

	// .info-bottom .line {
	// 	width: 1px;
	// 	height: 0.5rem;
	// 	background: #9ccbf0;
	// 	margin: auto 0;
	// }

	// .info-bottom .account p:nth-child(1),
	// .info-bottom .lianbei p:nth-child(1) {
	// 	font-size: .24rem;
	// 	color: rgba(255, 255, 255, 0.6);
	// 	margin-bottom: .12rem;
	// }

	// .info-bottom .account p:nth-child(2),
	// .info-bottom .lianbei p:nth-child(2) {
	// 	font-size: .42rem;
	// 	color: rgb(255, 255, 255);
	// }

	.my-list {
		margin-top: .2rem;
	}
	
</style>

<style lang="scss">
.clxsd-pull-present-box {
		// display: flex!important;
	}
</style>
