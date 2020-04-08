<template>
    <div class="record">
        <clxsd-head-top title='邀请记录' :append="true">
            <div slot="append" @click="showPopup">
                <span>筛选</span>
            </div>
        </clxsd-head-top>
        <!-- <div style="min-height:.88rem;"></div> -->
        <main v-if="isApply!=-1">
            <div class="searchbox">
                <SearchBar ref="searchBox" :searchFn="searchFn" :record='record' v-model="searchValue" @keyup="keyup" @clearText="clearText"></SearchBar>
            </div>
            <div v-if="list&&list.length" style="overflow: auto;">
                <mt-loadmore  ref="loadmore"  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded">
                    <ul>
                        <li v-for="(item,index) in list" :key="index">
                            <div v-if="item.user_type!=4">
                                <img v-if="(item.supplier&&item.supplier.img_cover) || item.avatar" :src="item.avatar?item.avatar:(item.supplier)?item.supplier.img_cover:''">
                                <img src="data:image/png;base64,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" v-else />
                                <section>
                                    <p style="font-size:.3rem;" v-if="item.supplier">{{item.supplier.display_name || item.supplier.name}}</p>
                                    <p style="margin-bottom:.2rem;" :class="{'supplier':item.supplier}" >{{item.real_name}}<span style="margin-left:.16rem"><b v-if="item.supplier">·</b>{{item.phone_desensite}}</span></p>
                                    <span v-if="item.supplier&&item.supplier.status==1" class="approve">已认证</span>
                                    <span v-else class="NOapprove">未认证</span>
                                     <span class="approve" style="margin-left:.22rem;">{{item.supplier&&item.supplier.type_desc || item.user_type_desc}}</span>
                                    <span class="province_name"  v-if="item.supplier">{{item.supplier.province_name}}<b v-if="item.supplier.city_name">·</b>{{item.supplier.city_name}}</span>
                                </section>
                            </div>
                            <div v-else>
                                 <img v-if="(item.supplier&&item.supplier.img_cover) || item.avatar" :src="item.avatar?item.avatar:(item.supplier)?item.supplier.img_cover:''">
                                <img src="data:image/png;base64,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" v-else />
                                <section>
                                    <p style="font-size:.3rem;" v-if="item.supplier">{{item.supplier.display_name}}</p>
                                    <p style="margin-bottom:.2rem;" :class="{'supplier':item.supplier}" >{{item.real_name}}<span style="margin-left:.16rem"><b v-if="item.supplier">·</b>{{item.phone_desensite}}</span></p>
                                    <span v-if="item.area_status==1" class="approve">已签约</span>
                                    <span v-else class="NOapprove">未签约</span>
                                     <span class="approve" style="margin-left:.22rem;">{{item.supplier&&item.supplier.type_desc || item.user_type_desc}}</span>
                                    <span class="province_name"  v-if="item.supplier">{{item.supplier.province_name}}<b v-if="item.supplier.city_name">·</b>{{item.supplier.city_name}}</span>
                                </section>
                            </div>
                            <div class="created_at">{{item.created_at_int*1000 |formatDate(fmt = "yyyy/MM/dd")}}</div>
                        </li>
                    </ul>
                    <div style="text-align: center;color: #999;margin:10px 0;" v-if="allLoaded">—— 没有更多啦 ——</div>
                </mt-loadmore>
            </div>
            <UnJurisdiction  v-else></UnJurisdiction>
        </main>
        <becomePromote v-else class="becomePromote_box">
            <div slot="main" class="becomePromote">
                <img src="../../images/becomePromote2.png" alt="">
                <div>
                    <p>
                       您还没有成为推广人
                    </p>
                    现在去
                    <span @click="toRouter('/customer-choose-role?type=promoter')">申请推广人</span>，
                    终端采购我受益
                </div>
            </div>
        </becomePromote>
        <div class="popupBox">
            <mt-popup
            v-model="popupVisible"
            position="bottom"
            class="popup"
            popup-transition="popup-fade">
                <div class="head">
                    <div @click="popupVisible=!popupVisible">取消</div>
                    <div @click="handleChoose">确定</div>
                </div>
                <div class="container">
                    <div class="item" v-for="(item,index) of subRoles" :class="{checked:item.checked}" :key="index" @click="choosePromote(index)">
                        <div >{{item.name}}</div>
                        
                    </div>
                    <div class="noIsPromote" v-if="!subRoles || !subRoles.length">
                        <p>您还没有成为推广人</p>
                        <p>
                            现在去
                        <span @click="toRouter('/customer-choose-role?type=promoter')">申请推广人</span>, 终端采购我受益
                        </p>
                        
                    </div>
                </div>
               
            </mt-popup>      
        </div>
          
    </div>
</template>

