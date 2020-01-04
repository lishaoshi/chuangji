import http from "./api";

/**
 * 获取工厂定制列表
 */
export function getFactoryCustomizeList(params) {
    return http.get("/hippo-shop/factory/customize", {params}).then(res=>{
        return res.data
    })
}

/** 
 * 购买定制生产
*/
export function buyCustomize(params, id) {
    return http.post(`/hippo-shop/factory/customize/${id}`, params).then(res=>{
        return res.data
    })
}

/**
 * 获取最新的定制数量
 */
export function getNewCustomizeNum(id) {
    return http.get(`/hippo-shop/factory/customize/${id}/my-num`).then(res=>{
        return res.data
    })
}

/**
 * 查看参与的定制列表
 * 
 */
export function getMyCustomList(params) {
    return http.get(`/hippo-shop/factory/customize/joined`, {params}).then(res=>{
        return res.data
    })
}