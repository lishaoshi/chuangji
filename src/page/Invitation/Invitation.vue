<template>
    <div id="Invitation">
        <clxsd-head-top :title='`邀请二维码`' style="border:0px"></clxsd-head-top>
        <div class="box">
            <p>扫下方二维码，入驻创联</p>
           <div v-html="imgUrl" class="qrcodeImgUrl"></div>
            <!-- <div class="btn"><router-link to="">邀请记录</router-link><small>|</small><span>保存图片</span></div> -->
        </div>
    </div>
</template>

<script>
    export default {
        name: "Invitation",
        data(){
          return{
              imgUrl:''
          }
        },
        created() {
            this.init_Data()
        },
        methods:{
            init_Data(){
                this.$http.get('/qrcode').then(res => {
                    this.imgUrl = res.data
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    #Invitation {
        min-height: 100%;
        background: #0090ff;
        .img {
            width: 100%;
        }
    }
    .box {
        height: 8.83rem;
        width: 6.66rem;
        margin: 0 auto;
        margin-top: 10%;
        position: relative;
        background: #fff;
        border-radius: 10px;
        padding: .6rem;
        text-align: center;
        p {
            margin-bottom: .5rem;
            font-size: .36rem;
        }
        img {
            width: 5rem;
            height: 5rem;

        }
        .btn {
            display: flex;
            justify-content: space-around;
            margin-top: .6rem;
            padding-bottom: .3rem;
            font-size: .3rem;
            color: #26a2ff;
            a {
                color: #26a2ff;
            }
            small {
                font-size: .24rem;
                color: #f1f1f1;
            }
        }
    }
</style>
<style lang="scss">
    .qrcodeImgUrl {
        svg {
            width:5.07rem;
            height:5.07rem;
        }
    }
</style>