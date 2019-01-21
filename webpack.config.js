const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
// const UglifyJSPlugin = require("uglifyjs-webpack-plugin")

module.exports = (_env, _argv) => {
  const config = {
    context: path.resolve("./src"),
    entry: "./index.ts",
    output: {
      // If you specify publicPath, webpack-dev-server"s root would be project"s root.
      // Then, you"ll need to specify contentBase in `devServer` property.
      path: path.resolve(__dirname, "./dist"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]?[hash]",
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ["style-loader", "css-loader?modules"],
        },
        { test: /\.html$/, loader: "html-loader" },
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: "./tsconfig.json",
        }),
      ],
    },
    devServer: {
      // historyApiFallback: true,
      // hot: true,
      // noInfo: true
    },
    performance: {
      // hints: false,
    },
    devtool: "#eval-source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new webpack.DefinePlugin({
        "process.env.TEST": JSON.stringify("test"),
        "HOGE": "FUGA",
      }),
    ],
  }
  return config
}
