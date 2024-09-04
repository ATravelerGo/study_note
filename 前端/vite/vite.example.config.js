import  {defineConfig } from 'vite'


export default defineConfig({
    optimizeDeps:{
        exclude:[]//将指定属猪中的依赖不进行依赖预构建
    },
    envPrefix:"VITE_" //配置vite注入客户端环境变量校验的env前缀
})