<template>
    <div>
        <clxsd-head-top title='添加微信' style="border-bottom: 0px"></clxsd-head-top>
        <span class="btn" @click="saveWeixin()">保存</span>
        <div>
            <div  class="m-form-row m-main">
                <label for="name" class="label-width">姓名</label>
                <div class="m-input">
                    <input id="name" v-model="name" type="text" placeholder="输入您的姓名">
                </div>
            </div>
            <div  class="m-form-row m-main">
                <label for="tel" class="label-width">微信账号</label>
                <div class="m-input">
                    <input id="tel" v-model="weixin_name" type="text" placeholder="输入您的微信账号">
                </div>
            </div>
            <div  class="m-form-row m-main" style="height: auto;padding: .3rem .2rem">
                <label style="width: 82%">上传微信二维码<span class="up-img-sp">点击右侧按钮选择微信二维码</span></label>
            </div>
            <div class="everyCard">
                <FormImageItem
                        v-model="weixin_code"
                        :label="''"
                        type="id"
                        icon="promote-my-addQR"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import FormImageItem from "@/components/form/FormImageItem";
    import ImagePoster from '@/components/ImagePoster.vue'
    export default {
        name: "weixinAdd",
        data(){
          return {
              name:'',
              weixin_name:'',
              weixin_code:''
          }
        },
        components:{
            FormImageItem,
            ImagePoster
        },
        methods: {
            saveWeixin(){
                if(this.name == '') {
                    Toast('姓名不能为空');
                }
                params:{
                    name,weixin_name,weixin_code
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .m-form-row {
        font-size: 14px;
        height: 1rem;
        padding: 0px;
        padding-left: .2rem;
    }

    .m-form-row .m-input input {
        font-size: 14px;
    }

    .p-signup .m-form-row .m-input[data-v-0b31f523] {
        padding: 0 10px 0 0;
    }

    .p-signup .m-form-row .code-text {
        color: #26A2FF;
        font-size: 10px;
        padding: 2px 5px;
        border-radius: 4px;
        border: 1px solid #26A2FF;
    }
    .btn {
        position: absolute;
        color: #fff;
        z-index: 99;
        right: .2rem;
        top:.28rem;
        font-size: .26rem;
    }
    .icon-svg {
        width: 1.2rem;
        height: 1.2rem;
    }
    .up-img-sp {
        display: block;
        font-size: .22rem;
        color: #7C7C7C;
    }
    .everyCard {
        padding: .2rem;
        position: relative;
        margin-top: -1.38rem;
        padding-left: 84%;
        z-index: 999;
    }
    .c-form-item {
        color: #333;
        width: 100%;
    }
    .label-width {
        width: 1.3rem;
        display: inline-block;
    }
</style>