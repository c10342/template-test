const path = require('path')
const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

const devConfig = {
    mode: 'development',
    devtool: "cheap-module-eval-source-map",
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js'
    },
    module: {
        rules: [{
                test: /\.less$/,
                use: [
                    'style-loader',
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
                    'style-loader',
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
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        overlay: true,//错误直接显示在浏览器中
        open: true,
        port: 8000,
        hot: true,
        hotOnly: false
    }
}

module.exports = WebpackMerge(baseConfig, devConfig)