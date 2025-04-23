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
> 环境变量：会根据当前的代码环境产生值的变化的变量就叫做环境变量

代码环境：
1. 开发环境
2. 测试环境
3. 预发布环境
4. 灰度环境
5. 生产环境

在vite中的环境变量处理

vite其实用了dotenv这个第三方库,vite内置dotenv第三方库
dotenv会自动读取.env文件，并解析这个文件中的环境变量，并将其注入到***process***对象下,***但是vite考虑到和其他配置的冲突问题，他不会直接注入到process对象下***
涉及到vite.config.js中的一些配置 这两个配置会影响到env配置文件的生成
- root
- envDir：用来配置当前环境变量的文件的地址

> vite给我们提供了一些补偿措施：我们可以调用vite的loadEnv来手动确定env文件,然后进行***读取***

loadEnv(mode,process.cwd(),"") 第一个参数取vite的mode ，第二个参数取当前工作目录，其实就是.env存在的目录，第三个参数 "": 这个参数表示环境变量文件的前缀。该参数决定了只加载以指定前缀开头的环境变量。例如，如果你传递 "VITE_" 作为第三个参数，那么只会加载文件中以 VITE_ 开头的环境变量。这在防止无关的环境变量泄露到客户端代码时特别有用。
在上面的例子中，传入的是空字符串 ""，这意味着会加载文件中的所有环境变量，而不仅仅是以特定前缀开头的那些。
在 Vite 中，mode 决定了加载哪个环境变量文件。
serve 模式： 这个模式通常用于开发环境，即执行 vite 或 vite serve 命令。默认情况下，mode 为 development，因此会加载 .env 和 .env.development 文件中的环境变量。
build 模式： 这个模式通常用于生产环境，即执行 vite build 命令。默认情况下，mode 为 production，因此会加载 .env 和 .env.production 文件中的环境变量。

.env：所有环境都需要用到的环境变量
.env.development：默认情况下，开发环境需要用到的环境（默认情况下vite将我们的开发环境取名为development）
.env.production：生产环境需要用到的环境变量（默认情况下vite将我们的生产环境取名为production）


yarn dev --mode development 会将mode设置为development传递进来
当我们调用loadenv的时候 他会做如下几件事
1. 直接找到.env文件不解释，并解析其中的环境变量，并放进一个对象里
2. 会将传进来的mode这个变量的值进行拼接去寻找.env.【mode】文件 并根据我们提供的目录 也就是第二个参数 去取对应的配置文件并进行解析，并放进一个对象
3. 我们可以理解为
   ```js
      const baseEnv=读取.env的配置
      const modeEnv=读取env相关配置
      const lastEnv={...baseEnv,...modeEnv}
   ```

process.cwd方法：返回当前node进程的工作目录

如果是客户端也就是前端开发的js文件 vue文件 jsx文件中要想使用env的数据
vite给我们提供了***import.meta.env*** 但是现在里面没有咱们想要的需要
vite做了一个校验拦截，为了防止我们将隐私性的变量直接送到import.meta.dev中，***如果你的环境变量不是以VITE开头的*** 就不会注入到import.meat.env中的
如果我们不想用VITE做前缀 我们可以在vite.config.js中 设置envPrefix


vite.config.js 也是在node环境下运行
   但是这个文件里面为什么可以写import和export es6 module规范的呢，node环境是commonjs
   这是因为vite他在读取vite.config.js的时候会率先node去解析文件语法，如果发现是esmodule规范会直接将esmodule替换成commonjs规范
因为vite.config.js是运行在node下的 所以我们可以直接访问***process***这个对象,但这个对象我们基本不用

# [原理篇]vite是怎么让浏览器识别.vue文件

我们来实现一套简单的vite开发服务器
1. 解决我们刚刚这个问题
2. 让大家对开发服务器有个基础简单的认识

会涉及到node一些知识

koa:node端的一个框架

那么我们平时去访问一个网页的时候，我们敲下域名：baidu.com


# 在vite中处理css
vite天生就支持对css文件的直接处理
1. vite在读取到main.js中 引用到了index.css
2. 直接去使用fs模块去读取index.css中的文件内容，
3. 直接创建一个style标签，将index.css中文件内容直接copy仅style标签里
4. 将style标签插入到index.html的head中
5. 将该css文件中的内容直接替换为js脚本（方便热更新和模块化），同时设置content-type 为js 从而让浏览器以js脚本的形式来执行

场景：
- 一个组件最外层的元素一般取名：wrapper
- 一个组价最底层的元素一般取名：footer

你取了footer这个名字，别人因为没有看过你这个组件的源代码，也可能去取名footer这个类名
最终可能会导致样式被覆盖（因为类型重复），这就是我们在开发中会遇到的问题

