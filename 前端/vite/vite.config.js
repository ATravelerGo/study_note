import {defineConfig } from 'vite'

import viteProdConfig from "./vite.prod.config";
import viteDevConfig from "./vite.dev.config";
import viteBaseConfig from "./vite.base.config";

//策略模式
const envResolver={
    "build":()=> {
        console.log("生产环境")
     return    Object.assign({},viteBaseConfig,viteProdConfig)
    },
    "serve":()=> {
        console.log("开发环境")
        return  Object.assign({},viteBaseConfig,viteDevConfig)
    },
}

export  default defineConfig(({command})=>{
    //是build还是serve主要取决于我们敲的命令是开启开发环境还是生产环境
    console.log("command",command)
    return envResolver[command]()


})