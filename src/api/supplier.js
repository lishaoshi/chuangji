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