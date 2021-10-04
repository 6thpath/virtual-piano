const filterPostCSSLoader = (array) => array.filter((object) => JSON.stringify(object).includes('postcss-loader'))

module.exports = (webpackConfig) => {
  filterPostCSSLoader(webpackConfig.module.rules).forEach((rule) => {
    filterPostCSSLoader(rule.oneOf).forEach((oneOf) => {
      filterPostCSSLoader(oneOf.use || oneOf.loader).forEach((use) => {
        use.loader = require.resolve('postcss-loader')
        use.options = { ident: 'postcss', sourceMap: false }
      })
    })
  })
}
