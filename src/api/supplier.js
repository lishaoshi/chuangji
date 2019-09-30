import { limit } from './index'
import http from './api'


const resArray = { data: [] }

/**
 * 查找附近的供应
 *
 * @param longitude
 * @param latitude
 * @param type
 * @param page
 */
export const findNearBySuppliers = (params) => {
    return http.get('supplier/factories',{params}).catch(() => resArray)
}

/**
 *
 * @param factoryId
 * @param lat
 * @param lng
 * @returns {Promise<T> | *}
 */
export const supplierDetails = (factoryId,lat,lng) => {
    return http.get(`hippo-shop/supplier/factory/${factoryId}`).catch(() => {})
}

/**
 *
 * @param factoryId
 * @returns {Promise<T> | *}
 */
export const supplierEntities = (factoryId) => {
    return http.get(`hippo-shop/supplier/factory/${factoryId}/entities`).catch(() => {})
}

export const supplierFactoryEntities = (ids) => {
    const params= {
        ids:ids
    }
    return http.get(`hippo-shop/supplier/factory/entities`,{params}).catch(() => {})
}
//配送商列表
export function businessList(params){
    return http.get('hippo-shop/business',{params, validateStatus: s => s === 200});
};
//品牌列表
export const supplierBusinessEntities = (supplierId) => {
    return http.get(`hippo-shop/business/${supplierId}/brands`).catch(() => {})
}