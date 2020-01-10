import http from "./api";


//配送商相关商品
export const businessEntities = (params) => {
    return http.get(`hippo-shop/business/${params.supplier_id}/recommends`,{params}).catch(() => {})
}
export const supplierBusinessEntities = (ids) => {
    const params= {
        ids:ids
    }
    return http.get(`hippo-shop/business/entities`,{params}).catch(() => {})
}

//药品列表
export function servicBusinessGoodList(params){
    return http.get('hippo-shop/business/entity',{params, validateStatus: s => s === 200});
};

// 终端商业数据
export function _servicBusinessGoodList(params, id){
    return http.get(`hippo-shop/business/${id}/recommends`,{params, validateStatus: s => s === 200});
};

/**
 *
 *  获取商业详情接口
 * @export id: 商业公司id
 */
export function queryBusinessDetail( id) {
    let url = `hippo-shop/business/${id}/info`
    return http.get(url).then(res=>{
        return res.data
    })
}


/*
    关于快速补货
*/

export function quickreplenish(params, id) {
    let url = `hippo-shop/business/${id}/quickreplenish`
    return http.get(url, {params})
}

/**
 * 成为集采商
 */

 export function _becomeJc() {
     return http.post('/hippo-shop/supplier/collector').then(res=>{
         return Promise.resolve(res.data)
     }).catch(err=>{
         return err.response
     })
 }

 /**
  * 获取推广厂家列表
  */

  export function _getFactoryList(params) {
      return http.get('/hippo-shop/supplier/collector/factory', {params}).then(res=>{
          return res.data
      })
  } 
