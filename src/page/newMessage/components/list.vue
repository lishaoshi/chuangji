<template>
  <div class="messageList">
       <message-info v-for="(data, index) of list" :key="index" :data="data"></message-info>
  </div>
</template>

<script>
import messageInfo from './messageInfo'
export default {
  components: {
    messageInfo
  },
  props: {
    list: {
      type: Array,
      default:()=>[]
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>