import http from './api'
import { Toast } from 'mint-ui'


// 获取购物车数据
export function queryShopCarList(params={}, shopId="") {
    let url = `hippo-shop/shoppingcar`
    // 如果传入了商家的id 则只返回商家的购物车数据，否则返回全部数据
    return http.get(url,{params}).then(res=>{
        if(shopId) {
            let targetArr = {}
            // res.data.data.goodsList.forEach((item, index, targetList)=> {
                let suppliersPrices = res.data.data.suppliersPrices
                res.data.data.goodsList.forEach((item, index, arr)=>{
                    if(item.supplier_id==shopId) {
                        targetArr[item.id] = item
                        // return
                    }
                })
            // })
            return Object.assign(targetArr)
        }
        return res.data
    })
}

// 添加商品至购物车
export　function addShopCar(params) {
    let url = `hippo-shop/shoppingcar`
    return http.post(url, params, { validateStatus: s => s == 200}).catch(err=>{
        // debugger
        let message = err.response.data.message
        Toast(message)
        return err
    })
}

// 批量移除购物车
export function delShopCar(params) {
    let url = `hippo-shop/shoppingcar`
    return http.delete(url, {params:params})
}

// 单个移除购物车
export function onlyDelShopCar(params) {
    let url = `hippo-shop/shoppingcar/decr`
    return http.patch(url, params)
}

// 订单提交
export function confirmOrder(params) {
    let url = `hippo-shop/to-order`
    return http.post(url, params)
}