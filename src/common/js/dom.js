/** 
 * @Author: YISHI 
 * @Date: 2018-11-11 21:18:22 
 * @Desc: 通用 DOM 操作 
 */

export function hasClass(el, className) {
    return el.classList.contains(className)
}

export function addClass(el, className) {
    el.classList.add(className)
}