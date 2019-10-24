<template>
    <div>
        <PullRefresh @refresh="refresh">
            <header :class="{ activeFull: isFullScreen }">{{userInfo.companyName || '未认证'}}</header>
            <div class="user-information">
                <div class="user-main-info">
                    <div>
                         <div class="avatar">
                            <img src="../../images/my/user_default.png" v-if="userInfo.userLogo==''">
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
                <!--
                <div class="info-bottom">
                    <div class="account">
                        <p>联数(包)</p>
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
                -->
            </div>
            <!-- 列表 -->
            <div class="my-list" style="margin-top:0px ">
                <!--<clxsd-cell :title="'业务推广'" :to="'/role-extension'" is-link icon="my-businessPromotion"/>-->
                <clxsd-cell :title="'关注收藏'" :to="'/my-follow'" is-link icon="my-attention"/>
            </div>
            <!--
            <div class="my-list">
                <div @click="authToRouter('/factory-order')">
                    <clxsd-cell title="工业订单"  icon="my-businessOrding"/>
                </div>
                <div @click="authToRouter('/business-order')">
                    <clxsd-cell title="商业订单" icon="my-ordering"/>
                </div>

                <div @click="authToRouter('/develop')">
                    <clxsd-cell title="集采定制" icon="my-collection"/>
                </div>
            </div>
            -->
            <div class="my-list">
                <clxsd-cell :title="'集采返利'" :to="'/ticket-list'" is-link icon="my-banknote" :value="userInfo.lianPiaoVaule"/>
                <clxsd-cell :title="'增值理财'" :to="'/develop'" is-link icon="global-my-financing"/>
                <clxsd-cell :title="'授信借贷'" :to="'/develop'" is-link icon="my-loan"/>
            </div>
            <div class="my-list" style="margin-bottom: .2rem">
                <clxsd-cell :title="'公司信息'" :to="'/company-info'" is-link icon="my-companyMessage" :value="userInfo.infoText"/>
                <clxsd-cell :title="'地址管理'" :to="'/address'" is-link icon="my-address"/>
                <clxsd-cell :title="'设置'" :to="'/setting'" is-link icon="my-setting"/>
            </div>
        </PullRefresh>
        <clxsd-foot-guide :user-type="3"/>
    </div>
</template>

<script>
    import ClxsdCell from '@/components/common/Cell';
    import { mapState, mapActions } from "vuex";
    export default {
        name: "page-lianshuo-my",
        components:{
            ClxsdCell
        },
        data(){
            return {
                currentValue:0.00,
                lianBeiValue:0.00,
                userLogo: '',
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
                    let shop_supplier = {}		

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
                // /user
                // Promise.all([this.$http.get('lianbei/info'),this.$http.get('user')]).then(res=>{
                //     // console.log(res)
                //     let lianbeiData = res[0].data
                //     let userData = res[1].data
                //     this.lianBeiValue = lianbeiData.value;
                //     this.currentValue = userData.currentValue
                    
                // })
               
                this.$http.get('lianbei/info')
                    .then(response => {
                        const { data } = response;
                        if(data){
                            this.lianBeiValue = data.value;
                            this.currentValue = data.currentValue
                        }
                        if(callback){
                            callback();
                        }
                    }).catch(err => {

                })
            },
            async to(path, flag=false) {
                if(flag) {
                    if(JSON.stringify(this.userInfo.shop_supplier)=="{}") {
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
            refresh(callback){
                //this.$store.dispatch("fetchUserInfo");
                this.initData(callback);
                 this.fetchUserInfo()
            },
            ...mapActions(
                ['fetchUserInfo']
            )
        }
    }
</script>


<style lang="scss" scoped>
	header {
		background: rgb(45, 162, 255);
		color: #fff;
		text-align: center;
		font-size: .36rem;
		line-height: .76rem;
        font-weight: bold;
	}

	.user-information {
		background: rgb(45, 162, 255);
		padding-top: .12rem;
        padding-bottom: .4rem;
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
			a {
				display: inline-flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
		}
	}

	.user-main-info .code {
        text-align: center;
        // width: 1rem;
	}

	.user-main-info .code svg {
		width: .55rem;
		height: .55rem;
	}

	.code p {
        font-size: .22rem;
        color: #fff;
        // line-height: 90%;

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
		// width: 56%;
        flex:1;
	}

	.user-main-info .name p {
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
	}

	.user-main-info .name p:nth-child(1) {
		// line-height: 180%;
        font-size: .34rem;
	}

	.user-main-info .name p:nth-child(2) {
		font-size: .28rem;
        margin-top: .28rem;
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
		font-size: .28rem;
		color: rgb(255, 255, 255);
	}

	.my-list {
		margin-top: .2rem;
	}
    .activeFull {
        padding-top: 32px;
    }
</style>
