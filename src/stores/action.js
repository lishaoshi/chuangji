import http from "@/api/api";
import * as api from '@/api'
import * as bootApi from "@/api/bootstrappers";
import　* as  userApi from '@/api/user'
import lstore from "@/plugins/lstore/lstore";

export default {
    /**
     * 获取启动信息
     *
     * @param commit
     * @param dispatch
     * @returns {Promise<void>}
     * @constructor
     */
    async BOOTSTRAPPERS({ commit, dispatch }){
        bootApi.getBootstrappers().then(({ data: bootstrappers = {} }) => {
            commit("BOOTSTRAPPERS", bootstrappers);
        });
    },

    /**
     * 获取用户验证信息
     *
     * @param commit
     * @returns {PromiseLike<{data?: *}> | Promise<{data?: *}> | *}
     * @constructor
     */
    FETCH_USER_VERIFY({ commit }) {
        return userApi.getUserVerifyInfo().then(({ data = {} }) => {
            commit("SAVE_USER_VERIFY", data);
            return data;
        });
    },

    // 注销登录
    async SIGN_OUT({ commit }) {
        //
            console.log('helllo')
            // await 
            commit("SIGN_OUT");
    },

    /**
     * 获取用户信息
     *
     * @returns {Promise<userApi.UserObject>}
     */
    async fetchUserInfo({ commit }) {
        console.log('fetchUserInfo');
        const { data } = await userApi.fetchUserInfo();
        console.log('data'+data)
        commit("SAVE_CURRENTUSER", data);
        return data;
    },

    /**
     * 上传文件
     * @param {File} file
     * @returns
     */
    async uploadFile(state, file) {
        const { data } = await api.postFile(file);
        return data.id;
    },

    // 修改用公司资质状态
    UPDATEUSERSTATE({commit, state}, type) {
        if(state.CURRENTUSER.data['certification']['status'] && state.CURRENTUSER.data['certification']['status']!==0) {
            state.CURRENTUSER.data['certification']['status'] = type
        }
    }
}