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
    return http.patch(`hippo-shop/business/orders/${id}/hidden`)
}
//确认收货
export function sureBusinessOrder(id) {
     return http.post(`hippo-shop/business/orders/confirm-receipt/${id}`)
}

// 确认支付
export function orderPay(orderId) {
    return http.patch(`hippo-shop/business/orders/${orderId}/pay`)
}

// 再来一单
export function againOrder(orderId) {
    let url = `hippo-shop/business/orders/${orderId}/again`
    return http.patch(url, { validateStatus: s => s === 200 })
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
    return http.patch(`hippo-shop/business/orders/${id}/extract`, { validateStatus: s => s === 200 })
}

