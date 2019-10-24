<template>
    <div>
        <div class="header" :class="{ topHeight: isFullScreen }">
        </div>
                    <!--非正常情况，没有客户，需要去推广-->
        <UnSureCustomer :notices="noticeList"/>
         <clxsd-foot-guide :user-type="4"/>
    </div>
</template>

<script>
import UnSureCustomer from "@/page/Home/UnSureExtension/UnSureCustomer";
import {adList, infoList} from "@/api/ad";
export default {
    name: "promotersCustomer",
    components: {
        UnSureCustomer
    },
    data() {
        return {
            isFullScreen: (document.body.clientHeight / document.body.clientWidth) > (16 / 9),
            noticeList: []
        }
    },
    created() {
        this._initData()
    },
    methods: {
        // 初始化banner、公告数据
            _initData() {
                // banner参数
                let bannerParams = {
                    channel: 'app',
                    space:　"tuiguang-all："
                }
                
                // 公告参数
                let infoParams = {
                    from: "platform",
                    supplier_id: 0,
                    space: "tuiguang-all",
                    limit: this.limit
                }
                infoList(infoParams).then(res=>{
                    // debugger
                    let data = res.data.data
                    this.noticeList = res.data.data
                })
            }
    }
}
</script>

<style lang="scss" scoped>
.header {
        height: .88rem;
        line-height: .88rem;
        background: #0090ff;
        color: #fff;
        font-size: .36rem;
        font-weight: bold;
        padding: 0 .2rem;
        position: fixed;
        width: 100%;
        top:0px;
        left: 0px;
        z-index: 1;
        justify-content: space-between;
    }
    .topHeight {
        height: 1.55rem;
        .my {
            top:.78rem
        }
    }
</style>