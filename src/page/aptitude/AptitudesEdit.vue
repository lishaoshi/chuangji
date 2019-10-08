<template>
    <div id="AptitudesEdit" style="min-height: 100%">
        <clxsd-head-top title="资质上传" append="1">
            <div slot="append" @click="handleOk" class="my">
                <span>保存</span>
            </div>
        </clxsd-head-top>
        <form>
            <div class="hint">
                <p>请认真上传，一经保存<i>不可修改</i></p>
            </div>
            <ul class="edit-ul">
                <li class="choice-icon" v-if="userType === 3" @click="showRolePicker"><label>角色类型</label>{{companyTypeName}}</li>
                <li class="choice-icon" v-else style="background: none"><label>公司类型</label>{{companyType}}</li>
                <li><label>公司名称</label><input type="text" name="companyName" v-model="companyName" placeholder="请填写公司名称" style="font-size: .28rem"></li>
            </ul>
            <!--
            <div class="hint compre">
                <p>是否是三正合一</p>
                <svg class="m-style-svg m-svg-def" style="width:25px;height:25px;" @click="threeToOne=!threeToOne">
                    <use :xlink:href="`#icon-${threeToOne ? 'shisanzhengheyi' : 'fousanzhengheyi' }`"/>
                </svg>
            </div>
            -->
            <div class="add">
                <div class="everyCard">
                    <FormImageItem
                            v-model="aptitudeData.business_license"
                            label="营业执照"
                            type="storage"
                            prefixPath="certs"
                    />
                </div>
                <!--工业需要上传的证件-->
                <div v-if="userType === 1 ">
                    <div class="everyCard">
                        <FormImageItem
                                v-model="aptitudeData.sc_z"
                                label="生产许可证"
                                type="storage"
                                prefixPath="certs"
                        />
                        <FormImageItem
                                v-model="aptitudeData.gmp"
                                :label="'药品生产质量管理规范认证证书(GMP)'"
                                type="storage"
                                prefixPath="certs"
                        />
                    </div>
                </div>

                <!--商业需要上传的证件-->
                <div v-if="userType === 2 ">
                    <div class="everyCard">
                        <FormImageItem
                                v-model="aptitudeData.business_executive"
                                :label="'药品经营许可证'"
                                type="storage"
                                prefixPath="certs"
                        />
                    </div>
                    <div class="everyCard">
                        <FormImageItem
                                v-model="aptitudeData.gsp"
                                :label="'药品经营质量管理规范认证证书(GSP)'"
                                type="storage"
                                prefixPath="certs"
                        />
                    </div>
                </div>

                <!--采购端需要的证件-->
                <div v-if="userType === 3 ">
                    <div v-if="companyTypeName != '诊所'">
                        <div class="everyCard">
                            <FormImageItem
                                    v-model="aptitudeData.business_executive"
                                    :label="'药品经营许可证'"
                                    type="storage"
                                    prefixPath="certs"
                            />
                        </div>
                        <div class="everyCard">
                            <FormImageItem
                                    v-model="aptitudeData.gsp"
                                    :label="'药品经营质量管理规范认证证书(GSP)'"
                                    type="storage"
                                    prefixPath="certs"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <mt-popup v-model="popupVisible" position="bottom" style="width: 100%;background: rgb(250,250,250)">
            <p class="pop-title">选择公司类型</p>
            <ul class="pop-list">
                <li :class="companyTypeName===tranType.type ? 'active':''" @click="chooseTranTypes(tranType)"
                    v-for="(tranType,ind_) in userMap" :key="`t-${ind_}`">{{tranType.label}}
                </li>
            </ul>
            <p class="pop-title pop-chacle" @click="hiddenRolePicker">取消</p>
        </mt-popup>
    </div>
</template>

