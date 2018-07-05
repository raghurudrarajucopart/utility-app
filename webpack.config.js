const path = require('path')
const webpack = require('webpack')
const WebpackHtmlGenerator = require('./WebpackHtmlGenerator')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const { join, resolve } = path

const root = resolve(__dirname)
const src = join(root, 'src')
const dest = join(root, 'public')
const env = join(root, 'env')

const stack = process.env.STACK || 'c'
const bundleName = process.env.BUNDLE_NAME || 'bundle'

module.exports = {
  entry: ['babel-polyfill', 'webpack-hot-middleware/client', join(__dirname, 'src', 'App.js')],
  output: {
    publicPath: '/',
    path: dest,
    filename: `${bundleName}-[hash].js`,
  },
  resolve: {
    alias: {
      constants: join(src, 'constants'),
      components: join(src, 'components'),
      actions: join(src, 'actions'),
      initialStates: join(src, 'initialStates'),
      reducers: join(src, 'reducers'),
      store: join(src, 'store'),
      configFiles: join(src, 'config')
    },
    extensions: [`.${stack}.js`, '.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        STACK: JSON.stringify(stack),
        BUILD_VERSION: 1000,
      },
    }),
    new CaseSensitivePathsPlugin(),
    new WebpackHtmlGenerator(bundleName),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [join(src), join(env)],
        exclude: ['node_modules'],
      },
      {
        test: /\.(css|less)/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: true,
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true,
            },
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  node: {
    fs: 'empty',
  },
}
