<template>
    <div>
        <clxsd-head-top title='我要反馈'></clxsd-head-top>
        <router-link to="/feedback-list" class="feed-a1">记录</router-link>
        <textarea class="inp1" v-model="feedback" placeholder="感谢你的反馈，我们将不断优化你的体验。" @input="checkFeed">
        </textarea>
        <button class="btn1" @click="onSubmit" :disabled="disabled">立即反馈</button>
    </div>
</template>

<script>
    export default {
        name: "Feedback",
        data(){
            return{
                feedback:'',
                disabled:true
            }
        },
        methods:{
            checkFeed(){
              if(this.feedback!=''){
                  this.disabled = false
              }
            },
            onSubmit(){
                if(this.feedback===''){
                    this.$toast("你的反馈内容不能为空")
                    return;
                }
                this.$http.post("comments/add",{body:this.feedback}).then(res => {
                    this.feedback =''
                    this.$toast('感谢您的反馈')
                    this.$router.push('/feedback-list')
                }).catch(error => {
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .feed-a1 {
        float: right;
        margin-top: -.6rem;
        position: relative;
        z-index: 99;
        color: #fff;
        padding-right: .2rem;
        font-size: .3rem;
    }
    .inp1 {
        width:7.1rem;
        height:4.57rem;
        margin: .2rem auto;
        display: block;
        padding: .1rem;
        background:rgba(255,255,255,1);
        font-size: .32rem;
    }
    .btn1 {
        width:7.1rem;
        height:.88rem;
        background:rgba(45,162,255,1);
        border-radius:.06rem;
        color: #fff;
        font-size:.34rem;
        margin: .2rem auto;
        display: block;
        margin-top: .5rem;
        &:disabled {
            background: #ccc;
        }
    }
</style>