<script>
    import FormImageItem from "@/components/form/FormImageItem";
    import ImagePoster from '@/components/ImagePoster.vue'

    export default {
        name: 'page-edit-aptitude',
        props: {
            userType: {type: Number, required: true},
            isEdit: {type: Boolean, default: false},
            imgList: {type:Array, default:()=>{return []}},
            org_name:{type: String, default: ''},
            certStatus: {type: Number, default:0}
        },
        components: {
            FormImageItem,
            ImagePoster
        },
        data() {
            let companyType = '请选择'

            switch (this.userType) {
                case 1:
                    companyType = '制药工业'
                    break
                case 2:
                    companyType = '商业公司'
                    break
                case 3:
                    companyType = '采集'
                    break
                case 4:
                    companyType = '推广人'
                    break
            }

            return {
                popupVisible: false,
                companyTypeName: "请选择",
                userMap: [
                    /*
                    {
                        label: '医院',
                        type: 1,
                    },
                     */
                    {
                        label: '连锁店',
                        type: 2,
                    },
                    {
                        label: '单体药店',
                        type: 3,
                    },
                    {
                        label: '诊所',
                        type: 4,
                    },

                ],
                threeToOne: true,
                companyType,
                companyCType: 0,
                companyName: this.$props.org_name||'',
                aptitudeData: {
                    gsp: "",//药品经营质量管理规范认证证书(GSP)
                    gmp: "",//药品生产质量管理规范认证证书(GMP)
                    business_license: "",//营业执照
                    oscc: "",//组织结构代码证,
                    business_executive: "",//药品经营许可证
                    health_c: "",//健康证
                    hyg_l: "",//卫生许可证,
                    pblg: "",//药品生产许可证
                    sc_z: "",//生产许可证
                    sub_type:0
                },
                 aptitudeList: {
                    gsp: "",//药品经营质量管理规范认证证书(GSP)
                    gmp: "",//药品生产质量管理规范认证证书(GMP)
                    business_license: "",//营业执照
                    oscc: "",//组织结构代码证,
                    business_executive: "",//药品经营许可证
                    health_c: "",//健康证
                    hyg_l: "",//卫生许可证,
                    pblg: "",//药品生产许可证
                    sc_z: "",//生产许可证
                    sub_type:0
                },
            }
        },
        methods: {
            hiddenRolePicker() {
                this.popupVisible = false;
            },
            showRolePicker() {
                this.popupVisible = true;
            },
            chooseTranTypes(data) {
                this.companyTypeName = data.label;
                this.companyCType = data.type;
                this.popupVisible = false;
            },
            handleOk() {
                if (this.userType === 3) {
                    if (!this.companyCType) {
                        this.$messagebox.alert('请选择你的角色类型！')
                        return
                    }
                }

                let {companyName, aptitudeData} = this.$data
                if (!companyName) {
                    this.$messagebox.alert('公司名称不能这空！')
                    return;
                }
               // aptitudeData.business_license = 'URL:333';
                if (!aptitudeData.business_license) {
                    this.$messagebox.alert('请上传营业执照！')
                    return;
                }
                const caiTypes = [2];
                if (caiTypes.includes(this.userType)) {
                    if (!aptitudeData.business_executive) {
                        this.$messagebox.alert('请上传药品经营许可证！')
                        return
                    }
                    if (!aptitudeData.gsp) {
                        this.$messagebox.alert('请上传药品经营质量管理规范认证证书(GSP)！')
                        return
                    }
                }
                if (this.userType === 3) {
                    if (this.companyTypeName != '诊所') {
                        if (!aptitudeData.business_executive) {
                            this.$messagebox.alert('请上传药品经营许可证！')
                            return
                        }
                        if (!aptitudeData.gsp) {
                            this.$messagebox.alert('请上传药品经营质量管理规范认证证书(GSP)！')
                            return
                        }
                    }
                }
                if (this.userType === 1) {
                    if (!aptitudeData.pblg) {
                        this.$messagebox.alert('请上传药品生产许可证！')
                        return
                    }
                    if (!aptitudeData.gmp) {
                        this.$messagebox.alert('请上传药品生产质量管理规范认证证书(GMP)')
                        return
                    }
                }

                //aptitudeData.is_three_one = this.threeToOne ? 1 : 0
                aptitudeData.sub_type = this.companyCType

                if(this.companyTypeName === '诊所'){
                    aptitudeData.business_executive = 'public:null'
                    aptitudeData.gsp = 'public:null'
                }

                let params = {
                    type: this.userType,
                    org_name: companyName,
                    certification: aptitudeData,
                   // sub_type: this.companyCType,
                }
                //  Object.values(this.aptitudeData).forEach((item,index)=>{
                //     console.log(item)
                //     // if(!item.includes('public')) {

                //     // }
                // })
                
               // console.log(params.certification.business_executive)
               // console.log(typeof (params.certification.business_executive))
               if(this.certStatus==0) {
                   this.$http.post('/user/certification', params, {validateStatus: s => s = 470})
                    .then(response => {
                        if(response.data.errors){
                            this.$toast("认证信息上传失败");
                        }else{
                            this.$toast("上传成功,正在审核中...");
                            this.$store.dispatch("fetchUserInfo");
                            this.goBack()
                        }

                    }).catch(({response: {data: {errors = ['加载认证类型失败']} = {}} = {}}) => {
                        console.log(resp)
                    })
               } else {
                Object.keys(this.aptitudeList).forEach(item=>{
                    if(item!="sub_type"&&!this.aptitudeList[item]!=this.aptitudeList[item]&&!this.aptitudeData[item].includes('https')) {
                        this.aptitudeList[item] = this.aptitudeData[item]
                    }
                })
                params.certification = this.aptitudeList
                   this.$http.patch('/user/certification', params, {validateStatus: s => s = 470})
                    .then(response => {
                        if(response.data.errors){
                            this.$toast("认证信息上传失败");
                        }else{
                            this.$toast("上传成功,正在审核中...");
                            this.$store.dispatch("fetchUserInfo");
                            this.goBack()
                        }

                    }).catch(({response: {data: {errors = ['加载认证类型失败']} = {}} = {}}) => {
                        console.log(resp)
                    })
               }

            }
        },
        created() {
            // console.log(this.imgList,'hello',this.org_name)
            this.imgList.map((item, index)=>{
               switch(item.label) {
                    case '营业执照': 
                        this.aptitudeData.business_license = item.value
                        this.aptitudeList.business_license = item.origin_value
                        break
                    case 'GSP证书':
                        this.aptitudeData.gsp = item.value
                        this.aptitudeList.gsp = item.origin_value
                        break
                    case '经营许可证':
                        this.aptitudeData.business_executive = item.value
                        this.aptitudeList.business_executive = item.origin_value
                        break
                    case '生产许可证':
                        this.aptitudeData.sc_z = item.value
                        this.aptitudeList.sc_z = item.origin_value
                        break
                    case 'GMP证书':
                        this.aptitudeData.gmp = item.value
                        this.aptitudeList.gmp = item.origin_value
                        break
               }
            })
            console.log(this.aptitudeData,'data')
        }
    }
