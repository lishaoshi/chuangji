<template>
	<div>
	<div class="bg-fade"></div>
    <div class="pay-tool">
        <div class="pay-tool-title border-bottom">
            <svg class="icon-back" @click="backHandle">
                <use xlink:href="#icon-back"/>
            </svg>
            <strong>请输入交易密码</strong>
            <span class="clearPass" @click="clearPasswordHandle">
                清空
            </span>
        </div>
        <div class="pay-tool-content">
            <div class="pay-tool-inputs">
                <div class="item" v-for="i in items"><span class="icon_dot" v-if="password[i]"></span></div>
            </div>
            <div class="pay-tool-link"><router-link class="link" to="/user/forget-pay-password">忘记支付密码？</router-link></div>
        </div>
        <div class="pay-tool-keyboard">
            <ul>
                <li @click="keyUpHandle($event)" v-for="val in keys">
                    {{ val }}
                </li>
                <li class="del" @click="delHandle"><span class="icon-del"><</span></li>
            </ul>
        </div>
    </div>
   </div>
</template>

<script>
    const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
    export default {
        name: "PayPassword",
        props:{
            items:{ type:Array, default:() =>[0,1,2,3,4,5]}
        },
        data(){
            return {
                keys: keys(),
                password:[]
            }
        },
        methods:{
            backHandle(){
                this.clearPasswordHandle() //返回时清除password
                this.$emit('backFnc')
            },
            keyUpHandle (e) {
                let text = e.currentTarget.innerText
                let len = this.password.length
                if (!text || len >= 6) return
                this.password.push(text)
                this.$emit('keyUpHandle',this.password);
            },
            delHandle () {
                if (this.password.length <= 0) return false
                this.password.shift()
            },
            clearPasswordHandle (){
                this.password = []
            }

        }
    }
</script>

<style lang="scss" scoped>
.icon_dot {
	width: .2rem;
	height: .2rem;
	background: #333;
	border-radius: 100%;
}
.clearPass {
    position: absolute;
    right: .2rem;
    font-size: .26rem;
    background: #26a2ff;
    color: #ffff;
    border-radius: 3px;
    height: .5rem;
    width: .9rem;
    text-align: center;
    line-height: .5rem;
    top:.15rem;
}
.bg-fade {
	width: 100%;
	height: 100%;
	left: 0px;
	top:0px;
	position: fixed;
	background: #333;
	opacity: .3;
	z-index: 998;
}
    .pay-tool{
        position: fixed;
        bottom: 0px;
        z-index: 999;
        width: 100%;
        background-color: #fff;
        height: 6.6rem;
        &-title {
            height: .8rem;
            line-height: .8rem;
            text-align: center;
            overflow: hidden;
            background: #f1f1f1;

            .icon-back{
                width:.3rem;
                height:.3rem;
                position: absolute;
                left: .2rem;
                top:.22rem;
                color: #666;
            }
        }
        &-content {
            .pay-tool-inputs {
                height: 1rem;
                margin: .2rem .2rem 0;
                border: 1px solid #b9b9b9;
                border-radius: 0.1rem;
                box-shadow: 0 0 1px #e6e6e6;
                display: flex;
            }

            .item {
                width: 16.66666666%;
                height: 100%;
                border-right: 1px solid #b9b9b9;
                line-height: 1rem;
                text-align: center;
                &:last-child {
                    border-right: none;
                }

                .icon_dot {
                    display: inline-block;
                    width: 0.2rem;
                    height: 0.2rem;
                    background-size: cover;
                }

                .pay-tool-link {
                    margin-top:1rem;
                    padding: 0.4rem 0.3rem 0;
                    text-align: right;
                    .link {
                        font-size: 0.3rem;
                        color: #3c8cfb;
                        padding-left: .2rem;
                    }
                }
            }
        }

        .pay-tool-keyboard {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                li {
                    width: 33.3333%;
                    height: 1rem;
                    line-height: 1rem;
                    text-align: center;
                    border-right: 1px solid #aeaeae;
                    border-bottom: 1px solid #aeaeae;
                    font-size: 0.3rem;
                    font-weight: bold;
                    &:nth-child(1), &:nth-child(2), &:nth-child(3) {
                        border-top: 1px solid #eee;
                    }
                    &:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
                        border-right: none;
                    }
                    &:nth-child(10), &:nth-child(11), &:nth-child(12) {
                        border-bottom: none;
                    }
                    &:nth-child(10), &:nth-child(12), &:active {
                        background-color: #d1d4dd;
                    }
                    &:nth-child(12):active {
                        background-color: #fff;
                    }
                }
            }
        }
    }
    .link {
    	padding-left: .2rem;
    	line-height: 200%;
    }
</style>

