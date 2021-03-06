import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import './style/index.scss'
import './plugins/element'
/*  引入滑块*/
import SlideVerify from 'vue-monoplasty-slide-verify'

Vue.use(SlideVerify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
