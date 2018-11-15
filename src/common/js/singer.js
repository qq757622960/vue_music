/** 
 * @Author: YISHI 
 * @Date: 2018-11-15 16:38:55 
 * @Desc: Singer 
 */

export default class Singer {
    constructor({ id, name }) {
        this.id = id
        this.name = name
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
    }
}