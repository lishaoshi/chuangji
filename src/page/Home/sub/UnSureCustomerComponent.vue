<template>
    <div style="min-height: 100%;background: #fff">
        <clxsd-head-top title='角色选择'></clxsd-head-top>

       <div class="user-list-container">

            <ul class="user-list">
            <li>
                <div class="user">
                    <span>姓名</span>
                    <p>{{name}}</p>
                </div>
                <!-- <div class="line"></div> -->
                <div class="iphone">
                    <span>联系电话</span>
                    <!-- <p>{{tel}}(可更改)</p> -->
                    <!-- <input type="t" v-model="tel"> -->
                    
                <input ref="input" type="tel" id="tel"  v-model="tel" @change="testIphone" :disabled="verify" @focus="modification">
                 <svg @click="openIphone">
                    <use xlink:href="#icon-bianji" />
                </svg>
                <!-- v-model="tel" (可修改)   -->
                <!-- <p>(可修改)</p> -->
                </div>
            </li>
            <li>
                <div class="id-number">
                    <span>身份证号</span>
                    <p>{{cartId}}</p>
                </div>
            </li>
        </ul>
       </div>
        <PaySuccess v-if="waitStatus"></PaySuccess>
        <div v-else>
            <mt-navbar v-model="selected">
                <mt-tab-item :id="navbar[0].value">
                    <svg>
                        <use xlink:href="#icon-promote-province"/>
                    </svg>
                    <p>{{navbar[0].name}}</p>
                </mt-tab-item>
                <mt-tab-item :id="navbar[1].value">
                    <svg>
                        <use xlink:href="#icon-promote-city"/>
                    </svg>
                    <p>{{navbar[1].name}}</p>
                </mt-tab-item>
                <mt-tab-item :id="navbar[2].value">
                    <svg>
                        <use xlink:href="#icon-promote-promoter"/>
                    </svg>
                    <p>{{navbar[2].name}}</p>
                </mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected" style="min-height: 5rem;">
                <!--省-->
                <mt-tab-container-item :id="navbar[0].value">
                    <p>选择注册省份</p>
                    <select class="select-area" v-model="provinceValue" @change="handleProvinceChange">
                        <option value="0">选择省份</option>
                        <option :value="area.code" v-for="(area,_arIndex) in areaData" :key="`_area_${_arIndex}`">{{area.name}}</option>
                    </select>
                    <svg class="sel_icon">
                        <use xlink:href="#icon-promote-dropDown"/>
                    </svg>
                    <p class="error" v-if="provinceError">* 此省份已经被注册</p>
                    <div class="go-info">
                        <button @click="handleProvince"
                                :disabled="provinceError || provinceValue === 0"
                                :class="provinceError || provinceValue === 0 ? '':'active' ">
                            开启权限
                        </button>
                        <router-link to="/introduction/partner">
                            初步了解
                        </router-link>
                    </div>
                </mt-tab-container-item>

                <!--市-->
                <mt-tab-container-item :id="navbar[1].value">
                    <p>选择注册省市</p>
                    <div @click="showAddressPicker" class="choiceCity">
                        <mt-field label="" placeholder="请选择省市" type="text" v-model="region" readonly="readonly" class="region-go">
                        </mt-field>
                        <svg>
                            <use xlink:href="#icon-promote-dropDown"/>
                        </svg>
                    </div>
                    <p class="error" v-if="cityError">* 此省市已经被注册</p>
                    <div class="go-info">
                        <button @click="handleCity"
                                :disabled="cityError || cityValue === 0"
                                :class="cityError || cityValue === 0 ? '':'active' ">
                            开启权限
                        </button>
                        <router-link to="/introduction/city">
                            初步了解
                        </router-link>
                    </div>

                    <mt-popup v-model="regionVisible" position="bottom" class="bottom-region" style="width:100%;">
                        <address-popup :regionVisible.sync="regionVisible" @listenAreaChange="areaChange"/>
                   </mt-popup> 
                    <!-- <mt-popup v-model="regionVisible" position="bottom" class="bottom-region" style="width:100%;">
                        
                    </mt-popup> -->
                </mt-tab-container-item>

                <!--合伙人-->
                <!-- <mt-tab-container-item id="partner">
                    <p>选择注册省份</p>
                    <select class="select-area" v-model="partner_provinceValue">
                        <option value="0">选择省份</option>
                        <option :value="area.code" v-for="(area,_arIndex) in areaData" :key="`_area_${_arIndex}`">{{area.name}}</option>
                    </select>
                    <svg class="sel_icon">
                        <use xlink:href="#icon-promote-dropDown"/>
                    </svg>
                    <div class="go-info">
                        <button @click="handlePartner" class="active"
                                :disabled=" partner_provinceValue === 0"
                                :class=" partner_provinceValue === 0 ? '':'active' ">
                            开启权限
                        </button>
                        <router-link to="/introduction/partner">
                            初步了解
                        </router-link>
                    </div>
                </mt-tab-container-item> -->

                <!-- 推广人 -->

                <mt-tab-container-item id="promoter">
                    <div class="promoter-box">
                        <p>选择注册省市</p>
                        <div @click="showAddressPickerPromoter" class="choiceCity" style="margin-bottom: .2rem">
                            <mt-field label="" placeholder="请选择省市" type="text" v-model="region_promoter" readonly="readonly" class="region-go">
                            </mt-field>
                            <svg>
                                <use xlink:href="#icon-promote-dropDown"/>
                            </svg>
                        </div>
                        <ul class="tui-list" v-if="promoterTypeData">
                            <li @click="handlePromoterChecked(promoterTypeData[0].value)">
                                <img src="../../../images/extension/promote-pay-business.png">
                                <p class="title-p">{{promoterTypeData[0].name}}</p>
                                <svg class="active" v-if="promoterData.business">
                                    <use xlink:href="#icon-promote-pay-moreChose"/>
                                </svg>
                            </li>
                            <li @click="handlePromoterChecked(promoterTypeData[4].value)">
                                <img src="../../../images/extension/promote-pay-hospital.png">
                                <p class="title-p">{{promoterTypeData[4].name}}</p>
                                <svg class="active" v-if="promoterData.yiyuan">
                                    <use xlink:href="#icon-promote-pay-moreChose"/>
                                </svg>
                            </li>
                            <li @click="handlePromoterChecked(promoterTypeData[2].value)">
                                <img src="../../../images/extension/promote-pay-multipleShop.png">
                                <p class="title-p">{{promoterTypeData[2].name}}</p>
                                <svg class="active" v-if="promoterData.lianshuo">
                                    <use xlink:href="#icon-promote-pay-moreChose"/>
                                </svg>
                            </li>
                            <li @click="handlePromoterChecked(promoterTypeData[1].value)">
                                <img src="../../../images/extension/promote-pay-drugstore.png">
                                <p class="title-p">{{promoterTypeData[1].name}}</p>
                                <svg class="active" v-if="promoterData.danti">
                                    <use xlink:href="#icon-promote-pay-moreChose"/>
                                </svg>
                            </li>
                            <li @click="handlePromoterChecked(promoterTypeData[3].value)">
                                <img src="../../../images/extension/promote-pay-client.png">
                                <p class="title-p">{{promoterTypeData[3].name}}</p>
                                <svg class="active" v-if="promoterData.zhenshuo">
                                    <use xlink:href="#icon-promote-pay-moreChose"/>
                                </svg>
                            </li>
                        </ul> 

                    </div>
                    <div class="go-info" style="text-align: center;margin-top: .8rem">
                        <button @click="handlePromoter"
                                :class="promoterActive ? 'active':''"
                                :disabled="!promoterActive"
                                style="display: inline-block;margin-right: .5rem">
                            开启权限
                        </button>
                        <router-link to="/introduction/promoter" style="display: inline-block">
                            初步了解
                        </router-link>
                    </div>

                    <mt-popup v-model="regionVisible_promoter" position="bottom" class="bottom-region" style="width:100%;">
                        <address-popup :regionVisible.sync="regionVisible" @listenAreaChange="areaChangePromoter"/>
                    </mt-popup>
                </mt-tab-container-item>
            </mt-tab-container>

        </div>
    </div>
