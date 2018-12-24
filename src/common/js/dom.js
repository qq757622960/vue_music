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

export function getData(el, name, val) {
    return val ? el.dataset[name] = val : el.dataset[name]
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }

    return false
})()

export function prefixStyle(style) {
    if (vendor === false) {
        return false
    }

    if (vendor === 'standard') {
        return style
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}