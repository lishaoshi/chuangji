import http from './api'

export function queryAnnouncementDetail(params, infoId) {
    let url = `informations/${infoId}`
    return http.get(url).then(res=>{
        return res.data
    })
}