<template>
    <div style="min-height: 100%;background: #fff">
        <clxsd-head-top title='更新列表'></clxsd-head-top>
        <h3 class="p1">V1.4.0本次更新内容</h3>
        <p class="p2">2019.11.21</p>
        <ol class="ul">
           <!-- <li style="text-indent:2em">河南康达医药科技有限公司，结合多年市场运作经验和产业互联网的数字驱动决策需求，潜心研发了《创联工厂》医药共赢销售平台，本次发版主要内容如下：</li> -->
            <li class="retract">1、 优化资质图片上传；</li>
            <li class="retract">2、 优化商品图片展示，提升加载速度；</li>
            <li class="retract">3、 现在开票员可以管理自己负责区域的订单，提高效率；</li>
            <li class="retract">4、 推广人/合伙人收益明细查看，笔笔收益清晰明了；</li>
            <li class="retract">5、 推广人升级合伙人，收益拿不停，升职有加薪；</li>
            <!-- <li style="text-indent:2em">在奋力拼搏的时候，我们也时刻谨记他人的前进步伐。在接下来的时间里，我们与大型银行合作为广大药业同行提供了非常优质的金融产品，敬请期待！</li>
            <li style="text-align:right">创联工厂</li> -->
        </ol>
    </div>
</template>

<script>
    export default {
        name: "UpdateList"
    }
</script>

<style lang="scss" scoped>
    .p1 {
        text-align: center;
        font-size:.36rem;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(51,51,51,1);
        padding-top: .5rem;
    }
    .p2 {
        margin-top: .2rem;
        font-size:.24rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(153,153,153,1);
        text-align: center;
    }
    .ul {
        background: #fff;
        font-size: .28rem;
        padding: 0 .5rem;
        margin-top: .3rem;
        .retract {
            margin-left:21.0pt;
            text-indent:-21.0pt;
        }
        li {
            // text-indent:2em;
            padding-left: .1rem;
            line-height: 1.5;
            padding-top: .1rem;
            padding-bottom: .1rem;
            list-style-type: none ;
        }
    }
</style>
