
<template>
<span>
  <span class="editable-text" v-if="showText" v-on:click="showInputName">
     {{showName}}
  </span>
  <span v-if="!showText">
    <input ref="input" style="width:150px" v-on:blur="changeName" v-model="showName" />
  </span>
</span>
</template>


<script>
import DS from '@utils/ds.js'

export default {
  name: 'Name',
  props: {
  	'name': String,
    'text': Boolean,
    'uuid': String
  },
  data () {
  	return {
  		showName: this.name,
      showText: this.text
  	}
  },
  methods: {
    showInputName () {
      this.showText = false;

      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    changeName() {
      var _this =  this;
      DS('mindmapUpdate', {uuid: this.uuid, name: this.showName}).then(function(res) {
        _this.showText = true;
      })
    }
  },
  watch: {
  	
  }
}
</script>

<style>
.editable-text {
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    cursor: pointer;
}



</style>