
//预设环境里面是包含很多的插件的
//语法降级--> postcss-low-level
//编译插件--> postcss-compiler
const postcssPreSetEnv =require("postcss-preset-env")

module.exports= {
    plugins:[postcssPreSetEnv(
        // {
        // importFrom:"" //就好比你现在让postcss去知道 有一些全局变量他需要记下来
        // }
    )]

}