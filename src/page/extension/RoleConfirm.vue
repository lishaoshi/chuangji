<template>
    <div class="role">
        <!-- 信息确认页面 -->
        <clxsd-head-top title="信息确认"></clxsd-head-top>
        <!-- 用户信息 -->
        <ul class="user-list">
            <li>
                <div class="user">
                    <span>姓名</span>
                    <p>{{name}}</p>
                </div>
                <!-- <div class="line"></div> -->
                <div class="iphone">
                    <span>联系电话</span>
                    <p>{{tel}}</p>
                </div>
            </li>
            <li>
                <div class="id-number">
                    <span>身份证号</span>
                    <p>{{cartId}}</p>
                </div>
            </li>
        </ul>
        <!-- 申请，推广人 -->
        <ul class="application-list">
            <li>
                <div class="user">
                    <span>申请角色</span>
                    <p v-if="role==='promoter'">推广人</p>
                    <!-- <p v-if="role==='partner'">集采商</p> -->
                    <p v-if="role==='city_company'">市级推广</p>
                    <p v-if="role==='partner'">集采商</p>
                    <p v-if="role==='province_company'">省级推广</p>
                    <p class="type" v-if="selectedSaveData!=undefined">
                        <span v-if="selectedSaveData.business">商业</span>
                        <span v-if="selectedSaveData.danti">单体</span>
                        <span v-if="selectedSaveData.lianshuo">连锁</span>
                        <span v-if="selectedSaveData.yiyuan">医院</span>
                        <span v-if="selectedSaveData.zhenshuo">诊所</span>
                        </p>
                </div>
                <div class="region">
                    <span>申请区域</span>
                    <p>{{address}}</p>
                </div>
            </li>

            <!-- <li class="money-container" v-if="role==='promoter'">
                <span class="cost">入驻费用(元)</span>
                <span class="money">￥{{money | display_price}}</span>
            </li> -->
        </ul>

        <!-- 确认按钮 -->
        <div class="button" @click="toPay">确认申请</div>

        <!-- 注意事项 -->
        <div class="warning">
            <div class="header">
                <span>注意事项</span>
                <svg>
                    <use xlink:href="#icon-attention"/>
                    <!-- icon-attention -->
                </svg>
            </div>
            <div class="tontent">
                <ul>
                    <li>
                        1、请核实以上申请信息，以便我们及时与您联系;
                    </li>
                    <li>
                        2、为保障您的权限，请确保填写您的真实信息;
                    </li>
                    <li>
                        3、创联工厂使用银行级SSL加密系统，保障您的信息安全传输,请放心使用;
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
    import { mapState } from 'vuex'
    import areaData from "@/plugins/json/pca-code.json";
    export default {
        name: "role-yes",
        data(){
            return{
                areaData:areaData,
                address:'',
                money:0,
                name:'',
                tel:'',
                cartId:'',
                roleList:null,
                apply_sub_role:''
            }
        },
        computed:{
            ...mapState({
                USER_CHOOSED_DATA: state => state.USER_CHOOSED_DATA
            }),
            role(){
                return this.USER_CHOOSED_DATA.selected_role;
            },
            selectedSaveData(){
                return this.USER_CHOOSED_DATA.selected_save_data
            }

        },
        created() {
            if(!this.role){
                this.$router.push('/home');
                return;
            }
            this.initData();

            
        },
        mounted(){
            var apply_sub_role = ''
           
            
            // this.selectedSaveData
            if(this.selectedSaveData){
                if(this.selectedSaveData['business']){
                this.apply_sub_role +='business,'
            }
             if(this.selectedSaveData['danti']){
                this.apply_sub_role +='danti,'
            }
             if(this.selectedSaveData['lianshuo']){
                this.apply_sub_role +='lianshuo,'
            }
            if(this.selectedSaveData['yiyuan']){
                this.apply_sub_role +='yiyuan,'
            }
             if(this.selectedSaveData['zhenshuo']){
                this.apply_sub_role +='zhenshuo,'
            }
            this.apply_sub_role = this.apply_sub_role.slice(0,apply_sub_role.length-1)
            }
            

        },
        methods:{
            initData(){
               this.$http.get("/user").then(res => {
                   this.name = res.data.data.real_name
                   this.tel =  this.$route.query.phone || ''
                   this.cartId = res.data.data.user_identity
               })
                if(this.role=='promoter'){
                    var code = this.selectedSaveData.code
                }
                var code = this.USER_CHOOSED_DATA.selected_save_data.code?this.USER_CHOOSED_DATA.selected_save_data.code:this.USER_CHOOSED_DATA.selected_save_data
                this.areaData.forEach(item => {
                    if(code == item.code){
                        this.address = item.name
                        return
                    }
                    var firstName = item.name
                    item.children.forEach(entity => {
                        if(code == entity.code){
                            this.address = firstName + entity.name
                            return
                        }
                    })
                })
            },

            fliter(data){
                 if(data.apply_sub_role == null){
                        delete data.apply_sub_role
                    }
            },
            toPay(){
                if(this.loading) return;
                var data = {
                        apply_role:this.role,
                        apply_sub_role:this.apply_sub_role?this.apply_sub_role:null,
                        province:(this.selectedSaveData.code&&this.selectedSaveData.code.substring(0, 2))||this.selectedSaveData.substring(0, 2),
                        mobile: this.tel,
                        city: this.selectedSaveData.code||(this.role=="province_company"?"":this.selectedSaveData)
                }
                this.fliter(data)
                this.$http.post('/hippo-shop/area-user',{
                        ...data
                }).then(res=>{
                    if(res.data.code == 200){
                        this.$router.push('/apply-success');
                    }
                })
               
            },
        }
    };
