
<template>
<div id="mindmap-view">
<div class="img-container"></div>
<pre class="help-doc" v-if="showHelp">
<h3>你可以用它干什么</h3>
1.梳理脑图
2.任务分解和管理
3.存储和分享

<h3>功能介绍</h3>
#.快捷键支持
  1.添加节点
  shift/tab

  2.局部布局
  L

  3.其它的快捷键参考
  http://gojs.net/latest/api/symbols/CommandHandler.html

#.移动节点
拖到对应的目标节点上

#.任务管理
点击checkbox将会开启任务管理模式，这个功能是mindmap的核心功能，推荐试用一下👍

#.界面支持
  1.设置线的大小和颜色
    没有选中节点时，将会设置所有线的颜色
    选中某条线上的任意节点，点击Line Color中选颜色，本条线上的所有父子节点的颜色都将改变

  2.设置字体颜色
    选中某个节点将改变某一个节点上的字体的颜色

  3.支持修改背景颜色

  4.添加旗帜
    支持添加各种大小和不同颜色的旗帜


</pre>


  <div class="config">
    <h4>Mind Map</h4>
    <button class="btn btn-xs btn-success" id="SaveButton" v-on:click="save">Save</button>
    <button class="btn btn-xs" v-on:click="reload">Reload</button>
    <button class="btn btn-xs" v-on:click="layoutAll">Layout</button>
    <div class="tools form-inline">
      <label>Font Size&Color</label> 
      <div class="font-color">
        scale:
        <input v-model="text.scale" v-on:blur="setFontScale(text.scale)" placeholder="scale" size="10"/>
        <div>
        <template v-for="item in color">
          <span v-on:click="setFontColor(item)" :style="{background: item}" :class="{current:(defaultFontColor === item)}"></span>
        </template>
        </div>
      </div>
      <label>Line Color</label>
      <div class="line-color">
        <template v-for="item in color">
          <span v-on:click="setLineColor(item)" :style="{background: item}" :class="{current:(defaultLineColor === item)}"></span>
        </template>
      </div>
      <label>Flag Icon</label>
      <div class="flag">
        size: <input class="size" v-model="flagSize">
        <template v-for="item in color">
          <i class="fa fa-flag" :class="{current: item === defaultFlagColor}" 
          v-on:click="addFlag(item)" style="marginLeft: 4" :style="{color: item}"></i>
        </template>
      </div>
      
      <label>Background</label>
      <div class="background">
        <span v-for="item in backgroundColor" :style="{background: item}" v-on:click="setBackground(item)" :class="[item===defaultBgColor ? 'current' : '']"></span>
      </div>
    </div>
  </div>
  <div class="diagram">
    <div id="myDiagramDiv" :style="{background: defaultBgColor}"></div>
  </div>
  <div class="top-config">
      WordSpead:
      <input placeholder="wordLineSpead" v-on:blur="refreshDiagram" v-model="wordLineSpead"/>
      LineWeigth:
      <input placeholder="lineWeight" v-on:blur="refreshDiagram" v-model="lineWeight" />

    <span class="hasCheckbox">
      <span>
          CheckBox: <input type="checkbox" v-model="hasCheckbox.visible"/>
          <span v-show="hasCheckbox.visible">
            <!-- <input v-model="hasCheckbox.size" placeholder="size" />
            <input v-model="hasCheckbox.strokeWidth"  placeholder="width" />
            <input v-model="hasCheckbox.checkedColor" style="width: 50px" placeholder="checkedColor" />
            <input v-model="hasCheckbox.defaultColor" style="width: 50px" placeholder="defaultColor" /> -->
          </span>
      </span>
    </span>
    <span class="help">
      <button v-on:click="help(showHelp)" class="btn-xs">帮助文档</button> 
      <button v-on:click="exportImage(exportImageDesc)" class="btn-xs">{{exportImageDesc}}</button> 

    </span>
  </div>
</div>
</template>


<script>
import MindMap from "@assets/mindmap/index.js";

