const { join } = require('path')
const { realpathSync } = require('fs')
const { override, addBabelPlugins, overrideDevServer } = require('customize-cra')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const { ProvidePlugin } = require('webpack')

const { loaderByName, getLoaders, removeLoaders, addAfterLoader } = require('./webpack-utils/loaders')

const throwError = (message) => {
  throw new Error(message)
}

const projectRoot = realpathSync(process.cwd())

const additionalConfig = () => (webpackConfig) => {
  // Modify webpack loader config
  const { hasFoundAny } = getLoaders(webpackConfig, loaderByName('babel-loader'))
  if (!hasFoundAny) throwError('Failed to find babel-loader')

  const { hasRemovedAny, removedCount } = removeLoaders(webpackConfig, loaderByName('babel-loader'))
  if (!hasRemovedAny) throwError('No babel-loader to remove')
  if (removedCount !== 2) throwError('Had expected to remove 2 babel loader instances')

  const tsLoader = {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: join(projectRoot, 'src'),
    loader: require.resolve('esbuild-loader'),
    options: {
      loader: 'tsx',
      target: 'es2015',
    },
  }

  const { isAdded: tsLoaderIsAdded } = addAfterLoader(webpackConfig, loaderByName('url-loader'), tsLoader)
  if (!tsLoaderIsAdded) throwError('Failed to add esbuild-loader')

  webpackConfig.optimization.minimizer = [
    new ESBuildMinifyPlugin({
      target: 'es2015',
      css: true,
    }),
  ]

  webpackConfig.plugins.push(
    new ProvidePlugin({
      React: 'react',
    })
  )

  // Change sourcemap config
  webpackConfig.devtool = 'eval-cheap-module-source-map'

  // Change postcss config
  require('react-app-rewire-postcss')(webpackConfig, true)

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
