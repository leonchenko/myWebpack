var webpack = require('webpack');
var path = require('path');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var postcssNested = require('postcss-nested');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        name: './frontend/entry.js'
    },
    output: {
        path: __dirname + '/assets',
        publicPath: '/assets/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader?-minimize!postcss-loader')
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|gif|jpg|otf)?(\?v=[0-9].[0-9].[0-9])?$/,
                loader: 'url-loader?limit=100&name=[name]-[hash].[ext]'
            }
        ]
    },

    postcss: function (webpack) {
        return [
            precss,
            autoprefixer,
            postcssNested,
            postcssImport({
                addDependencyTo: webpack
            })
        ]
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),

        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin()
    ]
};