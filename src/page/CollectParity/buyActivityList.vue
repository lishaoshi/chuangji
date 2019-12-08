<template>
    <div class="container">
        <clxsd-head-top :title='`集采活动`'></clxsd-head-top>
        <list />
    </div>
</template>

<script>
import list from '@/components/collectParity/buyActivityList'
export default {
    components: {
        list
    }

}
</script>

<style>

</style>