<script>
import UnJurisdiction from "../../components/EmptyList";//推广人
import SearchBar from '@/components/common/SearchBar';
import { mapState } from 'vuex'
import becomePromote from "@/components/promote/becomePromotBg"
export default {
    name:'record',
    data(){
        return{
            list:[],
            record:true,
            searchValue:'',
            limit:20,
            page:1,
            allLoaded:false,
            popupVisible: false,
            subRoles: []
        }
    },
    components:{
        UnJurisdiction,
        SearchBar,
        becomePromote
    },
    computed: {
        ...mapState({
            isApply: state => state.is_apply
        })
    },
    created(){
        this._getData()
    },
    methods:{
        goBackFnc(){},
        _getData() {
            this._getList()
        },
        clearText(){
            this.searchValue = ''
        },
        // 点击搜索
        searchFn() {
            this.page = 1
            this.list = []
            this._getList()
                this.$refs.searchBox.$refs.input.blur()
            },
        keyup() {
            this.searchFn()
        },
        /**
         * 点击筛选
         */
        showPopup() {
            this.popupVisible = true
        },
        /**
         * 获取李彪
         * flag代表是不是上拉加载
         */
        _getList(flag) {
            let value = []
            this.subRoles.forEach(item=>{
                if(item.checked) {
                  value.push(item.value)
                }
            })
            let params = {
                limit: this.limit,
                page: this.page,
                search: this.searchValue,
                apply_sub_role: value
            }
             this.$http.get(`users/self/`,
             {params},
            {
            validate: state => state === 200
            }).then(response => {
                
                let data = response.data.data
                let list = data.users.length>0?data.users : []
                flag&&this.$refs.loadmore.onBottomLoaded()
                data.subRoles.forEach((item, index, arr)=>{
                    arr[index].checked = false
                })
                
                this.subRoles = data.subRoles
                
                this.list = this.list.concat(list)
                if(list.length<=0) {
                    this.allLoaded = true
                }
                this.page++
            })
            .catch(error => {
            });
        },
        loadBottom(){
            this._getList(true)
        },
        loadTop(){
            // this.$refs.loadmore.onTopLoaded()
        },
        // 点击选择筛选推广类型
        choosePromote(index) {
            this.subRoles[index].checked = !this.subRoles[index].checked
        },
        // 点击确认筛选
        handleChoose() {
            this.popupVisible = false
            this.page = 1
            this.list = []
            this._getList()
        },
       
    }
}
</script>


<style lang="scss" scoped>
    .record {
        display: flex;
        height: 100%;
        flex-direction: column;
        .becomePromote_box {
            flex: 1;
            background: #fff;
        }

    main {
        padding:  0 .2rem;
        flex:1;
        overflow: auto;
        display: flex;
       
        flex-direction: column;
        .searchbox {
            margin-top: .1rem;
        }
        ul {
            // margin-top: .3rem;
            flex: 1;
            overflow: auto;
            padding-bottom: .1rem;
            li {
                // width:7.1rem;
                height:2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-weight:500;
                background:rgba(255,255,255,1);
                border-radius:.08rem;
                margin-top: .2rem;
                div {
                    display: flex;
                    align-items: center;
                    // height: 100%;
                    padding: 0 .32rem;
                    position: relative;
                    b {
                        padding: 0 .06rem;
                    }
                    img {
                        display: block;
                        width:.96rem;
                        height:.96rem;
                        border-radius:50%;
                    }
                    section {
                        margin-left: .23rem;
                        margin-right: .16rem;
                        flex-grow: 1;
                        span {
                        font-size: .28rem;
                        color: #999;
                    }
                    }
                    p {
                        
                        font-size: .34rem;
                        color: #333;
                    }
                    
                    &>span:nth-of-type(1) {
                        font-size: .24rem;
                        // flex: 1;
                        text-align: right;
                        color: #666;
                        margin-bottom: .31rem;
                        align-self: flex-end;
                    }
                    .approve {
                        font-size: .2rem !important;
                        padding: 0 .1rem 0 .1rem;
                        color: #0090FF !important;
                        border:1px solid rgba(0,144,255,1);
                        border-radius:.04rem;
                    }
                }
            }
        }

    }
    }
    .no_invited {
        font-size: .3rem;
        color: #333;
        text-align: center;
    }
    .supplier {
        margin-top: .1rem;
        margin-bottom: .2rem;
        color: #999 !important;
        font-size: .28rem !important;
        span {
        // font-size: .2rem !important;
        margin-left: 0 !important;
        }
        
    }
    .province_name {
            padding: 0 .1rem 0 .1rem;
            font-size: .2rem !important;
            // position: absolute;
            color: #0090FF!important;
            margin-left: .22rem !important;
            border:1px solid rgba(0,144,255,1);
            border-radius:.04rem;
        }
    .created_at {
        // text-align: right !important;
        display: flex;
        font-size: .24rem;
        // width:126px;
        height:.19rem !important;
        justify-content: flex-end;
        margin-top: .1rem;
    }
    .NOapprove {
        font-size: .2rem !important;
        padding: 0 .1rem 0 .1rem;
        color: #999999 !important;
        border:1px solid rgba(153,153,153,1);
        border-radius:.04rem;
    }
    .popupBox {
        width: 100%;
        .popup {
            width: 100%;
            background: #f5f5f5;
            .container {
                // margin: .5rem 0;
                min-height: 3.64rem;
                display: flex;
                // justify-content: space-between;
                width: 100%;
                flex-wrap: wrap;
                padding: .5rem .3rem;
                text-align: center;
                line-height: .44rem;
                color: #666;
                font-size: .28rem;
                div {
                    
                    // width: 100%;
                    span {
                        color: #0090FF;
                    }
                }
                .noIsPromote {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
               
                .item {
                    // width: 2.18rem;
                    width: 30%!important;
                    margin-bottom: .1rem;
                    margin-right: .2rem;
                    display: inline-block;
                    height: 1.24rem;
                    color: #666;
                    text-align: center;
                    line-height:  1.24rem;
                    font-size: .3rem;
                    background: #fff;
                }
                .checked {
                    background: #0090FF;
                    color: #fff;
                }
            }
            
        }
        .head {
            height: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 .2rem;
            width: 100%;
            div:first-child {
                color: #333;
                width:1.4rem;
                height:.88rem;
                border:1px solid rgba(51,51,51,1);
                border-radius:22px;
                text-align: center;
                line-height: .88rem;
            }
             div:last-child {
                color: #fff;
                width:1.4rem;
                height:.88rem;
                background: #2DA2FF;
                // border:1px solid rgba(51,51,51,1);
                border-radius:22px;
                text-align: center;
                line-height: .88rem;
            }
        }
    }
   
</style>