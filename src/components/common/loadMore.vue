<template>
  <div class="loadMore">
      <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
        <slot />
      </mt-loadmore>
  </div>
</template>

<script>
export default {
    props: {
        allLoaded: {
            type: Boolean,
            required: true
        },
        loadBottom: {
            type: Function,
            required: true
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.loadMore {
    flex: 1;
    padding-bottom: 1.1rem;
    overflow: auto;
}
</style>