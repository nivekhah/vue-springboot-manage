import Vue from 'vue'
import Vuex from 'vuex'
import state from "./state";
import mutations from "./mutations";

/*
* 本地存储变量 比如token字段等等
*
* */
Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations
    // actions:{}
})