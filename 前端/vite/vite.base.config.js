import { defineConfig } from "vite";
import postcssPresetEnv from "postcss-preset-env";
import path from "path";
import ViteAliasesMe from "./plugins/ViteAliases";
export default defineConfig({
  optimizeDeps: {
    exclude: [], //将指定属猪中的依赖不进行依赖预构建
  },

  envPrefix: "VITE_", //配置vite注入客户端环境变量校验的env前缀

  css: {
    //对css的行为进行配置
    modules: {
      //对css模块化进行配置
      //modules配置最终会丢给postcss modules的
      localsConvention: "camelCaseOnly", //改变module中key的显示方式
      scopeBehaviour: "local", //local是默认值  global的话 就没有hash了 我们一般不用
      // generateScopedName:"[name]_[local]_[hash:5]"
      generateScopedName: (name, filename, css) => {
        //name代表css文件中的类名
        //filename是css文件的绝对路径
        //css就是当前的样式
        return "[name]_[local]_[hash:5]";
      },
      hashPrefix: "", //生成哈希的前缀
      globalModulePaths: [], //代表你不想参与到css模块化的路径
    },
    preprocessorOptions: {
      //用来css预处理的一些配置
      sass: {
        //整个的配置对象都会最终给到sass的执行参数（全局参数）中去
      },
    },
    devSourcemap: true, //开启css的sourceMap（文件索引）
    // postcss:{  //如果不想在这里配置可以创建postcss.config.js 在里面进行配置 和 在这里进行配置是一样的
    //     plugins:[postcssPresetEnv()]
    //
    // }
  },

  // resolve:{
  //     alias:{
  //         "@":path.resolve(__dirname,"./src"),
  //         "@assets":path.resolve(__dirname,"./src/assets")
  //     }
  // },

  plugins: [ViteAliasesMe()],

  build: {
    rollupOptions: {

      input:{ //可以自由修改 key，但要注意它影响构建后的文件名。
        main:"./index.html",
        product:"./product.html",
      },

      //配置rollup的一些构建策略
      output: {
        //控制输出
        //在rollup里面 hash代表将你的文件名和文件内容进行组合计算得到的结果
        assetFileNames: "[hash].[name].[ext]", //不适用于js文件
        manualChunks: (id:string) => {
          console.log("id", id);
          if (id.includes("node_modules")) {
            return "vender"
          }
        },
      },
    },
    assetsInlineLimit: 4069, //4KB 如果小于4KB会转为base64字符 这样就不会把小于4KB的图片也打包出来了
    outDir: "dist", //打包生成文件名
    assetsDir: "assets", //静态资源所在的文件名 这里其实就是放的js东西
    emptyOutDir: true, //清除输出目录的内容
    minify: false, //是否开启压缩代码
  },
});
