import http from "./api";

export const businessEntities = (params) => {
    return http.get(`hippo-shop/business/${params.supplier_id}/recommends`,{params}).catch(() => {})
}
export const supplierBusinessEntities = (ids) => {
    const params= {
        ids:ids
    }
    return http.get(`hippo-shop/business/entities`,{params}).catch(() => {})
}

//药品列表
export function servicBusinessGoodList(params){
    return http.get('hippo-shop/business/entity',{params, validateStatus: s => s === 200});
};
