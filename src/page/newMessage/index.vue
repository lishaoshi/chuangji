<template>
  <div class="container">
      <clxsd-head-top :title="title"></clxsd-head-top>
      <div v-if="messageList.length" style="overflow: auto;flex:1;">
            <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
                <message-list :list="messageList"></message-list>
            </mt-loadmore>
      </div>
     <EmptyList v-else/>
      
  </div>
</template>

<script>
import messageList from './components/list'
import { getMessageList } from '@/api/newMessage'
import EmptyList from "@/components/EmptyList"
export default {
    components: {
        messageList,
        EmptyList
    },
    data() {
        return {
            allLoaded: false,
            type: '',
            messageList: [],
            page: 1,
            limit: 15
        }
    },
    computed: {
        title() {
            return this.$route.meta.title
        }
    },
    created() {
        // console.log(this.$route)
        this.type = this.$route.params.type
        this._getMessageList()
    },
    methods: {
        loadBottom() {
            this._getMessageList()
        },
        /***
         * 获取消息列表
         */
        _getMessageList() {
            if(!this.type) {
                return false
            }
            let params = {
                type: this.type,
                page: this.page,
                limit: this.limit
            }
            getMessageList(params).then(res=>{
                // debugger
                if(this.page == 1) {
                    this.messageList = res.data.messageList
                } else {
                     this.messageList = [...this.messageList, ...res.data.messageList]
                     this.$refs.loadmore.onBottomLoaded()
                }
                if( res.data.messageList.length==0) {
                    this.allLoaded = true
                }
                this.page++
                
            })
            // if(this.type=="promote") {
            //     this._promote()
            // } else {
            //     this._entity()
            // }
        },
        /**
         * 获取推广信息
         */

    }

}
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>