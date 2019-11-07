/**
 * 票务信息接口
 */
import http from './api'


 /***
  * 保存修改用户发票信息
  */
 export function saveUpdateInvoices(params) {
     let url = `/invoices`
     return http.post(url, params).then(res=>{
         return Promise.resolve(res.data)
     }).catch(err=>{
         return Promise.reject(err)
     })
 }

 /**
  * 获取已保存的发票详情
  */
 export function getInvoices(params) {
     let url = `/invoices`
     return http.get(url, {params}).then(res=>{
        return Promise.resolve(res.data)
    }).catch(err=>{
        return Promise.reject(err)
    })
 }