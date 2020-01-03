/**
 * 新的滚动和信息接口
 */

import http from './api'


/** 
 * 新的信息列表
*/
export function getNewInformmationList(params) {
    return http.get('/informations/global', {params}).then(res=>{
        return Promise.resolve(res.data)
    }).catch(err=>{
        return Promise.reject(err)
    })
}