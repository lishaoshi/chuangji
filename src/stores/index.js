import Vue from "vue";
import Vuex from "vuex";

import lstore from "@/plugins/lstore/";
import { detectOS }　from "@/util/";

import getters from "./getters";
import actions from "./action";
import mutations from "./mutations";
import modules from "./module/";


Vue.use(Vuex);

const state = {
    loginStatus: lstore.hasData("H5_ACCESS_TOKEN"),

    CONFIG: lstore.getData("BOOTSTRAPPERS") || {},

    /* 终端信息 */
    BROWSER: detectOS(),

    /* 当前登录用户信息 */
    CURRENTUSER: lstore.getData("H5_CUR_USER") || {},

    //定位信息
    POSITION: lstore.getData("H5_CURRENT_POSITION") || {},

    // 用户认证信息
    USER_VERIFY: {
        category: {},
        data: {},
        files: [],
    },

    USER_CHOOSED_DATA:{
        selected_role:null,
        selected_save_data:null,
    },


    // 记录role-extension页面的tab选项卡值
    RoleExtension: 1,

    //是否已经申请成为推广人
    is_apply: lstore.getData('is_apply')===undefined?1:lstore.getData('is_apply')

};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {//模块
        ...modules,
    }
});