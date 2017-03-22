
<template>
<div class="mindmap-list">
  <MsgTip :msg="msg"></MsgTip>
 	<div  class="simple-info">
		<input v-model="info.name" v-on:keyup="search" placeholder="输入关键字搜索或名称创建" />
		仅自己可以看: <input type="checkbox" v-model="info.checked"/> 
  		<a class="btn btn-primary" v-on:click="createMindmap">创建简梳</a>
	</div>

  <div class="list-view">
    <div class="list-view-item" v-for="item in list">
        <div>
          <img :src="item.pic"/>
        </div>
        <div style="line-height: 18px">
          <span class="title"><a :href="'/mindmap/' + item.uuid">{{item.name}}</a></span>
          <Favorite :uuid="item.uuid" :favorite="item.favorite"></Favorite>
          <i class="font-gray">{{item.release ? '已发布' : "草稿"}}</i>
          <i class="owner"><span class="fa fa-flag focus"></span>{{item.owner}}</i>
        </div>
    </div>
  </div>
</div>

</template>


<script>
import DS from '@utils/ds.js'
import MsgTip from '@components/msg.vue'
import Favorite from '@components/favorite.vue'

const serveData = window.serveData;

export default {
  components: {
    MsgTip,
    Favorite
  },
  name: 'app',
  data () {
  	return {
  		info: {
  			name: "",
  			checked: false
  		},
      user: serveData.user,
      list: serveData.data,
      msg: {msg: ""},
  	}
  },
  methods: {
  	createMindmap () {
      var vue = this;
      DS('mindmapAdd', {name: this.info.name, share: this.info.checked}).then(function(res) {
        if(res.data) {
          res.msg = "操作成功";
          window.location.href = "/list/my";
        }
        vue.msg = {msg: res.msg};
      });
  	},
    search () {
      let _this = this;
      setTimeout(function() {
        DS('mindmapSearch', {name: _this.info.name, type: serveData.type}).then(function(res) {
          if(res.status) {
            _this.list = res.data;
          }
        });
      }, 2000);
     
    }
  }
 
}
</script>

<style>
  @import '../assets/mindmap/sys.css';
</style>