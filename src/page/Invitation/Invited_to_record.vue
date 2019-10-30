<template>
    <div class="record">
        <clxsd-head-top title='邀请记录' :goBackFnc="goBackFnc" :goBackNum="-1"></clxsd-head-top>
        <main>
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <div>
                        <img v-if="item.user.avatar" :src="item.user.avatar">
                        <img src="data:image/png;base64,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" v-else />
                        <img v-if="item.user.supplier" class="approve" src="../../images/认证.svg" alt="">
                        <section>
                            <p>{{item.user.real_name}}222</p>
                            <p>{{item.user.supplier}}sssss <span>{{item.mobile_desensite}}</span></p>
                        </section>
                        <!-- <span>{{item.mobile_desensite}}</span> -->
                        <span>2019.10.10</span>
                    </div>
                </li>
            </ul>
            <div class="no_invited " v-if="!list.length>0">
                您还没有邀请过用户！
            </div>
        </main>
    </div>
</template>

<script>

export default {
    name:'record',
    data(){
        return{
            list:[]
        }
    },
    components:{
    },
    created(){
        this._getData()
    },
    methods:{
         goBackFnc(){},
         /*
    封装获取推广员列表
    参数first表示是否是页面第一次加载
    */
    _getData() {
      let params = {
        type:1
      }

      this.$http.get("users/list", {params},
        {
          validate: state => state === 200
        }).then(response => {
            console.log(response.data.data);
            this.list = response.data.data
        })
        .catch(error => {
        });
       
    },
        
    }
}
</script>


<style lang="scss" scoped>
    .record {

    main {
        padding:  0 .2rem;
        ul {
            margin-top: .3rem;
            li {
                width:7.1rem;
                height:2rem;
                font-weight:500;
                background:rgba(255,255,255,1);
                border-radius:.08rem;
                div {
                    display: flex;
                    align-items: center;
                    height: 100%;
                    padding: 0 .32rem;
                    position: relative;
                    img {
                        display: block;
                        width:.96rem;
                        height:.96rem;
                        border-radius:50%;
                    }
                    section {
                        margin-left: .23rem;
                        margin-right: .16rem;
                        span {
                        font-size: .28rem;
                        color: #999;
                    }
                    }
                    p {
                        
                        font-size: .34rem;
                        color: #333;
                    }
                    
                    &>span:nth-of-type(1) {
                        font-size: .24rem;
                        flex: 1;
                        text-align: right;
                        color: #666;
                        margin-bottom: .31rem;
                        align-self: flex-end;
                    }
                    .approve {
                        display: block;
                        width:.26rem;
                        height:.28rem;
                        position: absolute;
                        left: .9rem;
                        top: 1.2rem;
                        z-index: 10;
                    }
                }
            }
        }

    }
    }
    .no_invited {
        font-size: .3rem;
        color: #333;
        text-align: center;
    }
</style>