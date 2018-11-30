<template>
    <transition name="slide">
        <div class="singer-detail">
            singer-detail
            <button>点击我</button>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import { getSingerDetail } from 'api/singer'
    import {createSong} from 'common/js/song'
    import { ERR_OK } from 'api/config'

    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                song: []
            }
        },
        computed: {
            ...mapGetters(['singer'])
        },
        methods: {
            _getDetails() {
                if (!this.singer.id) {
                    this.$router.push({
                        path: '/singer'
                    })
                    return
                }
                getSingerDetail(this.singer.id).then((res) => {
                    if (res.code === ERR_OK) {
                        this.song = this._normalizeSong(res.data.list)
                        // console.log(this.song)
                    }
                })
            },
            _normalizeSong(list) {
                let songsList = []
                list.forEach((item) => {
                    let {musicData} = item
                    songsList.push(createSong(musicData))
                }) 

                return songsList
            },

        },
        created() {
            this._getDetails()
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'

    .singer-detail
        position fixed
        top 0
        right 0
        bottom 0
        left 0
        z-index 100
        background: $color-background
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>