const { baseConfig } = require('./webpack.base')

module.exports = {
  components: 'core/components/**/*.js',
  skipComponentsWithoutExample: true,
  webpackConfig: baseConfig,
}
