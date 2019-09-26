<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "ProfitSheng"
    }
</script>

<style lang="scss" scoped>
    .profit-list {
        margin: .2rem .2rem 0;
        background: #fff;
        border-radius: 5px;
        border:1px solid #f1f1f1;
        display: flex;
        padding: .4rem .2rem;
        align-items: center;
        .name {
            font-size: .24rem;
            color: #333;
            span {
               font-size:  .4rem;
                font-weight: bold;
            }
        }
        .num {
            text-align: center;
            margin-left: 54%;
            width: 30%;
            p {
                &:nth-child(1) {
                    font-size: .26rem;
                    color: rgb(153,153,153);
                }
                &:nth-child(2) {
                    font-size: .36rem;
                    line-height: 1;
                    color: #03ad8f;
                    font-weight: bold;
                    margin-top: .15rem;
                }
            }
        }
    }
</style>