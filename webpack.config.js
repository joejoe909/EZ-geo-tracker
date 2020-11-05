const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: {
        map: './src/js/map.js',
        script: './src/js/script.js',
    },
    output: {
        path: __dirname + "/dist",
        filename: '[name].js',
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015'],
                    }
                }
            }
        ],
    }
}