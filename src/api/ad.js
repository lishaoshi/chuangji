import http from "./api";

export const adList = (options) => {
    let params= options

    return http.get(`/advertisingspace/advs`,{params}).catch(() => {})
}
export function infoList (params) {
    return http.get(`/informations`,{params}).catch(() => {})
}

/** 
 * 新的信息列表
*/
export function getNewInformmationList(params) {
    return http.get('/informations/global', {params}).then(res=>{
        return Promise.resolve(res.data)
    }).catch(err=>{
        return Promise.reject(err)
    })
}
