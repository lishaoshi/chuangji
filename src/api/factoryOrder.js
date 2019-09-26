/**
 * New node file
 */
import http from './api'

/* 工业采购端订单  */
//订单列表
export const getFactoryOrderList = (params) => {
    return http.get('hippo-shop/factory/orders',{params,validateStatus: s => s === 200});
}
//删除订单
export function deleteFactoryOrder(id) {
    return http.delete(`hippo-shop/factory/orders/${id}`, { validateStatus: s => s > 200 })
}
//确认收货
export function sureFactoryOrder(id) {
     return http.post(`hippo-shop/factory/orders/confirm-receipt/${id}`, { validateStatus: s => s > 200 })
};

//工厂服务端订单
export function factoryServiceOrderList(params){
    return http.get('hippo-shop/factory/service-orders',{params,validateStatus: s => s === 200});
};
export function sureFactoryServiceOrder(id) {
    return http.post(`hippo-shop/factory/service-orders/confirm-receipt/${id}`, { validateStatus: s => s > 200 })
};