</template>
<script>
    import areaData from "@/plugins/json/pca-code.json";
    import AddressPopup from "@/components/ProvinceCityUser"; //引入省市区数据
    import {mapState, mapGetters} from "vuex";
    import PaySuccess from "@/page/extension/PaySuccess";//支付成功

    export default {
        name: "Unsure",
        components: {
            AddressPopup,
            PaySuccess
        },
        data() {
            return {
                areaData: areaData,
                title: '',
                selected: '',//city,province,partner,promoter,

                provinceError: false,
                provinceValue: 0,
                partner_provinceValue: 0,
                cityValue: 0,
                cityError: false,

                partnerData: null,

                promoterTypeData: [
                    { name: "商业", value: "business"},
                    { name: "单体药店", value: "danti"},
                    { name: "连锁店", value: "lianshuo"},
                    { name: "诊所", value: "zhenshuo"},
                    { name: "医院", value: "yiyuan"}
                ],
                //推广人类型数据信息
                navbar:[
                    { name: "省公司", value: "province_company"},
                    { name: "市公司", value: "city_company"},
                    { name: "推广人", value: "promoter"},
                ], 
                //省市推广人
                promoterData: {
                    business: false,
                    yiyuan: false,
                    lianshuo: false,
                    danti: false,
                    zhenshuo: false,
                },

                region: null,
                regionVisible: false,

                region_promoter: null,
                promoter_value: 0,
                regionVisible_promoter: false,


                // 用户信息
                address:'',
                money:0,
                name:'',
                tel:'',
                cartId:'',
                // 手机修改判断
                verify:true
            }
        },
        computed: {
            promoterActive() {
                const promoterdata = this.promoterData;
                return promoterdata.business || promoterdata.yiyuan ||
                    promoterdata.lianshuo || promoterdata.danti ||
                    promoterdata.zhenshuo
            },
            ...mapState({
                USER_INFO: state => state.CURRENTUSER.data,
            }),
            waitStatus() {
                return this.USER_INFO.partner_status === 1
            },

        },
        created() {
            this.initData();
        },
        methods: {
            initData() {
                this.loading = true;
                // user-permission/init-check
                // hippo-shop/system-config-enum
                this.$http.get('hippo-shop/system-config-enum', {
                    params: {
                        role: 4,
                        type:1,
                    }
                })
                .then(response => {
                    if (response.data.data) {
                        this.promoterTypeData = response.data.data;
                    }
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                })
                this.$http.get('hippo-shop/system-config-enum', {
                    params: {
                        role: 4,
                        type:2,
                    }
                }).then(response => {
                    if (response.data.data) {
                        // console.log(this,response.data.data );
                        
                        // debugger
                        this.selected = response.data.data[0].value
                        this.navbar = response.data.data;
                    }
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                })


                // 获取推广人信息
                this.$http.get("/user").then(res => {
                   this.name = res.data.data.real_name
                   this.tel = res.data.data.phone 
                   this.cartId = res.data.data.user_identity
               })

            },
            //省处理
            async handleProvinceChange() {
                // debugger
                if (this.provinceValue) {
                    
                    const {data} = await this.$http.get('/area-user/check-area', {
                        params: {code: this.provinceValue}
                    });
                    if (data.has) {
                        this.provinceError = true;
                    } else {
                        this.provinceError = false;
                    }
                }

            },
            handleProvince() {
                // debugger
                // var p1=/^1(3|4|5|7|8)\d{9}$/;
                 var p1 = /^1[3456789]\d{9}$/
                

                this.testIphone()
                if(p1.test(this.tel)&&this.tel){
                    if (this.provinceError || this.provinceValue === 0) return;
                    this.$store.commit('SAVE_USER_CHOOSE_DATA', {role: this.selected, data: this.provinceValue});
                    this.$router.push({path:'/role-yes',query:{phone: this.tel}});
                }
            } ,
            showAddressPicker() {
                this.regionVisible = true;
                this.region = null
            },
            async areaChange(rdata) {
                // debugger
                this.regionVisible = false
                if(!rdata) {
                    return false
                }
                this.region = ''
                this.region = rdata.region
                
                if (rdata.cityCode) {
                    
                    this.cityValue = rdata.cityCode;
                    // area-user/check-area?code=1303
                    const {data} = await this.$http.get('/area-user/check-area', {
                        params: {code: rdata.cityCode}
                    });
                // this.region = null

                    if (data.has) {
                        this.cityError = true;
                    } else {
                        this.cityError = false;
                    }
                }
                // this.region = null

            },

            showAddressPickerPromoter() {
                this.regionVisible_promoter = true;
            },
            async areaChangePromoter(rdata) {
                this.regionVisible_promoter = false
                 if(!rdata) {
                    return false
                }
                this.region_promoter = rdata.region
                this.promoter_value = rdata.cityCode
            },
            //市处理
            handleCity() {
                // var p1=/^1(3|4|5|7|8)\d{9}$/;
                 var p1 = /^1[3456789]\d{9}$/

                // sessionStorage.setItem('customer-choose-role-iphone',this.tel)

                this.testIphone()

                 if(p1.test(this.tel)&&this.tel){
                    if (this.cityError || this.cityValue === 0) return;
                    this.$store.commit('SAVE_USER_CHOOSE_DATA', {role: this.selected, data: this.cityValue});
                    this.$router.push({path:'/role-yes',query:{phone: this.tel}});
                 }
            },

            //合伙人
            // handlePartner() {
            //     this.$store.commit('SAVE_USER_CHOOSE_DATA', {role: this.selected, data: this.partner_provinceValue});
            //     this.$router.push('/role-yes');
            // },

            // 推广人
            handlePromoter() {
                 var p1 = /^1[3456789]\d{9}$/
                // sessionStorage.setItem('customer-choose-role-iphone',this.tel)

                this.testIphone()
                 if(p1.test(this.tel)&&this.tel){
                    if (!this.promoterActive) return;
                    if (this.promoter_value === 0) return;
                    this.$store.commit('SAVE_USER_CHOOSE_DATA', {role: this.selected, data: Object.assign({code: this.promoter_value}, this.promoterData)});
                   this.$router.push({path:'/role-yes',query:{phone: this.tel}});
                 }
            },
            handlePromoterChecked(value) {
                
                this.promoterData[value] = !this.promoterData[value];
            },
            //判断手机号
            testIphone(){
                // this.tel = 
            var p1 = /^1[3456789]\d{9}$/;
			if(this.tel !='' && p1.test(this.tel)) {	

            }else{
                  this.$messagebox.confirm('',{
                    title: '提示',
                    message:'手机号格式不正确',
                    confirmButtonText: '重新填写'
                    }).then(action=>{
                        if(action=='confirm'){
                            this.$refs.input.focus();
                        }
                    })
            }
        },

        openIphone(){
            this.verify = false
            this.$nextTick().then(()=>{
                this.$refs.input.focus();
            })
        },

        modification(){
                this.$refs.input.style.color = '#333'

        }
    }
    }
