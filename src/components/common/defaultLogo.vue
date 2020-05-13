<template>
    <section>
        <div class="extension-item-img " :style="{background:colorList[bgColor]}">
            <span v-for="(item, index) of name" :key="index" :class="{firstSpan: index==0&&name.length==3}">{{item}}</span>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        name: {
            type: [Array, String],
            default: ""
        },
        bgColor: {
            type: Number,
            default: 0
        }
    },
    computed: {
        companyName() {
            return this.$props.name;
        }
    },
      data() {
        return {
                colorList: [
                    '#409eff',
                    '#67c23a',
                    '#e6a23c',
                    '#f56c6c',
                    '#2bcda2',
                    '#0bbefd',
                    '#e45fe4',
                    '#ea4c89',
                    '#987aec',
                    '#18a05e'
                ]
        }  
    },
    filters: {
        handleCity(val) {
            if(val&&val.includes('市')) {
                return val.replace('市', '')
            }
            if(!val) {
                return '无'
            }
        }
    },

}
</script>

<style lang="scss" scoped>
 .extension-item-img {
        width: .96rem;
        height: .96rem;
        margin-right: .24rem;
        border-radius: 5px;
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        padding: .1rem;
        justify-content: center;
        align-items: center;
        span {
            width: 50%;
            text-align: center;
        }
        .firstSpan {
            display: block;
            width: 100%;
        }
    }
</style>