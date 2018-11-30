// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueLazyload from 'vue-lazyload'
import store from './store'
import fastclick from 'fastclick'
import router from './router'
import 'common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
	loading: require('common/image/default.png'),
	error: require('common/image/default.png')
})

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
