<template>
    <div style="min-height: 100%;background: #fff">
        <clxsd-head-top title='更新列表'></clxsd-head-top>
        <h3 class="p1">V1.0.0本次更新内容</h3>
        <p class="p2">2019.10.25</p>
        <ol class="ul">
            <li style="text-indent:2em">河南康达医药科技有限公司，结合多年市场运作经验和产业互联网的数字驱动决策需求，潜心研发了《创联工厂》医药共赢销售平台，本次发版主要内容如下：</li>
            <li class="retract">1、 商业公司管理系统。每个商业公司可以方便的管理自己的商品、提取自己的订单等；</li>
            <li class="retract">2、 终端采购管理系统。药店、诊所、医院可以方便的关注感兴趣的工业、商业乃至商品，自己的订单操作清晰，合并多个商业公司订单下单，提高效率;</li>
            <li class="retract">3、 生产厂家管理系统。生产厂家可以方便的维护自己的产品，在平台直达全国；</li>
            <li class="retract">4、 推广人。系统在手，收益全有。创联独创的推广人合伙制度，将广大医药业同行链接起来，共赢生态。</li>
            <li style="text-indent:2em">在奋力拼搏的时候，我们也时刻谨记他人的前进步伐。在接下来的时间里，我们与大型银行合作为广大药业同行提供了非常优质的金融产品，敬请期待！</li>
            <li style="text-align:right">创联工厂</li>
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