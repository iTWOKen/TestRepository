const config = require('./webpack.config');
const {merge} = require('webpack-merge');

module.exports = merge(config,{
    mode:'development',
    devServer:{
        port:9010,
        historyApiFallback:true,
        hot:true,
    }
});