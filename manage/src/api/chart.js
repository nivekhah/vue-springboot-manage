import $axios from './index'

/*   图表数据封装  */
export function getChart(params) {
    const url='/chartData/getData'
    return $axios.get(url,params)
}
