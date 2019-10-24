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