<template>
    <div class="item">
        <div>
            <img src="../../images/default2.png" alt="" />
            <span>张欣欣</span>
        </div>

        <div>
            <span>10家</span>
        </div>

        <div>
            <span>9999.00元</span>
        </div>
        
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.item {
    display: flex;
    height: 1.4rem;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    div {
        font-size: .36rem;
         font-weight: bold;
    }
    div:first-child {
        display: flex;
        align-items: center;
        font-size: .32rem;
       font-weight: normal;
        img {
            height: .8srem;
            width: .8rem;
            margin-right: .1rem;
        }
    }
    div:last-child {
        color: #03AD8F;
    }
}

</style>