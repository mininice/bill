import Vue from 'vue'

export default function ds(api, params, mock = false) {
  const uri = `/ds${mock ? '?mock' : ''}`;
  console.log(Vue.http, api);
  Vue.http.post(uri, {api, params}, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then((response) => {
    console.log(response);
    //this.$set('someData', response.body);
  }, (response) => {
    return;
  })
};
