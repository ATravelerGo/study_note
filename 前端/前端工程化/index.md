# 前端工程化
    管理工具：
        SOP，打卡器
    目的都是降低管理成本，提升效能，职位高的管理宏观方面，职位低的管理围观方面
    一句话概括就是前端开发的管理工具
    降低开发成本，提升开发效率

## 模块化和包管理
    模块化：利用分解和聚合的思想
        分解契合的是主观规律
        聚合契合的事客观规律
    之前文件级别的分解比如两个js文件就会有问题
        全局污染（实际是个分解问题）
        依赖混乱（实际是个聚合问题）：之前都是一个个js的引入，需要人工一个个规定js文件的引入顺序，如果js文件太多依赖太复杂，这样的话就很难，导致依赖管理混乱
    
    模块化就是解决这两个问题
        模块化标准：
            CommonJs：随着node的发布进行的，node环境下的库大部分都是CommonJs
            AMD
            CMD
            UMD
            ESModule：这个才是官方的模块化标准
        这两个的主要区别，一个民间一个官方，
            CommonJs是运行时的：只有运行这个模块的时候，才会知道他的模块依赖关系
            ESModule是编译时的：运行之前，也就是编译时就确定了模块依赖关系，也只是在运行时导入，动态导入
        模块化实现：
            浏览器：只支持ESM
            node：ESM和CommonJs都支持
            构建工具：vite vue-cli  cra  umijs  一般构建工具都支持CommonJS与ESM，rollup与esbuilder只支持ESM
    
    包管理：
        包：package，一系列模块的集合
        从哪里下载
        如何升级
        如何卸载
        如何发布
        版本控制
        这些问题都会在包管理工具下解决 npm  pnpm  cnpm yarn   bower(浏览器支持这个)  剩下的都是node支持的 
        pnpm yarn 修复了npm的幻影依赖问题
        
    Drag api
    File api
    Obseriver api
    Canvas api

    JS语言问题
        兼容性
            API兼容
                polyfill：填充物，这个事当然可以开发者去做，但是效率很低，一般都是工具帮咱们完成 core-js 差不多基本就是core-js
            语法兼容
                async await语法，语法兼容问题一般做语法转换，syntax transformer
                所以我们可以发明各种高级语法jsx等，但是需要做对应的转换工具就可以了
        语法增强
            可以发明新的语言例如ts，但是要有配套的转换工具例如tsc
        

    但是现在的问题又出来了一个文件的代码
    我要手动调用tsc的转换 又要做jsx的转换 又要做的async await的兼容，又要做拓展运算符的兼容，这对开发者开发者效率太低了，都需要开发者自己搞
    现在需要一个工具把这些串起来，然后自动串起来的调用
    
    这个东西叫【代码集成转换工具】：【babel】！！！！！！！！！！
    babel会把我们的代码转为抽象语法树AST 本质就是一个对象，树形结构便于分析
    然后再把AST转为代码，从AST转为代码 这一步我们可以安装很多的插件，从而影响抽象语法树生成代码的生成
    babel会自动读取babel.config.js这个文件里的配置
    babel 预设 （其实就是一堆插件），babel都帮我们准备好了，这个也是一个插件需要自己去安装
    
    CSS工具链
        语法缺失（循环、判断、拼接）
        功能缺失也就是函数 url（） calc（） 颜色函数，数学函数，自定义函数

    由于以上问题太过严重，所以开发新语言，是css语言的超级
    然后新语言-->编译器-->css语言
    sass、less、stylus  --> css预编译器-->css语言-->厂商前缀（autoPrefixer），代码压缩（cssnano），代码剪枝（purgecss），类名冲突（css module） 这些工具称之为后处理器-->css
    然后postCSS产生了 
    css-->PostCss（这里可以放插件）-->css代码
    PostCss一般是后处理器
    postcss默认会读取postcss.config.js里面的配置

    box-shadow 可以弄做个 这个需要去调查下


    构建工具和脚手架
        开发和维护的代码 -->转换 -->运行的代码
        做转换的这个工具就叫做构建工具
            1.需要定义哪种工程更适合开发和维护
                一切皆为模块
            2.哪种工程更适合运行时
            3.如何转换（打包）
        webpack  rollup esbuild 这些都是构建工具  要学习构建工具 必须学webpack rollup  esbuild

        webpack
        开发服务器：其实就是npm run dev
        文件指纹就是打包后面都有hash值前几位

        vue-cli vite cra unijs 这些都是脚手架