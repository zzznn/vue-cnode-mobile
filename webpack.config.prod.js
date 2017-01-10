var path = require('path');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.config.base.js');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

baseWebpackConfig.plugins = baseWebpackConfig.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
            VUE_ENV: JSON.stringify('client')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {comments: false},
        sourceMap: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
    }),
    new ExtractTextPlugin({filename: '[name].[contenthash:8].css', allChunks: true}),
    new HtmlWebpackPlugin({
        title: 'vue-cnode',
        template: 'template/index.html',
        inject: true,
        filename: '../index.html',
        chunks: ['vendor', 'app']
    }),
    new InlineManifestWebpackPlugin({
        name: 'webpackManifest'
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    new webpack.EvalSourceMapDevToolPlugin({
        // module: false,
        // // columns: false
    })
]);

module.exports = merge(baseWebpackConfig, {
    output: {
        path: path.join(__dirname, 'dist', 'lib'),
        filename: '[name].[chunkhash:8].js',
        publicPath: '/lib/',
        chunkFilename: '[id].build.[chunkhash:8].js'
    },
    // devtool: 'cheap-module-source-map'
})
