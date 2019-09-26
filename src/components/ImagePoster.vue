<template>
    <div
            :class="{ loading: posterInternal.loading, error: posterInternal.error }"
            class="m-box m-poster-box"
            @click="addPoster"
    >

        <!---开始图片-->
        <img
                v-if="posterInternal.src"
                :src="posterInternal.src"
                class="m-poster"
                @load.stop="loadedPoster(posterInternal)"
                @error="posterError"
        >
        <div
                v-else
                class="m-box-model m-aln-center m-justify-center m-lim-width m-poster-placeholder"
        >
            <svg viewBox="0 0 24 24" class="m-style-svg m-svg-big">
                <use xlink:href="#icon-hehuo-wode-zhengjianzhao"/>
            </svg>
            <slot />
        </div>
        <span class="label">{{ label }}</span>
        <!--- -->
        <div
                v-if="!posterInternal.error && posterInternal.loading"
                class="fixed-loading"
        >
            <div
                    class="u-loading"
                    style="height: 58px;width: 58px"
            >
                <svg
                        class="loading"
                        width="100%"
                        height="100%"
                        viewBox="0 0 29 29"
                >
                    <circle
                            class="c1"
                            cx="14.5"
                            cy="14.5"
                            r="12.5"
                            fill="none"
                            stroke-width="4"
                            stroke="#b1b1b1"
                    />
                    <circle
                            class="c2"
                            cx="14.5"
                            cy="14.5"
                            r="12.5"
                            fill="none"
                            stroke-width="4"
                            stroke="#c7c7c7"
                    />
                </svg>
            </div>
        </div>


        <input
                id="selectimage"
                ref="imagefile"
                type="file"
                class="m-rfile"
                @change="selectPhoto"
                />
    </div>
</template>

<script>
    import sendImage from '@/util/SendImage.js'
    const defaultPoster = {
        id: '',
        src: '',
        type: '',
        file: [],
        error: false,
        loading: false,
        label:''
    }

    export default {
        name: "ImagePoster",
        props: {
            poster: { type: Object, default: () => defaultPoster },
            label: { type: String, default: '' },
        },
        data(){
            return {
                posterInternal: this.poster, // for one-way data binding
            }
        },
        methods:{
            addPoster(){
                if(this.posterInternal.loading) return
                this.$refs.imagefile.click()
            },
            selectPhoto () {
                const files = this.$refs.imagefile.files
                if (files && files.length > 0) {
                    const posterObj = {
                        loading: true,
                        file: files[0],
                        type: files[0].mimeType,
                        src: window.URL.createObjectURL(files[0]),
                    }
                    this.posterInternal = Object.assign({}, defaultPoster, posterObj)
                }
            },
            loadedPoster(poster){
                const file = poster.file
                if (!file) return
                sendImage(file)
                    .then(id => {
                        Object.assign(poster, {
                            id,
                            file: null,
                            loading: false,
                            error: false,
                        })
                        this.$emit('uploaded', poster)
                    })
                    .catch(() => {
                        poster.error = true
                        poster.loading = false
                    })
            },
            posterError(){
                this.$Message.error('图片上传失败, 请重试')
                this.$emit('error')
            }
        }
    }
</script>

<style lang="scss" scoped>
.m-poster-box {
    img{
        height:40px;
        width:40px;
    }
}
    .m-poster{
        position: absolute;
        left:0;
        width:100%;
        height: 100%;
        z-index: 1;
        -o-object-fit: cover;
        object-fit: cover;
        -webkit-transition: all 0.4s ease;
        transition: all 0.4s ease;
    }
</style>