import * as types from './mutation-types'

/*
* 设计token的突变类型
* */


/*
* 本地设置token 与 删除token
* */
const mutations = {
    [types.SET_TOKEN](state,val){
        state.token = val
        localStorage.setItem('token',val)
    },
    [types.DEL_TOKEN](state){
        state.token = ''
        localStorage.removeItem('token')
    }

}

export default mutations