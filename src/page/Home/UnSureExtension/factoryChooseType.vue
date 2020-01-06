<template>
  <div class="chooseType">
        <div class="choose_title">
            <div v-for="(type, key) of configs" :key="key" :class="{isActive: key==currentChooseType}" @click="chooseType(type, key)">
                <span>{{type.name}}</span>
            </div>
        </div>
        <div class="swithLine">
            <div class="line-box" :style="{left: 100/configs.length*currntIndex+'%',width: 100/configs.length+'%'}">
                <div class="line"></div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    props: ["configs"],
    data() {
        return {
            currentChooseType: 0,
            currntIndex: 0
        }
    },
    methods: {
        chooseType(item,key) {
            this.currntIndex = key
            this.currentChooseType = key;
            this.$emit("chooseType", item.value)
        }
    }
}
</script>

<style lang="scss" scoped>
.swithLine {
    height: 6px;
    background: #fff;
    .line-box {
        height: 100%;
        position: relative;
        top: -4px;
        transition: all .4s linear;
        .line {
            height: 100%;
            width: 8px;
            background: #333;
            border-radius: 4px;
            margin: 0 auto;
        }
    }
}
.choose_title {
        height: .8rem;
        background: #fff;
        font-size: .28rem;
        color: #999;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-radius: 16px 16px 0 0;
        & > div {
            flex: 1;
            display: flex;
            justify-content: center;
        }
        .isActive {
            color: #333;
            font-size: .34rem;
            font-weight: bold;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            position: relative;
        }
    }
</style>