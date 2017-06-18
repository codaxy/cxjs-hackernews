var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    //CopyWebpackPlugin = require('copy-webpack-plugin'),
    SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    merge = require('webpack-merge'),
    common = require('./webpack.config'),
    path = require('path')

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
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        sass,
        new SWPrecacheWebpackPlugin(),
        //new BundleAnalyzerPlugin()
    ],

    output: {
        publicPath: '/'
    }
};

module.exports = merge(common, specific);
