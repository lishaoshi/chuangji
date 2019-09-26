<template>
    <a class="clxsd-tab-item"
       @click="$parent.$emit('input', id)"
       :class="{ 'is-selected': $parent.value === id }">
        <div class="clxsd-tab-item-icon"><slot name="icon"></slot></div>
        <div class="clxsd-tab-item-label"><slot></slot></div>
    </a>
</template>

<script>
    export default {
        name: "clxsd-tab-item",
        props:['id']
    }
</script>

<style lang="scss" scoped>
@import "../../style/variables";
.clxsd-tab-item{
    display: block;
    padding: 7px 0;
    flex: 1;
    text-decoration: none;

    .clxsd-tab-item-icon{
        size: 24px;
        margin: 0 auto 5px;
        & > * {
            display: block;
            size: 100%;
        }
    }

    .clxsd-tab-item-label {
        color: inherit;
        font-size: $tab-item-font-size;
        line-height: 1;
    }
}

</style>