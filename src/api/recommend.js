import jsonp from "common/js/jsonp"
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend() {
    let data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: '0',
        needNewCode: '1'
    })

    let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    return jsonp(url, data, options)
}

export function getSliderList() {
    const url = '/api/getSliderList'
    
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: '0',
        needNewCode: '1'
    })

    return axios.get(url, {
        params: data,
        transformResponse: [function(res) {
            return JSON.parse(res)
        }]
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function getDiscList() {
    const url = '/api/getDiscList'

    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

 