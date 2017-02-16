import Vue from 'vue'
import VueRouter from 'vue-router'
import { canUseDOM } from 'exenv'
import routes from '@apps/route'
import App from '@apps/index.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes,
});


if (canUseDOM) {
	const VueResource = require('vue-resource');
	Vue.use(VueResource);

  	Vue.use(() => {
      Object.defineProperty(Vue.prototype, '$serveData', {
        get() {
          return window.serveData
        }
      });
    });
  	new Vue({ el: '#app', router, render: h => h(App) });
  	
}


export default context => {
  	// context.data (服务端传递的数据)
  	router.push(context.url);

	Vue.use(() => {
      	Object.defineProperty(Vue.prototype, '$serveData', {
        	get() {
          		return context.serveData
        	}
      	});
    });
  	return new Vue({ el: '#app', router, render: h => h(App) })
}


