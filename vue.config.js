// 修改配置，起别名
// cli2中在webpack.base.conf.js进行修改，PPT143
// cli3中对上述文件进行了隐藏，因此需要自建文件vue.config.js
// vue会合并配置文件

const { resolve } = require("core-js/fn/promise");

module.exports = {      // commonJS导出语法
  configureWebpack: {
    resolve: {
      // extensions: 配置后缀名，已默认配置，此处无需再设置
      alias: {
        // '@': resolve('src')    已默认配置，且cli3中可直接使用@进行下面起别名，cli2中不行
        'assets': resolve('@/assets'),
        'common': resolve('@/common'),
        'components': resolve('@/components'),
        'network': resolve('@/network'),
        // router、store一般不需要，可直接通过$router、$store使用
        'views': resolve('@/views'),
      }
    }
  }
}
