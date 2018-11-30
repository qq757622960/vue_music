import jsonp from "common/js/jsonp"
import { commonParams, options } from "./config";

export function getSingerList() {
    // https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0needNewCode=0platform=yqq
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })

    return jsonp(url, data, options)
}