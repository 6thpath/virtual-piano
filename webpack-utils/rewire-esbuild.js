const { join } = require('path')
const { realpathSync } = require('fs')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const { ProvidePlugin } = require('webpack')

const { loaderByName, getLoaders, removeLoaders, addAfterLoader } = require('./loaders')
const { throwError } = require('./helpers')

module.exports = (webpackConfig) => {
  webpackConfig.module.rules.unshift({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  })

  const { hasFoundAny } = getLoaders(webpackConfig, loaderByName('babel-loader'))
  if (!hasFoundAny) throwError('Failed to find babel-loader')

  const { hasRemovedAny, removedCount } = removeLoaders(webpackConfig, loaderByName('babel-loader'))
  if (!hasRemovedAny) throwError('No babel-loader to remove')
  if (removedCount !== 2) throwError('Had expected to remove 2 babel loader instances')

  const tsLoader = {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: join(realpathSync(process.cwd()), 'src'),
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
}
