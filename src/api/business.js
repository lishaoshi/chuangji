import http from "./api";

export const businessEntities = (supplierId,isRecom) => {
    const params= {
        supplierId:supplierId,
        is_recom: isRecom? 1:0
    }


    return http.get(`hippo-shop/business/entities`,{params}).catch(() => {})
}
export const supplierBusinessEntities = (ids) => {
    const params= {
        ids:ids
    }
    return http.get(`hippo-shop/business/entities`,{params}).catch(() => {})
}