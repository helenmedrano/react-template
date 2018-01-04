const webpackConfig = require('./webpack.dev')

module.exports = {
  components: 'core/components/**/*.jsx',

  skipComponentsWithoutExample: true,
  webpackConfig,
}
