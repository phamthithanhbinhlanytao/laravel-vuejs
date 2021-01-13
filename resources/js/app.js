import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import Routes from './routes'
import Default from './layouts/Default'

import Vuex from 'vuex'
import Notifications from 'vue-notification'
import VueSweetalert2 from 'vue-sweetalert2';
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueSweetalert2);
var filter = function(text, length, clamp){
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);

// Vue.use(Notifications)
// Vue.notify({
//   group: 'foo',
//   title: 'Important message',
//   text: 'Hello user! This is a notification!'
// })

//use Vuex
Vue.use(Vuex)
import storeData from "./store/index"
const store = new Vuex.Store(
    storeData
)

Vue.router = Routes
Vue.use(VueRouter)

Vue.component('default-layout', Default)

Vue.config.productionTip = false

new Vue({
  router: Routes,
  render: h => h(App),
  store
}).$mount('#app')