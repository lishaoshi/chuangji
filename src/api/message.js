import api from './api';
import { limit } from "./index";

//// 获取系统通知
export function getNotifications(offset = 0) {
    return api.get('/user/notifications',{
        params: {
            offset,
            limit
        }
    });
}

//清除未读提示
export function resetUserCount(type = "") {
    api.patch("/user/counts", { type });
}