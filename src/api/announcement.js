import http from './api'


/**
 *获取公告详情
 *
 * @export
 * @param {*} params
 * @param {*} infoId
 * @returns
 */
export function queryAnnouncementDetail(params, infoId) {
    let url = `informations/${infoId}`
    return http.get(url).then(res=>{
        return res.data
    })
}

/**
 *获取banner详情
 *
 * @export
 * @param {*} params
 * @param {*} infoId
 * @returns
 */
export function getBannerDetail(params, infoId) {
    let url = `advertisingspace/show/${infoId}`
    return http.get(url).then(res=>{
        return res.data
    })
}