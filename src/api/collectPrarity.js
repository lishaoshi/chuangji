/**
 * 集采活动相关接口
 */
import http from "./api";

/** 
 * 获取集采比价列表
*/
export function getActivityList(params) {
    let url = `groupbuying/activity-list`
    return http.get(url, {params}).then(res=>{
        return res.data
    })
}

/**
 * 修改价格   变价按钮
 */
export function updatePrice(params) {
    let url = `groupbuying/price`
    return http.post(url, params).then(res=>{
        return Promise.resolve(res.data)
    }).catch(err=>{
        return Promise.reject(err)
    })
}

/**
 * 商业集采，集采数量
 */
export function activityBuy(params) {
    let url = `groupbuying/buying`
    return http.get(url, {params}).then(res=>{
        return Promise.resolve(res.data)
    }).catch(err=>{
        return Promise.reject(err)
    })
}

/**
 * 集采活动了表
 */
export function  getActivityJicaiList(params) {
    let url = `groupbuying/join-group`
    return http.get(url, {params}).then(res=>{
        return res.data
    })
}

/***
 * 集采记录
 */
export function getRecoedActivityList(params) {
    let url = `groupbuying/join/buying-history`
    return http.get(url, {params}).then(res=>{
        return res.data
    })
}

/**
 * 变价历史
 */

 export function getChangePriceList(params) {
    let url = `groupbuying/join/price-history`
    return http.get(url, {params}).then(res=>{
        return res.data
    })
 }