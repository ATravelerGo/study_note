//vite的插件 必须返回给vite一个配置对象

const fs=require("fs");
const path=require("path");

module.exports= ()=>{

    return {
        config:(config,env)=>{
            // console.log("config",config)
            // console.log("env",env)
            //config 目前的一个vite.config配置对象  只是传给你 还没有执行而已

            //config函数可以返回一个对象，这个对象是部分的viteconfig对象（其实就是你想改的部分）

            //我们要这里读目录
           const resolveAliasesObj=  getTotalSrcDir()
            console.log("resolveAliasesObj",resolveAliasesObj)
            return {
                // envPrefix:"123"
                //在这我们要返回一个resolve出去 ,将src目录下的所有文件夹进行别名控制

                resolve:{
                    alias:resolveAliasesObj
                }
            }
        }
    }

}

function diffDirAndFile(dirFilesArr=[]){
    const result= {
        dirs:[],
        files:[]
    }
    dirFilesArr.forEach((name)=>{
        //判断这个文件是文件还是目录
        const currentFileStat=fs.statSync(path.resolve(__dirname,`../src/${name}`))
        // console.log("path.resolve(__dirname,`../src/${name}`)",path.resolve(__dirname,`../src/${name}`))
        if(currentFileStat.isDirectory()){
            result.dirs.push(name)
        }else {
            result.files.push(name)
        }
    })

    return result

}


function getTotalSrcDir(){

    const result=fs.readdirSync(path.resolve(__dirname,`../src`))
    // console.log("result",result)  //我们要筛选出来文件夹 把文件去掉


   const dirAndFileDiff= diffDirAndFile(result)
    const resolveAliasesObj={} //放的就是一个个别名配置
    dirAndFileDiff.dirs.forEach((dirname)=>{
        const key=`@${dirname}`
        const absPath= path.resolve(path.resolve(__dirname,`../src`+"/"+dirname))
        resolveAliasesObj[key]=absPath
    })

    return resolveAliasesObj
}


// function demo({a=10}){
//     console.log("a",a)
// }
//
// demo({a:20})