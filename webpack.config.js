// 这是webpack的配置文件
const path = require("path")

const htmlWebpackPlugin = require("html-webpack-plugin");

const vueLoaderPlugin = require("vue-loader/lib/plugin")

module.exports = {

    // 入口
    entry: path.join(__dirname, "/src/main.js"),
    // 出口
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },
    // 模式
    mode: "development",

    // 插件 
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
            template: path.join(__dirname, "./src/index.html"),
            filename: "index.html"
        }),

        new vueLoaderPlugin()
    ],

    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(png|jpg|gif|jpeg)$/, use: 'url-loader?limit=20000' },
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
            { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
            { test: /\.vue$/, use: "vue-loader" }
        ]
    },

    // resolve: {
    //     alias: {
    //         "vue$": "vue/dist/vue.js"
    //     }
    // }

}