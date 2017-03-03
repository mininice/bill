import Vue from 'vue'
import { canUseDOM } from 'exenv'
import App from '@apps/tree/index.vue'


if(canUseDOM) {
	new Vue({ el: '#naotu-app', $serveData: window.serveData, render: h => h(App) });
  	
  	$(document).ready(function() {
    	$('#summernote').summernote({
    		height: 400,
    		focus: true,
    		toolbar: [
			    // [groupName, [list of button]]
			    ['style', ['bold', 'italic', 'underline', 'clear']],
			    //['font', ['strikethrough', 'superscript', 'subscript']],
			    ['fontsize', ['fontsize']],
			    ['color', ['color']],
			    ['para', ['ul', 'ol', 'paragraph']],
			    ['height', ['height']]
			]
    	});
  	});
}
