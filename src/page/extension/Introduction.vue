<template>
    <div id="Introduction">
        <div class="top">
            <div class="go-back" @click="goBack">
                <svg class="m-style-svg m-svg-def">
                    <use xlink:href="#icon-back" />
                </svg>
            </div>
            <p>推广简介</p>
        </div>
        <main>
            <div class="content" v-html="content" />
        </main>

    </div>
</template>

<script>
    import markdownIt from 'markdown-it'
    export default {
        name: "Introduction",
        data(){
          return{
              type: null,
              content:'',
          }
        },
        created() {
            this.type = parseInt(this.$route.params.type);
        },
        mounted(){
            debugger
            this.initData();
        },
        methods:{
            initData(){
                if(this.type){
                    this.$http.get('protocol',{
                        params:{device:'webapp',type:this.type},
                        validate: state => state === 200
                    }).then(response =>{
                        const { data } = response;
                        if(data.content){
                            this.content =  markdownIt({ html: true })
                                .render( data.content.replace(/<br>/, '\n'));
                        }
                    }).catch(error => {

                    })
                }
            }
        },

    }
</script>

<style lang="scss" scoped>
    .top {
        width: 100%;
        height: .88rem;
        line-height: .88rem;
        position: relative;
        background: rgb(102,89,255);
        p {
            position: absolute;
            text-align: center;
            width: 100%;
            z-index: 1;
            font-size: .36rem;
            font-weight: bold;
            line-height: .88rem;
            color: #fff;
        }
        .go-back {
            position: absolute;
            left: .2rem;
            z-index: 9;
            svg {
                width: .35rem;
                height: .35rem;
                color: #fff;
            }
        }
    }
    .top-title {
        text-align: center;
        span {
            position: absolute;
            font-size: .36rem;
            font-weight: bold;
            line-height: .88rem;
            top:0px;
            width: 40%;
            left: 30%;
            color: #fff;
        }
    }
    .mint-header {
        background: rgb(102,89,255);
        height: .88rem;
        font-weight: bold;
        font-size: .36rem;
    }
    .mint-header-title {
        font-weight: bold;
    }
    .introduction-box {
        margin: .2rem;

        .title {
            font-size: .48rem;
            font-weight: bold;
            line-height: 2;
        }
        .edit {
            margin-top: .1rem;
            height: 3.7rem;
            overflow-y: scroll;
            font-size: .28rem;
            line-height: 1.5;
        }
        .send {
            width: 3.2rem;
            height: .7rem;
            border-radius: .7rem;
            background: #26a2ff;
            color: #fff;
            margin: .48rem auto;
            display: block;
        }
    }
    .info-list {
        li {
            height: 1.2rem;
            line-height: 1.2rem;
            color: #333;
            font-size: .28rem;
            border-bottom: 1px solid #f1f1f1;
            span {
                display: inline-block;
                width: 1.5rem;
            }
        }
    }
    .tel {
        background: #fff;
        position: fixed;
        width: 100%;
        bottom: 0px;
        padding: .2rem;
        a {
            display: block;
            height: .72rem;
            line-height: .72rem;
            text-align: center;
            font-size: .28rem;
            background: #f5f5f5;
            border-radius: 5px;
            color: #26a2ff;
        }
    }
    .fade {
        height: 1rem;
    }
</style>