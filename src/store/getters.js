/** 
 * @Author: YISHI 
 * @Date: 2018-12-22 15:29:42 
 * @Desc: 取值 
 */

export const singer = function(state) {
    return state.singer
}

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
    return state.playlist[state.currentIndex] || {}
}

// export const singer = (state) => { return state.singer }