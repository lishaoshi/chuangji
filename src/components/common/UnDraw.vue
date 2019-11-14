<template>
    <div>
        <div class="container">
            <ul>
                <li class="list-item" data-type="0">
                    <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd">
                        <div class="list-content">
                            <p class="shop-unit">待提取</p>
                            <p class="shop-name">消耗联数：{{data.consume_lianshu}}</p>
                            <p class="shop-name">剩余提取时间：{{data.minutes}}分{{data.seconds}}秒</p>
                            <p class="shop-name">订单编号：{{data.order_sn}}</p>
                        </div>
                        <div class="list-detail">
                            <p>金额</p>
                            <p>￥{{+data.money_paid+(+data.freight) | filterFixed}}</p>
                            <button @click="extractOrder(data.id,data.money_paid)">提取</button>
                        </div>
                    </div>
                    <div class="delete">
                        <div class="delete_Img"></div>
                        <span @click="refuseOrder(data.id)">拒绝</span>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>

    export default {
        name: "MyFollow",
        data() {
            return {
                clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
                candelete: {},
                time:'',
                tim: null
            }
        },
        props:["data","refuseOrder","extractOrder","flag"],
        created(){
          this.init()
        },
        watch: {
            flag(value) {
                clearInterval(this.tim)
                this._setTimeOutFn(this.data.left_time)
            }
        },
        mounted() {
            if(this.tim) {
                clearInterval(this.tim)
            }
            this._setTimeOutFn(this.data.left_time)
        },
        filters: {
			filterFixed(value) {
				value = Number(value)
				return value.toFixed(2)
			}
		},

        methods: {
            init(){
                this.time = this.$moment(this.data.payed_time_int).format("h小时mm分")
            },
             // 封装倒计时函数
            _setTimeOutFn(time) {
                // debugger
                let minutes = Math.floor(time/60)
                let seconds = Math.ceil(time%60)
                 this.$set(this.data, 'minutes', minutes)
                this.$set(this.data, 'seconds', seconds)
                this.data.minutes = minutes
                this.tim = setInterval(()=>{
                    seconds--
                    if(seconds<=0&&minutes>0) {
                        minutes--
                        seconds=59
                        this.data.minutes = minutes
                    } else if(seconds<=0&&minutes<=0) {
                        this.data.minutes = 0
                        this.data.seconds = 0
                        clearInterval(this.tim)
                    }
                    if(seconds<10) {
                        seconds = '0' + seconds
                    }
                    this.data.seconds = seconds
                   
                },1000) 
            },
            touchStart(e) {
                this.startX = e.touches[0].clientX;
            },
            //滑动结束
            touchEnd(e) {
                let parentElement = e.currentTarget.parentElement;
                this.endX = e.changedTouches[0].clientX;
                if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
                    this.restSlide();
                    parentElement.dataset.type = 1;
                }
                if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
                    this.restSlide();
                    parentElement.dataset.type = 0;
                }
                this.startX = 0;
                this.endX = 0;

            },
            //判断当前是否有滑块处于滑动状态
            checkSlide() {
                let listItems = document.querySelectorAll('.list-item');
                for (let i = 0; i < listItems.length; i++) {
                    if (listItems[i].dataset.type == 1) {
                        return true;
                    }
                }
                return false;
            },
            //一次只能滑动一个
            restSlide() {
                let listItems = document.querySelectorAll('.list-item');
                for (let i = 0; i < listItems.length; i++) {
                    listItems[i].dataset.type = 0;
                }
            },


        }

    }
</script>


<style lang="scss" scoped>
    .container ul {
        overflow: hidden;
        width: 100%;
        list-style-type: none;
        -webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        -webkit-padding-start: 0px;
    }

    .list-item {
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        font-size: 20px;
        padding: .2rem;
        position: relative;
        height: 2.88rem;
        margin-top: .2rem;
    }

    .list-item[data-type="0"] {
        transform: translate3d(0, 0, 0);
    }

    .list-item[data-type="1"] {
        transform: translate3d(-2.2rem, 0, 0);
    }

    .list-box {
        padding: .32rem .2rem;
        background: #fff;
        display: flex;
        align-items: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        justify-content: flex-end;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        font-size: 0;
        .list-detail {
            width: 2rem;
            text-align: center;
            p {
                &:nth-child(1){
                    font-size:.24rem;
                    font-weight:500;
                    color:rgba(51,51,51,1);
                }
                &:nth-child(2) {
                    font-size:.20rem;
                    line-height: 2;
                    font-weight:bold;
                    color:#FF3B30;
                    margin-bottom: .3rem;
                }
            }
            button {
                width:1.9rem;
                height:.64rem;
                background:rgba(45,162,255,1);
                border-radius:.32rem;
                font-size:.28rem;
                color: #fff;
                margin-left: .2rem;
            }
        }
    }

    .list-item .list-content {
        position: relative;
        flex: 1;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        overflow: hidden;
        height: 100%;
        border-right: 1px solid #e6e6e6;
        .shop-name {
            font-size: .24rem;
            display: block;
            line-height: 2;
            padding-top: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #999;
        }

        .shop-unit {
            font-size: .27rem;
            color: #FF3B30;
            display: block;
            line-height: 1.5;
            margin-bottom: .4rem;
        }
    }

    .list-item .delete {
        width: 2.2rem;
        height: 1.56rem;
        text-align: center;
        position: fixed;
        top: 0;
        right: -2.8rem;
        span {
            width:.8rem;
            height:.8rem;
            background:rgba(255,59,48,1);
            border-radius:50%;
            display: block;
            color: #fff;
            line-height: .8rem;
            margin-top: .78rem;
            font-size: .24rem;
            margin-left: .17rem;
        }
    }
</style>