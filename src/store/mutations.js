import * as types from './mutation-types'

const mutations = {
    // SET_SINGER() {}
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    }
}

export default mutations