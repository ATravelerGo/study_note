import {defineConfig, loadEnv} from "vite"

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
        return  Object.assign({},viteBaseConfig,viteDevConfig) //新配置里可能会配置envDir的
    },
}

export  default defineConfig(({command,mode})=>{
    //是build还是serve主要取决于我们敲的命令是开启开发环境还是生产环境
    // console.log("command",command)
    // console.log("process",process.env) //这里实际还是取不到env文件的配置，我们也不用这个读取，他也读取不到env的东旭
    //第二个参数不是一定要使用process.cwd，这里我们图方便，大多数我们会使用peocess.cwd 因为我们把.env都放在工作目录下，也就是根目录上
    //第三个参数 "": 这个参数表示环境变量文件的前缀。

    const env=loadEnv(mode,process.cwd(),"")
    console.log("env",env)


    console.log("////mode",mode)
    return envResolver[command]()


})