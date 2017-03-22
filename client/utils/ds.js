import Vue from 'vue'

export default function ds(api, params, mock = false) {
  const uri = `/ds${mock ? '?mock' : ''}`;
  console.log(api, params);
  return Vue.http.post(uri, {api, params}, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then((response) => {
    console.log(response, response.data);
    //this.$set('someData', response.body);
    return response.data
  }, (response) => {
    return;
  })
};
