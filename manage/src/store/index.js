import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";
const path = require('path')

/*
* 本地存储变量 比如token字段等等
*
* */

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
let modules = {}
files.keys().forEach(key => {
    let name = path.basename(key, '.js')
    modules[name] = files(key).default || files(key)
})
const store = new Vuex.Store({
    modules,
    getters
})
export default store