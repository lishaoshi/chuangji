<template>
	<div id="MyInfo">
		<clxsd-head-top title='个人信息'></clxsd-head-top>
        <PullRefresh @refresh="refresh">
            <mt-cell title="个人头像" is-link  to="/change-logo" style="margin-top: .2rem;margin-bottom: .2rem">
                <span>
                    <img src="../../images/my/user_default.png" width="35" height="35" v-if="!userLogo">
                    <img :src="userLogo" v-else  width="35" height="35"/>
                </span>
            </mt-cell>
            <mt-cell title="角色类型" style="margin-bottom: .2rem" v-if="user_type!=3">
                <span>{{roleDesc}}</span>
            </mt-cell>
            <mt-cell title="实名认证">
                <span><svg class="icon1"><use xlink:href="#icon-global-footer-my-1"/></svg>{{userName}}</span>
            </mt-cell>
            <mt-cell title="手机号" is-link to="/change-phone">
                <span>{{userTel | filter_mobile}}</span>
            </mt-cell>
            <mt-cell title="身份证号">
                <span>{{userId | filter_idcard}}</span>
            </mt-cell>
        </PullRefresh>
	</div>
</template>

<script>
    import {mapState} from "vuex";
	export default {
		name: "MyInfo",
		data() {
			return {
				userName: '张无忌',
				userTel: '',
				userId: '',
				userLogo:'',
				roleDesc:'暂无角色类型',
                user_type:0,
			}

		},
		methods: {
			getInfo(callback) {
				this.$http.get('user', {
					validateStatus: status => status === 200,
				}).then(response => {
					console.log(response.data);
					this.userName = response.data.real_name || response.data.display_name || response.data.name || response.data.phone;
					this.userTel = response.data.phone;
					this.userId = response.data.user_identity;
					this.roleDesc = response.data.role_desc;
					this.userLogo = response.data.avatar;
					this.user_type = response.data.user_type;
                    if(callback)callback();
				}).catch(response => {
                    if(callback)callback();
					console.log(response);
				});
			},
            refresh(callback){
                this.getInfo(callback);
            }
		},
        created() {
		    this.getInfo()
        }
    }
</script>

<style type="scss" scoped="scoped">
		.hint{
            width: 100%;
            height:24px;
            display: flex;
            align-items: center;
            background:rgb(245,245,245);
        }
        .hint p{
            margin-left:15px;
            font-size: 12px;
            color: rgb(153,153,153);
        }
        .hint p i{
            color: rgb(255,181,64);
        }
        .mint-cell {
        	border-bottom: 1px solid #f1f1f1;
        }
        .icon1 {
        	width: 20px;
        	height: 20px;
        	border-radius: 90%;
        	margin-right: 5px;
        	top: 3px;
        	position: relative;
        }
</style>