
//预设环境里面是包含很多的插件的
//语法降级--> postcss-low-level
//编译插件--> postcss-compiler
const postcssPreSetEnv =require("postcss-preset-env")

module.exports= {
    plugins:[postcssPreSetEnv()]

}