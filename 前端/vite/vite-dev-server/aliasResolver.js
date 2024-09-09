module.exports=function (aliasConf,jsContent){

    const entries=Object.entries(aliasConf)
    let lastContent=jsContent
    console.log("jsContent",jsContent)
    entries.forEach((entry)=>{
        const [alia,path] =entry
        console.log("path",path)
        const srcIndex=path.indexOf('/src') //这里有问题 需要解决
        const realPath=path.slice(srcIndex,path.length)
        console.log("realPath",realPath)
        lastContent=jsContent.replace(alia,realPath)
        console.log("lastContent",lastContent)
    })


    return jsContent


}