import {defineConfig } from 'vite'

export  default defineConfig({
    optimizeDeps:{  //依赖预构建
        exclude:[
            // 'lodash-es'
        ] //当遇到lodash-es这个依赖的时候 不进行依赖预构建，然后会发现http请求非常多的js模块文件
    }

})