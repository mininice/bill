import Vue from 'vue'
import { canUseDOM } from 'exenv'


if(canUseDOM) {
	var App = require('@apps/mindmap/help.vue');
	new Vue({ el: '#app', $serveData: window.serveData, render: h => h(App) });
}
