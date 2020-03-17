import http from './api'

/*厂家收藏*/
// 关注列表
export const getFactoryGooodsList = (params) => {
    return http.get('/promotemonday/list',{params}).catch(() => resArray)
}