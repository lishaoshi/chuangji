<template>
    <div class="content">
        <div class="picker-toolbar-title">
            <div class="usi-btn-cancel" v-on:click="confirm(0)">取消</div>
            <div class="title">请选择区域</div>
            <div class="usi-btn-sure" v-on:click="confirm(1)">确定</div>
        </div>
        <!-- <van-area :area-list="newAddressList" :columns-num="2" title="标题" /> -->
        <mt-picker :slots="myAddressSlots" valueKey="name" :defaultIndex="2" :visibleItemCount="5" @change="addressChange"
                   :itemHeight="40">

        </mt-picker>
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
        props: {
        },
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
                        defaultIndex: 0
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
                        defaultIndex: 0
                    },
                ],
                // currenProvinceName: ""   //当前省名称
                addressData: []
            }
        },
        methods:{
            addressChange(picker,values){
                this.addressData = values
               let provinceData = picker.getSlotValue(0)
                if(!values[0]){
                    this.$nextTick(() => {
                        if (this.regionAddress) {
                        } else {
                            picker.setValues([regionAddress[0], regionAddress[0].children[0]])
                        }
                    })
                } else {
                    picker.setSlotValues(1,values[0].children)
                }
                if(provinceData.name&&values[1]) {
                  let index =  provinceData.children.findIndex((item)=>{
                       return item.name == values[1].name
                   })
                   if(index===null || index === undefinded) {
                       picker.setSlotValue(1, values[0].children[1])
                   }
               }
                if(values[0] && values[1]){
                    this.province = values[0]["name"]
                    this.city = values[1]["name"]
                    this.provinceCode = values[0]['code']
                    this.cityCode = values[1]["code"]
                    this.region = this.province + this.city
                } else {
                    
                }
            },
            confirm(corm){
                this.addressData
                // debugger
                let region = corm ? this.region: ''
                let province = corm ? this.province: ''
                let city = corm ? this.city: ''
                let cityCode = corm ? this.cityCode: ''
                let provinceCode = corm ? this.provinceCode: ''
                this.$emit('listenAreaChange',{region,province,city,cityCode,provinceCode})
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
