
import api from "./api";
import store from "@/stores";
import $Message from "@/plugins/message-box";
import lstore from "@/plugins/lstore/lstore";

/**
 * 用户登录
 *
 * @param payload
 * @returns {PromiseLike<T | boolean> | Promise<T | boolean> | *}
 */
export function signinByAccount(payload){
    return api.post("/auth/login",payload, { validateStatus: s => s > 0}).then(({data: { message, access_token },status}) =>{
        switch (status){
            case 422:
                $Message.error(message);
                return false;
            case 200:
                lstore.setData("H5_ACCESS_TOKEN", `Bearer ${access_token}`)
                store.dispatch("fetchUserInfo");
                return true;
        }
    }).catch(() => false)
}

/**
 * 刷新用户信息
 *
 *
 * @returns {*}
 */
export function fetchUserInfo() {
    return api.get('/user',{ validateStatus: s => s === 200 });
}


export function getUserVerifyInfo() {
    return '';
}