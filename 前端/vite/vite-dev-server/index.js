const Koa=require('koa')
const fs=require('fs')
const path=require('path')
//不同的宿主环境会给js赋予一些不同的能力  在浏览器可以用document  在node中就可以使用fs
const app=new Koa()

//node最频繁做的事情就是在处理请求和操作文件



app.use((ctx)=>{
    // console.log("ctx",ctx.request,ctx.response)

    if(ctx.request.url==="/"){
        //这意味着其他人再找我们要根路径的东西
        const indexContent=fs.readFileSync(path.resolve(__dirname,"./index.html"),'utf8')

        ctx.response.body=indexContent //作为响应体发给对应请求的人
        //你响应体是填充好了，那你要以什么形式发给他呢，你希望对方拿到你的东西的时候以什么方式去解析呢
        ctx.response.set("Content-Type","text/html")
    }

    if(ctx.request.url==="/src/main.js"){
        //这意味着其他人再找我们要根路径的东西
        const indexContent=fs.readFileSync(path.resolve(__dirname,"./src/main.js"),'utf8')

        ctx.response.body=indexContent //作为响应体发给对应请求的人

        ctx.response.set("Content-Type","text/javascript") //这个必须得要 不然得话 不会继续请求里面import中的东西
    }

    if(ctx.request.url==="/src/App.vue"){
        //这意味着其他人再找我们要根路径的东西
        const indexContent=fs.readFileSync(path.resolve(__dirname,"./src/App.vue"),'utf8')

        ctx.response.body=indexContent //作为响应体发给对应请求的人

        ctx.response.set("Content-Type","text/javascript") //这个必须得要 不然得话 不会继续请求里面import中的东西
    }



})

app.listen(9500,()=>{
    console.log("listen on 9500")
})