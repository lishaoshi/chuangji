import api from "./api";
import lstore from "@/plugins/lstore/lstore";

/**
 *  api base url
 *
 * @type {string}
 */
/*export const baseURL =
    process.env.NODE_ENV == "production"
        ? `${process.env.VUE_APP_API_HOST}/api/${process.env.VUE_APP_API_VERSION}`
        : "http://www.clxsd.cn/api/v3";*/

// export const baseURL = `${process.env.VUE_APP_API_HOST}/api/${process.env.VUE_APP_API_VERSION}`

//let _baseURL = location.origin.includes('twork')?'http://twork.jicai.api.yaotong111.com':'https://api.clxsd.cn';
//let _baseURL = location.origin.includes('twork') ? 'http://twork.jicai.api.yaotong111.com' : `${process.env.VUE_APP_API_HOST}`;

/*
let _baseURL = location.origin.includes('twork') ?
    'http://twork.jicai.api.yaotong111.com'
    : (location.origin.includes('clxsd') ? 'https://api.clxsd.cn' : `${process.env.VUE_APP_API_HOST}`);
    196.168.2.196
*/
let _baseURL = (location.origin.includes('localhost') || location.origin.includes('dwork') || location.origin.includes('192.168')) ? 'http://dwork.jicai.api.yaotong111.com' : location.origin.includes('twork') ? 'http://twork.jicai.api.yaotong111.com' : 'https://api.clxsd.cn';
// let _baseURL = location.origin.includes('localhost') ? 'http://dwork.jicai.api.yaotong111.com' : location.origin.includes('twork') ? 'http://twork.jicai.api.yaotong111.com' : 'https://api.clxsd.cn  http://dwork.jicai.api.yaotong111.com';

export const baseURL = `${_baseURL}/api/${process.env.VUE_APP_API_VERSION}`;


export const socketUrl =
    process.env.NODE_ENV == "production"
        ? `${process.env.VUE_APP_API_HOST}:6001`
        : "http://192.168.1.133:6001";

/**
 * 统一接口请求数据返回数量限制
 */
export const limit = ~~(lstore.getData("BOOTSTRAPPERS") || {}).limit || 15;


/**
 * 上传文件
 * @export
 * @param {FormData} formData
 * @returns
 */
export function postFile(formData) {
    return api.post("/files", formData, {validateStatus: s => s === 201});
}

