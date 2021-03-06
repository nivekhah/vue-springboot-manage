import axios from 'axios'
import Qs from 'qs'
import store from '@/store'
import router from 'vue-router'
import { Loading, Message } from 'element-ui'
/*
 * 使用Axios库对Get 请求与Post请求进行封装
* qs是一个npm仓库所管理的包，可通过npm install qs命令进行安装。
* qs.stringify()将对象序列化成URL的形式，以&进行拼接。
* qs.parse()将URL解析成对象的形式。 JSON.stringify()是正常类型的JSON。
*
* */



const $axios = axios.create({
    timeout: 30000
    // baseURL: process.env.VUE_APP_BASE_API
})
let loading = null

// 请求拦截器
$axios.interceptors.request.use(
    config => {
        loading = Loading.service({ text: '拼命加载中' })
        const token = store.getters.token
        if (token) {
            config.headers.Authorization = token // 请求头部添加token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 响应拦截器
$axios.interceptors.response.use(
    response => {
        if (loading) {
            loading.close()
        }
        const code = response.status
        if ((code >= 200 && code < 300) || code === 304) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        if (loading) {
            loading.close()
        }
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回401 清除token信息并跳转到登陆页面
                    store.commit('DEL_TOKEN')
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
                    break
                case 404:
                    Message.error('网络请求不存在')
                    break
                default:
                    Message.error(error.response.data.message)
            }
        } else {
            // 请求超时或者网络有问题
            if (error.message.includes('timeout')) {
                Message.error('请求超时！请检查网络是否正常')
            } else {
                Message.error('请求失败，请检查网络是否已连接')
            }
        }
        return Promise.reject(error)
    }
)

// get，post请求方法
export default {
    post(url, data) {
        return $axios({
            method: 'post',
            url,
            data: Qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
    },
    get(url, params) {
        return $axios({
            method: 'get',
            url,
            params
        })
    }
}
