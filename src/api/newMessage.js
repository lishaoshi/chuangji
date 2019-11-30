import api from './api';

/**
 *  消息通知接口
 */


 /**

  * @export  获取消息通知总数
  * @param {*} params  promoter： 推广人、合伙人  entity：买家返利（终端）
  * @returns
  */
 export function getMessageCount(params) {
     return api.get('users/ucenter/message', {params}).then(res=>{
         return Promise.resolve(res.data)
     }).catch(err=>{
         Promise.reject(err)
     })
 }

 export function getMessageList(params) {
     let url = `users/ucenter/message-list`
    return api.get(url, {params}).then(res=>{
        return Promise.resolve(res.data)
    }).catch(err=>{
        Promise.reject(err)
    })
 }