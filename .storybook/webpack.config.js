const _ = require('lodash');
const merge = require('webpack-merge');
const appConfig = require('../webpack.base').baseConfig;

module.exports = function(baseConfig) {
  return merge(baseConfig, _.pick(appConfig, ['resolve', 'module']));
}
