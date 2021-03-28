const path=require('path')
const port = process.env.port || process.env.npm_config_prot || 9527
function resolve(dir){
    return path.join(__dirname,dir)
}
module.exports={
    publicPath:'/',//根路径 cli3.0以上使用publicPath
    //打包后输出路径
    outputDir:'dist', //输出文件路劲
    assetsDir:'static',//设置防止打包生成的静态资源(js、css、img、fonts)目录，该目录相对于outputDir
    lintOnSave:process.env.NODE_ENV === 'development', //设置是否在开发环境下每次保存代码都启用eslint验证
    devServer:{
        port:port,//端口号
        open:true,//自动打开
        overlay:{
            //出现编译错误或警告时，在浏览器中显示全屏
            warnings:false,//警告
            errors:true,//错误
        }

    },
    //configureWebpack 值为对象，会通过 webpack-merge 合并到最终的配置
    configureWebpack:{
        //在webpack的name字段中提供应用程序的标题，以便可以在index.html中访问它来注入正确的标题
        name:'vue-el-amin',
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config){
        //设置svg
        // 设置svg
        config.module
            .rule("svg")
            .exclude.add(resolve("src/icons"))
            .end();
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
            symbolId: "icon-[name]"
            })
        .end();
    }

}