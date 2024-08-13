# Rollup 是一个用于 JavaScript 的【模块打包工具】
    它将小的代码片段编译成更大、更复杂的代码，例如库或应用程序。
    它使用 JavaScript 的 ES6 版本中包含的新标准化代码模块格式，而不是以前的 CommonJS 和 AMD 等特殊解决方案。
    ES 模块允许你自由无缝地组合你最喜欢的库中最有用的个别函数。这在未来将在所有场景原生支持，但 Rollup 让你今天就可以开始这样做。

# 安装
    npm install --global rollup
# 使用
    这些命令假定你的应用程序入口点命名为 main.js，并且希望将所有导入编译到一个名为 bundle.js 的单个文件中。
    Rollup 允许你使用新的模块系统编写代码，然后将其编译回现有的支持格式，例如 CommonJS 模块、AMD 模块和 IIFE 样式脚本。这意味着你可以编写 对未来兼容 的代码，并且还可以获得以下几点收益……

# 特点
## Tree-Shaking
    除了可以使用 ES 模块之外，Rollup 还可以静态分析你导入的代码，并将排除任何实际上没有使用的内容。这使你可以在现有的工具和模块的基础上构建，而不需要添加额外的依赖项或使项目的大小变得臃肿。
    例子：import { ajax } from './utils'; 按需导入
    因为 Rollup 只包含最少的内容，因此它生成的库和应用程序更轻、更快、更简单。由于这种方法可以利用显式的 import 和 export 语句，因此它比仅运行最小化混淆工具更能有效检测出已编译输出代码中的未使用变量。

## rollup可以通过插件导入现有的commonjs模块

## 当package.json中的type=module的时候 js文件里使用commonjs规范是无法通过node执行这个文件的
    使用commonjs导入的时候不是按需导入，是全部都导入进去

# 配置文件
    Rollup 配置文件是可选的，但它们非常强大和方便，因此推荐使用。配置文件是一个 ES 模块，它导出一个默认对象，其中包含所需的选项：
```
/** @type {import('rollup').RollupOptions} */
// ---cut---
export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    }
};
```
    通常，它被称为 rollup.config.js 或 rollup.config.mjs，并位于项目的根目录中。除非使用 --configPlugin 或 --bundleConfigAsCjs 选项，否则 Rollup 将直接使用 Node 导入该文件。
    rollup配置文件天生支持esmodule 如果想用commonjs标准写配置文件需要做很多兼容性工作

# 使用插件
    到目前为止，我们已经用入口文件和通过相对路径导入的模块打了一个简单的包。随着你需要打包更复杂的代码，通常需要更灵活的配置，例如导入使用 【NPM 安装的模块】、【使用 Babel 编译代码】、【处理 JSON 文件】等等。
## 使用 @rollup/plugin-json，它允许 Rollup 从 JSON 文件中导入数据。
    npm install --save-dev @rollup/plugin-json

## 压缩打包后的代码的插件 也叫使用输出插件
    npm install --save-dev @rollup/plugin-terser

## @rollup/plugin-node-resolve 插件可以让 Rollup 找到外部模块

## @rollup/plugin-commonjs 一些库会暴露出 ES 模块，你可以直接导入它们，the-answer 就是这样的一个模块。但是目前，大多数 NPM 上的包都以 CommonJS 模块的方式暴露。在这种情况下，我们需要在 Rollup 处理它们之前将 CommonJS 转换为 ES2015。

##  @rollup/plugin-babel  npm i -D @rollup/plugin-babel @rollup/plugin-node-resolve
    在 Babel 实际编译代码之前，需要进行配置。创建一个名为 src/.babelrc.json 的新文件：

##  rollup-plugin-hot 热更新 
```
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import hot from 'rollup-plugin-hot';
import serve from 'rollup-plugin-serve';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm', // ESM 格式，因为 HMR 通常用于现代浏览器
    sourcemap: true
  },
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    serve({
      contentBase: 'dist',
      port: 3000
    }),
    hot({
      // Rollup 插件的选项
      public: 'dist',
      inMemory: true, // 可以配置为 false，将输出文件写入磁盘
      verbose: true // 启用详细日志
    })
  ]
};

```

```
{
    "presets": ["@babel/env"]
}
```
    现在，在运行 rollup 之前，我们需要安装 babel-core 和 env 预设： npm i -D @babel/core @babel/preset-env

# 代码分割
    代码分割是指有些情况下 Rollup 会自动将代码拆分成块，例如【动态加载】或【多个入口点】，还有一种方法可以【显式地告诉 Rollup 将哪些模块拆分成单独的块】，这是通过 【output.manualChunks】 选项实现的。
    【注意点】
        1.应用代码拆分的时候 导出格式不能是iife他不支持代码拆分 可以规定格式为esm 或cjs
        2.代码拆分的时候 output.file失效，要使用output.dir来设置拆分后的所有文件存放位置
            这将创建一个名为 dist 的文件夹，其中包含两个文件，main.js 和 chunk-[hash].js, 其中 [hash] 是基于内容的哈希字符串。你可以通过指定 output.chunkFileNames 和 output.entryFileNames 选项来提供自己的命名模式。

    代码分割的另一个用途是能够【指定共享一些依赖项的多个入口点】
    input: ['main.js','main2.js'],两个入口都引入同一个文件最后打包只会生成一份共享分块文件

# 重大模糊点  尽管导出的是let 但是根据模块化规范 是不允许直接修改 引入的变量的值的
```
// incrementer.js
export let count = 0;
export function increment() {
    count += 1;
}

// main.js
import { count, increment } from './incrementer.js';

console.log(count); // 0
increment();
console.log(count); // 1
count += 1; // Error - 只有 incrementer.js 可以更改这个变量
```

# 即使 Rollup 在打包时通常会尝试维护精确的模块执行顺序，但在两种情况下，这并不总是成立：代码分割和外部依赖。
    1.代码分割的顺序会变 是因为会提前把要导入的提前到main.js 这样在开始的就是就把全部依赖分析好
    2.外部依赖的模块会有一个引入提升效果，外部依赖的引入优先级很高，因为他不属于本地的代码的范畴
# external  选项用于指定哪些模块应该被视为“外部模块”。这意味着这些模块不会被包含在生成的捆绑包中，而是被保留为外部依赖，通常通过 import 或 require 来引入。
```
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';

// ---cut-start---
/** @type {import('rollup').RollupOptions} */
// ---cut-end---
export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [
        resolve({
            // 将自定义选项传递给解析插件
            moduleDirectories: ['node_modules']  
        })
    ],
    // 指出哪些模块应该视为外部模块
    external: ['lodash']  //重点
};

```

# Rollup中并不支持类似HMR这种高级特性
    rollup并不是要与webpack全面竞争，他初衷是提供一个充分利用EMS各项特性的高效打包器
# rollup 
    输入结果更加扁平
    自动移除未引用的代码
    打包结果依然完全可读

    缺点：
        模块最终都被打包到一个函数中，无法HMR
        
    应用程序使用webpack
    如果开发库或者框架用rollup

