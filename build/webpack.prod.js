const WebpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PurifycssWebpack = require("purifycss-webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require("glob-all");
const path = require('path')

const prodConfig = {
    mode: 'production',
    devtool: "cheap-module-source-map",
    output: {
        filename: 'js/[name].[contenthash].js',
        chunkFilename: 'js/[name].[contenthash].chunk.js'
    },
    // 不显示打包过程中出现的警告
    performance: false,
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                    }
                },
                'less-loader',
                'postcss-loader',
            ]
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                },
                'postcss-loader',
            ]
        }
        ]
    },
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({}),new UglifyJsPlugin()]
    },
    plugins: [
        // 清除无用的css
        new PurifycssWebpack({
            //*.html 表示 src 文件夹下的所有 html 文件，还可以清除其它文件 *.js、*.php···
            //注意这里是 paths ！！！
            paths: glob.sync([
                path.resolve(__dirname, "../src/**/*.html"),
                path.resolve(__dirname, "../src/**/*.js")
            ])
        }),
        // 底层使用的是 Tree Shaking，需要修改package.json sideEffects属性，否则会被干掉
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].chunk.css',
        }),
    ],
}

module.exports = WebpackMerge(baseConfig, prodConfig)