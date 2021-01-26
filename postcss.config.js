module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,   // 视口宽
      viewportHeight: 667,  // 视口高
      unitPrecision: 5,     // 转成vm保留位数
      viewportUnit: 'vw',
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], // 指定不需要转换的类
      minPixelValue: 1,     // 小于或等于1Px，不进行转换
      mediaQuery: false     // 默认false
    }
  }
}