</script>

<style lang="scss" scoped>
    .title {
        width: 40%;
        height: .88rem;
        line-height: .88rem;
        text-align: center;
        margin: 0 auto;
        color: #fff;
        font-size: .36rem;
        font-weight: bold;
        z-index: 99;
        display: block;
        position: absolute;
        top:0px;
        left: 30%;
    }
    select {
        -webkit-appearance: none;
        background: #fff;
    }

    .mint-navbar {
        margin: .2rem;
        background: #fff;
        border: 1px solid #f1f1f1;
        border-radius: 4px;
        box-shadow: 0px 0px 3px #ccc;
    }

    .mint-tab-item svg {
        width: .85rem;
        height: .85rem;
        border-radius: 100%;
        margin-bottom: .1rem;
    }

    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 0px;
        color: #666;
        font-weight: bold;
    }

    .mint-tab-item {
        color: #ccc;
    }

    .mint-tab-container {
        background: #fff;
        padding: .2rem;
    }

    .go-info {
        margin-top: 1.5rem;

        a, button {
            display: block;
            width: 3.2rem;
            height: .88rem;
            line-height: .88rem;
            //
            color: #fff;
            margin: .3rem auto;
            border-radius: .88rem;
            font-size: .26rem;
            text-align: center;

            &:nth-child(2) {
                color: #26a2ff;
                background: #fff;
                border: 1px solid #26a2ff;
            }
        }

        button.active {
            background: #26a2ff;
        }

        button {
            &:disabled {
                background: #ccc;
            }
        }
    }

    .error {
        color: #f30000;
        font-size: .24rem;
        line-height: 2;
        float: left;
    }

    .select-area {
        width: 100%;
        height: 50px;
        border: 1px solid #f1f1f1;
        margin-top: .2rem;
        padding-left: .2rem;
        font-size: .3rem;
    }

    .promoter-box {
        background: #fff;
        overflow-x: hidden;

    }

    .is-scroll {
        width: 100%;
        overflow-x: scroll;
        height: 1.1rem;
        overflow-y: hidden;

        &::-webkit-scrollbar {
            height: 0px;
            background: #fff;
        }

        ul {
            width: 10.5rem;
            height: 1.4rem;

            li {
                width: 1.9rem;
                height: 1.1rem;
                color: rgb(51, 51, 51);
                background: #f1f5fe;
                border-radius: 4px;
                float: left;
                display: flex;
                justify-content: space-between;
                padding: 0 .18rem;
                align-items: center;
                position: relative;
                font-size: .28rem;
                margin-right: .15rem;

                .icon {
                    width: .6rem;
                    height: .6rem;
                }

                .active {
                    position: absolute;
                    width: .4rem;
                    height: .2rem;
                    top: 0px;
                    right: 0px;
                }
            }
        }
    }

    .choiceCity {
        border: 1px solid #f1f1f1;
        margin-top: .2rem;
        border-radius: 4px;
        display: flex;
        font-size: .3rem;
        justify-content: space-between;
        padding-right: .2rem;

        svg {
            width: .16rem;
            height: .09rem;
            margin-top: .45rem;
            margin-right: .03rem;
        }
    }

    .tui-list {
        li {
            display: inline-block;
            // width: 2.065rem;
            // height: 2.6rem;
            width:2.12rem;
            height:2.09rem;
            background: rgb(241, 248, 251);
            text-align: center;
            margin-right: .2rem;
            border-radius: 5px;
            margin-bottom: .24rem;
            position: relative;

            &:nth-child(3n) {
                margin-right: 0px;
            }

            img {
                width: .68rem;
                height: .68rem;
                margin-top: .4rem;
            }

            .title-p {
                font-size: .3rem;
                color: rgb(51, 51, 51);
                line-height: 2;
            }

            .gray {
                color: #ccc;
                font-size: .2rem;
            }

            svg {
                display: none;
            }

            .active {
                position: absolute;
                width: .45rem;
                height: .28rem;
                top: 0px;
                right: 0px;
                display: block;
            }
        }
    }

    .sel_icon {
        position: relative;
        width: 0.16rem;
        height: 0.9rem;
        float: right;
        margin-top: -.85rem;
        margin-right: .25rem;
    }

