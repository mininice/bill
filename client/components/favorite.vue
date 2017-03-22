
<template>
   <i class="fa fa-star no-favorite" :class="{'my-favorite': showFavorite}" v-on:click="toggleFavorite"></i>
</template>


<script>

import DS from '@utils/ds.js'

export default {
  name: 'MsgTip',
  props: {
  	'favorite': Boolean,
    'uuid': String
  },
  data () {
  	return {
  		showFavorite: this.favorite
  	}
  },
  methods: {
    toggleFavorite () {
      var _this = this;
      if(this.showFavorite) {
        DS('favoriteDelete', {uuid: this.uuid}).then(function(res) {
          if(res.status) {
            _this.showFavorite = false;
          } else {

          }
        });
      } else {
        DS('favoriteAdd', {uuid: this.uuid}).then(function(res) {
          if(res.status) {
            _this.showFavorite = true
          } else {

          }
        });
      }
    }
  },
  watch: {
  	
  }
}
</script>

<style>
.no-favorite {
    color:#ddd;
    vertical-align: top;
    margin-top: 4px;
}

.no-favorite:hover {
    color: #2196f3
}

.my-favorite {
    color: #ec5f47;

}
</style>