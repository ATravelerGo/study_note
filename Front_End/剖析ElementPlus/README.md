# 项目基建

## 1. tsconfig相关配置

```json
//tsconfig.base.json
{
  "compilerOptions": {
    //指定编译后的文件输出的目录，所有的 .js、.d.ts 文件将输出到 dist 目录。
    "outDir": "dist",
    //指定编译后的 JavaScript 代码的目标版本。
    "target": "es2018",
    //指定模块系统，决定如何处理模块导入和导出 使用 ESNext 模块系统，这意味着使用 import 和 export 语法，并生成符合未来 ECMAScript 标准的模块。
    "module": "esnext",
    //设置模块解析时的基准目录 这个选项指定从哪个目录开始查找模块。如果设置为 "."，表示从当前目录开始。
    "baseUrl": ".",
    //指定是否为编译后的代码生成源映射文件
    "sourceMap": false,
    //指定如何解析模块。 "node" 是 Node.js 的模块解析策略。它会按 Node.js 的规则查找模块（首先检查文件，若没有则查找目录中的 package.json 等）。
    "moduleResolution": "node",
    //指定是否允许编译 JavaScript 文件
    "allowJs": false,
    //启用所有严格的类型检查选项。
    "strict": true,
    //检查并报告未使用的局部变量
    "noUnusedLocals": true,
    //允许导入 JSON 文件 启用此选项后，允许通过 import 语法引入 .json 文件，TypeScript 会将它们当作模块来处理。
    "resolveJsonModule": true,
    //允许从没有默认导出的模块中使用默认导入语法。
    "allowSyntheticDefaultImports": true,
    //启用 ES 模块与 CommonJS 模块之间的兼容性。 它允许你在使用 import 语法时，能够兼容 CommonJS 风格的模块，即使该模块没有使用 export 和 import 语法。
    "esModuleInterop": true,
    //指定是否删除注释。
    "removeComments": false,
    //设置项目的根目录,此选项指定输入文件（.ts）的根目录，通常是项目的根目录。它用于构建目录结构。  这个目录被认为是项目的根目录，所有输入文件都应相对于这个目录来查找。
    "rootDir": ".",
    "types": [],
    "paths": {
      "@element-plus/*": [
        "packages/*"
      ],
      "element-plus": [
        "packages/element-plus"
      ]
    },
    "preserveSymlinks": true
  }
}

```

```json
//tsconfig.json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.web.json"
    },
    {
      "path": "./tsconfig.play.json"
    },
    {
      "path": "./tsconfig.node.json"
    },
    {
      "path": "./tsconfig.vite-config.json"
    },
    {
      "path": "./tsconfig.vitest.json"
    }
  ]
}

```

```json
//tsconfig.web.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "jsx": "preserve",
    "lib": [
      "ES2018",
      "DOM",
      "DOM.Iterable"
    ],
    "types": [
      "unplugin-vue-macros/macros-global"
    ],
    "skipLibCheck": true
  },
  "include": [
    "packages",
    "typings/env.d.ts"
  ],
  "exclude": [
    "node_modules",
    "**/dist",
    "**/__tests__/**/*",
    "**/gulpfile.ts",
    "**/test-helper",
    "packages/test-utils",
    "**/*.md"
  ]
}


```

```json
//tsconfig.node.json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "lib": [
      "ESNext"
    ],
    "types": [
      "node"
    ],
    "skipLibCheck": true
  },
  "include": [
    "internal/**/*",
    "internal/**/*.json",
    "scripts/**/*",
    "packages/theme-chalk/*",
    "packages/element-plus/version.ts",
    "packages/element-plus/package.json"
  ],
  "exclude": [
    "**/__tests__/**",
    "**/tests/**",
    "**/dist"
  ]
}


```

## 2. monopreo相关配置

```js
//pnpm-workspace.yaml
packages:
    -'packages/*'
    - 'play'
    - 'docs'

```

```json
//package.json 中也可以配置
"workspaces": [
"packages/*",
"play",
"docs"
],
```

> 如果两个配置文件都存在，pnpm 会优先读取 pnpm-workspace.yaml 文件中的配置。package.json 中的 workspaces 字段更多的是为兼容性考虑。

## 3. vitest暂时没接触，需要下去拓展

后面项目进行了迁移
