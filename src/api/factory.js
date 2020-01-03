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