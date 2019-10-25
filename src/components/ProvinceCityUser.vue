<template>
    <div class="content">
        <!-- <div class="picker-toolbar-title">
            <div class="usi-btn-cancel" v-on:click="confirm(0)">取消</div>
            <div class="title">请选择区域</div>
            <div class="usi-btn-sure" v-on:click="confirm(1)">确定</div>
        </div> -->

        <!-- <van-popup v-model="myAddressSlots"> -->
             <van-area @cancel="cancel" :area-list="newAddressList" value="130100" :columns-num="2" @change="addressChange" @confirm="confirm"/>
        <!-- </van-popup> -->
       
        <!-- <mt-picker :slots="myAddressSlots" valueKey="name" :visibleItemCount="5" @change="addressChange"
                   :itemHeight="40">

        </mt-picker> -->
    </div>
</template>
<script>
    import regionAddress from "@/plugins/json/pca-codes.json"
    import areaAddress from "@/plugins/json/pca-codes.json"
    import newAddressList from "@/plugins/json/newPcaCode"
    import { fstat } from 'fs';
    regionAddress.forEach((shengItem,ind) =>{
        shengItem.children.forEach((shiItem,shInd) =>{
            if((shengItem.code + '01') === shiItem.code){
                delete(shengItem.children[shInd]);
            }
        });
    });


    export default {
        name: "AddressPopup",
        data(){
            return {
                region: '',//三级地址
                province: '',//省
                city: '',//市b
                provinceCode: '',//省级代码
                cityCode: '', //市级代码
                regionInit: false,
                flag:false,
                myAddressSlots: [//省
                    {
                        flex: 1,
                        values: regionAddress, //省份数组
                        className: 'slot1',
                        textAlign: 'center',
                        // defaultIndex: 1
                    },
                    //分隔符
                    {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    },
                    //市
                    {
                        flex: 1,
                        values: [],
                        className: 'slot3',
                        textAlign: 'center',
                        defaultIndex: 1
                    },
                ],
                // currenProvinceName: ""   //当前省名称
                addressData: [],
                changeCity:false,
                newAddressList: newAddressList
            }
        },
        props: {
            regionVisible: {
                type: Boolean,
                default: false
            }
        },
        methods:{

            // 取消按钮
            cancel() {
                // debugger
               this.$emit('listenAreaChange')
            },
            addressChange(picker,values){
                this.changeCity = true
                console.log(picker,values )
                this.province = values[0]["name"]
                this.city = values[1]["name"]
                this.provinceCode = values[0]['code'].substring(0, 2)
                this.cityCode = values[1]["code"].substring(0, 4)
                this.region = this.province + this.city
            },
            confirm(corm){
                if(this.changeCity){
                    this.$emit('listenAreaChange',{region:this.region,province:this.province,city:this.city,cityCode:this.cityCode,provinceCode:this.provinceCode})
                }else{
                    this.$emit('listenAreaChange',{region:'河北省石家庄市',province:'河北省',city:'石家庄市',cityCode:'1301',provinceCode:'13'})
                }
                }
            }
        }
</script>

<style lang="scss" scoped>
    .picker-toolbar-title {
        font-size: 14px;
        padding: 10px;
        display: flex;
        justify-content:space-between;
        line-height: 30px;
        .usi-btn-cancel,.usi-btn-sure {
            background: #999;
            padding: 0px 9px;
            display: inline-block;
            border-radius:3px;
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
</style>
