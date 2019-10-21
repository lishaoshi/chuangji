<template>
    <div class="role">
        <!-- 信息确认页面 -->
        <clxsd-head-top title="信息确认"></clxsd-head-top>
        <!-- 用户信息 -->
        <ul class="user-list">
            <li>
                <div class="user">
                    <span>姓名</span>
                    <p>张鑫鑫</p>
                </div>
                <!-- <div class="line"></div> -->
                <div class="iphone">
                    <span>手机号</span>
                    <p>15237367115</p>
                </div>
            </li>
            <li>
                <div class="id-number">
                    <span>身份证号</span>
                    <p>412326123456786419</p>
                </div>
            </li>
        </ul>
        <!-- 申请，推广人 -->
        <ul class="application-list">
            <li>
                <div class="user">
                    <span>申请角色</span>
                    <p v-if="role==='promoter'">推广人</p>
                    <p v-if="role==='partner'">合伙人</p>
                    <p v-if="role==='city'">市级推广</p>
                    <p v-if="role==='province'">省级推广</p>
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

            <li class="money-container" v-if="role==='promoter'">
                <span class="cost">入驻费用(元)</span>
                <span class="money">￥{{money}}</span>
            </li>
        </ul>

        <!-- 确认按钮 -->
        <div class="button" @click="toPay">
            确认申请
        </div>

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
                <dl>
                    <dt>
                        <div></div>
                        银行公户
                    </dt>
                    <dd>1111 2222 3333 4444 555</dd>
                </dl>
                <dl>
                    <dt>
                        <div></div>
                        银行公户
                    </dt>
                    <dd>1111 2222 3333 4444 555</dd>
                </dl>
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
                money:0
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
        methods:{
            initData(){
                console.log(this.USER_CHOOSED_DATA.selected_save_data)
                var code = this.USER_CHOOSED_DATA.selected_save_data
                if(this.role=='promoter'){
                    var code = this.selectedSaveData.code
                }
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
                this.$http.get('user-permission/promoter-data',{params:{
                        role:this.role,
                        data:JSON.stringify(this.USER_CHOOSED_DATA.selected_save_data),
                    }})
                    .then(response => {
                        console.log(response.data.data)
                        var data = response.data.data
                        var num1,num2,num3,num4,num5
                        if(this.selectedSaveData.business){
                            num1 = data.business.xianjin
                        }
                        if(this.selectedSaveData.danti){
                            num2 = data.danti.xianjin

                        }
                        if(this.selectedSaveData.lianshuo){
                            num3 = data.lianshuo.xianjin
                        }
                        if(this.selectedSaveData.yiyuan){
                            num4 = data.yiyuan.xianjin
                        }
                        if(this.selectedSaveData.zhenshuo){
                            num5 = data.zhenshuo.xianjin
                        }
                        this.money = num1+num2+num3+num4+num5
                        this.loading = false;
                    }).catch(error => {
                    this.loading = false;
                })
            },
            toPay(){
                if(this.loading) return;
                this.$router.push('/pay-success');
                /*
                let params = {
                    role:this.role,
                    data:JSON.stringify(this.USER_CHOOSED_DATA.selected_save_data),
                    //payType:this.payType,
                };
                console.log(params)
                this.$http.get('user-permission/make-sure',{
                    params,
                    validate: state => state === 200
                }).then(response => {
                    this.loading = false;
                    this.$store.dispatch('fetchUserInfo');
                    this.$router.push('/pay-success');
                }).catch(error => {
                    this.loading = false;
                    this.$toast(error.response.data.message);
                })

                 */
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
                            color: #333;
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
                padding: 0.24rem 0 0.44rem;

                dl {
                    height: 0.61rem;
                    line-height: 1;
                    margin-bottom: 0.31rem;

                    dt {
                        margin-left: 0.6rem;
                        font-weight: 500;
                        color: rgba(153, 153, 153, 1);
                        display: flex;
                        align-items: center;
                        margin-bottom: 0.19rem;

                        div {
                            width: 0.1rem;
                            height: 0.1rem;
                            margin-right: 0.2rem;
                            background: rgba(250, 84, 82, 1);
                            border-radius: 50%;
                        }
                    }

                    dd {
                        margin-left: 0.9rem;
                        color: rgba(51, 51, 51, 1);
                    }
                }
            }
        }
    }
</style>