import axios from 'axios'
import Qs from 'qs'

/*
 * 使用Axios库对Get 请求与Post请求进行封装
* qs是一个npm仓库所管理的包，可通过npm install qs命令进行安装。
* qs.stringify()将对象序列化成URL的形式，以&进行拼接。
* qs.parse()将URL解析成对象的形式。 JSON.stringify()是正常类型的JSON。
*
* */

const $axios = axios.create({
    timeout:30000,
    baseURL:'https://www.easy-mock.com/mock/5cee951f11690b5261b75566/admin'
})

//请求拦截器
$axios.interceptors.request.use(
    config=>{
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = token  //请求头添加token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


//响应拦截器
$axios.interceptors.response.use(
    response => {
        const code = response.status
        if((code >= 200 && code < 300) || code === 304){
            return Promise.resolve(response.data)
        }else {
            return Promise.reject(response)
        }
    },
    error => {
        if (error.response){
            switch (error.response.status) {
                case 401:
                    //放回401 清除token信息并跳转到登陆界面

            }
        }else {
            //请求超时 或者网络故障
        }
        return Promise.reject(error)
    }
)


//封装Post请求与Get请求
export default {
    post(url , data){
        return $axios({
            method:'post',
            url,
            data:Qs.stringify(data),
            headers:{
                'Conten-Type':'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
    },
    get(url,params){
        return $axios({
            method: 'get',
            url,
            params
        })
    }
}