.user-list-container{
    margin-top: 0.2rem;
    padding: 0 0.2rem;
    .user-list {
        background: #fff;
        border: 1px solid #f1f1f1;
        border-radius: 4px;
        box-shadow: 0px 0px 3px #ccc;
            li {
                height: 1.4rem;
                background: rgba(255, 255, 255, 1);
                display: flex;
                border-bottom: 0.01rem solid rgba(245, 245, 245, 1);

                .user,
                .iphone,
                .id-number {
                    line-height: 1;
                    width: 50%;
                    padding-left: 0.32rem;
                    padding-top: 0.35rem;

                    span {
                        font-size: 0.24rem;
                        // color: rgba(204, 204, 204, 1);
                        color: #999999;
                        font-weight: 500;
                        height: 0.23rem;
                    }

                    p {
                        font-size: 0.28rem;
                        margin-top: 0.16rem;
                        font-weight: 500;
                        color: rgba(51, 51, 51, 1);
                    }
                }

                .iphone {
                    border-left: 0.01rem solid rgba(245, 245, 245, 1);
                    color: #ccc;
                    span {
                    color: #999999;
                    display: block;
                    }
                    svg {
                        width:.26rem;
                        position: relative;
                        height:.24rem;
                        top: -0.3rem;
                        right: -2.5rem;
                    }
                    #tel {
                        display: inline-block;
                        font-size: 0.28rem;
                        margin-top: 0.15rem;
                        width: 100%;
                        color: #ccc;

                        &:disabled {
                            background: #fff;
                        }  
                    }
                    p {
                        display: inline-block;
                        color: #CCCCCC
                    }
                }
            }
        }
}

</style>
