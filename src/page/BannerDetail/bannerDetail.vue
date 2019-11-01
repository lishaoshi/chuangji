<template>
  <div class="bannerDetail">
      <head-title :title="'公告详情'"></head-title>
      <div class="bannerTitle">
          {{title}}
      </div>
      <div class="company">
          <div class="componyImgBox">
              <!-- <div v-if="!logo">
                    <svg class="middle-text">
                        <use xlink:href="#icon-no_square" />
                    </svg>
              </div> -->
              <!-- <img v-if="!logo" src="../../images/company/chuanglianLogo.png"/> -->
              <img :src="logo" alt="">
          </div>
          <div>
              <span>{{companyName}}</span>
              <span>{{time}}</span>
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
            logo: '',
            companyName: '',
            time: ''
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
                let data = res.data
                this.content = data.content;
                this.logo = data.supplier.img_cover;
                this.title = data.title;
                this.companyName = data.supplier.name;
                this.time = data.created_at
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
        min-height: .44rem;
    }
    .company {
        display: flex;
        margin-top: .32rem;
        margin-bottom: .5rem;
        align-items: center;
        
        .componyImgBox {
            margin-right: .2rem;
            background: url("../../images/company/chuanglianLogo.png") no-repeat;
            background-size: 100% 100%;
            border-radius: 50%;
            width: .8rem;
            height: .8rem;
        }
        span:first-child {
            font-size: .30rem;
            font-weight:bold;
            color: #333333;
        }
        span:last-child {
            font-size: .24rem;
            color: #999;
        }
        img {
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            // margin-right: .2rem;
        }
        svg {
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
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
        text-indent: 2em;
        font-size: .36rem;
        color: #333;
    }

}

</style>