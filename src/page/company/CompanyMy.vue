<template>
	<div id="CompanyUser">
		<HeaderTop></HeaderTop>
		<div class="user-information">
			<div class="user-main-info">
				<div class="avatar">
					<img src="../../images/my/user_default.png">
				</div>
				<div class="name">
					<p>{{userInfo.userName}}</p>
					<p id='U_phone'>{{userInfo.userTel}}</p>
				</div>
			</div>
		</div>
		<div class="my-list">
			<clxsd-cell :title="'活动卷'" :to="'/develop'" is-link icon="global-my-coupon"/>
			<clxsd-cell :title="'我的消息'" :to="'/company-message'" is-link icon="my-message"/>
			<clxsd-cell :title="'地址管理'" :to="'/address'" is-link icon="global-my-address"/>
		</div>
		<foot></foot>
	</div>
</template>

<script>
	import foot from "@/page/company/CompanyFooterNav.vue";
	import HeaderTop from "@/page/company/CompanyHeader.vue";
	import { mapState } from "vuex";
	import ClxsdCell from '@/components/common/Cell';
	export default {
		name: "CompanyUser",
		components: {
			foot,
			HeaderTop,
			ClxsdCell
		},
		computed:{
            ...mapState({
                userInfo: state => {
                    const currentInfo = state.CURRENTUSER
                    const configInfo = state.CONFIG       
                    return {
                        userName: currentInfo.display_name || currentInfo.real_name || currentInfo.phone || '丢失信息',
                        userTel: 　currentInfo.phone || '丢失信息',
                    }

                },
            })
        }
	}
</script>

<style lang="scss" scoped>
	.m-style-svg {
		width: 16px;
		height: 16px;
	}
	
	.user-information {
		background: rgb(45, 162, 255);
		padding: .3rem .3rem;
	}
	
	.user-information {
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		flex-direction: column;
	}
	
	.user-information .user-main-info,
	{
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		flex-direction: row;
		position: relative;
	}
	
	.user-main-info .avatar {
		width: 1rem;
		height: 1rem;
		border-radius: 100%;
		overflow: hidden;
		margin-right: .2rem;
	}
	
	.user-main-info .avatar img {
		width: 1rem;
		height: 1rem;
	}
	
	.user-main-info .name {
		width: 56%;
	}
	
	.user-main-info .name p {
		color: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		letter-spacing: 1px;
		width: 60%;
		&:nth-child(1) {
			font-size: .32rem;
			line-height: 150%;
			padding-top: .1rem;
		}
		&:nth-child(2) {
			font-size: .22rem;
			opacity: .6;
		}
	}
	.my-list {
		margin-top: .2rem;
		.clxsd-cell {
			margin-bottom: .2rem;
		}		
	}
</style>