import originJsonp from 'jsonp'

export default function jsonp(url, data, options) {
    url += ((url+'').indexOf('?') < 0 ? '?' : '&') + param(data)
    return new Promise(function(resolve, reject) {
        originJsonp(url, options, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

function param(data) {
    let url = ''
    for (let k in data) {
        let val = k !== undefined ? data[k] : ''
        url += `&${k}=${encodeURIComponent(val)}`
    }
    return url ? url.substring(1) : ''
}