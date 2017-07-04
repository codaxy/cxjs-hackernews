var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin'),
    StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin'),
    ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    merge = require('webpack-merge'),
    common = require('./webpack.config'),
    path = require('path');

var sass = new ExtractTextPlugin({
    filename: "app.css",
    allChunks: true
});

var specific = {
    module: {
        loaders: [{
            test: /\.scss$/,
            loaders: sass.extract(['css-loader', 'sass-loader'])
        }, {
            test: /\.css$/,
            loaders: sass.extract(['css-loader'])
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new SWPrecacheWebpackPlugin({
            staticFileGlobsIgnorePatterns: [/_redirects/]
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        sass,
        new StyleExtHtmlWebpackPlugin({
            minify: true
        }),
        // new ScriptExtHtmlWebpackPlugin({
        //     defaultAttribute: 'async',
        //     async: /\.js$/,
        //     preload: {
        //         test: /\.js$/,
        //         chunks: 'async'
        //     },
        //     inline: ['app.js']
        // }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, '../assets'),
            to: path.join(__dirname, '../dist/assets'),
        }, {
            from: path.resolve(__dirname, './netlify.redirects'),
            to: '_redirects',
            toType: 'file'
        }]),
        //new BundleAnalyzerPlugin()
    ],

    output: {
        publicPath: '/'
    }
};

module.exports = merge(common, specific);
