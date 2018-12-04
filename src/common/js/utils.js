/** 
 * @Author: YISHI 
 * @Date: 2018-12-04 21:26:01 
 * @Desc: 工具类 
 */


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