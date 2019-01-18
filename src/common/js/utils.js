/** 
 * @Author: YISHI 
 * @Date: 2018-12-04 21:26:01 
 * @Desc: 工具类 
 */

// 获取随机数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 洗牌
export function shuffle(arr) {
    let _arr = arr.slice()
    for (let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}

/**
 * 在不改变 receiver 对象的原型链的前提下, 把 supplier 的属性值赋值给 receiver
 * @param {Object} receiver 接收者
 * @param {Object} supplier 提供者
 */
export function mixin(receiver, supplier) {
    for (const key in supplier) {
        if (supplier.hasOwnProperty(key)) {
            const value = supplier[key]
            receiver[key] = value
        }
    }
    return receiver
}