var model = { "class": "go.TreeModel",
  "nodeDataArray": [ 
{"key":0, "text":"Mind Map", "loc":"88 3"},
{"key":1, "parent":0, "text":"我的门的\nksdjf卡拉斯京地方\n more time", "checked":true, "brush":"skyblue", "dir":"left", "flag":{"size":10, "color":"red"}, "loc":"68 -55.5", "fontColor":"orange"},
{"key":11, "parent":1, "text":"Wake up early", "brush":"skyblue", "dir":"left", "loc":"-95.314453125 -83.5"},
{"key":12, "parent":1, "text":"Delegate", "brush":"skyblue", "dir":"left", "loc":"-95.314453125 -55.5"},
{"key":13, "parent":1, "text":"Simplify", "brush":"skyblue", "dir":"left", "loc":"-95.314453125 -27.5"},
{"key":2, "parent":0, "text":"More effective use", "brush":"darkseagreen", "dir":"left", "loc":"68 14.5", "flag":{"size":10, "color":"red"}, "fontColor":"orange"},
{"key":21, "parent":2, "text":"Planning", "brush":"darkseagreen", "dir":"left", "loc":"-97 0.5"},
{"key":211, "parent":21, "text":"Priorities", "brush":"darkseagreen", "dir":"left", "loc":"-192.59716796875 -13.5"},
{"key":212, "parent":21, "text":"Ways to focus", "brush":"darkseagreen", "dir":"left", "loc":"-192.59716796875 14.5"},
{"key":22, "parent":2, "text":"Goals", "brush":"darkseagreen", "dir":"left", "loc":"-97 28.5"},
{"key":3, "parent":0, "text":"Time wasting", "brush":"palevioletred", "dir":"right", "loc":"190.078125 14.5"},
{"key":31, "parent":3, "text":"Too many meetings", "brush":"palevioletred", "dir":"right", "loc":"311.18017578125 -20.5"},
{"key":32, "parent":3, "text":"Too much time spent on details", "brush":"palevioletred", "dir":"right", "loc":"311.18017578125 21.5"},
{"key":33, "parent":3, "text":"Message fatigue", "brush":"palevioletred", "dir":"right", "loc":"311.18017578125 49.5"},
{"key":331, "parent":31, "text":"Check messages less", "brush":"palevioletred", "dir":"right", "loc":"468.90185546875 -34.5"},
{"key":332, "parent":31, "text":"Message filters", "brush":"palevioletred", "dir":"right", "loc":"468.90185546875 -6.5"},
{"key":4, "parent":0, "text":"Key issues", "brush":"coral", "dir":"left", "loc":"73 155", "flag":{"size":10, "color":"red"}, "fontColor":"orange"},
{"key":41, "parent":4, "text":"Methods", "brush":"coral", "dir":"left", "loc":"-45.86083984375003 127.00000000000003"},
{"key":42, "parent":4, "text":"Deadlines", "brush":"coral", "dir":"left", "loc":"-45.86083984375 155"},
{"key":43, "parent":4, "text":"Checkpoints", "brush":"coral", "dir":"left", "loc":"-45.86083984375003 182.99999999999997"},
{"text":"New Comment", "brush":"darkseagreen", "parent":2, "category":"Comment", "key":-21,  "loc":"100 200"}
 ]};





export default {
  name: 'app',
  data () {
    return {
      color: ['#fff', 'red', 'blue', 'gray', 'orange', 'green', 'yellow', 'black'],
      backgroundColor: ['#fff', '#ddd', '#735937'],
      defaultBgColor: '#fff',
      defaultFontColor: 'black',
      defaultLineColor: 'orange',
      defaultFlagColor: 'red',
      flagSize: 10,
      hasCheckbox: {
        size: 14,
        strokeWidth: 1,
        checkedColor: 'orange',
        defaultColor: '#ddd',
        visible: false
      },
      showHelp: false,
      id: "myDiagramDiv",
      text: {
        scale: 1
      },
      lineWeight: 2,
      wordLineSpead: 8,
      exportImageDesc: "导出图片"
    };
  },
  mounted() {
    this.diagram = MindMap(this.$data, model);
    $('.mindmap-view').css('height', $(window).height());
    $('.mindmap-view').css('width', $(window).width());
    $('#myDiagramDiv').css('height', $(window).height() - 50);
    var canvas = null;
    while(!canvas) {
      canvas = $('canvas');
      canvas.height(20000);
    }
  },
  watch: {
    "hasCheckbox.visible": function(visible) {
      this.diagram.actions.addCheckbox(visible);
    }
  },
  methods: {
    addFlag: function(color) {
      var size = parseInt(this.flagSize);
      this.diagram.actions.changeSelectionsProperty('flag', {size: size, color: color});
    },
    refreshDiagram: function() {
      this.$data.lineWeight = parseInt(this.lineWeight);
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
    setFontScale: function(scale) {
      this.diagram.actions.changeSelectionsProperty('scale', scale);
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

    },
    reload: function() {
      var data = JSON.parse(this.diagram.modelStr);
      this.diagram.actions.reload(data);
    },
    layoutAll: function() {
      this.diagram.actions.layoutAll();
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
    },
    help: function(showHelp) {
     
      this.showHelp = !this.showHelp;
    }
  }
}
</script>

<style>
  @import '../../assets/mindmap/custom.css';
</style>