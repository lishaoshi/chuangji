<template>
    <div class="notice" v-if="notices!=null">
        <svg>
            <use xlink:href="#icon-notice"/>
        </svg>
        <div class="scroll-wrap" style="height: 100%; width: 100%;">
            <ul class="scroll-content" ref="con1" :class="{anim:animate==true}">
                <li v-for="(entity,index_) in notices" :key="`en-${index_}`">
                    <!-- 1.0版本中是点击跳转链接，现在修改为，也可以查看公告详情 -->
                    <!-- <a :href="entity.link" style="color: #333">{{entity.title}}</a> -->
                    <a v-if="entity.link&&!entity.content" :href="entity.link" style="color: #333">{{entity.title}}</a>
                    <div v-else  @click="handleQueryDetail(entity)">{{entity.title}}</div>
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
        name: "notice",
        props:{
            notices: {
                type: Array,
                default: () =>[{title:'暂时没有消息',link:''}]
            }
        },
        data() {
            return {
                animate: false,
                timing: null
            }
        },
        created() {
           this.timing = setInterval(this.scroll, 2200)
        },

        methods: {
            scroll() {
                let con1 = this.$refs.con1;
                this.animate = !this.animate;
                var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                if(that.notices && that.notices.length==1) {
                    that.notices.push(that.notices[0])
                }
                if(this.notices!==null) {
                    setTimeout(function () {
                        // debugger
                        that.notices.push(that.notices[0]);
                        that.notices.shift();
                        that.animate = !that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
                    }, 900)
                }
                
            },
            /**
             * 如果公告不是链接。否则跳转至详情页、
             * 
             */
            handleQueryDetail(item) {
                // this.$emit('handleQueryDetail', id)
                if(!item.content && !item.link) {
                    return false
                }
                this.$router.push({path:'/bannerDetail',query: {id:item.id}})
            },
        }
    }
</script>

<style lang="scss" scoped>
    .notice {
        background: #fff;
        height: .88rem;
        line-height: .88rem;
        display: flex;
        padding: 0 .24rem;
        align-items: center;
        overflow: hidden;
        // padding-top: .1rem;
        svg {
            width: .38rem;
            height: .38rem;
            min-width: .38rem;
        }
    }
    .scroll-content {
        // position: relative;
        height: 100%;
        width: 100%;
        // margin-top: .06rem;
        li {
            height: .88rem;
            line-height: .88rem;
            font-size: .28rem;
            padding: 0 .2rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            a {
                display: inline-block;
                width: 100%;
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
        margin-top: -.88rem;
    }
</style>