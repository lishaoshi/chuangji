<template>
    <section class="c-form-item c-form-image-item" @click="beforeSelectFile" style="width: 100%;height: 1.2rem">
        <div :class="shape" class="avatar-wrap" style="height: 1.2rem">
            <img :src="avatar" class="m-avatar-img" v-if="avatar">
            <svg viewBox="0 0 24 24" class="m-style-svg m-svg-big" v-else style="width: 1.2rem;height: 1.2rem">
                <use :xlink:href="'#icon-' + icon"/>
            </svg>
        </div>
        <span class="avatar-label">{{ label }}</span>
        <ImageUploader
                ref="uploader"
                :value="value"
                :type="type"
                @input="$emit('input',$event)"
                @update:src="avatar = $event"
                :prefixPath="prefixPath"
        />
    </section>
</template>

<script>

    import ImageUploader from '@/components/common/ImageUploader'
    export default {
        name: "FormImageItem",
        components:{ ImageUploader },
        props:{
            value: { type: String, default: '' },
            label: { type: String, default: '上传头像' },
            readonly: { type: Boolean, default: false },
            icon: { type: String, default: 'hehuo-wode-zhengjianzhao' },
            //文件类型
            type:{
                type: String,
                default:'storage',
                validator(type){
                    return ['blob', 'id', 'url', 'storage'].includes(type)
                }
            },
            //图片形状　
            shape: { type: String, default: 'square' },
            prefixPath:{
                type:String,
            }
        },
        data(){
            return {
                avatar: (this.$props.value || {}).url,
            }
        },
        methods:{
            beforeSelectFile () {
                if (this.readonly) return
                this.$refs.uploader.select()
            },
        },
        created() {
            console.log(this.value,'form')
        }
    }
</script>

<style lang="scss" scoped>
    @import url("./formItem.scss");
form .c-form-image-item {
    padding-right: 20px;

    .avatar-wrap {
        flex: none;
        width: 45px;
        height: 45px;
        &.circle {
            border-radius: 100%;
        }

        > img {
            width: 100%;
        }
    }

    .avatar-label {
        flex: auto;
        margin-left: 15px;
        color: #333;
        font-size: .28rem;
    }
}
</style>