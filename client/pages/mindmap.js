import Vue from 'vue'
import { canUseDOM } from 'exenv'


if(canUseDOM) {
	var App = require('@apps/mindmap/index.vue');
	new Vue({ el: '#app', $serveData: window.serveData, render: h => h(App) });
}
