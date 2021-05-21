const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
    context: path.resolve(__dirname, "src"),

    entry: "./assets/js/src/bootstrap.ts",

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "assets/js/main.js",
    },
    module: {
      rules: [
        {
            test: /\.ts$/,
            loader: "ts-loader",
            exclude: /node_modules/,
        },
        {
            test: /\.sass$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                {
                    loader: "css-loader",
                },
                {
                    loader: "resolve-url-loader",
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        sassOptions: {
                            style: "compact",
                            unixNewlines: true,
                        },
                    },
                },
            ],
        },
        { test: /\.svg$/, use: 'raw-loader' },
        {
            test: /\.png$/,
            loader: "file-loader",
            options: {
                outputPath: "assets/images",
                publicPath: "../images",
                name: "[name].[ext]",
            },
        },
      ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: "assets/css/main.css",
        }),
        new CopyPlugin({
            patterns: [
                {
                    context: path.resolve(__dirname, "src"),
                    from: "**/*.hbs",
                    to: path.resolve(__dirname, "dist"),
                },
            ],
        }),
    ],
};

module.exports = config;
