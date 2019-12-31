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
    return http.patch(`hippo-shop/factory/orders/${id}/hidden`, { validateStatus: s => s > 200 })
}
//确认收货
export function sureFactoryOrder(id) {
     return http.post(`hippo-shop/factory/orders/confirm-receipt/${id}`, { validateStatus: s => s > 200 })
};
// 再来一单
export function againFactoryOrder(orderId) {
    let url = `hippo-shop/factory/orders/${orderId}/again`
    return http.patch(url, { validateStatus: s => s === 200 })
}


//工厂服务端订单
export function factoryServiceOrderList(params){
    return http.get('hippo-shop/factory/service-orders',{params,validateStatus: s => s === 200});
};
export function sureFactoryServiceOrder(id) {
    return http.post(`hippo-shop/factory/service-orders/confirm-receipt/${id}`, { validateStatus: s => s > 200 })
};

//工厂订单详情
export function factoryOrderDetail(orderId) {
    return http.get(`hippo-shop/factory/orders/${orderId}`,{ validateStatus: s => s > 200 }).then(res=>{
        return res.data
    }).catch(err=>{
        return err.response
    })
}





