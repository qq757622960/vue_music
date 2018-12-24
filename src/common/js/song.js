/** 
 * @Author: YISHI 
 * @Date: 2018-11-30 18:55:03 
 * @Desc: 歌手类 
 */
import { getSongsUrl } from 'api/song'
import { ERR_OK } from 'api/config'

export class Song {
    constructor({ id, mid, singer, name, album, duration, image, url}) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
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

// ['张三', '李四'] => 张三/李四
function filterSinger(singer) {
    if (!singer.length) {
        return ''
    }
    let ret = []
    singer.forEach((item) => {
        ret.push(item.name)
    })

    return ret.join('/')
}

export function processSongsUrl(songs) {
    return getSongsUrl(songs).then((res) => {
        if (res.code === ERR_OK) {
            let urlMid = res.url_mid
            if (urlMid && urlMid.code === ERR_OK) {
                let midUrlInfo = urlMid.data.midurlinfo
                midUrlInfo.forEach((info, index) => {
                    let song = songs[index]
                    song.url = `http://dl.stream.qqmusic.qq.com/${info.purl}`
                })
            }
        }
        return songs
    })
}