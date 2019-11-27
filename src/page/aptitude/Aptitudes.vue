<template>
	<div id="Aptitudes">
		<clxsd-head-top title="公司信息" />
		<section>
			<div class="hint">
				<p><i>审核通过</i></p>
			</div>
			<ul class="edit-ul">
				<li v-show="userType!=4">
					<label>公司类型</label>
					<span v-if="USER_TYPE === 1">制药工业</span>
					<span v-else-if="USER_TYPE === 2">商业公司</span>
					<span v-else-if="USER_TYPE === 3">
						{{userTypeName}}
					</span>
					<!-- 1:医院、2：连锁、 3：单体药店、 4：诊所 -->
					<span v-else>未知</span>
				</li>
				<li><label>公司名称</label><span>{{userInfo.companyName || '未认证'}}</span></li>
				<li><label>公司地址</label><span>{{userInfo.companyAddress || '中国'}}</span></li>
			</ul>
			<ul class="show-ul" >
				<div>
					<!-- <router-link to="/company-detail"> -->
						<li @click="showBigImg(userInfo.business_license)">
							<span>营业执照</span>
							<img :src="userInfo.business_license" width="40" height="35" />
						</li>
					<!-- </router-link> -->
				</div>
				<!--工业证书-->
				<div v-if="userType === 1 ">
					<li @click="showBigImg(userInfo.gmp)">
						<span>药品生产质量管理规范认证证书(GMP)</span>
						<img :src="aptitudeData.gmp" width="40" height="35" />
					</li>
				</div>
				<!-- 商业证书 -->
				<div v-if="userType === 2 ">
					<li @click="showBigImg(userInfo.business_executive)">
						<span>药品经营许可证</span>
						<img :src="userInfo.business_executive" width="40" height="35" />
					</li>
					<li @click="showBigImg(userInfo.gsp)">
						<span>药品经营质量管理规范认证证书(GSP)</span>
						<img :src="userInfo.gsp" width="40" height="35" />
					</li>
				</div>
				<!-- 采购端证件 -->
				<div v-if="userType === 3 ">
					<div v-if="sub_type != 4">
						<li @click="showBigImg(userInfo.business_executive)">
							<span>药品经营许可证</span>
							<img :src="userInfo.business_executive" width="40" height="35" />
						</li>
						<li @click="showBigImg(userInfo.gsp)">
							<span>药品经营质量管理规范认证证书(GSP)</span>
							<img :src="userInfo.gsp" width="40" height="35" />
						</li>
					</div>
				</div>
			</ul>
		</section>

		 <div v-if="isShowBigImg" @click="close" class="popBox">
           <!-- <span>123</span> -->
           <img :src="current" alt="">

       </div>
	</div>

</template>

<script>
	import { mapState } from "vuex";
	import ClxsdHeadTop from "../../components/HeadTop";
	export default {
		name: 'page-aptitude',
		components: {
			ClxsdHeadTop
		},
		props: {
			userType: {
				type: Number,
				required: true
			},
			sub_type: {
                type: Number,
                required: true
            }
		},
		data() {
			return {
				detail_Addresss:'',
				//areaData: areaData,
			    threeToOne:true,
				aptitudeData:{
			        gsp:null,//药品经营质量管理规范认证证书(GSP)
					gmp:null,//药品生产质量管理规范认证证书(GMP)
                    business_license:null,//营业执照
					business_executive:null //药品经营许可证
				},
				isShowBigImg: false,
				current: ''
			}
		},
		computed: {
			...mapState({
				USER_TYPE: state => state.CURRENTUSER.data.user_type,
				subType: state => state.CURRENTUSER.data.certification&&state.CURRENTUSER.data.certification.sub_type,
				userInfo: state => {
					const currentInfo = state.CURRENTUSER.data
					const configInfo = state.CONFIG
					let companyName = '未认证'
					let companyAddress = ''
					let business_license,business_executive,gsp,gmp
					let threeToOne = 1
					if(currentInfo['shop_supplier']) {
						companyName = currentInfo['shop_supplier']['display_name'] || currentInfo['shop_supplier']['name']
						companyAddress = `${currentInfo['shop_supplier']['province_lng']} ${currentInfo['shop_supplier']['city_lng']} ${currentInfo['shop_supplier']['county_lng']} ${currentInfo['shop_supplier']['address']}` || currentInfo['location']
					}
					if(currentInfo['certification']){
						let aptitudeData = currentInfo['certification']['data']
						aptitudeData.forEach(element => {
							switch(element.label) {
								case 'GSP证书':
									gsp = `${element.value}?x-oss-process=image/resize,h_100,m_fixed,w_100`
									break
								case '营业执照':
									business_license =  `${element.value}?x-oss-process=image/resize,h_100,m_fixed,w_100`
									break
								case '经营许可证':
									business_executive =  `${element.value}?x-oss-process=image/resize,h_100,m_fixed,w_100`
									break
								case 'GMP证书':
									gmp =  `${element.value}?x-oss-process=image/resize,h_100,m_fixed,w_100`
									break

							}
						});
						// business_license = aptitudeData.business_license
					}
					return {
						companyName,
						companyAddress,
						business_license,
						threeToOne,
						gsp,
						gmp,
						business_executive
					}

				},
			}),
			userTypeName() {
				let type = this.subType
				let name = ''
				switch (type) {
					case 1:
						name = '医院'
						break;
					case 2:
						name = '连锁药店'
						break;
					case 3:
						name = '单体药店'
						break;
					case 4:
						name = '诊所'
						break;
					default:
						name = '未知'
						break;
				}
				return name;
			}
		},
		methods: {
			close() {
            	this.isShowBigImg = false
			},
			showBigImg (i) {
			// cosnole.log(i)
				let data = i.split('?')
				this.current = `${data[0]}`
				this.isShowBigImg = true
			},
		}
	}
</script>

<style lang="scss" scoped>
	.hint {
		width: 100%;
		height: 24px;
		display: flex;
		align-items: center;
		background: rgb(245, 245, 245);
		p {
			margin-left: .2rem;
			font-size: 12px;
			color: rgb(153, 153, 153);
			i {
				color: rgb(255, 181, 64);
			}
		}
		
	}
	.popBox {
        position: absolute;
        opacity: 1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #000;
        z-index: 999;
        display: flex;
        align-items: center;
        img {
            width: 100%;
        }
    }

	.edit-ul {
		background: #fff;
		margin-bottom: 10px;
		line-height: 45px;
		padding: 0 10px;
		li {
			display: flex;
			font-size: 14px;
			border-bottom: 1px solid #f1f1f1;
			label {
				color: #666;
				width: 70px;
			}
			span {
				width: 75%;
				line-height: 25px;
				padding: 10px 0;
			}
		}
		.choice-icon {
			background: url(../../images/my/right_cowry.png) no-repeat right;
			background-size: 8px 10px;
			background-position-x: 96%;
		}
	}

	.show-ul {
		background: #fff;
		line-height: 35px;
		font-size: 14px;
		padding: 0 .15rem;
		li {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #f1f1f1;
			padding: 5px 0;
			span {
				color: #666;
			}
		}
	}

	.compre {
		display: flex;
		background: #fff;
		justify-content: space-between;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #f1f1f1;
		width: 100%;
		position: relative;
		p {
			font-size: 14px;
			color: #333;
		}
		svg {
			width: 25px;
			height: 25px;
			margin-right: .2rem;
		}
	}
</style>
