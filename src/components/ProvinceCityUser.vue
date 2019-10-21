<template>
    <div class="content">
        <div class="picker-toolbar-title">
            <div class="usi-btn-cancel" v-on:click="confirm(0)">取消</div>
            <div class="title">请选择区域</div>
            <div class="usi-btn-sure" v-on:click="confirm(1)">确定</div>
        </div>
        <mt-picker :slots="myAddressSlots" valueKey="name" :visibleItemCount="5" @change="addressChange"
                   :itemHeight="40">

        </mt-picker>
    </div>
</template>
<script>
    import regionAddress from "@/plugins/json/pca-codes.json"
    import areaAddress from "@/plugins/json/pca-codes.json"
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
            regionVisible: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                region: '',//三级地址
                province: '',//省
                city: '',//市b
                provinceCode: '',//省级代码
                cityCode: '', //市级代码
                regionInit: false,
                myAddressSlots: [//省
                    {
                        flex: 1,
                        values: areaAddress, //省份数组
                        className: 'slot1',
                        textAlign: 'center'
                    },
                    //分隔符
                    {
                        divider: true,
                        content: '',
                        className: 'slot2'
                    },
                    //市
                    {
                        flex: 1,
                        values: areaAddress[0].children,
                        className: 'slot3',
                        textAlign: 'center'
                    },
                ],
            }
        },
        watch: {
            regionVisible() {
                // debugger
                if(this.regionVisible) {
                    this.region = ''
                    this.province = ''
                    this.provinceCode = ''
                    this.city = ''
                    this.regionInit = ''
                }
            }
        },
        methods:{
            addressChange(picker,values){
               this.region = ''
                this.province = ''
                this.provinceCode = ''
                this.city = ''
                this.regionInit = ''
                // debugger
                if(!values[0]){
                    this.$nextTick(() => {
                        if (this.regionAddress) {
                            // 赋默认值
                        } else {
                            picker.setValues([regionAddress[0], regionAddress[0].children[0]])
                        }
                    })
                } else {
                    // debugger
                    this.region = ''
                    this.province = ''
                    this.provinceCode = ''
                    this.city = ''
                    this.regionInit = ''
                    picker.setSlotValues(1,values[0].children)
                }
                // debugger
                // this.region = ''
                // this.province = ''
                // this.provinceCode = ''
                // this.city = ''
                // this.regionInit = ''
                // if(values[1]) {
                //     picker.setSlotValues(1,values[0].children)
                // }
                if(values[0] && values[1]){
                    // debugger
                    // console.log(values[0], values[1])
                
                    this.province = values[0]["name"]
                    this.city = values[1]["name"]
                    this.provinceCode = values[0]['code']
                    this.cityCode = values[1]["code"]

                    this.region = this.province + this.city
                } else {
                    // debugger
                }
                // this.region = ''
                // this.province = ''
                // this.provinceCode = ''
                // this.city = ''
                // this.regionInit = ''
                

            },
            confirm(corm){
                let region = corm==1 ? this.region: ''
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
