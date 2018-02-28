const webpack = require('webpack');
const path = require('path');

const APP_ENTRY = './app/src/main.js';

const webpackConfig = {
    entry: APP_ENTRY,
    output: {
        path: path.resolve(__dirname, './app/dist'),
        publicPath: '/dist/',
        filename: 'app.js',
    },
    optimization:{
        minimize: false
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
};


module.exports = webpackConfig;