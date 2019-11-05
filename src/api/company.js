// 公司信息资质审核结果
// import axios from 'axios'
import http from "./api";

export function queryCompayResults(params) {
    let url = `user/new-certification`
    return new Promise((resolve, reject)=>{
        http.get(url, {params}).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}


/**
 * 获取公司信息信息
 * 
 */
export function queryCompanyDetail(supplierId) {
    let url = `hippo-shop/business/${supplierId}/info`
    return http.get(url, { validateStatus: s => s === 200 }).then(res=>{
        return res.data
    })
}