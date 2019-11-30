<template>
  <div class="message">
      <span>{{count}}</span>
  </div>
</template>

<script>
export default {
    props: {
        count: Number,
        require: true
    }
}
</script>

<style lang="scss" scoped>
    .message {
        padding: 0 .1rem;
        background: #FA5452;
        color: #fff;
        font-size: .24rem;
           border-radius: 16px;
    }
</style>