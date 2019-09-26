<template>
    <div id="CollectEdit">
        <clxsd-head-top :title='`联采定制`'></clxsd-head-top>
        <div class="drug">
            <img id="product_img" src="" alt="">
            <p id="product_name">维生素</p>
        </div>
        <div class="pieces clearfix">
            <p>集采件数(盒)</p>
            <input type="number" autofocus="autofocus"  id="numberInput" placeholder="至少采集30件">
            <div><p>合计:</p><p ><i id='total_price'>0</i>元</p></div>
        </div>
        <div class="hint">
            <div class="character">
                <em>·</em>
                <p>发起者发布的价格是此次发布最高价格，若有价格变动，价格<i>只低不高</i></p>
            </div>
            <div class="character">
                <em>·</em>
                <p>若有价格变动，会在厂家接单后，将<i>差价返还</i></p>
            </div>
            <div class="character">
                <em>·</em>
                <p>若此次发布厂家未接单，会在时间结束后，将<i>全额返还</i></p>
            </div>
            <div class="triangle_border_up"></div>
        </div>
        <button class="btn" >立即集采</button>
    </div>
</template>

<script>
    export default {
        name: "CollectEdit"
    }
</script>

<style lang="scss" scoped>
    #CollectEdit {
        min-height: 100%;
        background: #fff;
    }
    .drug{
        text-align: center;
        margin:0.3rem auto;
        img{
            width: 1.28rem;
            height: 1.28rem;
            display: inline-block;
        }
        p{
            font-size: 0.28rem;
        }
    }
    .pieces{
        margin: 1.5rem 0.24rem 0;
        p {
            &:nth-child(1) {
                font-size: 0.3rem;
                color: rgb(102,102,102);
            }
            &:nth-child(2) {
                margin-left: 0.2rem;
            }
        }
        input{
            font-size: 0.38rem;
        }
        div{
            float: right;
            font-size: 0.36rem;
            color: rgb(51,51,51);
            display: flex;
            align-items: center;
        }
    }
    .hint{
        position: relative;
        font-size: 0.24rem;
        color: rgb(153,153,153);
        background: rgb(245,245,245);
        margin-top: 0.15rem;
        padding: 0.2rem 0 0.1rem;
        .character{
            display: flex;
            margin-bottom: 0.15rem;
            em{
                margin-left: 0.58rem;
            }
            p{
                max-width: 6.2rem;
                i{
                    color: rgb(255,181,64);
                }
            }
        }
        .triangle_border_up{
            position: absolute;
            top: -0.17rem;
            left: 0.3rem;
            width:0;
            height:0;
            border-width:0 0.54rem 0.17rem;
            border-style:solid;
            border-color:transparent transparent rgb(245,245,245);/*透明 透明  灰*/
        }
    }

    .btn{
        width: 7.1rem;
        height: 0.88rem;
        color: #fff;
        background: rgb(45,162,255);
        font-size: 0.34rem;
        margin-top: 1.2rem;
        border-radius: 8px;
        display: block;
        margin: 1.2rem auto;
    }
</style>