<template>
    <div style="min-height: 100%;background: #fff">
        <mt-header title="">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <span class="title">角色选择</span>
        <PaySuccess v-if="waitStatus"></PaySuccess>
        <div v-else>
            <mt-navbar v-model="selected">
                <mt-tab-item id="province">
                    <svg>
                        <use xlink:href="#icon-promote-province"/>
                    </svg>
                    <p>省公司</p>
                </mt-tab-item>
                <mt-tab-item id="city">
                    <svg>
                        <use xlink:href="#icon-promote-city"/>
                    </svg>
                    <p>市公司</p>
                </mt-tab-item>
                <mt-tab-item id="partner">
                    <svg>
                        <use xlink:href="#icon-promote-partner"/>
                    </svg>
                    <p>合伙人</p>
                </mt-tab-item>
                <mt-tab-item id="promoter">
                    <svg>
                        <use xlink:href="#icon-promote-promoter"/>
                    </svg>
                    <p>推广人</p>
                </mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected" style="min-height: 5rem;">
                <!--省-->
                <mt-tab-container-item id="province">
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
                <mt-tab-container-item id="city">
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
                        <address-popup @listenAreaChange="areaChange"/>
                    </mt-popup>
                </mt-tab-container-item>

                <!--合伙人-->
                <mt-tab-container-item id="partner">
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
                </mt-tab-container-item>

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
                            <li @click="handlePromoterChecked('business')">
                                <img src="../../../images/extension/promote-pay-business.png">
                                <p class="title-p">商业</p>
                                <p class="gray">{{promoterTypeData.business.xianjin | display_price}}元</p>
                                <p class="gray">{{promoterTypeData.business.lianbei | display_price}}贝</p>
                                <svg class="active" v-if="promoterData.business">
                                    <use xlink:href="#icon-promote-pay-moreChose"/>
                                </svg>
                            </li>
                            <li @click="handlePromoterChecked('yiyuan')">
                                <img src="../../../images/extension/promote-pay-client.png">
                                <p class="title-p">医院</p>
                                <p class="gray">{{promoterTypeData.yiyuan.xianjin | display_price}}元</p>
                                <p class="gray">{{promoterTypeData.yiyuan.lianbei | display_price}}贝</p>
                                <svg class="active" v-if="promoterData.yiyuan">
                                    <use xlink:href="#icon-promote-pay-moreChose"/>
                                </svg>
                            </li>
                            <li @click="handlePromoterChecked('lianshuo')">
                                <img src="../../../images/extension/promote-pay-drugstore.png">
                                <p class="title-p">连锁店</p>
                                <p class="gray">{{promoterTypeData.lianshuo.xianjin | display_price}}元</p>
                                <p class="gray">{{promoterTypeData.lianshuo.lianbei | display_price}}贝</p>
                                <svg class="active" v-if="promoterData.lianshuo">
                                    <use xlink:href="#icon-promote-pay-moreChose"/>
                                </svg>
                            </li>
                            <li @click="handlePromoterChecked('danti')">
                                <img src="../../../images/extension/promote-pay-hospital.png">
                                <p class="title-p">单体药店</p>
                                <p class="gray">{{promoterTypeData.danti.xianjin | display_price}}元</p>
                                <p class="gray">{{promoterTypeData.danti.lianbei | display_price}}贝</p>
                                <svg class="active" v-if="promoterData.danti">
                                    <use xlink:href="#icon-promote-pay-moreChose"/>
                                </svg>
                            </li>
                            <li @click="handlePromoterChecked('zhenshuo')">
                                <img src="../../../images/extension/promote-pay-multipleShop.png">
                                <p class="title-p">诊所</p>
                                <p class="gray">{{promoterTypeData.zhenshuo.xianjin | display_price}}元</p>
                                <p class="gray">{{promoterTypeData.zhenshuo.lianbei | display_price}}贝</p>
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
                        <address-popup @listenAreaChange="areaChangePromoter"/>
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
                selected: 'province',//city,province,partner,promoter,

                provinceError: false,
                provinceValue: 0,
                partner_provinceValue: 0,
                cityValue: 0,
                cityError: false,

                partnerData: null,

                promoterTypeData: null,//推广人类型数据信息

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
                return this.USER_INFO.status === 2 || this.USER_INFO.status === 1
            },

        },
        created() {
            this.initData();
        },
        methods: {
            initData() {
                this.loading = true;
                this.$http.get('user-permission/init-check', {
                    params: {
                        role: 4,
                        data: {},
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

            },
            //省处理
            async handleProvinceChange() {
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
                if (this.provinceError || this.provinceValue === 0) return;
                this.$store.commit('SAVE_USER_CHOOSE_DATA', {role: this.selected, data: this.provinceValue});
                this.$router.push('/authorization-agreement');
            },
            showAddressPicker() {
                this.regionVisible = true;
            },
            async areaChange(rdata) {
                this.region = rdata.region
                this.regionVisible = false
                if (rdata.cityCode) {
                    this.cityValue = rdata.cityCode;
                    const {data} = await this.$http.get('/area-user/check-area', {
                        params: {code: rdata.cityCode}
                    });

                    if (data.has) {
                        this.cityError = true;
                    } else {
                        this.cityError = false;
                    }
                }
            },

            showAddressPickerPromoter() {
                this.regionVisible_promoter = true;
            },
            async areaChangePromoter(rdata) {
                this.region_promoter = rdata.region
                this.promoter_value = rdata.cityCode
                this.regionVisible_promoter = false
            },

            handleCity() {
                if (this.cityError || this.cityValue === 0) return;
                this.$store.commit('SAVE_USER_CHOOSE_DATA', {role: this.selected, data: this.cityValue});
                this.$router.push('/authorization-agreement');
            },

            //合伙人
            handlePartner() {
                this.$store.commit('SAVE_USER_CHOOSE_DATA', {role: this.selected, data: this.partner_provinceValue});
                this.$router.push('/authorization-agreement');
            },
            handlePromoter() {
                if (!this.promoterActive) return;
                if (this.promoter_value === 0) return;

                this.$store.commit('SAVE_USER_CHOOSE_DATA', {role: this.selected, data: Object.assign({code: this.promoter_value}, this.promoterData)});
                this.$router.push('/authorization-agreement');
            },
            handlePromoterChecked(value) {
                this.promoterData[value] = !this.promoterData[value];
            }

        },
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
    }

    .select-area {
        width: 100%;
        height: 48px;
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
        justify-content: space-between;
        padding-right: .2rem;

        svg {
            width: 7px;
            height: 7px;
            margin-top: 20px;
        }
    }

    .tui-list {
        li {
            display: inline-block;
            width: 2.065rem;
            height: 2.6rem;
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
        width: 7px;
        height: 7px;
        float: right;
        margin-top: -27px;
        margin-right: 10px;
    }
</style>
