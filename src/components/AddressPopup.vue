<template>
    <div class="content">
        <!-- <div class="picker-toolbar-title">
            <div class="usi-btn-cancel" v-on:click="confirm(0)">取消</div>
            <div class="title">请选择收货地址</div>
            <div class="usi-btn-sure" v-on:click="confirm(1)">确定</div>
        </div>
        <mt-picker :slots="myAddressSlots" valueKey="name" :visibleItemCount="5" @change="addressChange"
                   :itemHeight="40">

        </mt-picker> -->
        <van-area @cancel="cancel" :area-list="newAddressList" @confirm="confirm"/>
    </div>
</template>

<script>
    import regionAddress from "@/plugins/json/pca-code.json"
    import newAddressList from "@/plugins/json/newPacCode2"
    export default {
        name: "AddressPopup",
        data(){
            return {
                region: '',//三级地址
                province: '',//省
                city: '',//市
                area: '',//县
                provinceCode: '',//省级代码
                cityCode: '', //市级代码
                areaCode: '',//县级代码
                regionInit: false,
                myAddressSlots: [//省
                    {
                        flex: 1,
                        values: regionAddress, //省份数组
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
                        values: regionAddress[0].children,
                        className: 'slot3',
                        textAlign: 'center'
                    },
                    {
                        divider: true,
                        content: '',
                        className: 'slot4'
                    },
                    //县
                    {
                        flex: 1,
                        values: regionAddress[0].children[0].children,
                        className: 'slot5',
                        textAlign: 'center'
                    }
                ],
                newAddressList:newAddressList
            }
        },
        created(){
        },
        methods:{
            // addressChange(picker,values){
            //     // console.log(values)
            //     if(!values[0]){
            //         // debugger
            //         this.$nextTick(() => {
            //             if (this.regionAddress) {
            //                 // 赋默认值
            //             } else {
            //                 picker.setValues([regionAddress[0], regionAddress[0].children[0], regionAddress[0].children[0].children[0]])
            //             }
            //         })
            //     }else{
            //         // debugger
            //         console.log(values)
            //         picker.setSlotValues(1,values[0].children)
            //         let town = []
            //         if (values[1]) {
            //             town = values[1].children
            //         }
            //         picker.setSlotValues(2, town)
            //     }

            //     if(values[0] && values[1]  && values[2]){
            //     	this.province = values[0]["name"]
            //     	this.city = values[1]["name"]
            //     	this.area = values[2]["name"]

            //         this.region = this.province + this.city +this.area
            //     }

            // },
            cancel() {
                this.$emit('listenAddressChange', {region:'',province: '',city: '',area: ''})
            },
            confirm(val) {
                let region = ''
                val.forEach((item,index, arr)=>{
                    region += item.name
                })
                let province = val[0].name
                let city = val[1].name
                let area = val[2].name
                 this.$emit('listenAddressChange',{region,province,city,area})
            },
            // confirm(corm){
            //     let region = corm ? this.region: ''
            //     let province = corm ? this.province: ''
            //     let city = corm ? this.city: ''
            //     let area = corm ? this.area: ''
            //     debugger
            //     this.$emit('listenAddressChange',{region,province,city,area})
            // }
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
