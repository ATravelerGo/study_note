// import  {count} from './src/counter.js'
// import './index.css'


import "./src/imageLoader.js"
// import jsonFile from './src/assets/json/index.json'

// console.log("jsonFile",jsonFile) //如果你用的不是vite  在其他构建工具里面你的json文件的导入会作为一个json字符串的形式存在  用的时候还得json.parse

import  {name} from './src/assets/json/index.json'

// tree shaking 摇数优化：打包工具会自动帮你移除那些你没有用到的变量或者方法
console.log("name",name)