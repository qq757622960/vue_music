<template>
    <div class="rank">
        <span @click="toggle">{{ title }}</span>
    </div>
</template>


<script type="text/ecmascript-6">
    // 列表播放
    // 循环播放
    // 列表播放

    export default {
        data() {
            return {
                mode: 1
            }
        },
        computed: {
            title() {
                if (this.mode === this.playList.A) {
                    return '列表播放'
                } else {
                    if (this.mode === this.playList.B) {
                        return '循环播放'
                    } else {
                        return '随机播放'
                    }
                }
            }
        },
        methods: {
            toggle() {
                this.mode = (this.mode + 1) % 3
            }
        },
        created() {
            this.playList = {
                A: 1,
                B: 2,
                C: 3
            }
        }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    
</style>
