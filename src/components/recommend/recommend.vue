<template>
    <div class="recommend" ref="recommend">
        <scroll class="recommend-content" ref="scroll" :data="sliderList">
            <div>
                <div class="slider-wrapper" v-if="sliderList.length">
                    <div class="slider-content">
                        <slider>
                            <div v-for="item in sliderList" :key="item.id">
                                <a :href="item.linkUrl">
                                    <img @load="loadImage" :src="item.picUrl" />
                                </a>
                            </div>
                        </slider>
                    </div>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="item in discList" :key="item.dissid" class="item">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.imgurl" />
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getSliderList, getDiscList } from 'api/recommend'
    import { ERR_OK } from 'api/config'
    import Slider from 'base/slider/slider'
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    export default {
        data() {
            return {
                sliderList: [],
                discList: []
            }
        },
        components: {
            Slider,
            Scroll,
            Loading
        },
        created() {
            this.result = 0
            this._getDiscList()        
            this._getSliderList()
        },
        methods: {
            _getSliderList() {
                getSliderList().then((res) => {
                    if (res.code == ERR_OK) {
                        this.sliderList = res.data.slider    
                    }
                })
            },
            _getDiscList() {
                getDiscList().then((res) => {
                    if (res.code == ERR_OK) {
                        this.discList = res.data.list
                    }
                })
            },
            loadImage() {
                // 任何时候给一个对象添加属性
                if (!this.checkLoaded) {
                    this.$refs.scroll.refresh()
                    this.checkLoaded = true    
                }
            }
        },
        destroyed() {}
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
