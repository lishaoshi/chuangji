<template>
	<div id="Settings">
		<div id="Address">
			<clxsd-head-top :title='`设置`'></clxsd-head-top>
		</div>
		<ul class="my-list">
            <div v-if="userInfo.user_type===4 && (userInfo.sub_type === 3 || userInfo.sub_type === 2)">
                <clxsd-cell :title="'添加收款微信二维码'" :to="'/weixin-add'" is-link/>
            </div>
            <div v-if="userInfo.user_type===1 || userInfo.user_type===2 || userInfo.user_type===3">
                <clxsd-cell :title="'个人信息'" :to="'/user/info'" is-link/>
            </div>
		</ul>
		<ul class="my-list">
			<!--<clxsd-cell :title="'安全设置'" :to="'/user/safe-info'" is-link/>-->
			<clxsd-cell :title="'修改密码'" :to="'/user/login-password-change'" is-link/>
		</ul>
		<ul class="my-list">
			<clxsd-cell :title="'问题求助'" :to="'/question'" is-link  v-if="!userInfo.user_type===4"/>
			<clxsd-cell :title="'我要反馈'" :to="'/feedback'" is-link/>
			<clxsd-cell :title="'关于我们'" :to="'/about-us'" />
		</ul>
		<ul class="my-list icon-none" @click="loginChange">
            <p class="login-out">退出登陆</p>
		</ul>
	</div>

</template>

<script>
	import ClxsdCell from '@/components/common/Cell';
    import { mapState } from "vuex";
	export default {
		name: "Settings",
		data() {
			return {

			}
		},
		components:{
            ClxsdCell
        },
        computed: {
            ...mapState({
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER.data
                    return {
                        userName: currentInfo.display_name || currentInfo.real_name || currentInfo.phone || '丢失信息',
                        userTel: 　currentInfo.phone || '丢失信息',
                        //role: currentInfo
                        user_type: currentInfo.user_type,
                        sub_type: currentInfo.sub_type,
                    }

                },
            })
        },
		methods: {
			loginChange: function() {

				this.$messagebox.confirm("确定要切换账号吗?").then(action => {
					// console.
				    if('confirm' === action){
						// debugger
						console.log('action')
						// return
                        this.$store.dispatch('SIGN_OUT');
                        // this.$router.push('/home')
					}
				}).catch(err => err);


			},
		}
	}
</script>

<style lang="scss" scoped>
	.my-list {
		font-size: .3rem;
		line-height: .8rem;
		background: #fff;
		margin-top: 10px;
		li {
			border-bottom: 1px solid #f1f1f1;
			position: relative;
			padding: 0 10px;
			background: url(../images/my/right_cowry.png) no-repeat right;
			background-position-x: 97.4%;
			background-size: 5px 10px;
			img {
				width: 15px;
				position: relative;
				display: inline-block;
				top: 4px;
			}
			span {
				color: #333;
				padding-left: 6px;
			}
			samp {
				color: #ccc;
				padding-right: 5%;
				float: right;
				font-size: 12px;
			}
		}
	}
	.icon-none {
		li {
			background: none;
		}
	}
    .login-out {
        text-align: center;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        font-size: .34rem;
    }
</style>