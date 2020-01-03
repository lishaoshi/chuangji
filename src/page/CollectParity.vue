<template>
  <div class="container">
      <div class="header">
        <!-- <SearchBar ref="searchBox" :searchFn="searchFn" :lianSho='lianSho' v-model="searchValue" @keyup="keyup" @clearText="clearText"></SearchBar> -->
         <SearchBar :isCollect="true" @keyup="keyEnter" ref="searchBox" v-model="searchValue" @clearText="clearText"></SearchBar>
      </div>
      <timeOut />
      <load-more ref="loadMoreBox" :loadBottom="loadBottom" :allLoaded="allLoaded" v-if="list.length">
        <collect-parity v-for="(item, index) of list" :key="index" :data="item" @changePrice="changePrice"/>
      </load-more>
      
      <EmptyList v-else/>
      <template v-if="isShowModel || isShowRules">
        <chang-model :isShowModel.sync="isShowModel" :lianshu="lianshu" :isShowRules.sync="isShowRules" :data="itemData" @confirmPrice="confirmPrice">
          <div class="input" :class="{jcClass:type==2 || lianshu==0}">
            <input type="text" @input="handleInput" :placeholder="placeholder" v-model="input">
            <div>
              <span>{{this.type==1?itemData.unit:itemData.big_unit}}</span>
            </div>
          </div>
          <p class="margin" v-if="type==1 && lianshu">
            <span>
               此次集采扣除{{lianshu | handleLianshu}}保证金
            </span>
          </p>
        </chang-model>
        <bg />
      </template>
      <clxsd-foot-guide :user-type="2"/>
  </div>
</template>

<script>
import SearchBar from '@/components/common/SearchBar';
import collectParity from "@/components/collectParity/list"
import changModel from "@/components/collectParity/changModel"
import bg from "@/components/collectParity/bg"
import timeOut from "@/components/collectParity/buyDay"
import { getActivityList, updatePrice, activityBuy, getLastTimePrice, getLastTimeNum } from '@/api/collectPrarity'
import loadMore from '@/components/common/loadMore'
 import EmptyList from "@/components/EmptyList"
export default {
  data() {
    return {
      searchValue: '',
      isShowModel: false,
      placeholder: '',
      page: 1,
      limit: 10,
      list: [],
      allLoaded: false,
      id: 0,
      itemData: {},
      input: '',
      type: 0,
      lianshu: '',
      isShowRules: false
    }
  },
  created() {
    this.initData()
  },
  filters: {
    handleLianshu(val) {
      return val.toFixed(2)
    }
  },
  // watch: {
  //   isShowModel() {
  //     this.input = ''
  //   }
  // },
  methods: {
    changePrice(val, id, type) {
      this.id = id
      this.itemData = this.list.find(item=>item.id==this.id)
      this.placeholder = val
      this.type = type
      this.input = ""
      this.type==1&&this._getLastTimePrice()
      this.type==2&&this._getLastTimeNum()
    } ,
    _getLastTimePrice() {
      let params = {
        group_id: this.id
      }
      getLastTimePrice(params).then(res=>{
        if(res.data.price) {
          this.input = res.data.price
        }
        this.lianshu = res.data.lianshu
         this.isShowModel = true
        // if(this.lianshu > 0) {
        //   this.isShowRules = true
        // } else {
        //   this.isShowModel = true
        // }
      })
    },
    handleInput(e) {
      const len = e.target.value
      if(this.type==1) {
          e.target.value = (e.target.value.match(/^\d*(\.?\d{0,3})/g)[0]) || null
          this.input = e.target.value;
      } else if(this.type==2) {
          // e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
          // this.input = e.target.value;  
          this.input = e.target.value.replace(/[^0-9]/g, '')
      }
    },
    _getLastTimeNum() {
      let params = {
        group_id: this.id
      }
      getLastTimeNum(params).then(res=>{
        if(res.data.num) {
          this.input = res.data.num
        }
        this.isShowModel = true
      })
    },
    initData() {
      let params = {
        page: this.page,
        search: this.searchValue
      }
      Promise.all([getActivityList(params)]).then(res=>{
        this.list = res[0].data.list
        if(!res[0].data.list || res[0].data.list&&res[0].data.list.length <= 0) {
          this.allLoaded = true
        }
        this.page++
      })
    },
    
    keyEnter() {
      this.page = 1
      this.initData()
    },
    loadBottom() {
     let params = {
        page: this.page
      }
       getActivityList(params).then(res=>{
        this.list = this.list.concat(res.data.list)
        if(!res.data.list || res.data.list&&res.data.list.length <= 0) {
          this.allLoaded = true
        }
        this.$refs.loadMoreBox.$refs.loadmore.onBottomLoaded()
      })
    },
    /**
     * 确认变价
     */
    _updatePrice() {
      let params = {
        group_id: this.id,
        price: this.input
      }
      updatePrice(params).then(res=>{
        this.$toast('变价成功')
        this.page=1
        this.isShowModel = false
        this.initData()
      }).catch(err=>{
         this.$toast(err.response.data.message)
      })
    },

    /**
     * 确认集采
     */
    _activityBuy() {
      let params = {
        group_id: this.id,
        num: this.input
      }
      activityBuy(params).then(res=>{
        this.$toast('集采成功')
        this.page=1
        this.isShowModel = false
        this.initData()
      }).catch(err=>{
       this.$toast(err.response.data.message)
      })
    },
    /**
     * 确认采集或者确认变价按钮
     */
    confirmPrice() {
      if(!this.input) {
        this.$toast('请输入价格')
        return false
      }
      if(isNaN(this.input)) {
        this.$toast('请输入正确的数字')
        return false
      }
      this.type==1&&this._updatePrice()
      this.type==2&&this._activityBuy()
    },

    /**
     * 清空搜索框
     */
    clearText() {
      this.searchValue = ''
    }
  },
  components: {
    SearchBar,
    collectParity,
    changModel,
    bg,
    timeOut,
    loadMore,
    EmptyList
  }

}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  .header {
    height: .88rem;
    display: flex;
    background: #0090ff;
    align-items: center;
  }
  .margin {
    color: #E6A23C;
    font-size: .24rem;
    padding: .2rem 0;
  }
}
</style>
<style scoped>
/deep/ .input-wrap input {
background-color: #33A6FF!important;
color: #fff!important;
}
/deep/ input::-webkit-input-placeholder {
color: #fff!important;
}
/deep/ .c-search-bar,.input-wrap {
  background-color:#33A6FF!important;
}
/deep/ .input-wrap {
  background-color:#33A6FF!important;
}
</style>