const { join } = require('path')
const { override, addBabelPlugins, overrideDevServer } = require('customize-cra')

const additionalConfig = () => (webpackConfig) => {
  require('./webpack-utils/rewire-esbuild')(webpackConfig)
  require('./webpack-utils/rewire-postcss')(webpackConfig)

  return webpackConfig
}

module.exports = {
  webpack: override(
    ...addBabelPlugins(
      ...(process.env.NODE_ENV === 'production' ? [['transform-remove-console', { exclude: ['debug'] }]] : [])
    ),
    additionalConfig()
  ),
  devServer: overrideDevServer((devServerConfig) => {
    return {
      ...devServerConfig,
      contentBase: [devServerConfig.contentBase, join(__dirname, '/public')],
    }
  }),
}
