<template>
        <div class="notice">
            <mt-swipe :auto="4000" :speed="3000" class="notice-list" :show-indicators="false">
                <mt-swipe-item v-for="(entity,index_) in entities" :key="`en-${index_}`">
                    <router-link to="">{{entity}}</router-link>
                </mt-swipe-item>
            </mt-swipe>
            <svg>
                <use xlink:href="#icon-group-guest-bugle"/>
            </svg>
        </div>
</template>

<script>
    export default {
        name: "Notice",
        props: {
            entities: {
                type: Array,
                default: () => ["没有消息", "dfafafa"]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .notice {
        margin: .2rem;
        background: #f1f4f5;
        height: .64rem;
        line-height: .64rem;
        display: flex;
        padding: 0 .24rem;
        align-items: center;

        .notice-list {
            width: 6.2rem;
            height: .64rem;
            overflow-y: hidden;
            margin-right: .1rem;

            a {
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: .24rem;
                line-height: .64rem;
                color: #333;
            }
        }

        svg {
            width: .38rem;
            height: .38rem;
        }
    }
</style>