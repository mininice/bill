
<template>
<div id="mindmap-view">

<nav class="top-navbar">
  <i class="fa fa-eercast"></i>
  <span>简梳</span>
  <span style="font-size:40px; color: #ec5f47;">.</span>
  <span style="color: gray">让意识流表达更直白</span>
  <span class="my-jianshu">
    <a href="/list/my">我的简梳</a>
  </span>
</nav>
<pre class="help-doc">
<h3>你可以用它干什么</h3>
1.梳理脑图
2.任务分解和管理
3.分享和协同

<h3>相比传统的脑图它有什么优势</h3>
1.支持全键盘操作
2.任务模式
3.简单的分享和收藏


<h3>功能介绍</h3>
#.快捷键支持
  
  选中节点，点击右键

  1.添加节点
  shift/tab

  2.局部布局
  L

  3.其它的快捷键参考
  http://gojs.net/latest/api/symbols/CommandHandler.html

#.移动节点
拖到对应的目标节点上

#.添加备注
选中节点, 右键点击 Comment

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
</div>
</template>


<script>

export default {
  name: 'app',
  data () {
  
  }
 
}
</script>

<style>
pre {
  background: #fff;
  border: none;
  margin-top:0;
}
h3 {
  line-height: 20px;
}
.top-navbar {
    height: 42px;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    background: #fff;
    padding-left: 20px;
}
.my-jianshu {
    float: right;
    margin-top: 10px;
    margin-right: 20px;
}

.help-doc {
  padding: 0 20px;
}
</style>