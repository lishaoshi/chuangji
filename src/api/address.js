import http from './api'


// list
export function getAddressList() {
    return http.get('hippo-shop/addresses', { validateStatus: s => s === 200 })
}

//
export function deleteAddress(id) {
    return http.delete(`hippo-shop/addresses/${id}`, { validateStatus: s => s > 200 })
}

export function updateAddress(id,params) {
    return http.put(`hippo-shop/addresses/${id}`,params, { validateStatus: s => s > 200 })
}

export function getAddress(id) {
    return http.get(`hippo-shop/addresses/${id}`, { validateStatus: s => s === 200 })
}

