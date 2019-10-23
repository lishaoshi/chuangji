<template>
  <div class="weui-cell weui-cell_input font-size-8" style="background-color: white;" @click="openAreaPopup" >
    <div class="weui-cell__hd">
      <div class="weui-label">选择地区</div>
    </div>
    <div class="weui-cell__bd" >
      <input name="isareastart" class="weui-input color-black" :value='areaValue'  disabled />
    </div>
    <div class="weui-cell__ft weui-cell__ft_in-access"></div>
 
  <mt-popup v-model="areaVisible"  popup-transition="popup-fade" position="bottom"  style="width: 100%;" >
    <mt-picker :slots="areaList" value-Key="name" :show-toolbar="true"  @change="selectArea">
      <Slot>
        <div class="confirmKey flex justify-content-between font-size-9 border-box">
          <div class="color-grey" @click="closePopup">取消</div>
          <div class="color-green" @click="sureArea">确定</div>
        </div>
      </Slot>
    </mt-picker>
    </mt-popup>
</div>
</template>

<script>
export default {
    data() {
        return {
            areaList:[
            {                       //一级   省
                flex: 1,
                values: ["请选择"],
                className: 'slot1',
                textAlign: 'center'
            }, {
                divider: true,
                content: '-',
                className: 'slot1'
            }, {                    //二级   市
                flex: 1,
                values: ["请选择"],
                className: 'slot1',
                textAlign: 'center'
            },{
                divider: true,
                content: '-',
                className: 'slot1'
            },{                     //三级   区
                flex: 1,
                values: ["请选择"],
                className: 'slot1',
                textAlign: 'center'
            }
        }
    },
    beforeMount:function(){
 
},
mounted() {
    let that = this;

}
</script>

<style>

</style>