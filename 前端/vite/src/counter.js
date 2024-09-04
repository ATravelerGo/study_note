import  _ from 'lodash' //lodash可能也导入了依赖
import lodashes from 'lodash-es'

//假设lodash又依赖了其他的模块，并且这些模块都是用export导出
console.log("lodash",_,lodashes)
//既然我们现在的最佳实践就是node_modules，那为什么es官方在我们导入非绝对路径的和非相对路径的时候不默认帮我们搜寻node_modules，因为太消耗浏览器端性能了，因为导入依赖是走网络资源的  webpack是占用服务端资源
export const count=0