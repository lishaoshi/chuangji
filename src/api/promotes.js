/*
*
*推广模块
hippo-shop/wallet/income-details
*/
import http from './api'


// 通道收益
export function _incomeDetails(params) {
    let url = `hippo-shop/wallet/income-details`
    return http.get(url, {params}).then(res=>{
        return res.data
    })
}
