# 图解HTTP

    管线化（其实就是异步请求，不用同步请求，不用上一个请求完再请求下一个）
![img.png](img.png)
    
    报文主体等于实体主体。只有当传输中进行编码操作时，实体主体的内容发生变化，才导致他和报文主体产生差异
![img_1.png](img_1.png)
    
    其实编码就是压缩
 ![img_2.png](img_2.png)   
 
    常见内容编码有
        gzip
        compress  unix系统的标准压缩
        deflate zlib
        identity  不进行编码 ！！！

    能把实体主体分块的功能称为分块传输编码
![img_3.png](img_3.png)
![img_4.png](img_4.png)

    http 1.1 存在一种称为传输编码的机制，他可以在通信时按照某种编码方式传输，但只定义作用于分块传输编码中
    分块传输编码的工作流程
    服务器响应头：服务器在响应中会包含一个 Transfer-Encoding: chunked 的标头，告诉客户端接下来的内容会以分块的方式传输。
    数据分块：
    每个数据块由两部分组成：块大小（以十六进制表示）和实际数据。块大小标明了当前数据块的字节长度。
    在块大小之后是实际的数据内容。
    传输的最后一个块是一个大小为 0 的块，表示数据传输结束。
    客户端解析：客户端收到数据后，会根据每个块的大小逐块读取数据，并在最后一个块到达时结束读取。

```
axios({
    method: 'get',
    url: 'https://example.com/large-file',  // 替换为实际的 URL
    responseType: 'stream'
})
.then(response => {
    response.data.on('data', (chunk) => {
        console.log('Received chunk:', chunk.toString());  // 处理每个数据块
    });

    response.data.on('end', () => {
        console.log('Stream ended.');
    });
})
.catch(error => {
    console.error('Error during request:', error);
});

```

    发送多种数据的多部分对象集合
        发送邮件时，我们可以在邮件里写入文字并添加多份附件。这是因
        为采用了 MIME（Multipurpose Internet Mail Extensions，多用途因特网
        邮件扩展）机制，它允许邮件处理文本、图片、视频等多个不同类型的
        数据。例如，图片等二进制数据以 ASCII 码字符串编码的方式指明，就
        是利用 MIME 来描述标记数据类型。而在 MIME 扩展中会使用一种称
        为多部分对象集合（Multipart）的方法，来容纳多份不同类型的数据。

    相应地，HTTP 协议中也采纳了多部分对象集合，发送的一份报文主体内可含有多类型实体。通常是在图片或文本文件等上传时使用。
        多部分对象集合包含的对象如下。
![img_5.png](img_5.png)

    获取部分内容的范围请求
        以前，用户不能使用现在这种高速的带宽访问互联网，当时，下载
        一个尺寸稍大的图片或文件就已经很吃力了。如果下载过程中遇到网络
        中断的情况，那就必须重头开始。为了解决上述问题，需要一种可恢复
        的机制。所谓恢复是指能从之前下载中断处恢复下载。
        要实现该功能需要指定下载的实体范围。像这样，指定范围发送的
        请求叫做范围请求（Range Request）。
        对一份 10 000 字节大小的资源，如果使用范围请求，可以只请求
        5001~10 000 字节内的资源。
![img_6.png](img_6.png)
