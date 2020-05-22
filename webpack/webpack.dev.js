const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const sass = require('sass');
const path = require('path');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';

module.exports = options => {
  return webpackMerge(commonConfig({ env: ENV, server_env: options.SERVER_ENV || 'local' }), {
    devtool: 'cheap-module-source-map', // https://reactjs.org/docs/cross-origin-errors.html
    mode: ENV,
    entry: ['./src/main/webapp/app/index'],
    output: {
      path: utils.root('build/resources/main/static/'),
      filename: 'app/[name].bundle.js',
      chunkFilename: 'app/[id].chunk.js'
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: { implementation: sass }
            }
          ]
        }
      ]
    },
    devServer: {
      disableHostCheck: true,
      stats: options.stats,
      hot: true,
      contentBase: './build/resources/main/static/',
      proxy: [
        {
          context: ['/api', '/services', '/management', '/swagger-resources', '/v2/api-docs', '/h2-console', '/auth'],
          target: `http${options.tls ? 's' : ''}://localhost:8080`,
          secure: false,
          changeOrigin: options.tls
        }
      ],
      watchOptions: {
        ignored: /node_modules/
      },
      https: options.tls,
      historyApiFallback: true
    },
    stats: process.env.JHI_DISABLE_WEBPACK_LOGS ? 'none' : options.stats,
    plugins: [
      process.env.JHI_DISABLE_WEBPACK_LOGS
        ? null
        : new SimpleProgressWebpackPlugin({
            format: options.stats === 'minimal' ? 'compact' : 'expanded'
          }),
      new FriendlyErrorsWebpackPlugin(),
      new BrowserSyncPlugin(
        {
          https: options.tls,
          host: 'localhost',
          port: 3000,
          proxy: {
            target: `http${options.tls ? 's' : ''}://localhost:9090`,
            proxyOptions: {
              changeOrigin: false //pass the Host header to the backend unchanged  https://github.com/Browsersync/browser-sync/issues/430
            }
          },
          socket: {
            clients: {
              heartbeatTimeout: 60000
            }
          }
        },
        {
          reload: false
        }
      ),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new writeFilePlugin(),
      new webpack.WatchIgnorePlugin([utils.root('src/test')]),
      new WebpackNotifierPlugin({
        title: 'Popolamama'
      })
    ].filter(Boolean)
  });
};
