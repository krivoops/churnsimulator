import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import 'tailwindcss/dist/base.css';
import 'tailwindcss/dist/components.css';
import 'tailwindcss/dist/utilities.css';

import ChurnSimulator from './game/install'

Vue.config.productionTip = false;

Vue.use(ChurnSimulator, {
  store
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
