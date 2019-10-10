<template>
    <div style="min-height: 100%;background: #f1f1f1;z-index: 999;position: relative">
        <clxsd-head-top title='头像设置' style="border:0px" append="1">
            <div slot="append" :class="{ active: isFullScreen }">
                <section @click="onSave">保存</section>
            </div>
        </clxsd-head-top>
        <img src="../../images/default.png" width="100%" v-if="!avatar">
        <img :src="avatar" v-else width="100%"/>
        <div style="padding: .2rem">
            <img src="../../images/change_info.png" width="100%">
        </div>
        <image-uploader ref="uploader"
                        type="storage"
                        :value="value"
                        @input="d"
                        @update:src="avatar=$event"/>
        <div class="up" @click="beforeSelectFile">
            <button>相册选择</button>
        </div>
        <circle-loading v-if="loading" />
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import ImageUploader from "../../components/common/ImageUploader";
    export default {
        name: "ChangeLogo",
        components: { ImageUploader},
        data(){
            return {
                value:null,
                loading:false,
                avatar:null,
                isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
            }
        },
        computed:{
            ...mapState(['CURRENTUSER']),
        },
        created(){
            this.initData();
        },
        methods:{
             initData(){
                const {
                    avatar = '',
                } = this.CURRENTUSER.data;
                // this.value = avatar;
                this.avatar = (avatar || '')
            },
            beforeSelectFile(){
                this.$refs.uploader.select()
            },
            d(v){
                this.value = v;
            },
            onSave(){
                const param = {};

                if(this.value){
                    if (typeof this.avatar === 'string') param.avatar = this.value
                    this.loading = true;
                    this.$http
                        .patch('/user', param, { validateStatus: s => s === 204 })
                        .then(() => {
                            this.$toast('保存成功');
                            this.$store.dispatch("fetchUserInfo");
                            this.loading = false;
                            this.goBack()
                        })
                        .catch(err => err)
                        .finally(() => {
                            this.loading = false
                        })
                }else{
                    this.$toast('请选择你的头像');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .up {
        padding: .8rem 1rem;
        padding-bottom: 0px;
        position: relative;
        button {
            display: block;
            width: 100%;
            height: .88rem;
            font-size: .28rem;
            background: #fff;
            margin-bottom: .5rem;
        }
    }
    .inp1 {
        display: block;
        width: 72%;
        height: .88rem;
        font-size: .28rem;
        background: #fff;
        margin-bottom: .5rem;
        position: absolute;
        margin-top: -1.4rem;
        opacity: 0;
    }
    .info {
        text-align: center;
        line-height: .4rem;
        font-size: .24rem;
        .sp1 {
            color: #ccc;
        }
        .sp2 {
            color: #333;
            padding: 0 .2rem;
        }
    }
    .detail {
        padding-top: .3rem;
        padding: .1rem .5rem;
        line-height: 1.8;
    }
    .active {
        margin-top: .5rem;
    }
</style>