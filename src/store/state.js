/** 
 * @Author: YISHI 
 * @Date: 2018-12-22 15:20:57 
 * @Desc: 存储数据(数据仓库) 
 */

import { playMode } from 'common/js/config'

const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1
}

export default state
