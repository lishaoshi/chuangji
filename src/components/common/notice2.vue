<template>
    <div class="notice" v-if="notices!=null">
        <svg>
            <use xlink:href="#icon-notice"/>
        </svg>
        <div class="scroll-wrap" style="height: 100%">
            <ul class="scroll-content" ref="con1" :class="{anim:animate==true}">
                <li v-for="(entity,index_) in notices" :key="`en-${index_}`">
                    <a :href="entity.link" style="color: #333">{{entity.title}}</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="notice" v-else>
        <svg>
            <use xlink:href="#icon-notice"/>
        </svg>
        <span style="padding-left: 5px">暂时没有消息</span>
    </div>
</template>

<script>
    export default {
        name: "notice2",
        props:{
            notices: {
                type: Array,
                default: () =>[{title:'暂时没有消息',link:''}]
            }
        },
        data() {
            return {
                animate: false,
            }
        },
        created() {
            setInterval(this.scroll, 2200)
            console.log(this.notices)
        },

        methods: {
            scroll() {
                let con1 = this.$refs.con1;
                this.animate = !this.animate;
                var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                setTimeout(function () {
                    that.notices.push(that.notices[0]);
                    that.notices.shift();
                    that.animate = !that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
                }, 900)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .notice {
        background: #fff;
        height: .64rem;
        line-height: .64rem;
        display: flex;
        padding: 0 .24rem;
        align-items: center;
        overflow: hidden;
        svg {
            width: .38rem;
            height: .38rem;
        }
    }
    .scroll-content {
        position: relative;
        height: 100%;
        li {
            height: .64rem;
            line-height: .64rem;
            font-size: .28rem;
            padding: 0 .2rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            span {
                display: inline-block;
                width: 60%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            small {
                float: right;
                font-size: 14px;
            }

            &:hover {
                color: #26a2ff;
            }
        }
    }
    .anim {
        transition: linear .8s;
        margin-top: -.64rem;
    }
</style>