<template>
    <div class="prompt">
        <div class="content">

        </div>
    </div>
</template>
<script>
export default {
    name: "prompt",
    data() {
        return {
            text: 'hello'
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/style/defaultColor.scss';
.prompt {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    opacity: 0.5;
    background: #000;
    .content {
        background: #fff;
        
    }
}
</style>