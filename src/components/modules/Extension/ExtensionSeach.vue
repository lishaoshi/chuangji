<template>
    <div>
        <div class="search">
            <form>
                <input type="search" placeholder="搜索" class="search-inp1">
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ExtensionSeach"
    }
</script>

<style lang="scss" scoped>
    .search {
        padding: .2rem .2rem;
        z-index: 999;
        background: #f4f5f5;
        &-inp1 {
            background: #fff;
            width: 100%;
            height: .72rem;
            border-radius: 6px;
            padding: 0 5px;
            font-size: .34rem;
            text-align: center;
            &::placeholder {
                text-align: center;
                background: url(../../../images/index/search-1.png) no-repeat center;
                background-size:.35rem .35rem ;
                background-position-x: 41%;
            }
        }
    }
</style>