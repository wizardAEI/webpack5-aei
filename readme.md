author：aei

webpack5的一个详细配置，并持续更新中，里面的每一句话都几乎做了注释，很适合想要入门webpack5的同学学习


作用：
1. 使用了label，可以让转换ES6语法
2. 使用了Less插件
3. 加入了mini-css-extract-plugin插件，让CSS导入变成链接式的
4. 处理了CSS在不同浏览器上的兼容性
5. 压缩了JS,CSS,HTML
6. 打包图片资源（包括打包了html中的src下的图片，CSS引用的url里的图片和js引用的图片等）
7. dev serve 的搭建和热替换，一键加载，HTML不可以自动刷新，需要手动刷新一下（已知BUG）
8. 去除死代码



具体使用方法:

1.  npm install
2.  webpack 或  webpack serve（启动服务器） 

导入的文件目录结构：src目录下有css，html，js，img等目录，分别放置css和less，html，js，图片等文件，注意html文件里放的是html模板。

tips:默认需要一个index.html,index.js。

生成的目录为dist目录

配置文件为webpack.onfig.js文件，相关部分已经做好了注释