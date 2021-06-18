// 引入包
const path = require("path");

// 引入 html 插件
const HTMLWebpackPlugin = require("html-webpack-plugin");

// 引入 clean 插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// webpack中所以配置信息都应该写在module.exports中
module.exports = {
  // 'development' or 'production'
  mode: "production",
  // 指定入口文件
  entry: "./src/index.ts",

  // 指定打包文件所在路径
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, "dist"),
    // 打包后文件的名称
    filename: "bundle.js",
    publicPath: "/snakeGame", // 服务器路径
    environment: {
      //告诉webpack 不使用箭头函数
      arrowFunction: false,
      // 不使用const
      const: false,
    },
  },

  // 指定 webpack 打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test 指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的loader
        use: [
          // 配置babel
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置Babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      chrome: "58",
                      ie: "11",
                    },
                    // 指定corejs 版本
                    corejs: "3",
                    // 使用corejs 方法 "usage" 按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 要排除的文件
        exclude: /node_modules/,
      },
      // 设置less文件的处理
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },

  // 配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: "自定义title",
      template: "./src/index.html",
    }),
  ],

  // resolve 用来设置引用模块
  resolve: {
    extensions: [".ts", ".js"],
  },
};
