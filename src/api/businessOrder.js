/**
 * New node file
 */
import http from './api'

/* 商业采购端订单 */
//订单列表
export const getBusinessOrderList = (params) => {
    return http.get('hippo-shop/business/orders',{params, validateStatus: s => s === 200});
};
//删除订单
export function deleteBusinessOrder(id) {
    return http.delete(`hippo-shop/business/orders/${id}`, { validateStatus: s => s > 200 })
}
//确认收货
export function sureBusinessOrder(id) {
     return http.post(`hippo-shop/business/confirm-receipt/${id}`, { validateStatus: s => s > 200 })
}

/* 商业服务端订单 */
export const serviceBusinessOrderList = (params) =>{
    return http.get('hippo-shop/business/service-orders',{params, validateStatus: s => s === 200});
};
//拒绝订单
export function serviceBusinessRefuseOrder(id) {
    return http.patch(`hippo-shop/business/orders/${id}/refuse`, { validateStatus: s => s > 200 })
}
//确认发货
export function sureSendBusinessOrder(id) {
    return http.patch(`hippo-shop/business/orders/${id}/confirmDelivery`, { validateStatus: s => s > 200 })
}
//提取订单
export function sureDrawBusinessOrder(id) {
    return http.patch(`hippo-shop/business/orders/${id}/extract`, { validateStatus: s => s > 200 })
}

