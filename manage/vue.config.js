//vue相关路径配置 vue-cli 配置
const path = require('path')
const resolve = function(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('views', resolve('src/views'))
    }
}