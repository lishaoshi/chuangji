<template>
    <div class="clxsd-tabbar" :class="{'is-fixed': fixed}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "clxsd-tabbar",
        props: {
            fixed: Boolean,
            value: {}
        }
    }
</script>

<style lang="scss" scoped>
@import "../../style/variables";
.clxsd-tabbar{
    background-image:linear-gradient(180deg, $color-grey, $color-grey 50%, transparent 50%);
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: top left;
    position: relative;
    background-color: $tabbar-background-color;
    display: flex;
    text-align: center;
}
</style>