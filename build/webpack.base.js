const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    entry: {
        main: path.join(__dirname, '../src/main.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(png|jpg|gif|eot|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'images/',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 防止缓存script
            hash: true,
            template: path.join(__dirname, '../src/index.html'),
            filename: 'index.html',
            minify: {
                minimize: true,
                removeConments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,

            }
        }),
        new CleanWebpackPlugin()
    ]
}