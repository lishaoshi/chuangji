<template>
    <div class="auth">
        <p class="time">{{data.time | formatDate}}</p>
        <div class="auth-list">
            <div>
                <img :src="data.src" v-if="data.src" />
                <img src="../../../images/pic_default_man.png" v-else>
            </div>
            <div class="info">
                <p><span>{{data.name}}</span>（{{data.phone}}）</p>
                <p><span :key="`it-${_ind}`" v-for="(des,_ind) in data.desc">{{des}}</span></p>
            </div>
            <div v-if="data.status === 0" style="width: 1.5rem;text-align: right">
                <button class="btn" @click="sureAuth(data.id)">授权</button>
                <p class="del" @click="delAuth(data.id)">删除</p>
            </div>
            <div v-if="data.status===1">
                <p class="over">已授权</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ShengAuthorization",
        props: [
            "sureAuth", "data","delAuth"
        ],
    }
</script>

<style lang="scss" scoped>
    .auth {
        background: #fff;
        margin: .2rem;
        margin-top: 0px;
        border-radius: 5px;
        border:1px solid #f1f1f1;
        padding: .2rem;
        align-items: center;
        height: 2rem;
        .time {
            text-align: right;
            color: #999;
            font-size: .24rem;
            margin-bottom: .2rem;
        }
    }
    .auth-list {
        display: flex;

        img {
            width: .9rem;
            height: .9rem;
            border-radius: 100%;
        }
        .info {
            width: 65%;
            padding-left: .2rem;
            p {
                line-height: 1.5;
                &:nth-child(1) {
                    font-size: .24rem;
                    color: #999;
                    span {
                        font-size: .3rem;
                        color: #333;
                    }
                }
                &:nth-child(2) {
                    font-size: .24rem;
                    color: #7C7C7C;
                    margin-top: .06rem;
                    span {
                        padding-right: .1rem;
                    }
                }
            }
        }
        .btn {
            width: 1.2rem;
            height: .6rem;
            border-radius: .6rem;
            background: rgb(0,170,239);
            color: #fff;
            font-size: .28rem;
            letter-spacing: 0px;
        }
        .del {
            width: 1.1rem;
            text-align: right;
            font-size: .28rem;
            color: rgb(0,170,239);
            right: -.12rem;
            margin-top: .05rem;
            position: relative;
        }
        .over {
            text-align: right;
            color: rgb(250,84,82);
            font-size: .28rem;
            font-weight: bold;
            width: 1.5rem;
            padding-top: .3rem;
        }
    }
</style>