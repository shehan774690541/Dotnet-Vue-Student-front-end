import Vue from 'vue';
import App from './App';
import router from './router';

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import {createPinia,PiniaVuePlugin} from "pinia"
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

Vue.use(Buefy)


Vue.config.productionTip = false;

new Vue({
  pinia,
  el: '#app',
  router,
  render:(h)=>h(App)
}).$mount("#app");
