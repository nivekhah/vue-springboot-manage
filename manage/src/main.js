import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import './style/index.scss'
import './plugins/element'

import animated from 'animate.css'
import './assets/iconfont/iconfont.css'
/*  引入滑块*/
import SlideVerify from 'vue-monoplasty-slide-verify'

Vue.use(SlideVerify)

Vue.use(animated)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
