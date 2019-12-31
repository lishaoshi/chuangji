<template>
    <div class="container">
        <clxsd-head-top title='定制生产'></clxsd-head-top>
        <timeOut :title="title"/>
        <div class="goods-list">
            <list />
        </div>
        
    </div>
</template>

<script>
import timeOut from "@/components/collectParity/buyDay"
import list from "./list"
export default {
    components: {
        timeOut,
        list
    },
    data() {
        return {
            title: "限时定制"
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    .goods-list {
        margin: 0 .2rem;
    }
}
</style>