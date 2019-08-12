// postcss-loader配置文件
const autoprefixer = require('autoprefixer')//自动给样式添加前缀
module.exports = {
    plugins: [
        autoprefixer({
            "browsers": [
                "defaults",
                "not ie < 11",
                "last 2 versions",
                "> 1%",
                "iOS 7",
                "last 3 iOS versions"
            ]
        })
    ]
}