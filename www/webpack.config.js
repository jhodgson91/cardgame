
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
    devtool: 'source-map',
    entry: "./src/index.tsx",
    output: {
        path: path.join(__dirname, "../release"),
        filename: "index_bundle.js",
        library: 'commonjs'
    },
    resolve: {
        extensions: ['.ts', '.tsx', ".js"]
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: 'file-loader'
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            hash: true,
            filename: "index.html",  //target html
            template: "./src/public/index.html" //source html
        })
    ]
}