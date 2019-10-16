<template>
	<div id="AddAddress">
		<clxsd-head-top title='编辑收货地址'></clxsd-head-top>
		<div style="background: #fff;padding: 0 .2rem">

			<div class="form-box">
				<span>收货人：</span>
				<input type="text" placeholder="请输入收货人姓名" v-model="consignee">
			</div>
			<div class="form-box">
				<span>手机号码：</span>
				<input type="tel" placeholder="请输入手机号码" v-model="tel">
			</div>
			<div class="form-box" @click="showAddressPicker">
				<span>收货地址：</span>
				<input placeholder="请选择收货地址" type="text" v-model="region" readonly="readonly" class="region-go formItem">
				<img src="../../images/my/rightSetting.png" class="img" />
			</div>
			<div class="form-box">
				<span>详细地址：</span>
				<textarea  placeholder="请输入详细地址:如街道，门牌号，单元室等" type="textarea" v-model="address"></textarea>
			</div>
		</div>
			<div class="address-box">
				<span>设置为默认地址</span>
				<mt-switch v-model="switch_checked" @change="turn">
				</mt-switch>
			</div>
			<mt-button type="primary" class="sub-btn" @click="onSave">确认修改</mt-button>
		<mt-popup v-model="regionVisible" position="bottom" class="bottom-region" style="width:100%;">
			<address-popup @listenAddressChange='addressChange' />
		</mt-popup>
	</div>
</template>
<script>
	import { mapState, mapActions, } from 'vuex'
	import { Picker } from 'mint-ui';
	import { getAddress,updateAddress } from '@/api/address.js'
	import AddressPopup from "@/components/AddressPopup"; //引入省市区数据
	import { Toast } from 'mint-ui';
	export default {
		name: 'AddAddress',
		components: {
			AddressPopup,
		},

		data() {
			return {
				consignee: '', //货人姓名
				tel: null, //手机号
				province: null, //省
				city: null, //市
				district: null, //区
				address: null, //详细街道
				is_default: 1, //是否是默认地址1是默认,0不是
				switch_checked: false,
				region: null, //省市区
				finished: false,
				regionVisible: false,
                addressId:this.$route.params.addressId,
			}
		},
		created() {
           // this.addressId = this.$route.params.addressId;
           // console.log("地址ID:" + this.addressId)
			this._initData();
		},
        watch: {
            $route(to) {
				debugger
                    this.addressId = to.params.addressId;
                    this._initData();
            }
        },
		methods: {

			async _initData(){
				if(this.addressId){
					const { data } = await getAddress(this.addressId)
                    //console.log(data)
                    this.consignee =data.consignee
                    this.tel = data.tel
                    this.region = data.province+data.city+data.district,
                    this.province = data.province
                    this.city = data.city
                    this.district = data.district
                    this.address = data.address
                    this.is_default = data.is_default
                    if(data.is_default){
                        this.switch_checked = true
                    }else {
                        this.switch_checked = false
                    }
				}
			},
			addressChange(data) {
				this.region = data.region
				this.province = data.province
				this.city = data.city
				this.district = data.area
				this.regionVisible = false
			},
			showAddressPicker() {
				this.regionVisible = true;
			},
			turn: function() {
				if(this.switch_checked == true) {
					this.is_default = 1
				} else {
					this.is_default = 0
				}
			},
			onSave() {
				//1. get data
				const {
					consignee,
					tel,
					province,
					city,
					district,
					address,
					is_default,
					region
				} = this.$data

				//2. validate
				if(consignee == '') {
					Toast('收货人姓名不能为空');
					return
				}
				if(consignee.length>6) {
					Toast('收货人姓名请填简写');
					this.consignee = ''
					return
				}
				if(tel == '') {
					Toast('手机号不能为空');
					return
				} else {
					var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
					if(!reg.test(this.tel)) {
						Toast('请填写正确的手机号');
						return
					}
				}
				if(region == '') {
					Toast('请选择收货地址');
					return
				}
				if(address == '') {
					Toast('请输入详细地址');
					return
				}
				//3. contruct data post
				const params = {
					consignee,
					tel,
					province,
					city,
					district,
					address,
					is_default,
				}
				console.log(params)
                //put
				//4. send http request
                    this.$http.put('hippo-shop/addresses/'+this.addressId, params, {
                        validateStatus: s => s > 200
                    })
                    .then(response => {
                        console.log(params)
                        Toast('修改成功');
                        this.goBack();
                    })
                    .catch(res => {
                        Toast('出现异常，请重试');
                    })



			},

		},

	}
</script>

<style lang="scss" scoped>
	.picker-toolbar-title {
		font-size: 14px;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		line-height: 30px;
		.usi-btn-cancel,
		.usi-btn-sure {
			background: #999;
			padding: 0px 9px;
			display: inline-block;
			border-radius: 3px;
			color: #fff;
		}
		.usi-btn-sure {
			background: #f30000;
		}
		.title {
			font-size: 16px;
		}
	}

	.region-go {
		img {
			width: 7px;
			height: 10px;
		}
		.bottom-region {
			width: 100%;
		}
	}
	.form-box {
		background: #fff;
		display: flex;
		height: 1rem;
		line-height: 1rem;
		font-size: .28rem;
		border-bottom: 1px solid #f4f5f5;
		span {
			display: inline-block;
			// width: 1.6rem;
			min-width: 1.6rem;
		}
		img {
			width:.15rem;
			height:.24rem;
			position: absolute;
			right: .2rem;
			margin-top: .4rem;
		}
		textarea {
			 width: 65%;
		}
	}
	.address-box {
		background: #fff;
		margin-top: .2rem;
		display: flex;
		padding: 0 .2rem;
		justify-content: space-between;
		height: 1rem;
		line-height: 1rem;
		font-size: .28rem;
	}

	.sub-btn {
		width: 96%;
		margin: .5rem auto;
		display: block;
	}

	.error-info {
		padding: .05rem .2rem;
		color: #666;
		font-size: .24rem;
		span {
			color: #F2385A;
		}
	}
	
</style>
<style lang="scss">
	.formItem {
		display: flex;
		.mint-cell-wrapper {
			font-size: .28rem;
		}
		.mint-cell-title {
			width: auto;
			margin-right: 2px;
		}
		
	}
</style>
