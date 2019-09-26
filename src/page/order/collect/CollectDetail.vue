<template>
	<div>
		<clxsd-head-top :title='`详情`'></clxsd-head-top>
		<mt-swipe :auto="4000" style="height: 5.6rem;">
			<mt-swipe-item><img src="../../../images/index/img3.png" width="100%"></mt-swipe-item>
			<mt-swipe-item><img src="../../../images/index/img3.png" width="100%"></mt-swipe-item>
			<mt-swipe-item><img src="../../../images/index/img3.png" width="100%"></mt-swipe-item>
		</mt-swipe>
		<div class="cost">
			<div class="price">
				<div class="left">
					<div class="unit">
						<i>￥</i>
						<p>2</p><i>/件</i>
					</div>
					<em>往购价 21</em>
				</div>
				<div class="right">
					<p>已集</p>
					<p>21件</p>
				</div>
			</div>
			<div class="count_down">
				<p>距结束还剩</p>
				<p id="record_time">
					12天12时24分45秒
				</p>
			</div>
		</div>
        <div class="message">
            <div><p>规格:</p><i>50</i><i>3盒/件</i></div>
            <div><p>药厂:</p><i>哈尔滨药业</i></div>
            <div><p>生产日期:</p><i>2018.12.12</i></div>
            <div><p>有效期:</p><i>2年</i></div>
        </div>
        <div class="bottom">
            <div class="transmit">
                <img src="" alt="">
                <p>转发</p>
            </div>
            <div class="customization">
                <router-link to="/collect-edit">
                    <p>我要订制</p>
                </router-link>

            </div>
        </div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.cost {
		width: 100%;
		height: 1rem;
		display: flex;
		color: #fff;
	}
	
	.cost .price {
		width: 5.2rem;
		height: 100%;
		background: linear-gradient(to right, #f35c2a, #f93980);
		display: flex;
		align-items: center;
		justify-content: space-between;
        .left {
            height: 100%;
            margin-left: 0.3rem;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            p {
                line-height: 100%;
            }
            .unit {
                display: flex;
                align-items: flex-end;
                i {
                    &:nth-child(1) {
                        font-size: 0.36rem;
                    }
                    &:nth-child(3) {
                        font-size: 0.3rem;
                    }
                }
                p {
                    &:nth-child(2) {
                        font-size: 0.48rem;
                    }
                }
            }
            em {
                color: #fff;
                font-size: 0.24rem;
            }
        }
	}

	.cost .price .right {
		display: flex;
		align-items: center;
		margin-right: 0.24rem;
        p {
            &:nth-child(1) {
                color: rgb(255, 59, 48);
                font-size: 0.24rem;
                background: #fff;
                padding: 2px 3px;
                border-radius: 4px;
            }
            &:nth-child(2) {
                color: #fff;
                font-size: 0.34rem;
                margin-left: 0.12rem;
            }
        }
	}
	
	.cost .count_down {
		flex: 1;
		background: rgb(255, 234, 233);
		display: flex;
		flex-direction: column;
		justify-content: center;
        p {
            &:nth-child(1) {
                font-size: 0.22rem;
                color: rgb(242, 45, 144);
                text-align: center;
            }
            &:nth-child(2) {
                font-size: 0.2rem;
                background: rgb(242, 49, 95);
                height: 0.5rem;
                width: 2rem;
                line-height: 0.5rem;
                text-align: center;
                border-radius: 0.1rem;
                margin: 2px auto;
            }
        }
	}

    .message{
        width: 100%;
        background: rgb(250,250,250);
        margin-top: 0.2rem;
        div{
            font-size: 0.24rem;
            color: rgb(153,153,153);
            padding-top: 0.22rem;
            margin-left: 0.14rem;
            display: flex;
            align-items: center;
            i{
                margin-left: 0.15rem;
            }
            &:last-child() {
                padding-bottom: 0.24rem;
            }
        }
    }
    .bottom{
        position:fixed;
        width: 100%;
        height: 1rem;
        border-top: 1px solid rgb(230,230,230);
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
    }
    .bottom .transmit{
        margin-left: 0.42rem;
        img{
            width: 0.36rem;
            height: 0.32rem;
        }
        p{
            margin-top: 0.1rem;
            color: rgb(102,102,102);
            font-size: 0.22rem;
        }
    }
    .bottom .customization{
        background: rgb(255,59,48);
        width: 4.36rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.34rem;
        color: #fff;
        margin-right: 0.24rem;
        a {
            color: #fff;
        }
    }
</style>