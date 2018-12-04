/** 
 * @Author: YISHI 
 * @Date: 2018-11-30 18:55:03 
 * @Desc: 歌手类 
 */
import { getLyric, getVKey, getSongsUrl } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'

export default class Song {

    constructor({ id, mid, singer, name, album, duration, image, url}) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.filename = `C400${this.mid}.m4a`
        this.url = url
    }

    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }

        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                if (res.retcode === ERR_OK) {
                    this.lyric = Base64.decode(res.lyric)
                    resolve(this.lyric)
                } else {
                    reject('no lyric')
                }
            })
        })
    }
}

export function createSong(musicData) {

    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: musicData.url
    })

}

export function isValidMusic(musicData) {
    return musicData.songid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
}

function filterSinger(singer) {

    let ret = []

    if (!singer.length) {
        return ''
    }

    singer.forEach((item) => {
        ret.push(item.name)
    })

    return ret.join('/')
    
}

export function processSongsUrl(songs) {
    if (!songs.length) {
        return Promise.resolve(songs)
    }
    return getSongsUrl(songs).then((res) => {
        if (res.code === ERR_OK) {
            let midUrlInfo = res.url_mid.data.midurlinfo
            midUrlInfo.forEach((info, index) => {
                let song = songs[index]
                song.url = `http://dl.stream.qqmusic.qq.com/${info.purl}`
            })
        }
        return songs
    })
}