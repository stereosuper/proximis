const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')


let config = (env, options) => {
    console.log(path.resolve(__dirname, "./js"));

    const MODE = options.mode;    
    return {
        cache: false,
        entry: "./wp-content/themes/proximis/src/js/main.js",
        output: {
            path: path.resolve(__dirname),
            filename: "./wp-content/themes/proximis/js/main.js",
            publicPath: '/wp-content/themes/proximis/js'
        },
        watch: true,
        devtool: MODE === 'development' ? 'source-map' : '',
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },{
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['> 1%', 'last 2 versions']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|otf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/',
                            name: '[path][name].[ext]',
                            emitFile: false
                        }
                    }
                ]
            }],
        },
        node: {
            fs: "empty" // avoids error messages
        },
        plugins: [ 
            new MiniCssExtractPlugin({
                filename: "./wp-content/themes/proximis/css/main.css",
            }),
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                proxy: 'http://proximis.local/',
                files: [
                    {
                        match: [
                            '**/*.php'
                        ]
                    }
                ]
            }),
        ]
    }
} 

module.exports = config;
