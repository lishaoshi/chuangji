<template>
  <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
      <slot />
  </mt-loadmore>
</template>

<script>
export default {
    props: {
        limit: {
            type: Number,
            default: 10
        },
        page: {
            type: Number,
            default: 1
        },
        allLoaded: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        loadBottom() {
            this.$emit('loadBottom')
        }
    }

}
</script>

<style>

</style>