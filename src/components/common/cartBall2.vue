<template>
    <div class="ball-container">
        <transition-group tag="div" @before-enter="beforeEnter"
                          @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-for="(item, index) in balls" :key="`common_cart_ball2_${index}`"
                 v-show="item.show" transition='drop'>
                <div class="inner inner-hook">
                </div>
            </div>
        </transition-group>
    </div>
</template>

<script>
    export default {
        name: "cartBall",
        data(){
           return {
               balls:[{show:false},{show:false},{show:false},{show:false},{show:false},{show:false}],
               dropBalls: []
           }
        },
        methods:{
            drop (target){
                for (let i = 0; i < this.balls.length; i++){
                    let ball = this.balls[i]
                    if(!ball.show){
                        ball.show = true
                        ball.el = target
                        this.dropBalls.push(ball)
                        return
                    }
                }
            },
            beforeEnter(el){
                let count = this.balls.length

                while (count--) {
                    let ball = this.balls[count]
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect() // 获取小球的相对于视口的位移(小球高度)
                        //let x = -(window.innerWidth + rect.left)
                        let x = rect.left
                        //let y = rect.top + 90 
                        let y =-rect.top
                        el.style.display = '' // 清空display
                        el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
                        el.style.transform = `translate3d(0, ${y}px, 0)`
                        // 处理内层动画
                        let inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
                        inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
                        inner.style.transform = `translate3d(${x}px, 0, 0)`
                    }
                }
            },
            enter (el, done){
                let rf = el.offsetHeight // 触发重绘html
                this.$nextTick(() => {
                    // 让动画效果异步执行,提高性能
                    el.style.webkitTransform = 'translate3d(0, 0, 0)'
                    el.style.transform = 'translate3d(0, 0, 0)'
                    // 处理内层动画
                    let inner = el.getElementsByClassName('inner-hook')[0] // 使用inner-hook类来单纯被js操作
                    inner.style.webkitTransform = 'translate3d(0, 0, 0)'
                    inner.style.transform = 'translate3d(0, 0, 0)'
                    el.addEventListener('transitionend', done) // Vue为了知道过渡的完成，必须设置相应的事件监听器。
                })
            },
            afterEnter (el) {
                let ball = this.dropBalls.shift() // 完成一次动画就删除一个dropBalls的小球
                if (ball) {
                    ball.show = false
                    //el.style.display = 'none' // 隐藏小球
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ball-container {
        .ball{
            position: fixed;
            right: .8rem;
            bottom: 2.6rem;
            z-index: 200;
            transition: all 0.35s cubic-bezier(0.375, 0.450, 0.250, 0.855);

            .inner {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: $primary;
                transition: all 0.3s linear
            }
        }
    }
</style>