# 浏览器如何一次性渲染很多数据呢
    前端如何一次性渲染10w条数据呢

再v8的事件循环机制event-loop中，v8在执行完同步代码、微任务之后，在执行宏任务之前，这中间还有一个页面渲染的过程，定时器前面的代码都是同步代码，定时器是个宏任务，但是浏览器执行宏任务之前会判断是否有需要渲染页面的任务，如果有就会先去渲染页面，因此这里写个定时器的打印就能代表页面渲染了多久时间，页面加载了多久

事件循环机制： 在浏览器中，事件循环的执行顺序大致如下：

执行所有的 同步代码。
然后执行所有的 微任务（如 Promise.then）。
在微任务执行完毕后，浏览器会判断是否需要渲染（布局、绘制）。如果 DOM 或 CSS 有变化，浏览器会执行一次渲染。
接下来才会执行下一个 宏任务（如 setTimeout 的回调）。
```js
 window.requestAnimationFrame(() => {
            for (let i = 0; i < pageCount; i++) {
                let li = document.createElement('li')
                li.innerHTML = ~~(Math.random() * total)
                ul.appendChild(li)
            }
            loop(curTotal - pageCount)
        })

```
window.requestAnimationFrame代替了settimeout


fragment是虚拟文档碎片，我们一次for循环产生 20 个li的过程中可以全部把真实dom挂载到fragment上，然后再把fragment挂载到真实dom上，这样原来需要回流十万次，现在只需要回流100000 / 20次
```
直译过来就是文档碎片，表示一个没有父级文件的最小文档对象。它被作为一个轻量版的 Document。最大的区别是因为 DocumentFragment 不是真实DOM树的一部分，它的变化不会触发 DOM 树的（重绘) ，且不会导致性能等问题。
它主要用来解决dom元素的插入问题，比如需要插入多个dom节点时，可以创建一个Document​Fragment，把节点依次添加到Document​Fragment上，添加完毕后再把Document​Fragment添加到页面document上，这样只会产生一次重绘。而如果直接把dom节点依次添加到页面document上就会引发多次重绘
```
