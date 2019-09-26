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
        name: "ExtensionSeach2"
    }
</script>

<style lang="scss" scoped>
    .search {
        padding: .2rem .2rem;
        z-index: 999;
        background: #0090ff;
        padding-top: .25rem;
        &-inp1 {
            background: #33a6ff;
            width: 100%;
            height: .54rem;
            border-radius: .54rem;
            padding: 0 5px;
            font-size: .34rem;
            text-align: center;
            color: #d6edff;
            &::placeholder {
                text-align: center;
                background: url(../../../images/index/search-3.png) no-repeat center;
                background-size:.35rem .35rem ;
                background-position-x: 41%;
                color: #fff;
            }
        }
    }
</style>