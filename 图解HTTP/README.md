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
    
    如果服务器端无法相应范围请求，则会返回状态码200 和完整的实体内容
    axios操作定义请求头
    responseType: 'stream',
    headers: {
        'Range': `bytes=${downloadedSize}-`  // 从已下载字节数继续请求
    }
    

    缓存不仅可以存在缓存服务器内，还可以存在客户端浏览器中， 以IE为例，把客户端缓存称为临时网络文件
    浏览器缓存如果有效，就不必再想服务器请求相同的资源了，可以直接从本地磁盘内读取
    另外，和缓存服务器相同的一点是，当判定缓存过期后，会向服务器确认资源的有效性，若判断浏览器缓存失效，浏览器会再次请求新资源
![img_7.png](img_7.png)

    从字面意思上很容易把 no-cache 误解成为不缓存，但事实上 no-cache 代表不
    缓存过期的资源，缓存会向源服务器进行有效期确认后处理资源，也许称为
    do-not-serve-from-cache-without-revalidation 更合适。no-store 才是真正地不进
    行缓存，请读者注意区别理解。

    http有四种http首部字段类型
        HTTP首部字段根据实际用途被分为以下4种类型
        1.通用首部字段：请求报文和响应报文都会使用的首部
            Cache-Control 操作缓存的工作机制
                缓存请求指令
                no-cache：强制向服务器再次验证，哪怕有缓存也要再次验证，不立即使用缓存要验证
                no-store：不缓存请求或响应的任何内容
                max-age=【秒】：响应的最大age值  强调缓存资源的最大生命周期，用于控制缓存资源的生效时间。
                max-stale=【秒】：接收已过期的响应  Cache-Control: max-stale=60 表示客户端可以接受最多过期 60 秒的响应。  允许使用已过期的资源，适用于对时效性要求不高或网络状况不佳时。
                min-fresh=【秒】：期望在指定时间内的响应仍有效   强调资源在未来一定时间内的有效性，适用于对时效性要求高的场景。
                no-transform：代理不可更改媒体类型
                only-if-cached：从缓存获取资源
                    cache-extension 指令通常附加在 Cache-Control 头中，与标准指令一起使用
                    Cache-Control: max-age=3600, my-extension=custom-value
                    其中 my-extension=custom-value 就是一个 cache-extension，它定义了一个名为 my-extension 的自定义缓存行为。

                缓存响应指令
                privite
                public
![img_11.png](img_11.png)


                

![img_9.png](img_9.png)
![img_10.png](img_10.png)

        Connection
            两个作用
                控制不在转发给代理的首部字段
![img_12.png](img_12.png)

                管理持久连接
                    Connection：close   http 1.1版本的默认连接都是持久连接，所以当服务器想明确断开连接时，需要制定为close
![img_13.png](img_13.png)

        Transfer-Encoding
            这个字段规定了传输报文主体时采用的编码方式。
            HTTP 1.1 的传输编码方式仅对分块传输编码有效
![img_14.png](img_14.png)

        Upgrade
![img_15.png](img_15.png)

        Via
            使用首部字段Via是为了追踪客户端和服务器之间的响应报文的传输路径
![img_16.png](img_16.png)
![img_17.png](img_17.png)
            

        2.请求首部字段：从客户端向服务器发送请求报文时使用的首部，补充了请求的附加信息，客户端信息，响应内容相关优先级等信息
            Accept：通知服务器 客户端能够处理的媒体类型及媒体类型的相对优先级
![img_18.png](img_18.png)
![img_19.png](img_19.png)

            Accept-Charset：通知服务器，客户端支持的字符集以及字符集的相对优先顺序，也可以用q值来表示相对优先级
![img_20.png](img_20.png)

            Accept-Encoding：告知服务器 用户支持的内容编码以及内容编码的优先级  内容编码也就是压缩
![img_21.png](img_21.png)
![img_22.png](img_22.png)

            Accept-Language：告知服务器 客户端能够处理的自然语言级

            Authorization：告知服务器，用户的认证信息
![img_23.png](img_23.png)

            Expect
![img_24.png](img_24.png)

            From：告知服务器 与用户的电子邮件地址
