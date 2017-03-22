
<template>

<div id="mindmap-view">
  <MsgTip :msg="msg"></MsgTip>
  <div class="img-container"></div>
 
  <div class="diagram">
    <div class="diagram-header">
      <div class="diagram-title">
        <Favorite :uuid="serveData.uuid" :favorite="favorite"></Favorite>
        <Name :text="true" :name="serveData.name" :uuid="serveData.uuid"></Name>
      </div>
      <div class="diagram-operator">
        <a class="label" href="http://wiki.sankuai.com/pages/viewpage.action?pageId=808969415" target="_blank">帮助文档</a> 
        <a class="label label-primary" v-on:click="checkboxVisible">切换任务模式</a>
        <a class="label label-primary" v-on:click="exportImage(exportImageDesc)">{{exportImageDesc}}</a> 
        <a class="label label-success" v-on:click="copy">复制</a>
        <a class="label label-success" v-on:click="release">发布</a>
        <a class="label label-success" :class="{hidden: (serveData.owner !== user)}" v-on:click="save" >保存</a>
      </div>
    </div>
  </div>

  
  <div class="tools form-inline">
    <ColorPicker fontDesc="A" v-model="fontColor" v-on:change="setFontColor"></ColorPicker>
    <ColorPicker fontDesc="Line" v-model="lineColor" v-on:change="setLineColor"></ColorPicker>
    <ColorPicker v-model="bgColor" fontDesc="BG" v-on:change="setBackground"></ColorPicker>
    
    <select class="line-weight" v-model="lineWeight.selected" v-on:change="refreshDiagram">
      <option :value="option" v-for="option in lineWeight.option">{{option}}</option>
    </select>

    <span class="flag">
      <template v-for="item in color">
        <i class="fa fa-flag" :class="{current: item === defaultFlagColor}" 
        v-on:click="addFlag(item)" style="marginLeft: 4" :style="{color: item}"></i>
      </template>
    </span>
    
  </div>

  <div id="myDiagramDiv" :style="{background: defaultBgColor}"></div>
</div>
</template>


<script>
import MindMap from "@assets/mindmap";
import DS from '@utils/ds.js'
import MsgTip from '@components/msg.vue'
import Favorite from '@components/favorite.vue'
import Name from '@components/name.vue'
import ColorPicker from '@components/color-picker.vue'
import KeyEvent from '@assets/mindmap/key';
//import ColorPicker from '@mtfe/vue-color-picker/src/plugin/vue-color-picker/colorPicker.vue'




const serveData = window.serveData.data;
let model = {
  "class": "go.TreeModel",
  "nodeDataArray": [ 
    {"key":0, "text":"我的简梳", "loc":"0 0", brush: 'orange'}
  ]
};

if(serveData.content) {
  model = JSON.parse(serveData.content);
}

export default {
  components: {
    MsgTip,
    Favorite,
    Name,
    ColorPicker
  },
  name: 'app',
  data () {
    return {
      
      fontColor: 'black',
      lineColor: 'orange',
      bgColor: '#fff',
      serveData: serveData,
      msg: {msg: ""},
      user: window.serveData.user,
      favorite: window.serveData.favorite,
      color: ['#fff', 'red', 'blue', 'gray', 'orange', 'green', 'yellow', 'black'],
      backgroundColor: ['#fff', '#ddd', '#735937'],
      defaultBgColor: '#fff',
      defaultFlagColor: 'red',
      hasCheckbox: {
        size: 16,
        strokeWidth: 1,
        checkedColor: 'orange',
        defaultColor: '#ddd',
        visible: false
      },
      id: "myDiagramDiv",
      lineWeight: {
        selected: 2,
        option: [1, 2, 3, 4]
      },
      wordLineSpead: 8,
      exportImageDesc: "导出图片"
    };
  },
  mounted() {
    this.diagram = MindMap(this.$data, model);
    $('.mindmap-view').css('height', $(window).height());
    $('.mindmap-view').css('width', $(window).width());
    $('#myDiagramDiv').css('height', $(window).height() - 100);
    var canvas = null;
    while(!canvas) {
      canvas = $('canvas');
      canvas.height(20000);
    }
    KeyEvent(this.diagram);
  },
  watch: {
    "hasCheckbox.visible": function(visible) {
      this.diagram.actions.addCheckbox(visible);
    }
  },
  methods: {
    addFlag: function(color) {
      this.diagram.actions.changeSelectionsProperty('flag', {color: color});
    },
    refreshDiagram: function() {
      this.$data.wordLineSpead = parseInt(this.wordLineSpead);
      this.diagram.actions.refresh();
    },
    setLineColor: function(color) {
      var diagram = this.diagram;
      this.defaultLineColor = color;
      diagram.actions.setConfig('defaultLineColor', color);
      
      if(diagram.selection.size > 1) {
        return '请选择一个节点，该节点上关联的所有父亲和子节点都会变化线条颜色';
      } else if(diagram.selection.size === 0) {
          var root = diagram.findNodeForKey(0);

          root.findTreeParts().each(function(child) {
              child.diagram.model.setDataProperty(child.part.data, 'brush', color);
          }); 
      } else if(diagram.selection.size === 1) {
        var iterator = diagram.selection.iterator;
        while(iterator.next()) {
          var item = iterator.value;
          item.findTreeParts().each(function(child) {
              child.diagram.model.setDataProperty(child.part.data, 'brush', color);
          });
        }
      }
    },
    setFontColor: function(color) {
      this.diagram.actions.setConfig('defaultFontColor', color);
      this.diagram.actions.changeSelectionsProperty('fontColor', color);
    },
    setBackground: function(color) {
      this.defaultBgColor = color;
    },
    save: function() {
      var data = this.diagram.actions.getJSON();
      var img = this.diagram.makeImage({
        type: "image/jpeg",
        size: new go.Size(100, 100),
        background: '#fff'
      });
      var _this = this;
      DS('mindmapAdd', {uuid: serveData.uuid, content: JSON.stringify(data), pic: img.src}).then(function(res){
        _this.msg = {msg: "保存成功"};
      });
    },
    copy: function() {
      DS('mindmapCopy', {uuid: serveData.uuid}).then(function(res) {
        window.location.href = '/mindmap/' + res.uuid;
      });
    },
    release () {
      let _this = this;
      DS('mindmapUpdate', {uuid: serveData.uuid, release: true}).then(function(res) {
        _this.msg = {msg: "发布成功"};
      });
    },
    reload: function() {
      var data = JSON.parse(this.diagram.modelStr);
      this.diagram.actions.reload(data);
    },
    layoutAll: function() {
      this.diagram.actions.layoutAll();
    },
    checkboxVisible () {
      this.hasCheckbox.visible = ! this.hasCheckbox.visible;
    },
    exportImage: function(exportImage) {
      if(exportImage === "导出图片") {
        this.exportImageDesc = "隐藏图片";
        var d = this.diagram.documentBounds;
        var img = this.diagram.makeImage({
          scale: 1,
          type: "image/jpeg",
          background: 'AntiqueWhite',
          //size: new go.Size(d.width,d.height)
        });
        img.className = "images";

        $('.img-container').append(img);
        $('.img-container').show();
      } else {
        this.exportImageDesc = "导出图片";
        $('.img-container img').remove();
        $('.img-container').hide();
      }
    }
  }
}
</script>

<style>
  @import '../../assets/mindmap/custom.css';
</style>