<template>
  <div id="app">
    <a v-on:click="doSomething">doSomething</a>
    {{msg}}
    <ul id="example-1">
      <li v-for="item in billList">
          {{item.id}}
          {{item['账本']}}
          {{item['账目分类']}}
          {{item['账目类型']}}
          {{item['账目金额']}}
          {{item['时间']}}
          {{item['账目备注']}}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    console.log(this.$serveData);
    const serveData = this.$serveData;
    return {
      msg: 'Welcome tsdfo Your--vue',
      billList: serveData.data
    }
  },
  methods: {
    doSomething () {

    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