cssmodule就是来解决这个问题的

大概说一下原理
全都是基于node
1. module.css（module是一种约定，表示要开启css模块化）
2. 他会将你的所有类名进行一定规则的替换（将footer 替换成_footer_i22st）
3. 同时创建一个映射对象  footer作为key 那个哈希作为值
4. 将替换后的内容塞进style标签里，然后放入到head标签中
5. 将componentA.module.css内容进行全部抹除 替换成js脚本，
6. 将创建的映射对象在脚本中进行默认导出


less（预处理器）：less给我们提供了一些方便且非常实用的方法

# vite.config.js中css配置 （modules篇）

在vite.config.js中 我们通过css属性去控制整个vite对css的控制

- localsConvention：修改生成的配置对象的key的展示形式（驼峰还是中划线形式）
- scopeBehaviour：配置当前的模块化行为是模块化还是全局化（有hash就是开启了模块化的一个标志） local代表开启模块化
- generateScopedName：生成的类名名字的规则是value的展示形式,可以配置成字符串规则 也可以是函数
- hashPrefix：生成hash的时候会根据类名去生成，如果你想要生成的hash更加的独特，可以配置hashPrefix，这个会参与到最终的hash生成中去
- globalModulePaths：代表你不想参与到css模块化的路径  当引入第三方的css的时候 我们都不希望进行模块化

# vite配置文件中css配置流程（preprocessorOptions篇）

主要是用来配置css预处理的一些全局参数

# postcss

vite天生对postcss有非常良好的支持

scss定义的变量都是***局部变量*** 要想使用就得@import  单纯的把scss文件导入到main.js也不会生效的

浏览器的兼容性你能考虑到吗，预处理器并不能解决兼容性问题
1. 对未来css属性的一些使用降级问题
2. 前缀补全： Google非常卷 --webkit

## 使用postcss（自己在终端运行postcss）
1. 安装依赖
   ```
   yarn add postcss-cli postcss -D
   ```
2. 书写描述文件
   - postcss.config.js
3. 安装postcss预设环境  预设环境里面包含很多的插件的，免得我们一个个去配置了
   ```
    yarn add postcss-preset-env -D
   
   ```
4.如果你在项目中 在终端中使用postcss命令 那么postcss.config.js里面得用commonjs语法  vite.config.js可以用es是因为做了转换处理了，其他文件不会做转换

# vite配置文件中css配置流程（现在是要在vite中配置postcss） 就可以不用创建postcss.config.js,甚至postcss都不用安装 vite本身就支持postcss  如果你不想再vite中配置 你就得创建postcss.config.js
直接在css.postcss中进行配置该属性直接配置的就是postcss的配置


# 为什么我们在服务端处理路径的时候一定要用path

> node端去读取文件或者操作文件的时候，如果发现你用的是相对路径，这会去使用process.cwd（）来进行对应的拼接 这算是个相对路径的bug

process.cwd（）***获取当前node执行目录***  我们不希望通过process.cwd（）来生成绝对路径 所有引入path
__dirname:获取的是当前文件的根路径

# vite加载静态资源

什么是静态资源

除了动态API以外，所有资源都被视为静态资源

vite对静态资源基本上是开箱即用的 除了一些特殊情况（svg）

import pic from './assets/images/img.png?url'; //默认就是url
import pic1 from './assets/images/img.png?raw'; //获取到的是图片的buffer字符串
在 Vite 项目中，默认情况下，直接导入 SVG 文件会被当作一个 Vue 组件进行处理。如果你希望以 URL 的方式引入 SVG（例如在 img 标签中使用），需要通过 ?url 这样的后缀来告诉 Vite 进行资源导入，而不是组件化。



直接写相对路径在某些情况下是行不通的，特别是在生产环境中，以下是为什么有时候不能直接使用相对路径的原因：

1. Vite的构建机制
   Vite 会在构建时为静态资源（如图片、CSS、JS 文件）生成哈希值并将它们移到 dist 文件夹。直接在模板中写相对路径，如：


<img src="./assets/my-image.png" alt="My Image">
在开发环境中是可以正常显示的，因为项目结构没有改变。但是在打包后的生产环境中，文件被移到了 dist/assets 目录，路径可能已经改变。而且，Vite 可能为图片文件加上哈希值（例如 my-image.abc123.png），导致原来的路径不再有效。

# vite路径别名  (resolve.alias)
   ```
    resolve:{
           alias:{
               "@":path.resolve(__dirname,"./src"),
               "@assets":path.resolve(__dirname,"./src/assets")
           }
       }
   ```

## [原理篇] resole.alias原理


# vite在生产环境对静态资源的处理（build）

当我们将工程进行打包以后，会发展找不到原来的资源

