const state = {
    token:localStorage.getItem('token') ? localStorage.getItem('token') : '' //获取token字段 如果有 则存好 没有存空
}

export default state