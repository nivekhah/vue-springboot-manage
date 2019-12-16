import $axios from './index'

/*封装登录函数*/
export function login(data) {
    const url = '/apis/login'
    return $axios.post(url,data)
}

/*封装登录获取详情函数*/
export function getInfo() {
    const url = '/apis/getInfo'
    return $axios.get(url)
}

