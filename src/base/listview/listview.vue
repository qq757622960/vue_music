<template>
    <scroll 
        class="listview" 
        ref="scroll"
        :listen-scroll="true"
        :probeType="probeType"
        @scroll="listenScroll">
		<ul class="list-group" ref="listGroup">
			<li v-for="group in data" :key="group.title">
				<h3 class="list-group-title">{{ group.title }}</h3>
				<ul>
					<li 
                        v-for="item in group.items" 
                        :key="item.name" 
                        @click="selectItem(item)"
                        class="list-group-item">
						<img class="avatar" v-lazy="item.avatar" />
						<span class="name">{{ item.name }}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div 
			class="list-shortcut" 
			@touchstart="onShortcutTouchStart"
			@touchmove.stop.prevent="onShortcutTouchMove">
			<ul>
				<li 
					v-for="(item, index) in shortcutList" 
					:key="index" 
					:data-index="index"
                    :class="{current: currentIndex == index}"
					class="item">
					{{ item }}
				</li>
			</ul>
		</div>
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
            <div class="fixed-title">{{fixedTitle}} </div>
        </div>
	</scroll>
</template>

<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
	import {getData} from 'common/js/dom'

	const ANCHOR_HEIGHT = 18
	const TITLE_HEIGHT = 30

    export default {
        data() {
            return {
                scrollY: -1,
                currentIndex: 0,
                diff: -1
            }
        },
        props: {
            data: {
				type: Array,
				default: []
			}
        },
        computed: {
            shortcutList() {
				return this.data.map((item) => {
					return item.title.substr(0, 1)
				})
            },
            fixedTitle() {
                if (this.scrollY > 0) {
                    return ''
                }
                return this.data[this.currentIndex] 
                        ? this.data[this.currentIndex].title 
                        : ''
            }
        },
        methods: {
            onShortcutTouchStart(e) {
				let anchorIndex = getData(e.target, 'index')
				let firstTouch = e.touches[0]
				this.touch.y1 = firstTouch.pageY
                this.touch.anchorIndex = anchorIndex

				this._scrollTo(anchorIndex)
			},
			onShortcutTouchMove(e) {
				let firstTouch = e.touches[0]
				this.touch.y2 = firstTouch.pageY
				let delta = parseInt(this.touch.anchorIndex)
                let anchorIndex = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0 + delta
				
				this._scrollTo(anchorIndex)
            },
            listenScroll(pos) {
                this.scrollY = pos.y
            },
            selectItem(item) {
                this.$emit('select', item)
            },
            _calculateHeight() {
                this.listHeight = []
                let list = this.$refs.listGroup.children
                let height = 0
                this.listHeight.push(height)

                for (let i = 0, len = list.length; i < len; i++) {
                    let item = list[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            },
			_scrollTo(index) {
                if (!index) {
                    return
                }
                if (index < 0) {
                    index = 0
                } else if (index > this.listHeight.length - 2) {
                    index = this.listHeight.length - 2
                }

                this.scrollY = -this.listHeight[index]
				let listGroup = this.$refs.listGroup.children
				this.$refs.scroll.scrollToElement(listGroup[index], 0)
            }
        },
        components: {
			Scroll
        },
        created() {
            this.touch = {}
            this.listHeight = []
            this.probeType = 3
            this.currentIndex = 0
        },
        mounted() {
            // console.log(this.data)
        },
        watch: {
            data() {
                setTimeout(() => {
                    this._calculateHeight()
                }, 20);
            },
            scrollY(newY) {
                if (newY > 0) {
                    this.currentIndex = 0
                    return
                }
                const listHeight = this.listHeight
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i]
                    let height2 = listHeight[i + 1]
                    if (-newY >= height1 && -newY < height2) {
                        this.currentIndex = i
                        this.diff = height2 + newY
                        return
                    }
                }
                this.currentIndex = listHeight.length - 2
            },
            diff(newVal) {
                let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
                if (this.fixedTop === fixedTop) {
                    return
                }
                this.fixedTop = fixedTop
                this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
            }
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'

    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>