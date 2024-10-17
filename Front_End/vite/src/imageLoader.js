//主要来帮助我们学习怎么加载静态资源
import pic from './assets/images/img.png?url'; //默认就是url
import pic1 from './assets/images/img.png?raw'; //获取到的是图片的buffer字符串

console.log("pic",pic)
console.log("pic1",pic1)
const img=document.createElement("img")
img.src=pic
document.body.appendChild(img)


