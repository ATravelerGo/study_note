# 前端路由原理
https://zhuanlan.zhihu.com/p/688104557

# hash模式

## location 的常用属性
href：获取或设置完整的 URL。
host：获取或设置主机名和端口号。
hostname：获取或设置主机名。
protocol：获取或设置协议部分（如 "http:" 或 "https:"）。
pathname：获取或设置 URL 的路径部分。
search：获取或设置 URL 的查询部分（即问号后面的部分，包括问号）。
hash：获取或设置 URL 的片段标识部分（即井号后面的部分，包括井号）。
origin：获取只读属性，表示 URL 的源部分（协议+主机+端口）。
通过访问 window.location 对象的这些属性，可以方便地获取当前页面的 URL 信息，并且在需要时进行相应的修改。这些属性对于处理 URL 相关的逻辑非常有用。

## location 常用方法
assign(url)：加载(显示指定的 URL 的内容（加载新的文档并替换当前文档，类似于用户点击链接跳转页面。例如：window.location.assign('https://www.baidu.com'))
replace(url)：刷新当前页面（用新的文档替换当前文档，不会在历史记录中生成新的条目。例如：window.location.replace('https://www.baidu.com'))
reload()：替换当前的资源（重新加载当前文档。如果带有参数 forceReload 为 true，则会强制从服务器重新加载文档，而不使用缓存。例如：window.location.reload(true)）。
window.onhashchange 事件
```js
function locationHashChanged() {
  if (location.hash === '#/about') {
    console.log("欢迎进入about页面");
  }
}
window.onhashchange = locationHashChanged;
// hash值的改变也会触发 window.onpopstate事件，onpopstate事件在 history模式中再做介绍
window.addEventListener("popstate", () => {
  console.log("popstate 事件被触发了");
})
```
直接修改浏览器url地址，添加 hash 值 #/about。可以看出，修改 hash 值会优先触发 popstate 事件，然后再触发 hashchange 事件


# history模式
history 是 HTML5 提供的新特性，允许开发者直接更改前端路由，也就是更改 url 地址而无需向后端发送 http 请求。
history 是 window.history 的简写模式，是 History 构造函数的实例化对象。
History 接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录。
也就是说 History 里面保存着当前标签页的所有浏览页面的访问记录。

## history API

> 实例化对象属性

length 会话历史记录中元素的数目，包括当前加载的页面 Integer（整型数值）
scrollRestoration 设置浏览器的默认滚动行为 auto(默认值，浏览器自动滚动) / manual(关闭浏览器自动滚动)
state 返回一个表示历史堆栈顶部的状态的任意值 

> 实例化对象方法

back() 在会话历史记录中向后移动一页。如果没有上一页，则此方法调用不执行任何操作 window.history.back()
forward() 在会话历史中向前移动一页 window.history.forward();
go() go方法从会话历史记录中加载特定页面 window.history.go(-1); 负值表示向后移动back()，正值表示向前移动forward(); 值为0或不传时重新加载当前页面
pushState() 向当前浏览器历史中添加记录 history.pushState(state, title[, url])
```js
// 添加一个新的历史记录
const state = { userId: 123 };
const title = "用户页面";
const url = "/user/123";

history.pushState(state, title, url);

// 访问新的 URL
console.log(window.location.href); // 输出当前 URL，包括 /user/123

```
history.pushState()的使用
history.pushState() 方法接收三个参数：
state：一个对象，popState 事件触发时，state 对象会传入回调函数。如无需传参，则设置为 null 。
title：新页面的标题，但是所有浏览器目前都忽略这个值，因此可以设置为空字符串 "" 或者 null 。
url：新的网址地址，必须与当前页面处于同一个域下，浏览器的地址栏将显示这个网址。


replaceState() 修改当前历史记录实体，可以更新 state 对象以及 URL 地址。 history.replaceState(stateObj, title[, url]);

