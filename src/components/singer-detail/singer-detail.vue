<template>
    <transition name="slide">
        <div class="singer-detail">
            singer-detail
            <button>点击我</button>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters(['singer'])
        },
        methods: {},
        created() {
            console.log(this.singer)
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