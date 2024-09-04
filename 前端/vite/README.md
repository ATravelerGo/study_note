# Vite学习
> 浏览器只认识html，css，js

企业级项目里都可能具有那些功能
1. typescript：如果遇到ts文件我们需要使用tsc将typescript将代码转为js代码
2. React/Vue：安装react-compiler/vue-compiler,将我们写的jsx文件或者vue文件转为render函数  render函数就是js渲染dom
3. less/sass/postcss/component-style：我们又需要安装less-loader，sass-loader等一系列编译工具
4. 语法降级：babel-->将es的新语法转为旧版浏览器可以接受的语法
5. 体积优化：uglifyjs -->将我们的代码进行压缩变成体积更小性能更高的文件

稍微改一点点东西 上面都得重新运行，非常麻烦

将App.tsx -->tsc -->App.jsx -->React-compiler-->js文件

希望有一个东西可以能够帮你把tsc，react-compiler，less，babel，uglifyjs全部集成到一起
我们只需要关心我们写的代码就好了
我们写的代码一变化-->有人帮我们自动去tsc，react-compiler，less，babel，uglifyjs 全部挨个走一遍

这个东西就叫做**构建工具**

> 打包：将我们写的浏览器不认识的代码 交给构建工具进行编译处理的过程就叫做打包，打包

一个构建工具他到底承担了哪些脏活累活
1. 模块化开发支持：支持直接从node_modules里引入代码 + 多种模块化
2. 处理代码兼容性：比如babel语法降级 less ts语法转换（**不是构建做的，构建工具将这些语法对应的处理工具集成进来自动化处理**）
3. 提高项目性能：压缩代码，**代码分割**
4. 优化开发体验：
   - 构建工具会帮你自动监听文件的变化，当文件变化以后自动帮你调用对应的集成工具进行重新打包，然后浏览器重新运行（整个过程叫热更新）
   - 开发服务器：解决跨域的问题

每次改一点-->这个顺序还不能错

构建工具他让我们可以不用每次都关心我们的代码在浏览器中如何运行，我们只需要首次给构建工具提供一个配置文件（这个配置文件也不是必须得，如果你不给他，他会有默认的帮你去处理），有了这个集成的配置文件以后，我们就可以在下次需要更新的时候调用一次对应的命令就好了
如果我们在结合热更新，我们就更加不需要管任何东西了，这就是构建工具去做的东西，他让我们不用关心生产的代码，也不用关心代码如何在浏览器运行，只需要关心我们的开发怎么写的爽

市面上主流的构建工具有哪些：
- webpack
- vite
- parcel
- esbuild
- rollup
- grunt
- gulp

# vite相较于webpack的优势
然而，当我们开始构建越来越大型的应用时，需要处理的 JavaScript 代码量也呈指数级增长。包含数千个模块的大型项目相当普遍。
基于 JavaScript 开发的工具就会开始遇到性能瓶颈：通常需要很长时间（甚至是几分钟！）才能启动开发服务器，即使使用模块热替换（HMR），文件修改后的效果也需要几秒钟才能在浏览器中反映出来。
如此循环往复，迟钝的反馈会极大地影响开发者的开发效率和幸福感。

我们的项目越大-->构建工具（webpack）所处理的js代码就越多（跟webpack的一个构建过程有关）

造成的结果：构建工具需要很长时间才能启动开发服务器（启动开发服务器-->把项目跑起来）
```
npm run dev
yarn start
yarn dev
```

webpack能不能改 提高启动开发服务器速度？ 如果一旦要改，那么将会动到webpack的大动脉

webpack支持多种模块化
```js
//这一段代码最终会到浏览器里去运行
const lodash=require("lodash");//commonjs规范
import Vue from 'vue'//es6 mmodule
//webpack是允许我们这么写的
```
webpack的编译原理，AST抽象语法分析的工具，分析出你写的这个js文件有哪些导入和导出操作
构建工具是运行在服务端：你的工程可能不止跑在浏览器端

