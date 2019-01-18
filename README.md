# vue_music

> 音乐播放器

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

> 日志
2019.1.4
1. 解决歌曲快速点击播放报错问题
<video @canplay="ready" />

data() {
    return {
        songReady: false
    }
},
methods: {
    ready() {
        this.songReady = true
    },
    next() {
        // 如果没有准备好, 就返回, 不执行下面的操作
        if (!this.songReady) { return; }
        // ...
        this.songReady = false
    }
}

2. 解决快速点击, 当 canready 还没有准备好的时候, 禁用按钮
computed: {
    disableCls: function() {
        return this.songReady ? '' : 'disable'
    }
}

3. getSongsUrl() 接口获取歌曲数据, 有时候特么慢。最后定位到 processSongsUrl() 获取接口数据的时候特别慢。


> 知识点

> 歌手详情页
* 边界处理
* 工厂方法
* 计算背景图的高度

```
// 边界处理一
if (!arr.length) { return ''; }

// 边界处理二
if (!this.singer.id) {
    this.$router.push({ path: '/singer' })
    return
}

// 边界处理三  soing.js => filterSinger
if (!singer.length) {
    return ''
}
```

```
// 工厂方法
function createSong(metaData) {
    return new Song();
}

// 计算背景图的高度
this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
```

> 通用组件问题

```
// 通用组件最好不要直接在页面里面处理事件, 
// 可以派发出去给外面去处理(参考 listview)
// 不要有任何与业务相关的处理

```

> 二级路由(子路由)

```
// 示例: 歌手列表 -> 歌手详情

// 1. 路由配置
{
    {
        // 歌手列表页面
        path: '/singer',
        component: Singer,
        children: [
            {
                // 歌手详情页面
                path: ':id',  // 接收参数
                component: SingerDetail
            }
        ]
    },
}

// 2. 歌手详情
    // 全屏渲染样式
    .singer-detail
        position fixed
        top 0
        right 0
        bottom 0
        left 0
        z-index 100
        background: $color-background

// 3. 歌手列表
<div class="singer">
    <div>其他内容</div>
    // 此处写一个 view 用来承载详情页面
    <router-view></router-view>
</div>

// 4. 歌手列表 -> 歌手详情
this.$router.push({
    path: `/singer/${singer.id}`
})

//5. 过渡需要另外添加
<transition name="slide">
    // 内容...
</transition>

// 样式配置
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
```

> Vuex是什么
```
1. Vuex主要用来解决管理所有组件的数据(状态), 比如用户的登录信息
Vuex 确实会让我们的修改路径变长

1.存储数据->State
2.函数名称->Mutations-types
3.修改数据->Mutations
4.获取数据->getters

5.入口文件->index

6. mutations 
import { mapMutations } from 'vuex'

methods: {
    ...mapMutations({
        'xxx'
    })
}

7. getters
import { mapGetters } from 'vuex'

computed: {
    ...mapGetters([
        'xxx',
        'xxx'
    ])
}


```


> 心得

* 快速切换到另一个项目的方法, 从简单的一个函数开始, 慢慢上手, 不要等待, 后来感觉, 需要把心静下来, 做什么都可以。
* 遇到一个新技术, 一般采用3W方法, 1.此技术是什么->2.它能解决什么问题->3.它怎么用