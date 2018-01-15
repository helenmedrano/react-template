const webpackConfig = require('./webpack.dev')

module.exports = {
  components: 'core/components/**/*.js',
  skipComponentsWithoutExample: true,
  webpackConfig,
}
