//这里我们引入commonjs的语法,会发现rollup -c 命令也不会报错 但是打包的文件里面内容不对 必须要引入commonjs插件才可以

// const user=require("./src/user.js")
//
// console.log(user.add(1,2))

// -------------------------------------------------------------------

//这里我们尝试引入json数据 在我们不安装插件之前会发现执行命令报错了，需要安装插件并使用
// import {version} from './package.json'
//
// console.log("version", version)


//这里我们尝试代码分割  这里是引入动态加载（导入）

function main (){
    import('./user-BQYmGl6P.js').then((data)=>console.log(data));
}

export { main as default };
