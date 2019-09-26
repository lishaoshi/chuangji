import plueMessageBundle from "plus-message-bundle";

/**
 * 消息解析器，获取顶部消息.
 *
 * @param message
 * @param defaultMessage
 * @returns {*}
 */
export function plusMessageAnalyze(message, defaultMessage) {
    return plueMessageBundle(message, defaultMessage).getMessage()
}

/**
 * 格式化时间
 *
 *
 * @param date
 * @param fmt
 * @returns {string}
 */
export function formatDate(date, fmt = "yyyy/MM/dd hh:mm") {
    date = new Date(date);
    const o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    for (const k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return fmt;
}

/**
 * 时间转提示
 * 用于显示在我的动态时间轴
 * @param  {String} str
 * @return {String}
 */
export const time2txt = str => {
    if (!str) return "";
    if (typeof str === "string") str = str.replace(/-/g, "/"); // 兼容 IOS 保证传入数据格式 YYYY/MM/dd HH:mm:ss
    let date = new Date(str);

    // 时间差 = 当前时间 - date (单位: 毫秒)
    let time = new Date() - date;

    if (time < 0) {
        return "";
    } else if (time / 3600000 < 24) {
        return "今天";
    } else {
        const M = (date.getMonth() + 1 + "").padStart(2, "0");
        const D = (date.getDate() + "").padStart(2, "0");
        return M + "月" + D;
    }
}

export const timeOffset = new Date().getTimezoneOffset() * 60 * 1000

/**
 * 格式化数字
 */
export const formatNum = (a = 0) => {
    return (
        a > 0 &&
        (a > 99999999 && (a = Math.floor(a / 1e8) + "亿"),
        a > 9999 &&
        (a =
            a > 99999999
                ? Math.floor(a / 1e8) + "亿"
                : Math.floor(a / 1e4) + "万")),
            a
    );
};

export function plusMessageFirst(message, defaultMessage) {
    return plueMessageBundle(message, defaultMessage).getMessage();
}


export const display_price = (value,fix=2) => {
    return (new Number(value)).toFixed(fix)
};

export const filter_mobile = (value) =>{
    return value.replace( /^(\d{3})\d{4}(\d{4})$/,"$1****$2")
};

export const filter_idcard = (value) => {
    return value.replace( /^(\d{6})\d{8}(\w{4})$/,"$1********$2")
};

export const filter_city_name = value => {
    return value.slice(0, value.length - 1);
};


export const display_avatar = value => {
    if (typeof value === 'string' && value.match(/^https?:/)) {
        return value
    }
    if (typeof value !== 'string') return value.url || null
};


export const filter_city_last = value => {
    return value.slice(value.length -1,value.length);
};
