import Vue from 'vue'
import VueRouter from 'vue-router'
import { canUseDOM } from 'exenv'
import routes from '@apps/bill/route'
import App from '@apps/bill/index.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes,
});


if (canUseDOM) {
	const VueResource = require('vue-resource');
	Vue.use(VueResource);
  	
  new Vue({ el: '#app', router, $serveData: window.serveData, render: h => h(App) });
  	
}


export default context => {
  	// context.data (服务端传递的数据)
  	router.push(context.url);
  	return new Vue({ el: '#app', $serveData: context.serveData, router, render: h => h(App) })
}


