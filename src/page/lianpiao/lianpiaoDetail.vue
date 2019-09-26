<template>
    <div style="min-height: 100%;background: #fff">
        <clxsd-head-top title='详情'></clxsd-head-top>
        <ul class="list">
            <li>
                <span>交易联票</span>
                <span>300.00</span>
            </li>
            <li>
                <span>类型</span>
                <span>采购</span>
            </li>
            <li>
                <span>时间</span>
                <span>2019-05-23 13：34：12</span>
            </li>
            <li>
                <span>交易企业</span>
                <span>华北制药</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "lianpiaoDetail"
    }
</script>

<style lang="scss" scoped>
    .list {
        border-bottom: 1px solid #e6e6e6;
        li {
            display: flex;
            justify-content: space-between;
            height: 1rem;
            align-items: center;
            padding: 0 .2rem;
            &:nth-child(1){
                height: 1.66rem;
                border-bottom: 1px solid #e6e6e6;
                span {
                    &:nth-child(2) {
                        font-size: .64rem;
                    }
                }
            }
            span {
                &:nth-child(1) {
                    font-size:.28rem;
                    font-weight:500;
                    color:rgba(153,153,153,1);
                }
                &:nth-child(2) {
                    font-size:.28rem;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                }
            }
        }
    }
</style>