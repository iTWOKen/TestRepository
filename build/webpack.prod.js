const config = require('./webpack.config');
const {merge} = require('webpack-merge');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(config,{
    mode:"production",
    devtool:"@cheap-module-source-map",
    plugins:[
        new CopyWebpackPlugin({
            patterns:[
                {
                    from:path.resolve(__dirname,'../public'),
                    to:path.resolve(__dirname,'../docs')
                }
            ]
        })
    ],
    optimization:{
        //压缩器 webpack4 已经内置 UglifyJsPlugin
        // minimizer:[
        //     new UglifyJsPlugin({
        //         parallel:true,
        //         cache:true,
        //         sourceMap:true
        //     }),
        //     new OptimizeCssAssetsWebpackPlugin({}),
        // ],
        //是否压缩
        minimize:true,
        //是否 单独打包 webpack runtime chunck
        runtimeChunk:false,
        moduleIds:"hashed",
        //代码分割
        splitChunks:{
            chunks:'all',                    //分割块的类型 ‘all' 所有
            cacheGroups:{
               polyfill:{
                 test:/[\\/]node_modules[\\/]@babel[\\/]polyfill/,
                 priority:20,
               },
               libs:{
                   name:'vendor',
                   test: /[\\/]node_modules[\\/]/,
                   priority: 10,
               },
               common:{
                   name:'common',
                   priority:5,
                   minChunks:2,
                   minSize:0,
               }
            }
        }
    }
});