</script>

<style lang="scss" scoped>

    .pop-title {
        text-align: center;
        font-size: .3rem;
        line-height: 3;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: .2rem;
    }

    .pop-list {
        padding: .2rem;

        li {
            display: inline-block;
            width: 2.1rem;
            height: 1.2rem;
            line-height: 1.2rem;
            background: #fff;
            color: #333;
            border-radius: 3px;
            margin-right: .25rem;
            text-align: center;
            margin-bottom: .16rem;
            font-size: .3rem;
        }

        .active {
            background: #26a2ff;
            color: #fff;
        }
    }

    .save-btn {
        position: absolute;
        line-height: .9rem;
        top: 0px;
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
            font-size: .28rem;
            border-bottom: 1px solid #f1f1f1;

            label {
                color: #999;
                width: 1.4rem;
                font-size: .28rem;
            }

            span {
                width: 75%;
                line-height: 25px;
                padding: 10px 0;
            }
        }

        .choice-icon {
            background: url(../../images/my/right_cowry.png) no-repeat right;
            background-size: 7px 10px;
            background-position-x: 96%;
        }
    }

    .show-ul {
        background: #fff;
        line-height: 35px;
        font-size: 14px;

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

    .pop-chacle {
        border-top: 3px solid #f1f1f1;
        color: #7C7C7C;
        border-bottom: 0px;
        margin-top: .3rem;
        margin-bottom: 0px;
    }
</style>
