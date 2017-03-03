import Vue from 'vue'

<template>
  <div id="summernote">Hello Summernote</div>
</template>

<script>

export default {
  name: 'app',
  data () {
  	const data = this.$root.$options.$serveData.data;
    return {
      todoList: data.todoList
    }
  },
  methods: {
  	addItem (e) {
  		console.log(e);
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