![img_25.png](img_25.png)

            Host：会告知服务器，请求资源所处的互联网主机名（域名）和端口号 请求被发送至服务器时，请求中的主机名会用 IP 地址直接替换解
                    决。但如果这时，相同的 IP 地址下部署运行着多个域名，那么服务器
                    就会无法理解究竟是哪个域名对应的请求。因此，就需要使用首部字段
                    Host 来明确指出请求的主机名。
![img_26.png](img_26.png)
![img_27.png](img_27.png)
    

            If-Match：形如if-xxx 这种样式的请求首部字段，都可称为请求条件，服务器接收到附加条件的请求后，只有判断制定条件为真，才会执行请求,首部字段 If-Match，属附带条件之一，它会告知服务器匹配资源所
                    用的实体标记（ETag）值。这时的服务器无法使用弱 ETag 值。

            If-Modified-Since：告知服务器如果这个字段的时间 早于资源的更新时间 则希望处理改请求
![img_31.png](img_31.png)

            If-None-Match
![img_32.png](img_32.png)

            If-Range: 如果If-Range字段与ETag一致就范围处理，如果不一致就返回全体资源  如果if-match + range 第一次没匹配上  还会发第二个请求 获取全部信息（待考证）
![img_33.png](img_33.png)
![img_34.png](img_34.png)

            If-Unmodified-Since 在这个时间之后没有发生更新 才能处理请求
![img_35.png](img_35.png)

            Max-Forwards
![img_36.png](img_36.png)

            Proxy-Authorization
![img_37.png](img_37.png)

            Range: 对于只需获取部分资源的氛围请求，包含首部字段Range即可告知服务器资源的指定范围

            Referer：会告知服务器请求的原始资源的URI

            
![img_28.png](img_28.png)
![img_29.png](img_29.png)
![img_30.png](img_30.png)
            
            TE:TE 控制的是传输层的编码方式（如分块传输），较少用于压缩。
                TE 的对应响应头是 Transfer-Encoding，服务器会基于此选择适当的传输编码。
                Accept-Encoding 的对应响应头是 Content-Encoding，服务器会基于此选择适当的内容压缩方式。

            User-Agent：会将创建请求的浏览器和用户代理名称等信息传达给服务器
![img_38.png](img_38.png)
                
        
        3.响应首部字段：从服务端向客户端返回响应报文时使用的首部，补充了响应的附加内容，也会要求客户端附加额外的内容信息
            Accept-Ranges：来告知客户端 服务器是否能处理范围请求，以指定获取服务器端某个部分的资源
            可指定获取服务器端某个部分的资源，可指定的字段有两种 bytes none
![img_39.png](img_39.png)

            Age
![img_40.png](img_40.png)


            ETag：能告知客户端实体标识，比如文件重新格式化 可用弱ETag，因为其本质也没发生变化
![img_42.png](img_42.png)

            Location：一般与网址重定向一起合作
![img_43.png](img_43.png)

            Proxy-Authenticate 这个认证行为是在客户端与代理之间进行的
![img_44.png](img_44.png)

            Retry-After：告诉客户端应在多久之后再次发送请求  经常与503 或 3xx Redirect  一起使用 
![img_45.png](img_45.png)

            Server：告知客户端当前服务器上安装的HTTP服务器应用程序的信息
![img_46.png](img_46.png)

            Vary：跟缓存有关系
![img_47.png](img_47.png)

            WWW-Authenticate
![img_48.png](img_48.png)

                401 Unauthorized 与 WWW-Authenticate 的关系
                状态码 401 Unauthorized: 表示客户端请求需要身份验证，但尚未提供有效的凭据，或者提供的凭据无效。因此，客户端不能访问请求的资源。
                WWW-Authenticate 首部字段: 当服务器返回 401 Unauthorized 时，它需要告知客户端如何进行身份验证，以便客户端可以重试请求并提供正确的凭据。WWW-Authenticate 首部字段就是用于这个目的的。

            
        
            

        4.实体首部字段：针对请求报文和响应报文的实体部分使用的首部，补充了资源内容更新时间等与实体有关的信息

126页