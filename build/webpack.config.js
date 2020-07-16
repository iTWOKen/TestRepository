const {merge} = require('webpack-merge');
const path = require('path');
const vueLoader = require('vue-loader');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV =='development';
console.log(isDev);
module.exports = merge({
    entry:path.resolve(__dirname,'../src/main.js'),
    output:{
        path: path.resolve(__dirname,'../docs'),
        filename:!isDev ? 'js/[name].[hash:8].js':'js/[name].js',
        chunkFilename:!isDev ?'js/[name].[hash:8].js':'js/[name].js',
    },
    resolve:{
       alias:{
           'vue$':'vue/dist/vue.runtime.esm.js',
           '@':path.resolve(__dirname,'../src'),
       },
       extensions:['.js','.mjs','.vue','.json']
    },
    plugins:[
        new vueLoader.VueLoaderPlugin(),
        new htmlWebpackPlugin({
            minify:'auto',
            title:'iBlog',
            chunks:'all',
            meta:{
                "description":"This is a iBlog application"
            },
            template:path.resolve(__dirname,'../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: isDev? 'css/[name].css' : 'css/[name][hash:8].css',
            chunkFilename:isDev ? 'css/[id].css' :'css/[id][hash:8].css'
         }),
        new CleanWebpackPlugin()
    ],
    module:{
         noParse:/^(vue|vue-router|vuex|vuex-router-sync)$/,
         rules:[
            {
                test:/\.vue$/,
                use:["cache-loader","thread-loader",
                    {
                       loader: "vue-loader",
                       options:{
                        compilerOptions:{
                          preserveWhitespace:false
                        }
                      }
                    }
                ],
                include:path.resolve(__dirname,'../src'),
                exclude:/node_modules/
            },
            {
                test:/\.scss$/,
                use:[
                     {
                         loader:MiniCssExtractPlugin.loader,
                         options:{
                            hmr:process.env.NODE_ENV == 'development',
                            publicPath: '../'
                         }
                     },
                    'css-loader',
                    {
                      loader:'postcss-loader',
                      options:{
                          plugins:[require('autoprefixer')]
                      }
                    },
                    { 
                    loader:'sass-loader',
                    options:{
                      //配置一个全局的样式
                      prependData:`@import "@/app.scss";`              
                    }
                  }
                ]
              },
                {
                    test:/\.css$/,
                    oneOf:[
                       {
                           //element-ui/lib/theme-chalk/index.css
                           test:/[\\/]node_modules[\\/]element-ui[\\/]lib[\\/]theme-chalk[\\/]index.css$/,
                           use:[{
                              loader:MiniCssExtractPlugin.loader,
                              options:{
                                hmr:isDev,
                                publicPath: '../'
                              }
                             },'css-loader']     //从右到左解析
                       },
                       {
                          use:[{
                              loader:MiniCssExtractPlugin.loader,
                              options:{
                                hmr:isDev,
                                publicPath: '../'
                              }
                             },'css-loader',{
                               loader:'postcss-loader',
                               options:{
                                   plugins:[require('autoprefixer')]
                               }
                           }]     //从右到左解析
                       }
                    ]
                }, 
                {
                  test:/\.js$/,                          // npm i babel-loader  @babel/core  @babel/preset-env @babel/runtime @babel-plubin-transform-runtime
                  use:[
                      {
                          loader:'babel-loader',       //优化打包 modules设置false 在 prod模式下 TreeShaking 只优化ES6模块，但是 babel预设导出 CommonJS模块
                          options:{
                              presets:['@babel/env'],
                              plugins:[
                                  ['@babel/plugin-transform-runtime'],
                                  '@babel/plugin-proposal-class-properties'
                              ]
                          }
                      }
                  ],
                  exclude: file => (
                      /node_modules/.test(file) &&
                      !/\.vue\.js/.test(file)
                    )
                },  
                {
                  test:/.svg$/,
                  include:[path.resolve(__dirname,'../src/icon/svg')],
                  loader:'svg-sprite-loader',
                  options:{
                      symbolId: 'icon-[name]'
                  }
                },
                //文件处理 主要是： 多媒体文件 ，url-loader/file-loader
                {
                  test: /\.(png|jpe?g|gif|webp|ico|svg)(\?.*)?$/,
                  exclude:[path.resolve(__dirname,'../src/icon/svg')],
                  use:[
                      {
                          loader:'url-loader',
                          options:{
                              limit:4096,    //4M 超过4M使用后备的 file-loader
                              esModule:false,
                              fallback:{
                                  loader:'file-loader',
                                  options:{
                                      name:"image/[name]/[hash:8].[ext]"
                                  }
                              }
                          }
                      }
                  ]
                },
                {
                  test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                  use:[
                      {
                          loader:'url-loader',
                          options:{
                              limit:4096,
                              esModule:false,
                              fallback:{
                                  loader:'file-loader',
                                  options:{
                                      name:'media/[name]/[hash:8].[ext]'
                                  }
                              }
                          }
                      }
                      
                  ]
                },
                {
                  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                  use:[
                      {
                          loader:'url-loader',
                          options:{
                              limit:4096,
                              esModule:false,
                              fallback:{
                                  loader:'file-loader',
                                  options:{
                                      name:'fonts/[name]/[hash:8].[ext]'
                                  }
                              }
                          }
                      }
                  ]
                }
         ]
    }
});