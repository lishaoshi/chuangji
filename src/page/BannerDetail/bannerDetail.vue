<template>
  <div class="bannerDetail">
      <head-title :title="'公告详情'"></head-title>
      <div class="bannerTitle">
          {{title}}
      </div>
      <div class="company">
          <div>
              <img src="" alt="">
          </div>
          <div>
              <span>郑州英莱药业有限公司</span>
              <span>2019.10.04</span>
          </div>
      </div>

      <div class="bannerContent">
          医药网10月22日讯一个改编自真实代购救命 药的电影《我不是药神》让“仿制药”这个个 词走进了人们的视野。所谓仿制药，即专利 药品结束专利保护期之后，不拥有该项专利 的药企仿制的替代药品。仿制药具有和原研 药一样的治疗作用，同时由于相对低廉的价 格，仿制药就成了患者减轻医药负担的选择 几乎同时，药企纷纷开始调整仿制药产品布 局，恒瑞医药董事长孙飘扬公开表示，基于 投入和产出的衡量，恒瑞医药已经停掉一批 仿制药开发项目。此外，先声药业、科伦药 业、石药集团、正大天晴等多家药企也先后 启动转型，彻底放弃低端仿制药，开始走上 高技术壁垒仿制药及创新药研发结合的道路
      </div>
  </div>
</template>

<script>
import headTitle from '@/components/HeadTop.vue'
import { queryAnnouncementDetail } from '@/api/announcement'
export default {
    data() {
        return {
            title: '知名药企纷纷发力高端仿制药新型药 高毛利仍将持续',
            id: null
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
            debugger
            queryAnnouncementDetail({}, this.id).then(res=>{
                
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
    }
    .company {
        display: flex;
        margin-top: .32rem;
        margin-bottom: .5rem;
        img {
            width: .8rem;
            height: .8rem;
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
        text-indent: 2em;
    }

}

</style>