打包后的静态资源为什么要有hash
***浏览器***是有一个缓存机制的 静态资源名字只要不改，那么他就会直接用缓存的

刷新页面：请求的名字是不是同一个  尝试读取缓存

所以我们要尽量避免名字一致

hash算法：将一串字符串经过运算得到一个新的乱码字符串 

利用好hash算法 可以让我们更好的去控制浏览器的缓存机制

base64图片  如果我们的项目就一个图片 就不用打包出来了 直接生成base64图片就好了
base64 是体积增大，减少请求次数  
> assetsInlineLimit:4069,//4KB 如果小于4KB会转为base64字符 这样就不会把小于4KB的图片也打包出来了


# vite插件
> vite会在不同的生命周期中去调用不同的插件以达到不同的目的

1. 生命周期  vite从开始执行到执行结束，那么这整个过程就是vite的生命周期

# vite-aliases

插件学习 由简入繁

vite-aliases可以帮助我们自动生成别名：检测你当前目录下包括src在内的所有文件夹 并帮助我们生成别名  “@”：src   ”@assets“：src/assets 等等

# 手写vite-alias

整个插件就是在vite的生命周期的不同阶段去做不同的事情

生命周期的钩子

我们去手写vite-aliases其实就是抢在vite执行配置之前去改写配置文件

通过vite.config.js 返回出去的配置对象，以及我们在插件的config生命周期中返回的对象都不是最终的一个配置对象

vite会把这几个配置对象进行一个merge合并

# vite常用插件之vite-plugin-html

# vite-plugin-mock 是来mock数据的
   mockjs：模拟海量数据的  vite-plugin-mock的依赖项就是mockjs
   安装好了后他会自动去找根目录文件下的mock文件夹  mock文件夹里面去导出接口
   

# vite+ts结合
   vite天生支持ts 也就是说index.html中可以直接引入ts文件
   vite-plugin-checker 是用来检查错误的 然后弹窗提示
   
# vite-env.d.ts  声明文件 
   ///  三斜线指令
   /// <reference types= "vite/client" />  跟import vite/client一样


# vite性能优化概述
我们平时说性能优化是在说什么
- 开发时态的构建速度优化：yarn dev 敲下的一瞬间到呈现结果要占用多长时间
  - webpack在这方面下的功夫是很重的
  - vite是按需优化，所以我们不需要太care这方面

- 页面性能指标：和我们怎么去写代码有关
  - 首屏渲染时长 FCP （first content paint）
    - 懒加载：我们需要去写代码实现的
    - http优化：协商缓存和强缓存
      - 强缓存：服务端给响应头追加一些字段（expires）客户端会记住这些字段，在expires截止失效时间没有到达之前无论怎么刷新页面 客户端都不会发http请求出去，而是从缓存里取
      - 协商缓存：是否使用缓存要跟后端协商一下，当服务端给我们打上协商缓存的标记以后，客户端在下次刷新页面需要重新请求资源会发送一个协商请求发送到服务端，服务端如果说需要变化，则会响应具体的内容，如果服务端觉得没变化则会相应304
  - 页面中最大元素的一个时长 LCP (largest content paint )
   

- js逻辑：
  - 我们要注意副作用的清楚 比如计时器等等
  - 我们在写法上一个注意事项：requestAnimationFrame,resuestIdleCallback
    - 浏览器的帧率：16.6ms去更新一次 （执行js逻辑以及重排重绘）

- css
  - 关注继承属性

- 生产的优化：vite（rollup） webpack
  - 优化体积：压缩，treeshaking，图片资源压缩，cdn加载，分包策略

# 分包策略

浏览器的缓存策略
静态资源-->名字没有变化，那么他就不会重新去拿

分包就是把一些不会常规更新的文件，进行单独打包处理

多出口页面
```
 output: {
      
        manualChunks: (id:string) => {
          console.log("id", id);
          if (id.includes("node_modules")) {
            return "vender"
          }
        },
      }
```

# [构建优化篇]gzip压缩
有时候我们的文件资源实在是太大了 一个js资源占2k kb  http传输压力也大

将所有的静态资源进行压缩，已达到减少体积的目的

服务端->压缩文件

客户端收到压缩包-->解压缩
`
- 安装插件  vite-plugin-compression2

会生成gz压缩文件的

服务端读到gzip文件（.gz后缀）设置一个响应头 content`-encoding -->gzip
浏览器收到响应结果 发现响应头有gzip就解压 得到原来原原本本的js文件 （告诉浏览器要承担一定的解压时间的）
如果体积不是很大的话 不要用gzip压缩

# [构建优化篇]动态导入

# [构建优化篇]CDN加速
- 安装插件 vite-plugin-cdn-import
