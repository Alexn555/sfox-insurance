const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const publicPath = "./";

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath
    },
    devServer: {
        client: {
          overlay: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // only enable hot in development
                           // hmr: process.env.NODE_ENV === "development",
                            // if hmr does not work, this is a forceful method.
                            // reloadAll: true
                        }
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // title: "Webpack 5 Starter",
            template: "./src/index.html",
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false // Enable to remove warnings about conflicting order
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets", to: "assets" },
            ],
            options: {
                concurrency: 100,
            },
        }),
    ]
};
