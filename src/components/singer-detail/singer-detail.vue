<template>
    <transition name="slide">
        <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
    import { getSingerDetail } from 'api/singer'
    import {createSong, Song, processSongsUrl} from 'common/js/song'
    import { ERR_OK } from 'api/config'
    import { mapGetters } from 'vuex'
    import MusicList from 'components/music-list/music-list'

    export default {
        data() {
            return {
                songs: []
            }
        },
        computed: {
            title() {
                return this.singer.name
            },
            bgImage() {
                return this.singer.avatar
            },
            // 获取singer值
            ...mapGetters([   
                'singer'
            ])
        },
        methods: {
            _getDetail() {
                if (!this.singer.id) {
                    this.$router.push({ path: '/singer' })
                    return
                }
                getSingerDetail(this.singer.id).then((res) => {
                    if (res.code === ERR_OK) {
                        processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
                            this.songs = songs
                        })
                    }
                })
            },
            _normalizeSongs(list) {
                let songList = []
                list.forEach(item => {
                    let {musicData} = item
                    songList.push(createSong(musicData))
                })
                return songList
            }
        },
        components: {
            MusicList
        },
        created() {
            this._getDetail()    
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'
    // 全屏渲染样式
    .singer-detail
        position fixed
        top 0
        right 0
        bottom 0
        left 0
        z-index 100
        background: $color-background
    .slide-enter-active, .slide-leave-active
        transition all 0.3s
    .slide-enter, .slide-leave-to
        transform translate3d(100%, 0, 0)
</style>