import Vue from 'vue'
import { canUseDOM } from 'exenv'


if(canUseDOM) {
	
	const VueResource = require('vue-resource');
	Vue.use(VueResource);
	var App = require('@apps/list.vue');
	new Vue({ el: '#app', $serveData: window.serveData, render: h => h(App) });
}
