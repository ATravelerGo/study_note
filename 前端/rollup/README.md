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

## 压缩打包后的代码的插件
    npm install --save-dev @rollup/plugin-terser

# 代码分割