<template>
    <div id="Address">
        <clxsd-head-top :title='`地址管理`'></clxsd-head-top>
        <div class="address" v-if="addressList.length>0">
            <div class="address-item" :class="choose ? 'choose':''" v-for="(item,index) in addressList">
                <div class="choose-icon" v-if="choose">
                    <svg class="check goods-check shopCheck" @click="chooseAddress(index)">
                        <use :xlink:href="`#icon-IsCheckedShop-${item.checked ? 'open' : 'close' }`"/>
                    </svg>
                </div>
                <div class="address-info">
                    <div class="name"><div class="mr" v-if="item.is_default == 1">默认</div>{{item.consignee}}&nbsp;&nbsp;{{item.tel}}</div>
                    <p class="add-detail"><span style="color: #999">{{item.full_address}}</span></p>
                </div>
                <div class="address-edit">
                    <router-link :to="`/address/address-change/${item.id}`">
                        <img src="../../images/shopping/redact.png" width="15" height="15"/>
                    </router-link>
                    <img src="../../images/shopping/delete.png" width="15" height="15" @click="deleteAddressFn(index,item)"/>
                </div>
            </div>
        </div>
        <!-- <div v-else class="empty">
            <img src="../../images/address_empty.png" width="40%">
            <p>地址空空如也~ </p>
        </div> -->
        <EmptyList v-else/>
        <router-link to="/address-add">
            <div class="bottom-btn">
                <svg>
                    <use xlink:href="#icon-factory-addPrice"/>
                </svg>
                <span>新增收货地址</span>
            </div>
        </router-link>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import {getAddressList, deleteAddress} from "@/api/address.js"
    import EmptyList from "@/components/EmptyList"

    export default {
        name: "Address",
        data() {
            return {
                consignee: '',//货人姓名
                tel: null,//手机号
                province: null,//省
                city: null, //市
                district: null,//区
                address: null,//详细街道
                is_default: 1,//是否是默认地址1是默认,0不是
                region: null,//省市区
                choose: false,
                addressList: []
            }
        },
        components: {
            EmptyList
        },
         created() {
            // debugger
            console.log('dello')
            if (!!this.$route.query.choose) {
                this.choose = true
            }
            this._initData();
        },
        watch: {
            // $route(to) {
            //     console.log(to, '123')
            //     debugger
            //     if(to.path!=null){
            //         this._initData();
            //     }
            // }
        },
        activated() {
            // console.log('hello123')
            this._initData();
        },
        methods: {
            ...mapMutations(['CHOOSE_ADDRESS']),
            async _initData() {
                // debugger
                let {data} = await getAddressList()
                console.log(data)
                if (data instanceof Array && data.length) {
                    if (this.choose) {
                        data.forEach((item, i) => {
                            data[i].checked = false
                        })
                    }
                    this.addressList = data
                }
            },
            //删除地址
            async deleteAddressFn(index, item) {
                this.$messagebox.confirm("确定要删除吗?").then(action => {
                    if (action === 'confirm') {
                        deleteAddress(item.id)
                        this.addressList.splice(index, 1)
                    }
                }).catch(err => err);

            },
            chooseAddress(i) {
                this.addressList.forEach((address, index) => {
                    if (i === index) {
                        this.addressList[index].checked = true
                        this.CHOOSE_ADDRESS({address})
                    } else {
                        this.addressList[index].checked = false
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bottom-btn {
        position: fixed;
        bottom: 0px;
        height: .98rem;
        line-height: .98rem;
        width: 100%;
        background: #fff;
        color: #26a2ff;
        border-top: 1px solid #f1f1f1;
        font-size: .34rem;
        display: flex;
        text-align: center;
        justify-content: center;

        svg {
            width: .4rem;
            height: .4rem;
            margin-right: .08rem;
            margin-top: .26rem;
        }
    }

    .address {
        background: #fff;
        // margin-bottom: 1.3rem; 
        &>div:last-child {
            margin-bottom: 1.4rem;
        }
    }

    .choose-icon {
        padding-right: 0.2rem;
        display: flex;
        align-items:center;

        .check {
            height: 0.35rem;
            width: 0.35rem;
        }
    }

    .address-item {
        // padding: .32rem .2rem;
        height: 1.8rem;
        padding: 0 .24rem;
        background: #fff;
        position: relative;
        display: flex;
        // align-items: center;
        border-bottom: 1px solid #f1f1f1;
        width: 100%;

        .address-info {
            width: 85%;
            justify-content: space-between;
            line-height: 12px;
            overflow: hidden;

            .name {
                font-size: .32rem;
                margin-bottom: .05rem;
                line-height: .4rem;
                margin-top: .36rem;
                display: inline-flex;
                div {
                    &:nth-child(1) {
                        color: #333;
                        // padding-right: .2rem;
                    }

                    &:nth-child(2) {
                        color: #666;
                    }
                    &.mr {
                    // display: inline-block;
                    text-align:center;
                    padding: 0 0.08rem;
                    background:rgba(255,59,48,1);
                    margin-right: 4px;
                    color: #fff;
                    font-size: .28rem;
                    border-radius: 2px;
                }
                }
               
            }

            .add-detail {
                font-size: .28rem;
                // padding: 2px 0px;
                max-height: 44px;
                overflow: hidden;
                color: #333;
                margin-top:.12rem;
                
            }

            .add-detail {
                font-size: .28rem;
                padding: 2px 0px;
                max-height: 44px;
                overflow: hidden;
                color: #999;
            }
        }

        .address-edit {
            width: 17%;
            float: right;
            text-align: right;
            display: flex;
            align-items: center;
            img {
                margin-left: 10px;
                display: inline-block;
            }
        }

    }

    .empty {
        text-align: center;
        font-size: .32rem;
        line-height: 2;
        padding-top: 2rem;
    }
</style>