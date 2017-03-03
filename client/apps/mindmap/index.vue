
<template>
<div id="mindmap-view">
  <div class="config">
    <h4>Mind Map</h4>
    <button class="btn btn-xs btn-success" id="SaveButton" onclick="save()">Save</button>
    <button class="btn btn-xs" onclick="load()">Reload</button>
    <button class="btn btn-xs" onclick="layoutAll()">Layout</button>
    <div class="tools form-inline">
      <label>font size and color</label> 
      <div class="font-color">
        <template v-for="item in color">
          <span v-on:click="setFontColor" :class="{current:(defaultFontColor === item)}"></span>
        </template>
        <input v-model="text.scale"/>
      </div>
      <label>line size and color</label>
      <div class="line-color">
        <template v-for="item in color">
          <span v-on:click="setLineColor" :class="{current:(defaultLineColor === item)}"></span>
        </template>
        <input placeholder="wordLineSpead" v-model="wordLineSpead"/>
        <input placeholder="lineWeight" v-model="lineWeight" />
      </div>
      <label>add flag icon</label>
      <div class="flag">
        <input class="size" placeholder="size" v-model="flagSize">
        <template v-for="item in color">
          <i class="fa fa-flag" :class="{current: item === defaultFlagColor}" 
          v-on:click="addFlag" style="marginLeft: 4" :style="{color: item}"></i>
        </template>
      </div>
      <div class="hasCheckbox">
        <label>checkbox config</label>>
        <div>
            <input v-model="{{hasCheckbox.visible}}" placeholder="visible"/>
            {{#if hasCheckbox.visible}}
            <input v-model="{{hasCheckbox.size}}" placeholder="size" />
            <input v-model="hasCheckbox.strokeWidth" placeholder="strokeWidth" />
            <input v-model="hasCheckbox.checkedColor" placeholder="checkedColor" />
            <input v-model="hasCheckbox.defaultColor" placeholder="defaultColor" />
            {{/if}}
        </div>
      </div>
      <label>background</label>
      <div class="background">
        <span v-for="item in color" v-on:click="setBackground" :class="[item===defaultBgColor ? 'current' : '']"></span>
      </div>
    </div>
  </div>
  <div class="diagram">
    <div id="myDiagramDiv" :style="width:100%; height:400px; background: {{defaultBgColor}}"></div>
  </div>
</div>
</template>


<script>
import MindMap from "@assets/mindmap/index.js";

const model = { "class": "go.TreeModel",
  "nodeDataArray": [ 
{"key":0, "text":"Mind Map", "loc":"88 3"},
{"key":1, "parent":0, "text":"我的门的\nksdjf卡拉斯京地方\n more time", "brush":"skyblue", "dir":"left", "flag":{"size":10, "color":"red"}, "loc":"68 -55.5", "fontColor":"orange"},
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
 ]
};

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
      id: "myDiagramDiv",
      text: {
        scale: 1
      },
      lineWeight: 1,
      wordLineSpead: 8
  },
  mounted() {
    this.diagram = MindMap(this.state, model);
  },  
  methods: {
    addFlag: function(color) {
      var color = $(e.target).data('color');
      var size = this.state.$('.flag .size').val();

      this.diagram.actions.changeSelectionsProperty('flag', {size: parseInt(size), color: color});
    },
    setLineColor: function() {
      var node = $(e.target);
      var color = node.data('color');
      $('.line-color .current').removeClass('current');
      node.addClass('current');
      Actions.setConfig('defaultLineColor', color);
      
      if(diagram.selection.size > 1) return '请选择一个节点，该节点上关联的所有父亲和子节点都会变化线条颜色';
      if(diagram.selection.size === 1) {
        var iterator = myDiagram.selection.iterator;
        while(iterator.next()) {
          var item = iterator.value;
          item.findTreeParts().each(function(child) {
              child.diagram.model.setDataProperty(child.part.data, 'brush', color);
          });
        }
      }
    },
    setFontColor: function() {
      var node = $(e.target);
      var color = node.data('color');
      $('.font-color .current').removeClass('current');
      node.addClass('current');
      Actions.setConfig('defaultFontColor', color);
      Actions.changeSelectionsProperty('fontColor', color);
    }
  }
}
</script>

<style>
  @import '../../assets/mindmap/custom.css';
</style>