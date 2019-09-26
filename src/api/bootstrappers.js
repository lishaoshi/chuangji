import api from "./api";
import lstore from "@/plugins/lstore";
import location from "@/util/location";

/**
 * 获取当前定位信息
 *
 * @returns {Promise<void>}
 */
export async function getCurrentPosition(){
    let data = await location.getCurrentPosition();
    let { city, province, formatted_address } = data.addressComponent || {};

    return {
        lng: data.position.getLng(),
        lat: data.position.getLat(),
        label: city || province || formatted_address || "定位失败"
    }
}

/**
 * 获取启动信息
 *
 * @returns {*}
 */
export function getBootstrappers() {
    return api.get("/bootstrappers", { validateStatus: s => s === 200 });
}