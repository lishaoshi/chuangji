<template>
  <div class="container">
      <clxsd-head-top title="公司信息" append="2">
          <div slot="append" @click="handleEdit" class="my">
                <span>编辑</span>
            </div>
      </clxsd-head-top>
      <div class="promptText">
          <span>审核未通过，</span>
          <span>公司名称与营业执照名称不匹配，点击编辑进行修改</span>
      </div>

      <div class="companyInfo">
          <div>
              <span class="title">公司类型：</span>
              <span>{{cate_name}}</span>
          </div>
          <div>
              <span class="title">公司名称：</span>
              <span>{{org_name}}</span>
          </div>
      </div>

      <div class="companyImgList">
        <div v-for="(item, index) of imgList" :key="index">
            <span v-if="item.label=='GSP证书'">{{item.label=="GSP证书"?"药品经营质量管理规范认证证书(GSP)":item.label}}</span>
            <span v-else-if="item.label=='营业执照'">{{item.label}}</span>
            <span v-else>{{item.label=="经营许可证"?"药品经营许可证":item.label}}</span>
            <img :src="item.value" alt="">
        </div>
        <!-- <div>
            <span>药品经营许可证</span>
            <img src="@/images/add.png" alt="">
        </div>
        <div>
            <span>药品经营质量管理规范认证证书(GSP)</span>
            <img src="@/images/add.png" alt="">
        </div> -->
      </div>
  </div>
</template>

<script>
import ClxsdHeadTop from "../../components/HeadTop";
import { mapActions } from "vuex"
export default {
    data() {
        return {

        }
    },
    props: {
        cate_name: {
            type: String
        },
        org_name: {
            type: String
        },
        imgList: {
            type: Array
        }
    },
    methods: {
        handleEdit() {
            this.$emit('updateCompany')
        }
    },
    components: {
        ClxsdHeadTop
    }
}
</script>

<style lang="scss" scoped>
.container {
    .promptText {
        font-size: .28rem;
        padding: 0 .68rem;
        text-align: center;
        line-height: .6rem;
        // display: flex;
        // justify-content: center;
        margin: .32rem 0;
        span:first-child {
            color:#FF3B30;
        }
    }
    .companyInfo {
        background: #fff;
        padding: 0 .36rem;
        font-size: .28rem;
        .title {
            color:#666666
        }
        div {
            height: 1rem;
            line-height: 1rem;
        }
        div:last-child {
            border-top: 1px solid #f9f9f9;
        }
    }
    .companyImgList {
        margin-top: .2rem;
        background: #fff;
        padding: 0 .36rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        img {
            width: .72rem;
            height: .72rem;
        }
        div {
            border-top: 1px solid #f9f9f9;
            height: 1.2rem;
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}

</style>