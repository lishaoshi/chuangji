<template>
  <div class="bannerDetail">
      <head-title :title="'公告详情'"></head-title>
      <div class="bannerTitle">
          {{title}}
      </div>
      <div class="company">
          <div>
              <img :src="logo" alt="">
          </div>
          <div>
              <span>郑州英莱药业有限公司</span>
              <span>2019.10.04</span>
          </div>
      </div>

      <div class="bannerContent">
          {{content}}
      </div>
  </div>
</template>

<script>
import headTitle from '@/components/HeadTop.vue'
import { queryAnnouncementDetail } from '@/api/announcement'
export default {
    data() {
        return {
            title: '',
            id: null,
            content: '',
            logo: ''
        }
    },
    created() {
        if(this.$route.query.id) {
            this.id = this.$route.query.id
        } else {
            this.$router.push('/')
        }
        this.id&&this._getInfoData()
    },
    methods: {
        /**
         * 获取公告信息
         */
        _getInfoData() {
            // debugger
            queryAnnouncementDetail({}, this.id).then(res=>{
                this.content = res.data.content;
                this.logo = res.data.supplier.img_cover;
                this.title = res.data.title;
            })
        }
    },
    components: {
        headTitle
    }
}
</script>

<style lang="scss" scoped>
.bannerDetail {
    padding: 0 .3rem;
    background: #fff;
    height:100%;
    .bannerTitle {
        font-size: .44rem;
        text-align: left;
        margin-top: .1rem;
    }
    .company {
        display: flex;
        margin-top: .32rem;
        margin-bottom: .5rem;
        img {
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            margin-right: .2rem;
        }
        div:last-child {
            display: inline-flex;
            flex-direction: column;
            // span:last-child {
            //     m
            // }
        }
        
    }
    .bannerContent {
        font-size: .36rem;
        color: #333;
    }

}

</style>