```js
//webpack的转化结果
const lodash=webpack_require("lodash")
const Vue=webpack_require("vue")

```

```js
(function (modules){
    function webpack_require(){}
    //入口是index.js
   //通过webpack的配置文件中得来的
   modules[entry](webpack_require)
},({
   "index.js":(webpack_require)=>{
      const lodash=webpack_require("lodash")
      const Vue=webpack_require("vue")
   }
}))

```

因为webpack支持多种模块化，他一开始必须要统一模块化代码，所以意味着他需要将所有的依赖全部都读一遍

vite会不会直接把webpack干翻，vite是基于es module的 不允许写commonjs规范代码 所以他不需要把所有依赖都读一遍，侧重点不一样，webpack更多的关注兼容性，vite更关心浏览器

# 你必须要理解vite脚手架和vite

比如我们敲了 ```yran create vite```
1. 帮我们全局安装一个东西：create-vite （vite的脚手架就是vite的预设工作）
2. 直接运行这个create-vite bin目录下的一个执行配置

create-vite 和vite的关系  -----  create-vite内置了vite

我们暂时不会使用脚手架的命令

# vite启动项目初体验
开箱即用：你不需要做任何额外的配置就可以使用vite来帮你处理构建工作

在默认情况相下，我们的esmodule去导入资源的时候，要么是相对路径 要么是绝对路径

vite:代码处理 所以-D 安装就可以

# vite的预加载
```js
import  _ from 'lodash' //lodash可能也导入了依赖

```
在处理过程中如果看到了有非绝对路径或者非相对路径的引用，他则会尝试开启路径补全
```js
import  _ from '/node_modules/.vite/deps/lodash' //lodash可能也导入了依赖
import __vite__cjsImport0_lodash from "/node_modules/.vite/deps/lodash.js?v=1e464839";
```

找寻依赖的过程是自当前目录依次向上查找的过程，直到搜寻到根目录或者搜寻到对应依赖为止

yarn dev --> 开发（每次一来预构建所重新构建的相对路径都是正确的）
vite会全权交给一个叫做rollup的库去完成生产环境的包

实际上vite在考虑另外一个问题的时候就顺便把这个问题解决了

commonjs规范的导出 modules.exports  
有的包是以commonjs规范的格式导出的

**依赖预构建**：首先vite会找到对应的依赖，然后调用esbuild（对js语法进行处理的一个库），将其他规范的代码转换成esmodule规范，然后放到/node_modules/.vite/deps目录下
同时对esmodule规范的各个模块进行统一集成

```js
//a
export default function a(){}
```
```js
//index
export {default as a} from './a.js'  //这个就是先导入后导出
```
vite重写以后,也叫模块进行统一集成后
```js
function a(){}
```


他解决了三个问题：
1. 不同的第三方包会有不同的导出格式（这是vite没法约束人家的事情）
2. 对路径的处理上，可以直接使用.vite/deps ，方便路径重写
3. 网络多包的性能传输问题（也是原生esmodule规范不敢支持node_modules的原因之一），import的每个模块都会触发一次http请求，有了依赖预构建以后，无论他有多少额外的export和import
vite都会尽可能的将他们集成最后只生成一个或几个模块
```js
export  default defineConfig({
   optimizeDeps:{  //依赖预构建
      exclude:[
         // 'lodash-es'
      ] //当遇到lodash-es这个依赖的时候 不进行依赖预构建，然后会发现http请求非常多的js模块文件
   }

})
```

# vite配置文件处理细节
1. vite配置文件的语法提示
```js
import {defineConfig } from 'vite'
export  default defineConfig({})
```
2. 关于环境的处理
   过去我们使用webpack的时候，我们要区分配置文件的一个环境
   - webpack.dev.config
   - webpack.prod.config
   - webpack.base.config
   - webpackmerge

# vite环境变量配置