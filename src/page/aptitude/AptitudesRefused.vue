<template>
  <div class="container">
      <!-- <div> -->
      <clxsd-head-top title="公司信息" append="2">
          <div slot="append" @click="handleEdit" class="my">
                <span>编辑</span>
            </div>
      </clxsd-head-top>
      <div class="promptText">
          <span>审核未通过，</span>
          <span>{{refuse_reason||'请重新编辑'}}</span>
      </div>

      <div class="companyInfo">
          <div>
              <span class="title">公司类型：</span>
              <span>{{userType==3?'采购 - ': ''}}{{sub_type_name}}</span>
          </div>
          <div>
              <span class="title">公司名称：</span>
              <span>{{org_name}}</span>
          </div>
      </div>

      <div class="companyImgList">
        <div v-for="(item, index) of imgList" :key="index" @click="showBigImg(item.value)">
            
            <span v-if="item.label=='营业执照'">{{item.label}}</span>
            <!-- 商业 -->
            <span v-else-if="item.label=='经营许可证'">{{item.label=="经营许可证"?"药品经营许可证":item.label}}</span>
            <span v-else-if="item.label=='GSP证书'">{{item.label=="GSP证书"?"药品经营质量管理规范认证证书(GSP)":item.label}}</span>
            <!-- 工业 -->
            <span v-else-if="item.label=='生产许可证'">生产许可证</span>
            <span v-else-if="item.label=='GMP证书'">药品生产质量管理规范认证证书(GMP)</span>
             <!-- <span v-else-if="item.label=='食品'">药品生产质量管理规范认证证书(GMP)</span> -->
            <!-- <span v-else-if="item.label=='生产许可证'">生产许可证</span> -->
            
            
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
      <!-- <wimg :show="isShowBigImg" :imgs="imgs" :currentImg="current" @close="isShowBigImg = false"></wimg> -->
      <!-- <img v-for="(item,index) of imgs" :key="index" :src="item" preview="0" preview-text="描述文字">
       -->
       <div v-if="isShowBigImg" @click="close" class="popBox">
           <!-- <span>123</span> -->
           <img :src="current" alt="">

       </div>
  </div>
</template>

<script>
import ClxsdHeadTop from "../../components/HeadTop";
import { mapActions } from "vuex"

// import wimg from 'w-previewimg'
export default {
    data() {
        return {
            imgs: [],
            isShowBigImg: false,
            current: ''
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
            type: Array,
            required:true
        },
        refuse_reason: {
            type: String,
            required:true
        },
        sub_type_name: {
            type: String,
            required: true
        },
        userType: {
            type: Number,
            required: true
        }
    },
     updated() {
        this.$nextTick().then(()=>{
            // console.log(this.imgList,'list')
            this.imgList.forEach(item=>{
                // console.log(item, 'item')
                this.imgs.push(item.url)
            })
        })
        
    },
    methods: {
        handleEdit() {
            this.$emit('updateCompany')
        },
        showBigImg (i) {
            // cosnole.log(i)
            this.current = i
            this.isShowBigImg = true
        },
        close() {
            this.isShowBigImg = false
        }
    },
    components: {
        ClxsdHeadTop,
        // wimg
    },
   
}
</script>

<style lang="scss" scoped>
.container {
    .popBox {
        position: absolute;
        opacity: 1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #000;
        z-index: 999;
        display: flex;
        align-items: center;
        img {
            width: 100%;
        }
    }
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