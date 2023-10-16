import Vue from 'vue';
import App from './App';
import router from './router';

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import {createPinia,PiniaVuePlugin} from "pinia"
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

Vue.use(Buefy)

pinia.use((context)=>{
  console.log(context)
  const productStoreId = context.store.$id
  console.log(productStoreId)

  // sync data from store ---------------
  const fromLocalStorageProducts = JSON.parse(localStorage.getItem(productStoreId))
  if(fromLocalStorageProducts){
    context.store.$patch(fromLocalStorageProducts)
  }

  // listen to changes and update local storage --------------
  context.store.$subscribe((mutation,state)=>{
    localStorage.setItem(productStoreId,JSON.stringify(state))
  })
})

Vue.config.productionTip = false;

new Vue({
  pinia,
  el: '#app',
  router,
  render:(h)=>h(App)
}).$mount("#app");
