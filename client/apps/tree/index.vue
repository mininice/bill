
<template>
  <div id="naotu-view">
    <lable>包含checkbox: <input type="checkbox" name="hascheckbox" value="1"/></label>
    <lable>展示风格: 
      <select>
          <option value="tree">tree</option>
      </select>
    </lable>

    <button class="btn btn-xs btn-success viewDetail" v-on:click="doSomething">save</button>
    <div class="tree-view"></div>
  </div>
</template>


<script>
import html2json from 'html2json'
import Tree from '@assets/js/tree.js'


export default {
  name: 'app',
  data () {
    return {msg: 'hello vue', text: "init content"};
  },
  mounted() {
    Tree('.tree-view');
  },  
  methods: {
    doSomething () {
      $('#summernote').summernote('code', '<ul><li><span style="background-color: rgb(255, 255, 0);">sdf</span></li><li>sdf</li><li>asf</li><li><span style="background-color: rgb(255, 255, 0);">sfdwo</span>的</li></ul><p>斯库拉多夫家</p><ul><li>开始的风景</li><li>可是地方</li><li>可就是地方</li><li></li></ul>');
      var html = $('#summernote').summernote('code');
      var json = html2json.html2json(html);
      this.text = json;
    }
  }
}
</script>

<style>
  @import '../../assets/tree/custom.css';
</style>