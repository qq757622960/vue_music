<template>
    <div class="singer">
        <list-view :data="singers" @select="selectSinger"></list-view>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import {getSingerList} from 'api/singer'
    import {ERR_OK} from 'api/config'
    import Singer from 'common/js/Singer'
    import ListView from 'base/listview/listview'

    import {mapMutations} from 'vuex'

    const HOT_NAME = '热门'
    const HOT_SINGER_LEN = 10

    export default {
        data() {
            return {
                singers: []
            }
        },
        created() {
            this._getSingerList()
        },
        components: {
            ListView,
            Scroll
        },
        methods: {
            selectSinger(singer) {
                this.$router.push({
                    path: `/singer/${singer.id}`
                })
                this.setSinger(singer)
            },
            _getSingerList() {
                getSingerList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.singers = this._normalizeSingers(res.data.list)
                    }
                })
            },
            _normalizeSingers(list) {
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                }

                list.forEach((item, index) => {
                    if (index < HOT_SINGER_LEN) {
                        map.hot.items.push(new Singer({
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name
                        }))
                    }
                    const key = item.Findex
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }))
                });
                
                let hot = []
                let ret = []

                for (let key in map) {
                    let item = map[key]
                    if (item.title.match(/[A-Za-z]/)) {
                        ret.push(item)
                    } else if (item.title == HOT_NAME) {
                        hot.push(item)
                    }
                }
                ret.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                
                return hot.concat(ret)
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>