</script>


<style lang="scss" scoped>
    .role {
        // height: 100vh;
        padding-bottom: 0.72rem;
        /*--------------用户信息-------------- */
        .user-list {
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
                        color: rgba(204, 204, 204, 1);
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
                }
            }
        }

        /*--------------申请信息-------------- */
        .application-list {
            margin-top: 0.2rem;

            li {
                height: 1.4rem;
                background: white;
                display: flex;
                border-bottom: 0.01rem solid whitesmoke;

                .user,
                .region {
                    line-height: 1;
                    width: 50%;
                    padding-left: 0.32rem;
                    padding-top: 0.34rem;

                    .type {
                        margin-top: 0.1rem;
                        font-size: 0.2rem !important;
                        span {
                            color: #999;
                            font-size: .2rem;
                            padding-right: .15rem;
                        }
                    }

                    span {
                        font-size: 0.24rem;
                        //   display: inline-block;
                        color: rgba(204, 204, 204, 1);
                        font-weight: 500;
                        height: 0.23rem;
                    }

                    p {
                        font-size: 0.28rem;
                        margin-top: 0.13rem;
                        font-weight: 500;
                        color: rgba(51, 51, 51, 1);
                    }
                }

                .region {
                    border-left: 0.01rem solid rgba(245, 245, 245, 1);
                }
            }

            .money-container {
                padding: 0 0.32rem 0 0.32rem;
                display: flex;
                justify-content: space-between;
                line-height: 1.4rem;
                font-size: 0.24rem;
                font-weight: 500;

                .cost {
                    color: rgba(204, 204, 204, 1);
                }

                .money {
                    color: rgba(250, 84, 82, 1);
                }
            }
        }

        .button {
            width: 6.9rem;
            height: 0.94rem;
            margin: 1rem auto 0.6rem;
            text-align: center;
            line-height: 0.94rem;
            background: rgba(0, 144, 255, 1);
            box-shadow: 0rem 0rem 0.1rem 0rem rgba(45, 162, 255, 0.5);
            border-radius: 0.47rem;
            font-size: 0.32rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
        }

        .warning {
            width: 6.9rem;
            margin: 0 auto;
            height: 3.01rem;
            background: rgba(255, 255, 255, 1);
            border-radius: 0.16rem;

            .header {
                width: 6.9rem;
                height: 0.8rem;
                background: rgba(0, 144, 255, 0.1);
                border-radius: 0.16rem 0.16rem 0rem 0rem;
                line-height: 0.8rem;
                padding: 0 0.32rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                svg {
                    width: 0.44rem;
                    height: 0.37rem;
                }

                span {
                    color: rgba(0, 144, 255, 1);
                    font-weight: bold;
                    font-size: 0.3rem;
                }
            }

            .tontent {
                font-size: 0.24rem;
                font-weight: 500;
                height: 2.21rem;
                padding: 0.24rem 0.32rem 0.44rem;
                // padding-left: 0.32rem;

                ul {
                    li {
                        margin-top: .1rem;
                    }
                }
            }
        }
    }
</style>