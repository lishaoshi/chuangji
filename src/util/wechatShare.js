import wx from 'weixin-js-sdk'
import { baseURL } from '@/api'
import Message from '@/plugins/message-box'
import axios from 'axios'

const http = axios.create({ baseURL })

const __JsApiList = [
    'checkJsApi',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
]

export default (url,options) => {
    if(!url) throw new Error('微信分享: 参数URL不能为空')
    http.post('wxconfig',{url})
        .then(({ data: { timestamp, signature, appid, noncestr }}) => {
            const wxconfig = {
                debug: false,
                timestamp,
                signature,
                appId: appid,
                nonceStr: noncestr,
                jsApiList: __JsApiList,
            }
            const shareObj = {
                imgUrl:'',//分享图标
                desc: '创联云工厂', // 分享描述
                title: '创联云工厂', // 分享标题
                type: 'link', // 分享类型  [music, video, link]
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空,
                link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 默认当前路径,

                success:() =>{
                    Message.success('分享成功')
                },

                cancel: () => {
                    Message.info('取消分享')
                }
            }

            options = Object.assign(shareObj,options)
            wx.config(wxconfig)

            wx.ready(() => {
                wx.onMenuShareQQ(options)
                wx.onMenuShareWeibo(options)
                wx.onMenuShareTimeline(options)
                wx.onMenuShareAppMessage(options)
            })

            wx.error(err => {
                // eslint-disable-next-line
                console.warn('微信配置错误: ' + err);
            })
        })
        .catch(err => {
            // eslint-disable-next-line
            console.warn(err.response.data)
        })
}