<template>
	<div id="MyInfo">
		<mt-header title="个人信息">
			<router-link to="/my/setting/settings" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
			<router-link to="/my/setting/EditMyInfo" slot="right">
				<span>编辑</span>
			</router-link>
		</mt-header>
		<mt-cell title="个人头像" is-link>
			<span><img src="../../../images/cert_user.png" width="35" height="35" to="/my"></span>
		</mt-cell>
		<mt-cell title="实名认证">
			<span>{{userName}}</span>
		</mt-cell>
		<mt-cell title="手机号" is-link>
			<span>{{userTel}}</span>
		</mt-cell>
		<mt-cell title="身份证号">
			<span>{{userId}}</span>
		</mt-cell>
		<div class="hint">
		    <p>请认真填写，一经填写<i>不可修改</i></p>
		</div>
		<mt-cell title="企业名称">
			<span>{{companyName}}</span>
		</mt-cell>
		<mt-cell title="企业类型">
			<span>{{companyType}}</span>
		</mt-cell>
		<mt-cell title="企业地址">
			<span>{{companyAddress}}</span>
		</mt-cell>
	</div>
</template>

<script>
	export default {
		name: "MyInfo",
		data() {
			return {
				userName: '张无忌',
				userTel: '15237367722',
				userId: '',
				companyName: '前海创联',
				companyType: '',
				companyAddress: '河南郑州'
			}

		},
		methods: {
			getInfo() {
				this.$http.get('user', {
					validateStatus: status => status == 200,
				}).then(response => {
					console.log(response.data);
					this.userName = response.data.display_name || response.data.name || response.data.phone;
					this.userTel = response.data.phone;
					
				}).catch(response => {
					console.log(response);
				});
			},
			getLianValue() {

			},
		},
		mounted: function() {
			// GET /someUrl
			this.getInfo();
			this.getLianValue();
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
</style>