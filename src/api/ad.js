import http from "./api";

export const adList = (options) => {
    let params= options

    return http.get(`/advertisingspace/advs`,{params}).catch(() => {})
}
export function infoList (params) {
    return http.get(`/informations`,{params}).catch(() => {})
}
