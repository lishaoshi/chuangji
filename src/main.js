import Vue from 'vue';

//import VueEcho from "vue-echo";
import './util/rem'; //rem
import imgCropper from '@/plugins/imgCropper'
import lstore from "@/plugins/lstore/index";
//import VueEcho from "@/plugins/echo" //删除的，提交时要修复

//import flexible from "@/plugins/lstore/flexible";
import App from './app';
import Ajax from "./api/api.js";
import mixin from "./mixin.js";
import Mint from 'mint-ui';    //移动端UI
import * as filters from "./filters.js";
import components from "./components.js";
import bus from './bus';

import './icons/iconfont.js' // from http://www.iconfont.cn h5 仓库
import 'mint-ui/lib/style.css'

import '@/plugins/animate.css'
import store from "./stores/";
import router from "./routers/";

import "./style/index.scss";
import Message from "./plugins/message";
import {socketUrl} from "./api";
import moment from 'moment'
Vue.prototype.$moment = moment;//赋值使用

moment.locale('zh-cn');//需要汉化

import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
//删除的要修复
/*Vue.use(VueEcho,{
    broadcaster:'socket.io',
    host:'http://www.clxsd.cn'+':6001',
    auth:{
        headers:{
            'authorization':'Bearer' + store.getters.token
        }
    }
})
*/
Vue.use(Mint);
Vue.mixin(mixin);


Vue.config.productionTip = false



components.forEach(component => {
    Vue.component(component.name, component);
});

Vue.prototype.$http = Ajax;
Vue.prototype.$Message = Message;
Vue.prototype.$bus = bus;

Vue.use(lstore);
Vue.use(imgCropper)
//Vue.use(flexible);
for (const k in filters) {
    Vue.filter(k, filters[k]);
}
if(!window.initUrl){
    window.initUrl = window.location.href.replace(/(\/$)/, "");
}


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');