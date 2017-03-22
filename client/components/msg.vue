
<template>
  <nav class="msg" v-if="showMsg" v-on:click="deleteMsg">{{showMsg}}</nav>
</template>


<script>
export default {
  name: 'MsgTip',
  props: {
  	'msg': Object
  },
  data () {
  	return {
  		showMsg: this.msg.msg
  	}
  },
  methods: {
    deleteMsg () {
      this.showMsg = false;
    }
  },
  watch: {
  	msg (msg) {
      console.log(msg);
	  	this.showMsg = msg.msg;
  	}
  }
}
</script>

<style>
.msg {
    transition: all .3s ease;
    height: 30px;
    line-height: 30px;
    background-color: #ffc107;
    overflow: hidden;
    border-radius: 4px;
    position: fixed;
    margin: auto 0;
    padding: 0 10px;
    top: 0;
    left: 40%;

}
.msg.v-enter, .msg.v-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
}

</style>