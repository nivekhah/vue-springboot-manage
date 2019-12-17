import $axios from './index'

export function getPageTab1(params) {
    const url='/getPageData1'
    return $axios.get(url,params)
}
export function getPageTab2(params) {
    const url='/getPageData2'
    return $axios.get(url,params)
}

/*   图表定义接口封装  */
export function getChartDefiniation(params) {
    const url='/chartDefinition'
    return $axios.get(url,params)
}

/*  数据字典接口封装 */
export function getDataDictionary(params) {
    const url='/dataDictionary'
    return $axios.get(url,params)
}

/* 数据源接口封装 */
export function getDataSouce(params) {
    const url = '/datasouce'
    return $axios.get(url,params)
}
/* 查询定义接口封装 */
export function getQueryDefiniation(params) {
    const url = '/queryDefination'
    return $axios.get(url,params)
}