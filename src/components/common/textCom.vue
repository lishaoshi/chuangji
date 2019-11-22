<template>
    <div class="partner-text">
        <slot name="title">
            <div class="title">
                <span>平台宗旨</span>
            </div>
        </slot>
        
        <slot name="content">
            <div class="content">
                <span>为一家专注于医药产业产业服务和消费者终身健康服 创新科技企业，创联工厂通过互联网思维和区块链技 术，从医药行业发展趋势和全民健康数据库高度着眼， 从客户终身健康去求入手，构建新仍的多赢医药供应 链金融系统，跨界整合降低医药行业链综合成本、实 现多利共赢。</span>
            </div>
        </slot>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scopeds>
.partner-text {
    padding: 0 .5rem;
    .title {
        font-size: .28rem;
        font-weight: bold;
        color: #333;
        margin-top: .25rem;
    }
    .content {
        line-height: .44rem;
        display: inline-flex;
        flex-direction: column;
    }
}
</style>