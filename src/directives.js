import Vue from 'vue'
/**
 * 自定义全局指令
 */



 /**
  * 元素获取焦点
  */
Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
      // debugger
      // 聚焦元素
      el.focus()
      setTimeout(()=>{
        el.scrollIntoViewIfNeeded(true)
      }, 200)
     
    }
})
