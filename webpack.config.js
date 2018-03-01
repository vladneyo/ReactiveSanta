const webpack = require('webpack');
const path = require('path');

const APP_ENTRY = './app/src/main.js';
const isDev = process.env.NODE_ENV !== 'production';

const webpackConfig = {
    entry: APP_ENTRY,
    output: {
        path: path.resolve(__dirname, './app/dist'),
        publicPath: '/dist/',
        filename: 'app.js',
    },
    optimization:{
        minimize: isDev ? false: true
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    watch: isDev ? true : false,
    mode: isDev ? 'development' : 'production'
};


module.exports = webpackConfig;