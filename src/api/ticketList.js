import http from './api'


// hippo-shop/wallet/trans
/**
 *
 *集采返利记录
 * @export
 * @param {*} params：年、月、0：收入、1：支出
 * @returns
 */
export function recordAmound(params) {
    let url = `hippo-shop/wallet/trans`
    return http.get(url, params).then(res=>{
        return res.data
    })
}

/**
 *集采返利金额
 *
 * @export
 * @returns
 */
export function rebateFn() {
    let url = `hippo-shop/wallet`
    return http.get(url).then(res=>{
        return res.data
    })
}
/***
 * 合伙收益统计
 */
export function heHuoList() {
    let url = `hippo-shop/wallet/hehuo-details`
    return http.get(url).then(res=>{
        return res.data
    })
}

/***
 * 通道/合伙收益明细
 */
export function incomeTrans(params) {
    let url = `hippo-shop/wallet/income-trans`
    return http.get(url, {params}).then(res=>{
        return res.data
    }).catch(err=>{
        return Promise.reject(err)
    })
}