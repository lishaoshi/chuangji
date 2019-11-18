<template>
    <div class="c-image-uploader">
        <input
                ref="imagefile"
                type="file"
                class="hidden"
                accept="image/*"
                @change="selectPhoto"
        >
        <CircleLoading v-if="isLoad" />
    </div>
</template>

<script>
    import { baseURL } from '@/api'
    import uploadApi from '@/api/upload.js'
    import { getFileUrl } from '@/util'
    import { upload } from '@/util/handleImg'
    import getFirstFrameOfGif from '@/util/getFirstFrameOfGif.js'

    /**
     * Canvas toBlob
     */
    if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function (callback, type, quality) {
                const binStr = atob(this.toDataURL(type, quality).split(',')[1])
                const len = binStr.length
                const arr = new Uint8Array(len)

                for (var i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i)
                }

                callback(new Blob([arr], { type: type || 'image/png' }))
            },
        })
    }

    export default {
        name: 'ImageUploader',
        props: {
            /**
             * 文件类型
             * @param {string} type enum{id: FileID, blob: Blob}
             */
            type: {
                type: String,
                default: 'id',
                validator (type) {
                    return ['blob', 'id', 'url', 'storage'].includes(type)
                },
            },
            value: { type: null, default: null },
            ratio: { type: Number, default: 1 / 1 },
            canCop: {type:null,default:false},
            prefixPath:{type:String,default:()=>'avatars'}
        },
        data () {
            return {
                avatarBlob: null,
                isLoad: false,
                filename: ''
            }
        },
        computed: {
            avatar () {
                if (!this.value) return null
                if (typeof this.value === 'string' && this.value.match(/^https?:/)) { return this.value }
                switch (this.type) {
                    case 'id':
                        return `${baseURL}/files/${this.value}`

                    case 'blob':
                        return getFileUrl(this.value)

                    case 'storage':
                        // 获取初始头像资源
                        if (typeof this.value !== 'string') return this.value.url || null
                        // 否则获取修改过后的 blob 对象资源
                        return getFileUrl(this.avatarBlob)

                    default:
                        return null
                }
            },
            // filename () {
            //     return this.$refs.imagefile.files[0].name
            // },
        },
        watch: {
            avatar (src) {
                this.$emit('update:src', src)
            },
        },
        methods: {
            select () {
                if (this.readonly) return
                this.$refs.imagefile.click()
            },
            async selectPhoto (e) {
                let files = e.target.files || e.dataTransfer.files
                if (!files.length) return
                
                if(this.canCop){
                    const cropperURL = await getFirstFrameOfGif(files[0])
                    this.$ImgCropper.show({
                        url: cropperURL,
                        round: false,
                        ratio: this.ratio,
                        onCancel: () => {
                            this.$refs.imagefile.value = null
                        },
                        onOk: screenCanvas => {
                            
                            screenCanvas.toBlob(async blob => {
                                this.uploadBlob(blob)
                                this.$refs.imagefile.value = null
                            }, 'image/png')
                        },
                    })
                }else{
                    this.filename = files[0].name
                    let fileSize = files[0].size;
                    let fileMaxSize = 1024*2;
                    let size = fileSize / 1024;
                    if(size > fileMaxSize) {
                        this.upload(files)
                    } else {
                        this.uploadBlob(files[0])
                    }
                     this.$refs.imagefile.value = null
                }
            },

            async uploadBlob (blob) {
                // debugger
                this.isLoad = true
                if (this.type === 'id') {
                    // 如果需要得到服务器文件接口返回的 ID
                    const formData = new FormData()
                    formData.append('file', blob)
                    const id = await this.$store.dispatch('uploadFile', formData)
                    //this.$Message.success('上传成功')
                    this.$emit('input', id)
                } else if (this.type === 'blob') {
                    // 如果需要 Blob 对象
                    this.$emit('input', blob)
                } else if (this.type === 'storage') {
                    // 如果需要新文件存储方式上传
                    this.avatarBlob = blob
                    const file = new File([blob], this.filename, { type: blob.type, lastModified: new Date() })
                    // debugger
                    const task = await uploadApi(file,this.prefixPath).catch(err=>{
                        this.$toast(err.response.data.errors.size[0])
                        this.isLoad = false
                    })
                    this.isLoad = false
                    if(task&&task.node) {
                        this.$emit('input', task.node)
                    }
                    
                }
            },

            /**
 * 处理图片上传前压缩
 */

        upload (files) {
            if (!files.length) return;
            this.imgPreview(files[0])
        },
        imgPreview (file) {
            let Orientation;
            let data
            // 看支持不支持FileReader
            if (!file || !window.FileReader) return;
            
            if (/^image/.test(file.type)) {
                // 创建一个reader
                let reader = new FileReader();
                // 将图片2将转成 base64 格式
                reader.readAsDataURL(file);
                let that = this
                // 读取成功后的回调
                reader.onloadend = function () {
                let result = this.result;
                let img = new Image();
                img.src = result;
                //判断图片是否大于100k,是就直接上传，反之压缩图片
                if (this.result.length <= (100 * 1024)) {
                    data = this.result;
                    data = that.convertImgDataToBlob(data)
                    that.uploadBlob(data)
                }else {
                    img.onload = function () {
                        data = that.compress(img,Orientation)
                        data = that.convertImgDataToBlob(data)
                        that.uploadBlob(data)
                    }
                }
                } 
            }
            //   console.log(data, 456)
        },
            // base64转二进制
        convertImgDataToBlob(base64Data) {
            var format = "image/jpeg"
            var base64 = base64Data;
            var code = window.atob(base64.split(",")[1]);      
            var aBuffer = new window.ArrayBuffer(code.length);
            var uBuffer = new window.Uint8Array(aBuffer);
            for (var i = 0; i < code.length; i++) {
                uBuffer[i] = code.charCodeAt(i) & 0xff;
            }
            var blob = null;
            try {
                blob = new Blob([uBuffer], {
                    type: format
                });
            } catch (e) {
                window.BlobBuilder =
                window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;
                if (e.name == "TypeError" && window.BlobBuilder) {
                    var bb = new window.BlobBuilder();
                    bb.append(uBuffer.buffer);
                    blob = bb.getBlob("image/jpeg");
                } else if (e.name == "InvalidStateError") {
                    blob = new Blob([aBuffer], {
                        type: format
                    });
                } else {}
            }
            return blob;
        },
        compress(img,Orientation) {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext('2d');
            //瓦片canvas
            let tCanvas = document.createElement("canvas");
            let tctx = tCanvas.getContext("2d");
            let initSize = img.src.length;
            let width = img.width;
            let height = img.height;
            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            let ratio;
            if ((ratio = width * height / 4000000) > 1) {
                console.log("大于400万像素")
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
        //        铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片像素大于100万则使用瓦片绘制
            let count;
            if ((count = width * height / 1000000) > 1) {
                console.log("超过100W像素");
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
            //            计算每块瓦片的宽和高
                let nw = ~~(width / count);
                let nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (let i = 0; i < count; i++) {
                    for (let j = 0; j < count; j++) {
                    tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
        //进行最小压缩
            let ndata = canvas.toDataURL('image/jpeg', 0.9);
            // debugger
            console.log('压缩前：' + initSize);
            console.log('压缩后：' + ndata.length, ndata.size);
            console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            return ndata;
        }
    },
}
</script>

<style lang="scss" scoped>
    .c-image-uploader {
        .hidden {
            display: none;
        }
    }
</style>
