const path = require('path')//引入path，后面写绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin')//打包html的插件
const MiniCssPlugin = require('mini-css-extract-plugin')//css链接式的插件
const webpack = require('webpack')//配置热更新
const OptimizeCssAssetsWebpackPplugin = require('optimize-css-assets-webpack-plugin')//压缩CSS
const { CleanWebpackPlugin } = require('clean-webpack-plugin')//每次webpack删除dist  
const purgecssWebpackPlugin  = require('purgecss-webpack-plugin')//去除无用的Css
const glob = require('glob')
module.exports = {
    entry:{
       index: path.join(__dirname,'src/js/index.js'),
       index2: path.join(__dirname,'src/js/index2.js'),
       other: path.join(__dirname,'src/js/other.js')
    },//入口文件,若要打包多个文件就配置多个
    output:{
    path:path.join(__dirname,'dist'),//出口文件目录
    filename:'[name].boundle.js'//保证开始时什么名字就写什么名字
    },
    devServer:{
        port:3333,//webpack-dev-server的配置，这里是端口
        contentBase: path.join(__dirname, 'dist'),//服务器启动时要去寻找的出口文件的目录。默认也是/dist
        compress: true,//启动gzip压缩
        open:true,//自动打开服务器
        hotOnly:false,// 页面构建失败不刷新页面       
        hot:true,//模块热替换
      },
    module: {
        rules: [
          {
            test: /\.m?js$/i,
            //exclude: /node_modules/,//不去检索node_modules，节省时间
            exclude: [{
              and: [/node_modules[\\/]/], //排除node_modules文件夹下面的所有文件，节省编译时间
              not: [
                // 但是不排除下面的文件，因为他们使用了IE11不支持的语法，等IE11更新了再说吧QAQ
                /debug[\\/]/,
              ]
            }],
            use: {
                loader: 'babel-loader',
                options: {         // options选项
                    presets: ['@babel/preset-env'],  // presets设置的就是当前js的版本
                    plugins: [] // plugin是需要的插件       
                }
            }
            ,
          },
          {
            test: /\.css$/i,
            //use: ['style-loader', 'css-loader']//倒叙放置，因为loader加载时倒叙加载的
            use: [MiniCssPlugin.loader, 'css-loader','postcss-loader']//采用插件让css变成链接式的，postcss-loader是用来解决浏览器的兼容
          },
          {
            test: /\.less$/i,
            use:[MiniCssPlugin.loader,'css-loader','postcss-loader','less-loader']//编译less的插件
          },
          {
            test:/\.(png|jpe?g|gif|jfif|svg)$/i,
            type:"asset", 
            generator:{
              filename:"img/[name].[hash:6][ext]"//将图片资源打包到img目录下
            },
            parser:{
              dataUrlCondition:{
                maxSize: 8 * 1024 //单位B
              }
            }//8KB以上就不要转码了，不然影响效率
          },
          {
              exclude:/\.(js|json|html|css|less|scss|png|jpe?g|gif|jfif|svg)$/,
              type:"asset/resource",
              generator:{
                filename:"other/[name].[hash:6][ext]"//配置的其他资源，统一输出到other
              }       
          },
          {
            test:/\.html$/i,
            loader:'html-loader',//将图片资源引入
          }
        ],
    }, //loader->用于编译不同的文件
    plugins: [
        new webpack.HotModuleReplacementPlugin(),//热更新插件
        new CleanWebpackPlugin(),//每次webpack删除dist  
        //打包html，多个包就new多次
        new HtmlWebpackPlugin({
        template:path.join(__dirname,'src/html/index.html'),  //使用模板
        filename:'index.html', //打包后的名字
        chunks:['index']//需要的js文件
        }),
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'src/html/index2.html'),  //使用模板
            filename:'index2.html', //打包后的名字
            chunks:['index2','other']//需要的js文件
        }),
        new MiniCssPlugin(),//css链接式的插件
        new OptimizeCssAssetsWebpackPplugin(),//压缩CSS的插件
        new purgecssWebpackPlugin({
          paths:  glob.sync(path.join(__dirname,'src/css'),{nodir:true})   
        })
    ],
    target: process.env.NODE_ENV === "development" ? "web" : "browserslist",//webpack5，加上这句话才可以自动刷新
    mode: 'production', // 设置mode   production  development
} 