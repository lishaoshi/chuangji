//新的推广接口


import api from './api';


//获取商业的=对接人数信息
export function getPromerteTotal(params) {
    return api.get('hippo-shop/supplier/collector/area-user', {params}).then(res=>{
        return Promise.resolve(res.data)
    }).catch(err=>{
        Promise.reject(err)
    })
}

//获取推广人/找药人详细
export function getPormerteInfo(params) {
    return api.get('hippo-shop/supplier/collector/area-user/detail', {params}).then(res=>{
        return Promise.resolve(res.data)
    }).catch(err=>{
        Promise.reject(err)
    })
}

//邀请分润
export function getClientDetail(params) {
    return api.get('users/wallet', {params}).then(res=>{
        return Promise.resolve(res.data)
    }).catch(err=>{
        Promise.reject(err)
    })
}