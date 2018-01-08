const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const _ = require('lodash')

const paths = {
  app: path.resolve(__dirname, 'app'),
  core: path.resolve(__dirname, 'core'),
  htmlTemplate: path.resolve(__dirname, 'examples', 'todo', 'index.pug'),
  out: path.resolve(__dirname, 'dist'),
  i18n: path.resolve(__dirname, 'examples', 'todo', 'utils', 'i18n'),
  logger: path.resolve(__dirname, 'core', 'globals', 'logger'),
}

const apps = {
  app: paths.app,
  todo: path.resolve(__dirname, 'examples', 'todo'),
  firebase_authentication: path.resolve(
    __dirname,
    'examples',
    'firebase_authentication'
  ),
}

const appEntries = _.mapValues(apps, value => [
  'babel-polyfill',
  path.join(value, './index.js'),
])

const appHtmlEntries = _.map(
  apps,
  (value, key) =>
    new HtmlWebpackPlugin({
      inject: true,
      chunks: [key],
      filename: key === 'app' ? 'index.html' : path.join(key, 'index.html'),
      template: paths.htmlTemplate,
    })
)

const env = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
  FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
  FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
}

const baseConfig = {
  entry: appEntries,
  output: {
    path: paths.out,
    filename: '[name]/[hash].js',
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules'],
    alias: _.merge(
      {
        i18n: paths.i18n,
        logger: paths.logger,
        core: paths.core,
      },
      apps
    ),
  },
  module: {
    rules: [
      { test: /\.css/, use: ['style-loader', 'css-loader'] },
      { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.pug$/, use: ['pug-loader'] },
      { test: /\.svg$/, use: ['babel-loader', 'react-svg-loader'] },
      { test: /\.(jpg|png|ico)$/, use: ['file-loader'] },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({ logger: 'logger' }),
    new webpack.DefinePlugin({ 'process.env': env }),
  ],
  externals: {
    cheerio: 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
  },
}

module.exports = { baseConfig, paths, apps, appHtmlEntries }
