/** 
 * @Author: YISHI 
 * @Date: 2018-12-03 23:15:26 
 * @Desc: 获取 uid 
 */

let _uid = ''

export function getUid() {
    if (_uid) {
        return _uid
    }
    if (!_uid) {
        const t = (new Date).getUTCMilliseconds()
        _uid = '' + Math.round(2147483647 * Math.random()) * t % 1e10
    }
    return _uid
}