<template>
    <div id="TransferAccounts">
        <clxsd-head-top title='转账'></clxsd-head-top>
        <div class="search">
            <SearchBar :placeholder="'请输入手机号'" v-model="searchValue"
                       :searchFn="searchChange" style="border:1px solid #f1f1f1"></SearchBar>
        </div>
        <div class="trans-container" v-if="hasSearch && userInfo">
            <div class="info">
                <img src="../../../images/pic_default_man.png" width="30%">
                <p>{{userInfo.display_name || userInfo.real_name}}</p>
            </div>
            <div class="form1">
                <label>转账联贝量（贝）</label>
                <input type="text"  @input="check_price"　v-model="tranValue">
                <button :class="active ? 'active':''" :disable="active" @click="toTran">确认转账</button>
            </div>
        </div>
        <div class="empty" v-if="hasSearch && !userInfo">
            <img src="../../../images/extension/noMan.png" width="30%">
            <p>~~查无此人~~</p>
        </div>
        <CircleLoading v-if="loading" />
        <PayPassword v-if="toPay" ref="payPassword"
                     @backFnc="toPay=false"
                     @keyUpHandle="payPasswordComputed" style="position: fixed;
    bottom: 0px;
    z-index: 998;
    width: 100%;
    height: 6.6rem;"/>
    </div>
</template>

<script>
    import SearchBar from '@/components/common/SearchBar';
    import { phonePattern } from "@/util";
    import CircleLoading from "@/icons/CircleLoading";
    import PayPassword from "@/components/common/PayPassword";

    export default {
        name: "TransferAccounts",
        components:{
            PayPassword,
            CircleLoading,
            SearchBar,
        },
        data(){
            return {
                searchValue:'',
                loading: false,
                userInfo:null,
                tranValue:0.00,
                hasSearch: false,
                toPay: false,
            }
        },
        computed:{
            active(){
                return this.tranValue > 0
            }
        },
        methods:{
            searchChange(){
                const curPhone = this.$store.state.CURRENTUSER.data.phone;
                if(!phonePattern.test(this.searchValue)){
                    this.$toast('请输入正确的手机号！')
                    return;
                }

                if(this.searchValue === curPhone){
                    this.$toast('不能转给自己！')
                    return;
                }
                this.loading = true;
                this.$http.get('lianbei/find-user',{
                        params:{phone: this.searchValue},
                        validate: status => status === 200
                    })
                    .then(response => {
                        this.hasSearch = true;
                        this.loading = false;
                        this.userInfo = response.data;
                    }).catch(error => {
                        this.hasSearch = true;
                        this.loading = false;
                        this.userInfo = null;
                        //this.$toast(error.response.data.message);
                    })
            },
            check_price: function(){
                let price = '' + this.tranValue;
                price = price
                    .replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
                    .replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
                    .replace('.', '$#$')
                    .replace(/\./g, '')
                    .replace('$#$', '.')
                    .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
                if (price.indexOf('.') < 0 && price != '') {
                    // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                    price = parseFloat(price);
                }

                this.tranValue = price;
            },
            toTran(){
                console.log(444)
                if(this.tranValue > 0){console.log(777)
                    const curPhone = this.$store.state.CURRENTUSER.data.phone;
                    if(!phonePattern.test(this.searchValue)){
                        this.$toast('请输入正确的手机号！')
                        return;
                    }

                    if(this.searchValue === curPhone){
                        this.$toast('不能转给自己！')
                        return;
                    }

                    if(!this.userInfo.id){
                        this.$toast('请输入转对象')
                        return;
                    }

                    this.loading = true;
                    this.$http.post('lianbei/trans',{
                            toUserId: this.userInfo.id,
                            value: this.tranValue,
                    },{validate: status => status === 200})
                        .then(response => {
                            this.loading = false;

                            if(response.data.can){
                                this.toPay=true;
                            }
                        }).catch(error => {
                        this.loading = false;
                        this.$toast(error.response.data.message);
                    })
                }
            },
            payPasswordComputed(data){
                if(data.length === 6){

                    this.$http.post('lianbei/trans',{
                        toUserId: this.userInfo.id,
                        value: this.tranValue,
                        password: data.join(''),
                    },{validate: status => status === 200})
                        .then(response => {
                            this.toPay = false;
                            this.$toast('转出成功！');
                            this.goBack();
                        }).catch(error => {
                        this.toPay = false;
                        this.$toast(error.response.data.message);
                    });
                }
            }

        }
    }
</script>

<style lang="scss" scoped>
    #TransferAccounts {
        min-height: 100%;
        background: #fff;
    }
    .search {
        padding: .2rem;
    }
    .empty {
        padding-top: 1.5rem;
        font-size: .34rem;
        text-align: center;
        p {
            margin-top: .2rem;
        }
    }
    .info {
        text-align: center;
        padding-top: 1rem;
        img {
            width: 1.3rem;
            height: 1.3rem;
        }
        p {
            line-height: 1.5;
            font-size: .32rem;
        }
    }
    .form1 {
        padding: .2rem;
        label {
            display: block;
            font-size: .3rem;
            color: #7C7C7C;
        }
        input {
            display: block;
            width: 100%;
            height: 1.4rem;
            border:0px;
            border-bottom: 1px solid #f1f1f1;
            font-size: .7rem;
        }
        button {
            display: block;
            width: 100%;
            height: .88rem;
            color: #fff;
            font-size: .34rem;
            border-radius: 4px;
            margin-top: .4rem;
        }
        button.active{
            background: #26a2ff;
        }
    }
</style>