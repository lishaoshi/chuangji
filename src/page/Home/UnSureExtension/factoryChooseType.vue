<template>
  <div class="chooseType">
        <div class="choose_title">
            <div v-for="(type, key) of choose_type" :key="key" :class="{isActive: key==currentChooseType}" @click="chooseType(type, key)">
                <span>{{type.name}}</span>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            choose_type: [
                {
                    name: "流通",
                    type: 1
                },
                {
                    name: "器械",
                    type: 2
                },
                {
                    name: "控销",
                    type: 3
                },
                {
                    name: "中药",
                    type: 4
                },
                {
                    name: "计生",
                    type: 5
                },
            ],
            currentChooseType: 0
        }
    },
    methods: {
        chooseType(item,key) {
            this.currentChooseType = key
        }
    }
}
</script>

<style lang="scss" scoped>
.choose_title {
        height: .88rem;
        background: #fff;
        font-size: .28rem;
        color: #999;
        display: flex;
        justify-content: space-around;
        align-items: center;
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
            &::after {
                content: "";
                display: block;
                width: 9px;
                background: #333333;
                height: 6px;
                border-radius: 3px;
                position: absolute;
                bottom: 0;
            }
        }
    }
</style>