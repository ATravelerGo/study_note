# Electron桌面开发

## 打包后的应用本身会包含 Electron 的二进制文件，因此不需要将 Electron 作为生产环境依赖。

## app和win没有绑定关系吗  win 不需要挂载到 app 上吗？

不需要。因为 Electron 设计上就是：
• app 控制主进程；
• BrowserWindow 是一个类（Class），你调用 new BrowserWindow() 就会在系统上 生成一个原生窗口；
• 它们没有父子依赖关系，但通常你会 在 app 启动后创建窗口，这是惯例。
----------------------------------------------------------------------------------------
• app，这个模块控制着您应用程序的事件生命周期。
• BrowserWindow，这个模块创建和管理 app 的窗口。

## 应用中的每个页面都在一个单独的进程中运行，我们称这些进程为 渲染器 (renderer) 。 渲染进程使用与常规Web开发相同的JavaScript API和工具，例如使用 webpack来打包和压缩您的代码，或使用 React 构建用户界面。

## 通过检查 Node.js 的 process.platform 变量，您可以针对特定平台运行特定代码。 请注意，Electron 目前只支持三个平台：win32 (Windows), linux (Linux) 和 darwin (macOS) 。

## contextBridge.exposeInMainWorld 会将你定义的对象或函数 暴露到渲染进程的全局 window 对象上

## ipcRenderer 是 Electron 中渲染进程（Renderer Process）用来和主进程（Main Process）进行通信的模块。

```ts
const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('versions', {
    ping: () => ipcRenderer.invoke('ping')
})
```

• 它提供的方法主要有：
• send(channel, ...args)：发送异步消息给主进程。
• invoke(channel, ...args)：发送异步请求给主进程，并返回 Promise，等待主进程响应。
• on(channel, listener)：监听主进程发来的异步消息。
• once(channel, listener)：监听一次主进程发来的消息。


## ipcMain 是 Electron 主进程（Main Process）用来接收和响应来自渲染进程（Renderer Process）消息的模块。

常用的方法有：
• on(channel, listener)：监听渲染进程发送到指定频道的异步消息。
• handle(channel, listener)：监听 ipcRenderer.invoke 发送的异步请求，并且通过返回值给渲染进程响应（基于 Promise）。
• removeListener、removeAllListeners 等用来移除监听。

## Electron 核心本身只负责开发和运行应用，它提供了创建桌面应用的框架和API，但是不包含打包发布的工具。