import Vue from 'vue'
import { canUseDOM } from 'exenv'
import App from '@apps/mindmap/index.vue'


if(canUseDOM) {
	new Vue({ el: '#app', $serveData: window.serveData, render: h => h(App) });
}
