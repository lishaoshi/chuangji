<template>
	<div id="AptitudesEdit">
        <clxsd-head-top title="公司信息" append="1">
            <div  slot="append"  @click="handleOk" class="my">
                <span>保存</span>
            </div>
        </clxsd-head-top>
        <form>
		<div class="hint">
			<p>请认真上传，一经保存<i>不可修改</i></p>
		</div>
		<ul class="edit-ul">
			<li><label>公司名称</label><input type="text" name="companyName" v-model="companyName" placeholder="请填写公司名称"></li>
		</ul>
		<div class="hint compre">
			<p>是否是三正合一</p>
            <svg class="m-style-svg m-svg-def" style="width:25px;height:25px;" @click="threeToOne=!threeToOne">
                <use :xlink:href="`#icon-${threeToOne ? 'shisanzhengheyi' : 'fousanzhengheyi' }`"/>
            </svg>
		</div>
		<div class="add">
			<div class="everyCard" v-if="threeToOne">
                <FormImageItem
						v-model="aptitudeData.business_license"
                        label="营业执照"
                        type="id"
                />
			</div>
            <div class="everyCard" v-if="!threeToOne">
                <FormImageItem
                        v-model="aptitudeData.business_license"
                        label="营业执照"
                        type="id"
                />
            </div>
			<div class="everyCard" v-if="!threeToOne">
                <FormImageItem
						v-model="aptitudeData.oscc"
                        label="组织结构代码证"
                        type="id"
                />
			</div>
			<div class="everyCard" v-if="!threeToOne">
                <FormImageItem
						v-model="aptitudeData.trc"
                        label="税务登记证"
                        type="id"
                />
			</div>
		</div>
        </form>
	</div>

</template>

<script>
    import FormImageItem from "@/components/form/FormImageItem";
    import ImagePoster from '@/components/ImagePoster.vue'
    import { mapState } from "vuex";
	export default {
		name: 'page-edit-aptitude',
        components:{
            FormImageItem,
            ImagePoster
        },
        computed:{
            ...mapState({
                currentUser: state => state.CURRENTUSER.data.userInfo
            })
        },
		data() {

			return {
			    threeToOne:true,
                companyName:'',
				aptitudeData:{
                    business_license:null,//营业执照
                    oscc:null,//组织结构代码证,
                    trcg:null,//税务登记证（国税）
				}
			}
		},
		methods: {
			handleOk(){
				let {companyName,aptitudeData} = this.$data
				if(!companyName){
				    this.$messagebox.alert('公司名称不能这空！')
                    return;
				}
				if(this.threeToOne){//三证合一
                    if(!aptitudeData.business_license){
                        this.$messagebox.alert('请上传营业执照！')
                        return;
					}
				}else{
                    if(!aptitudeData.oscc){
                        this.$messagebox.alert('组织结构代码证！')
                        return
                    }
                    if(!aptitudeData.trcg){
                        this.$messagebox.alert('请上传税务登记证！')
                        return
                    }
				}


                aptitudeData.is_three_one = this.threeToOne? 1: 0
				const params = {
                    org_name:companyName,
                    certification:aptitudeData
                }

                this.$http.post('/user/certification',params, { validateStatus: s => s > 0})
                    .then(response=> {
                        this.$Message.success('上传成功')
                        let currentData = this.currentUser
                        this.$store.commit('SAVE_USER',Object.assign(currentData,{certification:response.certification}))
                        this.goBack()
                    }).catch(({ response: { data: { errors = ['加载认证类型失败'] } = {} } = {} }) => {
                        console.log(resp)
                })

			}
		},
	}
</script>

<style lang="scss" scoped>
	.save-btn {
		position: absolute;
		line-height: .9rem;
		top:0px;
		right: .2rem;
		color: #fff;
	}
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
	
	.mint-cell {
		border-bottom: 1px solid #f1f1f1;
	}
	
	.add {
		background: #fff;
		padding: 0 10px;
	}

	
	.add .everyCard {
		width: 100%;
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgb(230, 230, 230);
		padding: 1vh;
		p {
			font-size: 14px;
		}
	}
	
	.add .everyCard:last-child {
		border: none;
	}
	
	.add .everyCard img {
		width: 45px;
		height: 45px;
		padding: 1vh;
		border: 1px solid rgb(230, 230, 230);
		margin: auto 10px;
		margin-left: 5px;
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

	}
	.show-ul {
		background: #fff;
		line-height: 35px;
		font-size: 14px;
		li{
			display:flex;
			justify-content:space-between;
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
		p{
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