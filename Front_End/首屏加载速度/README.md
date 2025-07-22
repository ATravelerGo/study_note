# 首屏加载速度

## 计算首屏的时间  利用performance.timing提供的数据

通过DOMContentLoad或者performance来计算出首屏时间
```js
// 方案一：
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('first contentful painting');
});
```
        
## 加载慢的原因
1. 网络延迟问题
2. 资源文件体积过大
3. 资源是否重复发送请求去加载了
4. 加载脚本的时候，渲染内容阻塞了

## 解决方案
1. 减少入口文件体积
    常用手段是路由懒加载
```js
routes:[
    {
        path: 'Blogs',
        name: 'ShowBlogs',
        component: () => import('./components/ShowBlogs.vue')
        //以函数的形式加载路由，这样就可以把各自的路由文件分别打包，只有在解析给定的路由时，才会加载路由组件
    }
]
```

2. 静态资源本地缓存
    后端返回资源问题：
        采用http缓存，设置cache-control last-modified etag等响应头
    前端合理利用localStorage
3. ui框架按需加载
```js
import { Button, Input, Pagination, Table, TableColumn, MessageBox } from 'element-ui';
Vue.use(Button)
Vue.use(Input)
Vue.use(Pagination)
```
4. 图片资源的压缩
    图片压缩，在线字体图标或者雪碧图
   
5. 组件重复打包
   假设A.js文件是一个常用的库，现在有多个路由使用了A.js文件，这就造成了重复下载
   解决方案：在webpack的config文件中，修改CommonsChunkPlugin的配置
   minChunks为3表示会把使用3次及**以**上的包抽离出来，放进公共依赖文件，避免了重复加载组件
```js
minChunks: 3
```
6. 开启GZip压缩
7. 使用SSR