<template>
    <div style="min-height: 100%;background: #fff">
        <clxsd-head-top title='更新列表'></clxsd-head-top>
        <h3 class="p1">V1.1.0本次更新内容</h3>
        <p class="p2">2019.11.01</p>
        <ol class="ul">
            <li style="text-indent:2em">河南康达医药科技有限公司，结合多年市场运作经验和产业互联网的数字驱动决策需求，潜心研发了《创联工厂》医药共赢销售平台，本次发版主要内容如下：</li>
            <li class="retract">1、 购物车订购方式优化，采购更便捷；</li>
            <li class="retract">2、 性能优化，移动操作更流畅；</li>
            <li class="retract">3、 UI和交互、搜索框功能优化，操作更简单；</li>
            <li class="retract">4、 我们深知您的参与是我们共同前进的基石，对客户反馈做了回复，让您的反馈有跟踪；</li>
            <li class="retract">5、 推广人邀请的客户，可以在“我的”里面查询，可以查询出还未完成认证的客户，督促早日完成认证早日有收益共赢。</li>
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