
import api from "./api";
import store from "@/stores";
import $Message from "@/plugins/message-box";
import lstore from "@/plugins/lstore/lstore";
import {Toast} from "mint-ui"

/**
 * 用户登录
 *
 * @param payload
 * @returns {PromiseLike<T | boolean> | Promise<T | boolean> | *}
 */
export function signinByAccount(payload){
    return api.post("/auth/login",payload, { validateStatus: s => s == 200}).then((res) =>{
        if(res.data.code==400) {
            Toast(res.data.message)
        } else {
            lstore.setData("H5_ACCESS_TOKEN", `Bearer ${res.data.access_token}`)
        }
        return res.data
        
        // return data
        // debugger
        // switch (status){
        //     case 422:
        //         $Message.error(message);
        //         return false;
        //     case 200:
                
        //         // store.dispatch("fetchUserInfo");
        //         return true;
            
        // }
    }).catch(() => {
        // debugger
    })
    // return new Promise((resolve, reject)=>{
    //     api.post("/auth/login",payload, { validateStatus: s => s > 0}).then(res =>{
    //         switch (res.status){
    //             case 422:
    //                 $Message.error(res.data.message);
    //                 reject(res.data)
    //             case 200:
    //                 lstore.setData("H5_ACCESS_TOKEN", `Bearer ${access_token}`)
    //                 // store.dispatch("fetchUserInfo");
    //                 resolve(res.data)
    //         }
    //     }).catch(() => false)
    // })
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