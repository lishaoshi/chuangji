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
        <!-- logo -->
            <div class="Introduction-logo">
               <img :src="imgUrl" alt="">
            </div>
        <!-- 省级了解 -->
        <main class="content" v-if="type === '/introduction/province'">
            <div class="content-header">
                <h1>省公司简介</h1>
                <p>省级公司:就是代表“创联工厂”医药供应链金融服务平台所归属省份的运营加盟服务公司。其角色相当于传统电商平台的省级代理商;</p>
            </div>

            <div class="content-centre">
                <h2>
                业务职责:
            </h2>
            <p>创联-省级公司肩负着百姓健康的光荣而神圣商业使命,承担百姓安全用药商业职责。为了构建药品采购的“绿色通道”、共建“阳光药房”,为了光荣和梦想我们释放热情、挥洒青春奋斗在创业的路上。
            </p>
            </div>

            <div class="content-footerText">
                <h2>
                    业务收益:
                </h2>
                <ul>
                    <li>1.部署招商本省辖区地市公司加盟费。</li>
                    <li>2.享有所归属省份行政区域所有平台通道收益0.05%分润。</li>
                    <li>3.广告.SEO竞价等平台附加值收益分润。</li>
                </ul>
            </div>
        </main>

        <!-- 市级了解 -->
        <main class="content" v-if="type === '/introduction/city'">
            <div class="content-header">
                <h1>市公司简介</h1>
                <p>地市公司：就是代表“创联工厂”医药供应链金融服务平台所归属地市的运营加盟公司。其角色相当于传统电商平台的市级代理。</p>
            </div>

            <div class="content-centre">
                <h2>
                业务职责:
            </h2>
            <p>创联-地市公司肩负着百姓健康的光荣而神圣商业使命，承担百姓安全用药商业职责。为了构建药品采购的“绿色通道”、共建“阳光药房”，为了光荣和梦想我们释放热情、挥洒青春奋斗在创业的路上。
            </p>
            </div>

            <div class="content-footerText">
                <h2>
                    业务收益:
                </h2>
                <ul>
                    <li>1.部署招募推广人加盟费。</li>
                    <li>2.享有所归属地市行政区域所有平台通道收益0.2%分润。</li>
                    <li>3.广告、SEO竞价、产品上架费等平台价值收益分润。</li>
                </ul>
            </div>
        </main>

        <!-- 推广人了解 -->
        <main class="content" v-if="type === '/introduction/promoter'">
            <div class="content-header">
                <h1>推广人简介</h1>
                <p>推广人：是指推荐医药行业用户入住创联工厂系统的从业人员，根据入住创联工厂的用户的类别不同推广人的有不同的推广入住权限。
                    由‘推广人’推广入住的用户通过创联工厂提供的信息产生了采购行为推广人有采购金额相对应的分润收益。</p>
            </div>
        </main>

         <!-- 推广人了解 -->
        <main class="content" v-if="type === '/introduction/find'">
            <div class="content-header">
                <h1>找药人简介</h1>
                <p>找药人：是指创“联工厂项目”云工厂精准推广板块寻找对接制药企业或者厂家区域销售经理带产品入住的从业人员，
                    由‘找药人’推广入住的制药企业或者厂家区域销售经理等用户通过云工厂板块所销售产品的交易额有相对应的分润收益。</p>
            </div>
        </main>

    </div>
</template>

<script>
    import markdownIt from 'markdown-it'
    import bgImg from '../../images/promoteBgImg.png'
    export default {
        name: "Introduction",
        data(){
          return{
              type: null,
              content:'',
              type:'',
              imgUrl: bgImg
          }
        },
        created() {
            
            this.type = parseInt(this.$route.params.type);
        },
        mounted(){
            
        },
        created(){
            this.type = this.$route.path
        },
        methods:{
            // initData(){
            //     if(this.type){
            //         this.$http.get('protocol',{
            //             params:{device:'webapp',type:this.type},
            //             validate: state => state === 200
            //         }).then(response =>{
            //             const { data } = response;
            //             if(data.content){
            //                 this.content =  markdownIt({ html: true })
            //                     .render( data.content.replace(/<br>/, '\n'));
            //             }
            //         }).catch(error => {

            //         })
            //     }
            // }
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

     
    .content {
        margin-top: 1rem;
        font-size: .28rem;
        color: #333;
        padding: 0 .58rem 0 .5rem;
        line-height: 1.5;
        h2 {
           margin-top: .2rem;
           font-size:.3rem;
           font-weight: bold;
        }
        h1 {
            font-size: .48rem;
            color: #333;
            font-weight: bold;
            margin-bottom: .57rem;
        }
        p {
            text-indent: 2em;
        }
        .content-footerText {

            ul {
                // padding-left: 1.3rem;
                text-indent: 2em;
                li {
                    line-height: 1.5;
                }
            }
        }
    }
    .Introduction-logo {
        font-size: 0;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>