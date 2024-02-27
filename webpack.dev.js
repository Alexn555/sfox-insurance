const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        compress: true,
        hot: "only", //Hot module replacement
        open: "chrome", //open in chrome
        devMiddleware: {
            index: "index.html",
            writeToDisk: true,
        },
        static: {
            directory: path.join(__dirname, "dist"),
        }
    },
});
