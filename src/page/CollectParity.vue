<template>
  <div class="container">
      <div class="header">
        <!-- <SearchBar ref="searchBox" :searchFn="searchFn" :lianSho='lianSho' v-model="searchValue" @keyup="keyup" @clearText="clearText"></SearchBar> -->
         <SearchBar ref="searchBox" v-model="searchValue"></SearchBar>
      </div>
       <collect-parity @changePrice="changePrice"/>
      
      <template v-if="isShowModel">
        <chang-model :isShowModel.sync="isShowModel">
          <div class="input">
            <input type="text" :placeholder="placeholder">
          </div>
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
export default {
  data() {
    return {
      searchValue: '',
      isShowModel: false,
      placeholder: ''
    }
  },
  methods: {
    changePrice(val) {
      this.isShowModel = true
      this.placeholder = val
    } 
  },
  components: {
    SearchBar,
    collectParity,
    changModel,
    bg
  }

}
</script>

<style lang="scss" scoped>
.container {
  .header {
    height: .88rem;
    display: flex;
    background: #0090ff;
    align-items: center;
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