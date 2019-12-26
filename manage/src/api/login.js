import $axios from './index'

// export function login(data) {
//     const url = '/login/login'
//     return $axios.post(url, data)
// }
export function getInfo() {
    const url = '/login/getInfo'
    return $axios.get(url)
}
